import z from 'zod';

export const clientSchema = z.object({
  id: z.string(),
  name: z.string(),
  country: z.string(),
});

export const listClientsResponseSchema = z.object({
  data: z.array(clientSchema),
});

export const listClientsSchema = z.object({
  page: z.number(),
  pageSize: z.number(),
});

export type Client = z.infer<typeof clientSchema>;
export type ListClientsParams = z.infer<typeof listClientsSchema>;
