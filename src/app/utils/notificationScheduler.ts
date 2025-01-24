import cron from 'node-cron';
import { GroupTask } from '../modules/Task/task.model';
import { User } from '../modules/user/user.model';
import { TGroupTask } from '../modules/Task/task.interface';

// ⏰ Schedule a task to run every 10 HOURS for testing

cron.schedule('*/100 * * * * *', async () => {
  try {
    const now = new Date();
    // 🔍 Find all tasks with deadlines in the future
    const upcomingTasks = await GroupTask.find({
      deadline: { $gte: now },
    });

    // 📋 Iterate over each task
    upcomingTasks.forEach(task => {
      // 👥 Check each assignee of the task
      task.assignedTo.forEach(assignee => {
        // 🚨 If the task is pending, send a notification
        if (assignee.status === 'PENDING') {
          sendNotification(task, assignee.userId.toString());
          //console.log('\nNotification sent to user:', assignee.userId, '\n');
        }
      });
    });
  } catch (error) {
    console.error('\n❌ Error fetching tasks or sending notifications:', error, '\n');
  }
});

// 📧 Function to send a notification to a user
async function sendNotification(task: TGroupTask, userId: string) {
  try {
    // 🔍 Find user by userId
    const user = await User.findById(userId);
    if (user) {
      console.log(`\n👤 User: ${user.username}\n`);
      // 📝 Construct a detailed notification message
      const message = `🔔 Reminder for ${user.username}: The deadline for "${task.title}" is approaching on ${task.deadline.toLocaleString()}. Please ensure to complete it on time.`;
      console.log(`\n${message}\n`);
      // Implement actual notification logic here
      // await sendEmailNotification(userId, message);
    } else {
      console.error(`\n❌ User with ID ${userId} not found.\n`);
    }
  } catch (error) {
    console.error(`\n❌ Failed to send notification for task "${task.title}" to user ${userId}:`, error, '\n');
  }
}




