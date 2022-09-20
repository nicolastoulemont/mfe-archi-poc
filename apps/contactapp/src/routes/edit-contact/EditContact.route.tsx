import { EditContact, loader, action } from './EditContact'
import { queryClient } from '@mfe-archi-poc/query'
import { RouteObject } from 'react-router-dom'

export const editRoute: RouteObject = {
  path: 'contacts/:contactId/edit',
  element: <EditContact />,
  loader: loader(queryClient),
  action: action(queryClient),
}
