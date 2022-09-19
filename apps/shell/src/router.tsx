import { createBrowserRouter } from 'react-router-dom'

import Root, { loader as rootLoader, action as rootAction } from './routes/root'
import Index from './routes/index'
import Contact, { loader as contactLoader, action as contactAction } from './routes/contact'
import EditContact, { action as editAction } from './routes/edit'
import { action as destroyAction } from './routes/destroy'
import ErrorPage from './error-page'
import { queryClient } from '@mfe-archi-poc/query'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: rootLoader(queryClient),
    action: rootAction(queryClient),
    children: [
      { index: true, element: <Index /> },
      {
        path: 'contacts/:contactId',
        element: <Contact />,
        loader: contactLoader(queryClient),
        action: contactAction(queryClient),
      },
      {
        path: 'contacts/:contactId/edit',
        element: <EditContact />,
        loader: contactLoader(queryClient),
        action: editAction(queryClient),
      },
      {
        path: 'contacts/:contactId/destroy',
        action: destroyAction(queryClient),
        errorElement: <div>Oops! There was an error</div>,
      },
    ],
  },
])
