import { SignIn, action } from './SignIn'
import { queryClient } from '@mfe-archi-poc/query'

export const signInRoute = {
  path: 'signin',
  element: <SignIn />,
  action: action(queryClient),
} as const
