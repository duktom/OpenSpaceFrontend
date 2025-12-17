import { z } from 'zod';

export const JobSchema = z.object({
  id: z.string().nonempty(),
  createdAt: z.number().transform((val) => new Date(val)),
});

export type JobInput = z.input<typeof JobSchema>;
export type Job = z.infer<typeof JobSchema>;
