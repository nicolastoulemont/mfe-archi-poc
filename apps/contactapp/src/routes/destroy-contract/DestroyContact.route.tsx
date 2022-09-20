import { queryClient } from '@mfe-archi-poc/query'
import { RouteObject } from 'react-router-dom'
import { action } from './DestroyContact'

export const destroyRoute: RouteObject = {
  path: 'contacts/:contactId/destroy',
  action: action(queryClient),
  errorElement: <div>Oops! There was an error</div>,
}
