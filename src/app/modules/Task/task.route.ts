import { Router } from "express";
import { TaskController } from "./task.controller";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";
import { TUserRole } from "../user/user.interface";
import validateRequest from "../../middlewares/validateRequest";
import { TaskValidation } from "./task.validation";

const router = Router();

router.post('/create-task',
    auth(USER_ROLE.Admin as TUserRole,USER_ROLE.Owner as TUserRole),
    validateRequest(TaskValidation.createTaskValidation),
    TaskController.createTask);

router.post('/create-group-task',
    auth(USER_ROLE.Admin as TUserRole,USER_ROLE.Owner as TUserRole),
    validateRequest(TaskValidation.groupTaskValidation),
    TaskController.createGroupTask);

export const TaskRoute = router;