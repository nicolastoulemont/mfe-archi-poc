import { Outlet, useNavigation, useLoaderData, Form, redirect, NavLink, useSubmit } from 'react-router-dom'
import type { LoaderFunctionArgs } from 'react-router-dom'
import { useEffect, useRef } from 'react'
import { createContact, getContacts } from '../http'
import type { Contact } from '../http'
import { LoaderType } from '../types'

import { useStore } from 'store/store'

import type { QueryClientType } from '@mfe-archi-poc/query'
import { useQuery } from '@mfe-archi-poc/query'

const contactListQuery = (q: string | null) => ({
  queryKey: ['contacts', 'list', q],
  queryFn: async () => getContacts(q),
  staleTime: 30 * 1000,
})

export const loader =
  (queryClient: QueryClientType) =>
  async ({ request }: LoaderFunctionArgs) => {
    const url = new URL(request.url)
    const q = url.searchParams.get('q') ?? ''
    const query = contactListQuery(q)
    const contacts = await queryClient.fetchQuery<Contact[]>(query)
    return { contacts, q }
  }

export const action =
  (queryClient: QueryClientType) =>
  async ({}) => {
    const contact = await createContact()
    await queryClient.invalidateQueries(['contacts'])
    return redirect(`/contacts/${contact.id}/edit`)
  }

function useInputSync(ref: React.RefObject<HTMLInputElement>, value: string) {
  useEffect(() => {
    if (ref.current) {
      ref.current.value = value
    }
  }, [value])
}

export default function Root() {
  const initialData = useLoaderData() as LoaderType<typeof loader>
  const { data: contacts } = useQuery({
    ...contactListQuery(initialData.q as string),
    initialData: initialData.contacts,
  })
  const inputRef = useRef<HTMLInputElement>(null)
  const navigation = useNavigation()
  const submit = useSubmit()
  useInputSync(inputRef, initialData.q ?? '')
  const { count, increment } = useStore()
  const searching = navigation.location && new URLSearchParams(navigation.location.search).has('q')

  return (
    <>
      <div id='sidebar'>
        <h1>React Router Contacts</h1>
        <div>
          <Form id='search-form' role='search'>
            <input
              ref={inputRef}
              id='q'
              aria-label='Search contacts'
              placeholder='Search'
              type='search'
              name='q'
              className={searching ? 'loading' : ''}
              defaultValue={initialData.q ?? ''}
              onChange={(event) => {
                const isFirstSearch = initialData.q == null
                submit(event.currentTarget.form, {
                  replace: !isFirstSearch,
                })
              }}
            />
            <div id='search-spinner' aria-hidden hidden={true} />
            <div className='sr-only' aria-live='polite'></div>
          </Form>
          <Form method='post'>
            <button type='submit'>New</button>
          </Form>
        </div>
        <nav>
          {contacts.length ? (
            <ul>
              {contacts.map((contact) => (
                <li key={contact.id}>
                  <NavLink
                    to={`contacts/${contact.id}`}
                    className={({ isActive, isPending }) => (isActive ? 'active' : isPending ? 'pending' : '')}
                  >
                    {contact.first || contact.last ? (
                      <>
                        {contact.first} {contact.last}
                      </>
                    ) : (
                      <i>No Name</i>
                    )}{' '}
                    {contact.favorite && <span>★</span>}
                  </NavLink>
                </li>
              ))}
            </ul>
          ) : (
            <p>
              <i>No contacts</i>
            </p>
          )}
          <p>count {count}</p>
          <button onClick={increment}>increment</button>
        </nav>
      </div>
      <div id='detail' className={navigation.state === 'loading' ? 'loading' : ''}>
        <Outlet />
      </div>
    </>
  )
}
