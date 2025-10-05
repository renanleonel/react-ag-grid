import { Table } from '@/containers/table';
import { globalQueryClient } from '@/domain/constants/query-client';
import { QueryClientProvider } from '@tanstack/react-query';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';

ModuleRegistry.registerModules([AllCommunityModule]);

function App() {
  return (
    <QueryClientProvider client={globalQueryClient}>
      <main className='h-screen flex flex-col'>
        <Table />
      </main>
    </QueryClientProvider>
  );
}

export default App;
