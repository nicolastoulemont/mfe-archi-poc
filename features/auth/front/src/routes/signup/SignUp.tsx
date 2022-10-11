import { Form, ActionFunctionArgs, redirect } from 'react-router-dom'

import { signUp } from './SignUp.http'

import type { QueryClientType } from '@mfe-archi-poc/query'

import { IAccountByIdBody } from '../../../../api/src'

export const action =
  (queryClient: QueryClientType) =>
  async ({ request }: ActionFunctionArgs) => {
    const formData = await request.formData()
    const credentials = Object.fromEntries(formData) as IAccountByIdBody & { role: string }
    await signUp(credentials)
    await queryClient.invalidateQueries(['account'])
    return redirect('/signin')
  }

export function SignUp() {
  return (
    <Form method='post' id='signup-form'>
      <div>
        <h2>Credentials</h2>
        <div style={{ display: 'block' }}>
          <label htmlFor='email'>Email</label>
          <input placeholder='Email' aria-label='Email' type='text' name='email' id='email' />
        </div>
        <div>
          <label htmlFor='password'>Password</label>
          <input placeholder='Password' aria-label='Password' type='password' name='password' id='password' />
        </div>
      </div>
      <div>
        <label htmlFor='role'>Choose a role</label>
        <select name='role' id='role'>
          <option value='employee'>employee</option>
          <option value='admin'>Admin</option>
        </select>
      </div>
      <button type='submit'>Sign up</button>
    </Form>
  )
}
