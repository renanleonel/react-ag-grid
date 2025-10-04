import type { ListClientsParams } from '@/domain/schemas/client';
import { useListClients } from '@/queries/client-queries';
import { useMemo } from 'react';

const DEFAULT_PARAMS: ListClientsParams = {
  page: 1,
  pageSize: 1,
};

export function Table() {
  const params = useMemo<ListClientsParams>(() => DEFAULT_PARAMS, []);

  const query = useListClients({ params });

  const clients = query.data?.list ?? [];

  if (query.isLoading) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  return (
    <div>
      {clients.map((client) => (
        <div key={client.id}>{client.name}</div>
      ))}
    </div>
  );
}
