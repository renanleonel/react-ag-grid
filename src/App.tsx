import { Table } from '@/containers/table';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';

ModuleRegistry.registerModules([AllCommunityModule]);

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <main className='h-screen flex flex-col'>
        <Table />
      </main>
    </QueryClientProvider>
  );
}

export default App;
