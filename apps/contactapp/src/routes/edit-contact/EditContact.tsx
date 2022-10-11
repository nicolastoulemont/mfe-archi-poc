import { Form, redirect, useNavigate, useParams } from 'react-router-dom'
import type { LoaderFunctionArgs, ActionFunctionArgs } from 'react-router-dom'
import { updateContact } from './EditContact.http'
import type { IContact } from '../contact'
import type { QueryClientType } from "@poc/query'
import { useQuery } from "@poc/query'
import { contactDetailQuery } from '../contact'

export const loader =
  (queryClient: QueryClientType) =>
  async ({ params }: LoaderFunctionArgs) => {
    const query = contactDetailQuery(params.contactId as string)
    const contact = await queryClient.fetchQuery<IContact>(query)
    if (!contact) {
      throw new Response('', {
        status: 404,
        statusText: 'Not Found',
      })
    }
    return contact
  }

export const action =
  (queryClient: QueryClientType) =>
  async ({ request, params }: ActionFunctionArgs) => {
    const formData = await request.formData()
    const updates = Object.fromEntries(formData)
    await updateContact(params.contactId as string, updates)
    await queryClient.invalidateQueries(['contacts'])
    return redirect(`/contacts/${params.contactId}`)
  }

export function EditContact() {
  const params = useParams()
  const { data: contact } = useQuery(contactDetailQuery(params.contactId as string))
  const navigate = useNavigate()

  if (!contact) return null

  return (
    <Form method='post' id='contact-form'>
      <p>
        <span>Name</span>
        <input placeholder='First' aria-label='First name' type='text' name='first' defaultValue={contact.first} />
        <input placeholder='Last' aria-label='Last name' type='text' name='last' defaultValue={contact.last} />
      </p>
      <label>
        <span>Twitter</span>
        <input type='text' name='twitter' placeholder='@jack' defaultValue={contact.twitter} />
      </label>
      <label>
        <span>Avatar URL</span>
        <input
          placeholder='https://example.com/avatar.jpg'
          aria-label='Avatar URL'
          type='text'
          name='avatar'
          defaultValue={contact.avatar}
        />
      </label>
      <label>
        <span>Notes</span>
        <textarea name='notes' defaultValue={contact.notes} rows={6} />
      </label>
      <p>
        <button type='submit'>Save</button>
        <button
          type='button'
          onClick={() => {
            navigate(-1)
          }}
        >
          Cancel
        </button>
      </p>
    </Form>
  )
}
