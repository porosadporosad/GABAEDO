import GlobalStyle from 'GlobalStyle';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Router from 'shared/Router';

const queryClient = new QueryClient();

export default function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <GlobalStyle />
        <Router />
        <ToastContainer />
      </QueryClientProvider>
    </>
  );
}
