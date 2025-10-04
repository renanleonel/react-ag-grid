import type { Client } from '@/domain/schemas/client';
import type { ColDef } from 'ag-grid-community';

export const NameColumn = (): ColDef<Client> => ({
  flex: 1,
  minWidth: 100,
  field: 'name',
  headerName: 'Name',
  cellRenderer: ({ data }: { data: Client }) => data.name,
});
