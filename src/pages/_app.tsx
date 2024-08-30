import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from 'next-themes';
import { store } from '../store';
import Layout from '../components/Layout';
import ErrorBoundary from '../components/ErrorBoundary';

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <ErrorBoundary>
            <Layout>
              <a href="#main-content" className="sr-only focus:not-sr-only">
                Skip to content
              </a>
              <main id="main-content">
                <Component {...pageProps} />
              </main>
            </Layout>
          </ErrorBoundary>
        </ThemeProvider>
      </QueryClientProvider>
    </Provider>
  );
}

export default MyApp;
