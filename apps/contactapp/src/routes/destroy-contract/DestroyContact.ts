import type { QueryClientType } from '@mfe-archi-poc/query'
import { ActionFunctionArgs, redirect } from 'react-router-dom'
import { deleteContact } from './DestroyContact.http'

export const action =
  (queryClient: QueryClientType) =>
  async ({ params }: ActionFunctionArgs) => {
    await deleteContact(params.contactId as string)
    await queryClient.invalidateQueries(['contacts'])
    return redirect('/')
  }
