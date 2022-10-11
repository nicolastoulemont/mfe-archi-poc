import type { RouteObject } from 'react-router-dom'
import { SignUp, action } from './SignUp'
import { queryClient } from "@poc/query'
import ErrorPage from '../../error-page'

export const signUpRoute: RouteObject = {
  path: 'signup',
  element: <SignUp />,
  action: action(queryClient),
  errorElement: <ErrorPage />,
}
