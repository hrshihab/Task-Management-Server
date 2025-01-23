import { model, Schema } from "mongoose";
import { TAssignedTo, TGroupTask, TTask } from "./task.interface";


const TaskSchema = new Schema<TTask>({
    title: { type: String, required: true },
    description: { type: String, required: true },
    priority: { type: String, enum: ["LOW", "MEDIUM", "HIGH"], required: true },
    deadline: { type: Date, required: true },
    assignedTo: { type: Schema.Types.ObjectId, ref: "User", required: true }, 
    organizationId: { type: Schema.Types.ObjectId, ref: "Organization", required: true },
}, { timestamps: true })

export const Task = model<TTask>("Task", TaskSchema);

const AssignedToSchema = new Schema<TAssignedTo>({
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    status: { type: String, enum: ["PENDING", "IN_PROGRESS", "COMPLETED"], required: true },
}, { timestamps: true })

const GroupTaskSchema = new Schema<TGroupTask>({
    title: { type: String, required: true },
    description: { type: String, required: true },
    priority: { type: String, enum: ["LOW", "MEDIUM", "HIGH"], required: true },
    deadline: { type: Date, required: true },
    assignedTo: [AssignedToSchema],
    organizationId: { type: Schema.Types.ObjectId, ref: "Organization", required: true },
}, { timestamps: true })

export const GroupTask = model<TGroupTask>("GroupTask", GroupTaskSchema);


