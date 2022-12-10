import { Form, Link, redirect, useActionData } from 'react-router-dom'
import type { ActionFunctionArgs } from 'react-router-dom'
import { signIn } from './SignIn.http'
import type { QueryClientType } from '@poc/query'
import type { Account, Role } from '@poc/auth_database'
import '../../tailwind.css'
type AccountWithRole = Account & {
  roles: Role[]
}

export type IAccountByIdBody = Omit<Account, 'id'>

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
    <div className='w-full h-screen flex items-center justify-center bg-gray-100'>
      <Form method='post' id='signin-form' className='bg-white rounded-lg p-12 space-y-5 w-[400px]'>
        <div className='space-y-3'>
          <h1 className='text-3xl font-medium text-center'>Sign In</h1>
          <div className='flex flex-col'>
            <label htmlFor='email'>Email</label>
            <input
              placeholder='Email'
              className='rounded-lg border-gray-300'
              required
              type='email'
              name='email'
              id='email'
            />
          </div>
          <div className='flex flex-col'>
            <label htmlFor='password'>Password</label>
            <input
              placeholder='Password'
              className='rounded-lg border-gray-300'
              required
              type='password'
              name='password'
              id='password'
            />
          </div>
        </div>
        <div className='w-full flex justify-between items-end'>
          <div className='flex flex-col space-y-2'>
            <p className='text-sm'> Don't have an account ?</p>
            <Link to='/signup' className='underline underline-offset-1 font-medium'>
              Sign Up
            </Link>
          </div>

          <button type='submit' className='px-4 py-2 h-fit bg-blue-500 rounded-lg text-white font-medium'>
            Sign in
          </button>
        </div>
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
    </div>
  )
}
