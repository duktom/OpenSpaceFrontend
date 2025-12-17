import { z } from 'zod';

export const BackendSimplifiedErrorSchema = z.object({
  detail: z.string(),
});

export type BackendSimplifiedError = z.infer<typeof BackendSimplifiedErrorSchema>;

export const BackendDetailedErrorSchema = z.object({
  detail: z.array(
    z.object({
      loc: z.array(z.union([z.string(), z.number()])),
      msg: z.string(),
      type: z.string(),
      ctx: z.object({ error: z.string() }).optional(),
      input: z.unknown().optional(),
    })
  ),
});

export type BackendDetailedError = z.infer<typeof BackendDetailedErrorSchema>;
export type ApiError = string[];
