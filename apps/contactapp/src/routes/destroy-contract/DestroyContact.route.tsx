import { queryClient } from '@poc/query'
import { action } from './DestroyContact'

export const destroyRoute = {
  path: 'contacts/:contactId/destroy',
  action: action(queryClient),
  errorElement: <div>Oops! There was an error</div>,
} as const
