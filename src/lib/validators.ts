import { z } from 'zod';

export const healthResponseSchema = z.object({
  status: z.string(),
  dataset_info: z
    .object({
      min_year: z.number(),
      max_year: z.number(),
      total_records: z.number(),
    })
    .optional(),
});

export const chatQueryResponseSchema = z.object({
  answer: z.string(),
  structured_result: z
    .object({
      chart_data: z
        .array(
          z.record(z.union([z.string(), z.number()]))
        )
        .optional(),
      summary: z.string().optional(),
    })
    .optional(),
});

export const topNamesByDecadeResponseSchema = z.object({
  data: z.array(
    z.object({
      decade: z.string(),
      name: z.string(),
      count: z.number(),
      rank: z.number(),
    })
  ),
  summary: z.string(),
});

export const nameTimelineResponseSchema = z.object({
  data: z.array(
    z.object({
      year: z.number(),
      count: z.number(),
      rank: z.number().optional(),
    })
  ),
  summary: z.string(),
  name: z.string(),
  sex: z.enum(['all', 'M', 'F']),
});

export const savedQuerySchema = z.object({
  id: z.number(),
  prompt: z.string(),
  title: z.string().optional(),
  created_at: z.string(),
});

export const savedQueriesResponseSchema = z.array(savedQuerySchema);
