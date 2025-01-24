import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import { TaskService } from './task.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';

const createTask = catchAsync(async (req: Request, res: Response) => {
  const task = req.body;
  //console.log(task);
  const newTask = await TaskService.createTask(task);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Task created successfully',
    data: newTask,
  });
});

const createGroupTask = catchAsync(async (req: Request, res: Response) => {
  const task = req.body;
  const user = req.user.userId;
  console.log(user);
  const newTask = await TaskService.createGroupTask(task, user);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Task created successfully',
    data: newTask,
  });
});

const getTask = catchAsync(async (req: Request, res: Response) => {
  const user = req.user.userId;
  const priority = req.query.priority as string;
  const task = await TaskService.getTask(user, priority);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Task fetched successfully',
    data: task,
  });
});

const completeTask = catchAsync(async (req: Request, res: Response) => {
  const taskId = req.params.taskId;
  const userId = req.user.userId;
  const taskDetails = req.body.taskDetails;
  const task = await TaskService.completeTask(taskId, userId, taskDetails);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Task completed successfully',
    data: task,
  });
});

export const TaskController = {
  createTask,
  createGroupTask,
  getTask,
  completeTask,
};
