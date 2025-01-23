import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
    import { TaskService } from "./task.service";
    import sendResponse from "../../utils/sendResponse";
    import httpStatus from "http-status";

const createTask = catchAsync(async (req: Request, res: Response) => {
    const task = req.body;
    //console.log(task);
    const newTask = await TaskService.createTask(task);
    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: "Task created successfully",
        data: newTask
    })
})

const createGroupTask = catchAsync(async (req: Request, res: Response) => {
    const task = req.body;
    const newTask = await TaskService.createGroupTask(task);
    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: "Group Task created successfully",
        data: newTask
    })
})

export const TaskController = {
    createTask,
    createGroupTask
}