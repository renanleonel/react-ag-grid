import { CountryColumn } from '@/containers/table/columns/country';
import { NameColumn } from '@/containers/table/columns/name';
import type { Client } from '@/domain/schemas/client';
import type { ColDef } from 'ag-grid-community';
import { useMemo } from 'react';

export function useTableColumns() {
  const columnDefs = useMemo<ColDef<Client>[]>(() => [NameColumn(), CountryColumn()], []);

  return { columnDefs };
}
