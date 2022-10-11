import React from 'react'
import './index.css'
import { queryClient, QueryClientProvider } from "@poc/query'
import { RouterProvider } from 'react-router-dom'
import { router } from './router'

export const App = () => (
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
)
