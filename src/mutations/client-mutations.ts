import { globalQueryClient } from '@/domain/constants/query-client';
import { Client } from '@/domain/entities/client';
import type { ListClientsResponse } from '@/domain/schemas/client';
import { ClientRepository } from '@/repositories/client';
import { useMutation, type UseMutationOptions } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

const useUpdateClient = (
  options?: Exclude<UseMutationOptions<Client, AxiosError, Client>, 'mutationFn'>
) => {
  const mutation = useMutation({
    mutationFn: (client: Client) => ClientRepository.updateClient(client),
    onSuccess: (client) => {
      // globalQueryClient.invalidateQueries({ queryKey: ['clients'] });

      globalQueryClient.setQueriesData(
        { queryKey: ['clients'] },
        (oldData: ListClientsResponse | undefined) => {
          if (!oldData) return oldData;
          const newClient = client.toEntity();

          const list = oldData.data.map((client) =>
            client.id === newClient.id ? newClient : client
          );
          const map = new Map(list.map((client) => [client.id, client]));

          return { ...oldData, list, map };
        }
      );
    },
    ...options,
  });

  return {
    ...mutation,
    updateClient: mutation.mutateAsync,
  };
};

export { useUpdateClient };
