import { z } from 'zod';

export interface SignupBasicFormSchema {
  firstName?: string;
  lastName?: string;
  gender?: boolean;
  dob?: Date;
  hometown?: string;
  phone?: string;
}

export const SignupBasicFormZod = z.object({
  firstName: z.string().min(1).max(30).nullable(),
  lastName: z.string().min(1).max(30).nullable(),
  gender: z.boolean().nullable(),
  dob: z.date().nullable(),
  hometown: z.string().min(1).max(30).nullable(),
  phone: z.string().regex(/^(\+?[0-9]{10}|[0-9]{10})[0-9]{11}$/).min(1).max(10).nullable()
});
