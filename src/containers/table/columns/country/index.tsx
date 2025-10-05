import type { Client } from '@/domain/entities/client';
import type { ColDef } from 'ag-grid-community';

export const CountryColumn = (): ColDef<Client> => ({
  flex: 1,
  minWidth: 100,
  field: 'country',
  headerName: 'Country',
  cellRenderer: ({ data }: { data: Client }) => data.country,
});
