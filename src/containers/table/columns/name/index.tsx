import type { Client } from '@/domain/entities/client';
import type { ColDef } from 'ag-grid-community';

export const NameColumn = (): ColDef<Client> => ({
  flex: 1,
  minWidth: 100,
  field: 'name',
  headerName: 'Name',
  editable: true,
  cellRenderer: ({ data }: { data: Client }) => data.name,
});
