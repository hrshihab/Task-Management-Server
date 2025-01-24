import { z } from 'zod';

const userValidationSchema = z.object({
  // username: z.string({
  //   invalid_type_error: 'Username must be string',
  // }),
  // email: z.string({
  //   invalid_type_error: 'Email must be string',
  // }),
  // pasword: z
  //   .string({
  //     invalid_type_error: 'Password must be string',
  //   })
  //   .max(20, { message: 'Password can not be more than 20 characters' })
  //   .optional(),
  // role: z.enum(['Admin', 'Owner', 'Member'] as const).optional(),
  // status: z.enum(['Active', 'Inactive'] as const).optional(),
});

export const UserValidation = {
  userValidationSchema,
};
