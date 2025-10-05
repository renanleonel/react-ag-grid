import { Client } from '@/domain/entities/client';
import type { ListClientsParams, ListClientsResponse } from '@/domain/schemas/client';
import { ClientRepository } from '@/repositories/client';
import type { UseQueryOptions } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

export type ListClientsQueryResult = {
  list: Client[];
  map: Map<string, Client>;
  pagination: {
    page: number;
    pageSize: number;
    total: number;
  };
};

type ListClientsProps = {
  params: ListClientsParams;
  options?: Omit<
    UseQueryOptions<ListClientsResponse, AxiosError, ListClientsQueryResult>,
    'queryKey' | 'queryFn'
  >;
};

function useListClients({ params, options }: ListClientsProps) {
  const queryKey = ['clients', params];

  const query = useQuery<ListClientsResponse, AxiosError, ListClientsQueryResult>({
    queryKey,
    queryFn: async () => {
      const response = await ClientRepository.listClients(params);

      return response;
    },
    select: (data) => {
      const list = data.data.map((client) => new Client(client));
      const map = new Map(list.map((client) => [client.id, client]));

      return { list, map, pagination: data.pagination };
    },
    retry: 2,
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchInterval: 1000 * 60 * 5, // 5 minutes
    ...options,
  });

  return query;
}

export { useListClients };
