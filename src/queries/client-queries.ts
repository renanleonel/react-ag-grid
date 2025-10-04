import { Client } from '@/domain/entities/client';
import type { ListClientsParams } from '@/domain/schemas/client';
import type { RawClient } from '@/domain/types/raw-client';
import { ClientRepository } from '@/repositories/client';
import type { UseQueryOptions } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

type QueryResult = {
  list: Client[];
  map: Map<string, Client>;
};

type ListClientsProps = {
  params: ListClientsParams;
  options?: Omit<UseQueryOptions<RawClient[], AxiosError, QueryResult>, 'queryKey' | 'queryFn'>;
};

function useListClients({ params, options }: ListClientsProps) {
  const queryKey = ['clients', params];

  const query = useQuery<RawClient[], AxiosError, QueryResult>({
    queryKey,
    queryFn: async () => {
      const { data } = await ClientRepository.listClients(params);

      return data;
    },
    select: (data) => {
      const list = data.map((client) => new Client(client));
      const map = new Map(list.map((client) => [client.id, client]));

      return { list, map };
    },
    retry: 2,
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchInterval: 1000 * 60 * 5, // 5 minutes
    ...options,
  });

  return query;
}

export { useListClients };
