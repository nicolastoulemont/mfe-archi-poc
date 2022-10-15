import { EditContact, loader, action } from './EditContact'
import { queryClient } from '@poc/query'

export const editRoute = {
  path: 'contacts/:contactId/edit',
  element: <EditContact />,
  loader: loader(queryClient),
  action: action(queryClient),
} as const
