import { DefaultBodyType, MockedRequest, RestHandler, rest } from 'msw'

type AuthMocksKeys = 'signInSuccess' | 'signInFailure' | 'signUpSuccess' | 'signUpFailure'

type MockRestFn = RestHandler<MockedRequest<DefaultBodyType>>

export const authMocks: Record<AuthMocksKeys, MockRestFn> = {
  signInSuccess: rest.post('http://localhost:3002/signin', (req, res, ctx) => {
    return res(
      ctx.json({
        email: 'n.toulemont@gmail.com',
        password: 'password',
        roles: [
          { accountId: 1, type: 'employee' },
          { accountId: 1, type: 'admin' },
        ],
      })
    )
  }),
  signInFailure: rest.post('http://localhost:3002/signin', (req, res, ctx) => {
    return res(ctx.status(401), ctx.json({ message: 'Invalid email or password' }))
  }),
  signUpSuccess: rest.post('http://localhost:3002/signup', (req, res, ctx) => {
    return res(
      ctx.json({
        email: 'n.toulemont@gmail.com',
        password: 'password',
        roles: [
          { accountId: 1, type: 'employee' },
          { accountId: 1, type: 'admin' },
        ],
      })
    )
  }),
  signUpFailure: rest.post('http://localhost:3002/signup', (req, res, ctx) => {
    return res(ctx.status(401), ctx.json({ message: 'Invalid email or password' }))
  }),
}
