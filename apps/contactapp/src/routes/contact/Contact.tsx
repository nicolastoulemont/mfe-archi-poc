import { Form, useLoaderData, useFetcher, ActionFunctionArgs, useParams } from 'react-router-dom'
import type { LoaderFunctionArgs } from 'react-router-dom'
import { updateContact } from '../../http'
import type { LoaderType } from '../../types'

import type { QueryClientType } from '@mfe-archi-poc/query'
import { useQuery } from '@mfe-archi-poc/query'
import { Contact } from './Contact.types'
import { contactDetailQuery } from './Contact.http'

export const loader =
  (queryClient: QueryClientType) =>
  async ({ params }: LoaderFunctionArgs) => {
    const query = contactDetailQuery(params.contactId as string)
    const contact = queryClient.getQueryData<Contact>(query.queryKey) ?? (await queryClient.fetchQuery<Contact>(query))
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
    const contact = await updateContact(params.contactId as string, { favorite: formData.get('favorite') === 'true' })
    await queryClient.invalidateQueries(['contacts'])
    return contact
  }

export function Contact() {
  const initialData = useLoaderData() as LoaderType<typeof loader>
  const params = useParams()
  const { data: contact } = useQuery({
    ...contactDetailQuery(params.contactId as string),
    initialData,
  })

  if (!contact) return null

  return (
    <div id='contact'>
      <div>{contact.avatar ? <img key={contact.avatar} src={contact.avatar} /> : null}</div>

      <div>
        <h1>
          {contact.first || contact.last ? (
            <>
              {contact.first} {contact.last}
            </>
          ) : (
            <i>No Name</i>
          )}{' '}
          <Favorite contact={contact} />
        </h1>

        {contact.twitter && (
          <p>
            <a target='_blank' href={`https://twitter.com/${contact.twitter}`}>
              {contact.twitter}
            </a>
          </p>
        )}

        {contact.notes && <p>{contact.notes}</p>}

        <div>
          <Form action='edit'>
            <button type='submit'>Edit</button>
          </Form>
          <Form
            method='post'
            action='destroy'
            onSubmit={(event) => {
              if (!confirm('Please confirm you want to delete this record.')) {
                event.preventDefault()
              }
            }}
          >
            <button type='submit'>Delete</button>
          </Form>
        </div>
      </div>
    </div>
  )
}

function Favorite({ contact }: { contact: Contact }) {
  const fetcher = useFetcher()
  let favorite = contact.favorite

  return (
    <fetcher.Form method='post'>
      <button
        name='favorite'
        value={favorite ? 'false' : 'true'}
        aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}
      >
        {favorite ? '★' : '☆'}
      </button>
    </fetcher.Form>
  )
}
