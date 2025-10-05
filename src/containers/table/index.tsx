import { useTableColumns } from '@/containers/table/columns/use-table-columns';
import type { ListClientsParams } from '@/domain/schemas/client';
import { useListClients } from '@/queries/client-queries';
import { AgGridReact } from 'ag-grid-react';
import { useState } from 'react';

import { CustomPagination } from '@/components/custom-pagination';
import type { Client } from '@/domain/entities/client';
import { useUpdateClient } from '@/mutations/client-mutations';

const DEFAULT_PARAMS: ListClientsParams = {
  page: 1,
  pageSize: 20,
};

const PAGE_SIZE_OPTIONS = [10, 20, 50, 100];

export function Table() {
  const [params, setParams] = useState<ListClientsParams>(DEFAULT_PARAMS);

  const query = useListClients({ params });

  const { columnDefs } = useTableColumns();

  const clients = query.data?.list ?? [];

  const { updateClient } = useUpdateClient();

  return (
    <div className='h-full w-full p-10 flex flex-col gap-4'>
      <AgGridReact<Client>
        rowData={clients}
        columnDefs={columnDefs}
        onCellValueChanged={({ data, newValue, colDef }) => {
          const newClient = data.clone();

          const fieldSetters: Record<string, (client: Client, value: string) => void> = {
            name: (client, value) => {
              client.name = value;
            },
            country: (client, value) => {
              client.country = value;
            },
          };

          if (colDef.field && fieldSetters[colDef.field]) {
            fieldSetters[colDef.field](newClient, newValue);
          }

          console.log('Updated client:', newClient);
          updateClient(newClient);
        }}
      />

      <div className='h-10'>
        <CustomPagination
          page={params.page}
          pageSize={params.pageSize}
          isLoading={query.isLoading}
          total={query.data?.pagination.total ?? 0}
          onPageChange={(page) => setParams({ ...params, page })}
          onPageSizeChange={(pageSize) => setParams({ ...params, pageSize })}
          pageSizeOptions={PAGE_SIZE_OPTIONS}
        />
      </div>
    </div>
  );
}
