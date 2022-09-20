import { createBrowserRouter } from 'react-router-dom'

import Root, { loader as rootLoader, action as rootAction } from './routes/root'
import Index from './routes/index'
import ErrorPage from './error-page'
import { queryClient } from '@mfe-archi-poc/query'
import contactRoutes from 'contactapp'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: rootLoader(queryClient),
    action: rootAction(queryClient),
    children: [{ index: true, element: <Index /> }, ...contactRoutes],
  },
])
