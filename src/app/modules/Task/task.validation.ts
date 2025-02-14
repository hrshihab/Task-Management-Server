import { z } from 'zod';
import { Types } from 'mongoose';

// Helper function to validate ObjectId
const isValidObjectId = (val: string) => Types.ObjectId.isValid(val);

const assignedToValidation = z.object({
  userId: z.string().refine(isValidObjectId, {
    message: 'Invalid User ID',
  }),
  status: z.enum(['PENDING', 'IN_PROGRESS', 'COMPLETED']),
  taskDetails: z.string().optional(),
});

export const createTaskValidation = z.object({
  body: z.object({
    title: z.string().min(1, 'Title is required'),
    description: z.string().min(3, 'Description must be at least 3 characters'),
    priority: z.enum(['LOW', 'MEDIUM', 'HIGH']),
    status: z.enum(['PENDING', 'IN_PROGRESS', 'COMPLETED']),
    deadline: z.string().datetime(),
    assignedTo: z.string().refine(isValidObjectId, {
      message: 'Invalid User ID',
    }),
    organizationId: z.string().refine(isValidObjectId, {
      message: 'Invalid Organization ID',
    }),
  }),
});

export const groupTaskValidation = z.object({
  body: z.object({
    title: z.string().min(1, 'Title is required'),
    description: z.string().min(3, 'Description must be at least 3 characters'),
    priority: z.enum(['LOW', 'MEDIUM', 'HIGH']),
    deadline: z.string().datetime(),
    assignedTo: z.array(assignedToValidation),
    createdBy: z
      .string()
      .refine(isValidObjectId, {
        message: 'Invalid User ID',
      })
      .optional(),
    organizationId: z.string().refine(isValidObjectId, {
      message: 'Invalid Organization ID',
    }),
  }),
});

export const completeTaskValidation = z.object({
  body: z.object({
    taskDetails: z.string().optional(),
  }),
});

export const TaskValidation = {
  createTaskValidation,
  groupTaskValidation,
  completeTaskValidation,
};
