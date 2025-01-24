import { TGroupTask } from './task.interface';
import { Invitation } from '../Invitation/Invitation.model';
import { TTask } from './task.interface';
import { Task, GroupTask } from './task.model';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';

const createTask = async (task: TTask) => {
  // Check for existing task with the same title and organization
  const duplicateTask = await Task.findOne({
    title: task.title,
    assignedTo: task.assignedTo,
    organizationId: task.organizationId,
  });

  if (duplicateTask) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Task already exists');
  }
  //check assigne in invitation and staus is approved then create task and also validate deadline
  const invitation = await Invitation.findOne({
    organization: task.organizationId,
  });
  if (!invitation) {
    throw new AppError(httpStatus.NOT_FOUND, 'Organization not found');
  }

  console.log(invitation);

  //inviatioin member in array and status is accepted
  const invitationMember = invitation?.members.find(
    (member) =>
      member.userId.toString() === task.assignedTo.toString() &&
      member.status === 'accepted',
  );
  //console.log(invitationMember);
  if (!invitationMember) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Invitation not found or member status is not approved',
    );
  }

  const deadline = new Date(task.deadline);
  if (deadline < new Date()) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Deadline must be in the future',
    );
  }

  const newTask = await Task.create(task);
  return newTask;
};

const createGroupTask = async (task: TGroupTask, userId: any) => {
  // Check for existing group task with the same title, deadline, and organization
  const existingTask = await GroupTask.findOne({
    title: task.title,
    deadline: task.deadline,
    organizationId: task.organizationId,
  });

  if (existingTask) {
    // If any member not assigned then add them
    const notAssignedMembers = task.assignedTo.filter(
      (member) =>
        !existingTask.assignedTo.some(
          (assignedMember) =>
            assignedMember.userId.toString() === member.userId.toString(),
        ),
    );
    existingTask.assignedTo.push(...notAssignedMembers);
    await existingTask.save();
    return existingTask;
  }

  //deadline check
  const deadline = new Date(task.deadline);
  if (deadline < new Date()) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Deadline must be in the future',
    );
  }
  //add createdBy in task
  task.createdBy = userId;
  //console.log(task);

  const newTask = await GroupTask.create(task);
  return newTask;
};

//user can see the all task of every organization if he accept the invitation of that organization
//there will be multiple organization and multiple task of that organization
//at first check each of the organizatoion and then check assignedTo of that organization
//if assignedTo of that organization is userId then return that task
//at first serach which inviation are accepted store those organization id and then check groupTask of that organization
const getTask = async (userId: any, priority?: string) => {
  // Find all invitations where the user is a member and the status is accepted
  const invitations = await Invitation.find({
    'members.userId': userId,
    'members.status': 'accepted',
  });

  //console.log(priority);
  // Extract organization IDs from the invitations
  const organizationIds = invitations.map(
    (invitation) => invitation.organization,
  );

  // Build the query object
  const query: any = {
    organizationId: { $in: organizationIds },
    'assignedTo.userId': userId,
  };

  // If priority is provided, add it to the query
  if (priority) {
    query.priority = priority;
  }

  // Find all tasks in these organizations where the user is assigned
  const tasks = await GroupTask.find(query).select(
    'title description deadline priority',
  );

  return tasks;
};

const completeTask = async (taskId: string, userId: any, taskDetails?: string) => {
  // Find the task by ID and ensure the user is assigned to it
  const task = await GroupTask.findOne({
    _id: taskId,
    
  });

  if (!task) {
    throw new AppError(httpStatus.NOT_FOUND, 'Task not found or not assigned to user');
  }

  // Perform plagiarism check (this is a placeholder for actual logic)
  const isPlagiarized = false; // Replace with actual plagiarism check logic
  if (isPlagiarized) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Plagiarism detected');
  }

  // Update the assigned user's status to 'COMPLETED' and optionally update taskDetails
  const assignedMember = task.assignedTo.find(
    (member) => member.userId.toString() === userId.toString()
  );

  if (assignedMember) {
    assignedMember.status = 'COMPLETED';
    if (taskDetails) {
      assignedMember.taskDetails = taskDetails;
    }
  }

  await task.save();

  return task;
};

export const TaskService = {
  createTask,
  createGroupTask,
  getTask,
  completeTask,
};
