import { Contact, loader, action } from './Contact'
import { queryClient } from '@mfe-archi-poc/query'
import ErrorPage from '../../error-page'

export const contactRoute = {
  path: 'contacts/:contactId',
  element: <Contact />,
  loader: loader(queryClient),
  action: action(queryClient),
  errorElement: <ErrorPage />,
} as const
