import { matchSorter } from 'match-sorter'
import sortBy from 'sort-by'
import { Contact } from './routes/contact'

const API_URL = 'http://localhost:3000'

export async function getContacts(query?: any) {
  const res = await fetch(`${API_URL}/contacts${query ? `?search=${query}` : ''}`)
  const contacts: Contact[] = await res.json()
  if (query) {
    return matchSorter(contacts, query, { keys: ['first', 'last'] })
  }
  return contacts.sort(sortBy('last', 'createdAt'))
}

export async function createContact() {
  const res = await fetch(`${API_URL}/contact`, { method: 'post' })
  const contact: Pick<Contact, 'id' | 'createdAt'> = await res.json()
  return contact
}

export async function getContact(id: string) {
  const res = await fetch(`${API_URL}/contact/${id}`)
  const contact: Contact = await res.json()
  return contact
}

export async function updateContact(id: string, updates: Partial<Contact>) {
  const res = await fetch(`${API_URL}/contact/${id}`, { method: 'put', body: JSON.stringify(updates) })
  const contact: Contact = await res.json()
  return contact
}

export async function deleteContact(id: string) {
  const res = await fetch(`${API_URL}/contact/${id}`, { method: 'delete' })
  const contact: Contact = await res.json()
  return contact
}
