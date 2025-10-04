import { Table } from '@/containers/table';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';

ModuleRegistry.registerModules([AllCommunityModule]);

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Table />
    </QueryClientProvider>
  );
}

export default App;
