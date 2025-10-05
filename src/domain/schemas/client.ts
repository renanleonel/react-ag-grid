import z from 'zod';

export const clientSchema = z.object({
  id: z.string(),
  name: z.string(),
  country: z.string(),
});

export const listClientsResponseSchema = z.object({
  data: z.array(clientSchema),
  pagination: z.object({
    page: z.number(),
    pageSize: z.number(),
    total: z.number(),
  }),
});

export const listClientsSchema = z.object({
  page: z.number(),
  pageSize: z.number(),
});

export type RawClient = z.infer<typeof clientSchema>;
export type ListClientsParams = z.infer<typeof listClientsSchema>;
export type ListClientsResponse = z.infer<typeof listClientsResponseSchema>;
