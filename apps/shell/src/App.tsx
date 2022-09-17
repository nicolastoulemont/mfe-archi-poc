import React, { Suspense } from 'react'
import './index.css'
import { queryClient, QueryClientProvider } from '@mfe-archi-poc/query'
import { appOneConfig } from 'app1/App1Index'

export const App = () => (
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={<div>Loading...</div>}>
        <div>{appOneConfig.title ?? 'No title'}</div>
      </Suspense>
    </QueryClientProvider>
  </React.StrictMode>
)
