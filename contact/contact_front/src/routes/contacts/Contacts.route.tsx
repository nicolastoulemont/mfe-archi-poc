import { Contacts, loader, action } from './Contacts'
import { queryClient } from '@poc/query'
import ErrorPage from '../../error-page'
import { ContactsIndex } from './Contacts.index'

export const contactsRoute = {
  path: 'contacts',
  element: <Contacts />,
  loader: loader(queryClient),
  action: action(queryClient),
  errorElement: <ErrorPage />,
} as const

export const contactsIndexRoute = {
  index: true,
  element: <ContactsIndex />,
} as const
