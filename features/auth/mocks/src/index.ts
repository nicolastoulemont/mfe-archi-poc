import { Account, Role } from '@poc/auth-database'
import { DefaultBodyType, MockedRequest, RestHandler, rest } from 'msw'

type AuthMocksKeys =
  | 'signInSuccess'
  | 'signInFailure'
  | 'signUpSuccess'
  | 'signUpFailure'
  | 'getAccountSuccess'
  | 'getAccountFailure'

type MockRestFn = RestHandler<MockedRequest<DefaultBodyType>>

type AccountWithRole = Account & {
  roles: Role[]
}

const account: AccountWithRole = {
  id: 'abcd',
  email: 'n.toulemont@gmail.com',
  password: 'password',
  roles: [
    { id: 'abc', createdAt: new Date(), updatedAt: new Date(), accountId: 'abcd', type: 'employee' },
    { id: 'abc', createdAt: new Date(), updatedAt: new Date(), accountId: 'abcd', type: 'admin' },
  ],
}

export const authMocks: Record<AuthMocksKeys, MockRestFn> = {
  signInSuccess: rest.post('http://localhost:3002/signin', (req, res, ctx) => {
    return res(ctx.json(account))
  }),
  signInFailure: rest.post('http://localhost:3002/signin', (req, res, ctx) => {
    return res(ctx.status(401), ctx.json({ message: 'Invalid email or password' }))
  }),
  signUpSuccess: rest.post('http://localhost:3002/signup', (req, res, ctx) => {
    return res(ctx.json(account))
  }),
  signUpFailure: rest.post('http://localhost:3002/signup', (req, res, ctx) => {
    return res(ctx.status(401), ctx.json({ message: 'Invalid email or password' }))
  }),
  getAccountSuccess: rest.get('http://localhost:3002/account/1', (req, res, ctx) => {
    return res(ctx.json(account))
  }),
  getAccountFailure: rest.get('http://localhost:3002/account/1', (req, res, ctx) => {
    return res(ctx.status(404), ctx.json({ message: 'Account not found' }))
  }),
}
