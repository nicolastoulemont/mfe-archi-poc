import { Contact } from './routes/contact'

const API_URL = 'http://localhost:3000'

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
