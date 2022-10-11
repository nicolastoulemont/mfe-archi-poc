import { Form, Link, redirect, useActionData } from 'react-router-dom'
import type { ActionFunctionArgs } from 'react-router-dom'
import { signIn } from './SignIn.http'
import type { QueryClientType } from "@poc/query'
import { AccountWithRole, IAccountByIdBody } from '../../../../api/src'

export const action =
  (queryClient: QueryClientType) =>
  async ({ request }: ActionFunctionArgs) => {
    const formData = await request.formData()
    const credentials = Object.fromEntries(formData) as IAccountByIdBody

    const account = await signIn(credentials)
    await queryClient.invalidateQueries(['account', account.id])
    // Show roles list
    if (account?.roles?.length > 1) return account

    // Redirect to only role space
    return redirect(`/${account.roles[0].type}/${account.id}`)
  }

export function SignIn() {
  const actionData = useActionData() as AccountWithRole

  return (
    <Form method='post' id='signin-form'>
      <div>
        <h2>Credentials</h2>
        <div>
          <label htmlFor='email'>Email</label>
          <input placeholder='Email' aria-label='Email' type='text' name='email' id='email' />
        </div>
        <div>
          <label htmlFor='password'>Password</label>
          <input placeholder='Password' aria-label='Password' type='password' name='password' id='password' />
        </div>
      </div>
      <button type='submit'>Sign in</button>
      {actionData && (
        <div>
          <h3>Choose a role</h3>
          {actionData.roles.map((role) => (
            <p key={role.type}>
              <Link to={`/${role.type}/${actionData.id}`}>{role.type}</Link>
            </p>
          ))}
        </div>
      )}
    </Form>
  )
}
