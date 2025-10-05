import type { RawClient } from '@/domain/schemas/client';

export const CLIENTS_MOCKS: RawClient[] = Array.from({ length: 200 }, (_, index) => ({
  id: (index + 1).toString(),
  name: `Client ${index + 1}`,
  country: `Country ${index + 1}`,
}));
