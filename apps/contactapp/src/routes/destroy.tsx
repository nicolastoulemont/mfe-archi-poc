import type { QueryClientType } from '@mfe-archi-poc/query'
import { queryClient } from '@mfe-archi-poc/query'
import { ActionFunctionArgs, redirect } from 'react-router-dom'
import { deleteContact } from '../http'

const action =
  (queryClient: QueryClientType) =>
  async ({ params }: ActionFunctionArgs) => {
    await deleteContact(params.contactId as string)
    await queryClient.invalidateQueries(['contacts'])
    return redirect('/')
  }

export const destroyRoute = {
  path: 'contacts/:contactId/destroy',
  action: action(queryClient),
  errorElement: <div>Oops! There was an error</div>,
}
