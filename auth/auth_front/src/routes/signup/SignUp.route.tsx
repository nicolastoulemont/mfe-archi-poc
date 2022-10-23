import { SignUp, action } from './SignUp'
import { queryClient } from '@poc/query'
import ErrorPage from '../../error-page'

export const signUpRoute = {
  path: 'signup',
  element: <SignUp />,
  action: action(queryClient),
  errorElement: <ErrorPage />,
} as const
