import { TGroupTask } from "./task.interface";
import { Invitation } from "../Invitation/Invitation.model";
import { TTask } from "./task.interface";
import { Task,GroupTask } from "./task.model";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";

 const createTask = async (task: TTask) => {

    // Check for existing task with the same title and organization
    const duplicateTask = await Task.findOne({
        title: task.title,
        assignedTo: task.assignedTo,
        organizationId: task.organizationId
    });

    if (duplicateTask) {
        throw new AppError(httpStatus.BAD_REQUEST, "Task already exists");
    }
    //check assigne in invitation and staus is approved then create task and also validate deadline
    const invitation = await Invitation.findOne({
        organization: task.organizationId,
        
    });
    if(!invitation){
        throw new AppError(httpStatus.NOT_FOUND,"Organization not found", );
    }

   console.log(invitation);

    //inviatioin member in array and status is accepted
    const invitationMember = invitation?.members.find((member) => member.userId.toString() === task.assignedTo.toString() && member.status === 'accepted');
    //console.log(invitationMember);
    if (!invitationMember) {
        throw new AppError(httpStatus.NOT_FOUND,"Invitation not found or member status is not approved", );
    }

    const deadline = new Date(task.deadline);
    if (deadline < new Date()) {
        throw new AppError(httpStatus.BAD_REQUEST,"Deadline must be in the future", );
    }
    
    const newTask = await Task.create(task);
    return newTask;
}

const createGroupTask = async (task: TGroupTask) => {
    // Check for existing group task with the same title and organization
    const duplicateTask = await GroupTask.findOne({
        title: task.title,
        deadline: task.deadline,
        organizationId: task.organizationId
    });

    if (duplicateTask) {
        throw new AppError(httpStatus.BAD_REQUEST, "Group task already exists");
    }

    // Check assignees in invitation and status is approved
    const invitation = await Invitation.findOne({
        organization: task.organizationId,
        'members.userId': { $in: task.assignedTo.map(assignee => assignee.userId) },
        'members.status': 'accepted'
    });

    if (!invitation) {
        throw new AppError(httpStatus.BAD_REQUEST, "Invitation not found or member status is not approved yet");
    }
    //deadline check
    const deadline = new Date(task.deadline);
    if (deadline < new Date()) {
        throw new AppError(httpStatus.BAD_REQUEST,"Deadline must be in the future", );
    }

    const newTask = await GroupTask.create(task);
    return newTask;
}   



export const TaskService = {
    createTask,
    createGroupTask
}
