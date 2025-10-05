import { CLIENTS_MOCKS } from '@/domain/constants/mocks';
import type { Client } from '@/domain/entities/client';
import { listClientsResponseSchema, type ListClientsParams } from '@/domain/schemas/client';

export class ClientRepository {
  public static async listClients(params: ListClientsParams) {
    const response = await paginatedAPI(params);

    const parsedDate = listClientsResponseSchema.parse(response);

    return parsedDate;
  }

  public static async updateClient(client: Client) {
    await new Promise((resolve) => setTimeout(resolve, 300));

    return client;
  }
}

const paginatedAPI = async (params: ListClientsParams) => {
  await new Promise((resolve) => setTimeout(resolve, 300));

  const startIndex = (params.page - 1) * params.pageSize;
  const endIndex = startIndex + params.pageSize;

  return {
    data: CLIENTS_MOCKS.slice(startIndex, endIndex),
    pagination: {
      page: params.page,
      pageSize: params.pageSize,
      total: CLIENTS_MOCKS.length,
    },
  };
};
