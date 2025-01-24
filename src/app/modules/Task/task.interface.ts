import { Types } from 'mongoose';

export type TTask = {
  title: string;
  description: string;
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';
  deadline: Date;
  assignedTo: Types.ObjectId;

  organizationId: Types.ObjectId;
};

export type TAssignedTo = {
  userId: Types.ObjectId;
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';
  taskDetails?:string
};

export type TGroupTask = {
  title: string;
  description: string;
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
  deadline: Date;
  assignedTo: Array<TAssignedTo>;
  createdBy?: Types.ObjectId;
  organizationId: Types.ObjectId;
};

export type TCompleteTask = {
  taskDetails?: string;
};

