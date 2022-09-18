import React, { Suspense } from 'react'
import './index.css'
import { queryClient, QueryClientProvider } from '@mfe-archi-poc/query'
import { appOneConfig } from 'app1/App1Index'
import { RouterProvider } from 'react-router-dom'
import { router } from './router'

{
  /* <Suspense fallback={<div>Loading...</div>}>
        <div>{appOneConfig.title ?? 'No title'}</div>
        </Suspense> */
}
export const App = () => (
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
)
