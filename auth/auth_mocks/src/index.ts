/**
 * This file is AUTO GENERATED by [msw-auto-mock](https://github.com/zoubingwu/msw-auto-mock)
 * Feel free to commit/edit it as you need.
 */
/* eslint-disable */
/* tslint:disable */
import { setupWorker, rest } from 'msw'
import { faker } from '@faker-js/faker'

faker.seed(1)

const baseURL = 'http://localhost:3002'
const MAX_ARRAY_LENGTH = 20

let i = 0
const next = () => {
  if (i === Number.MAX_SAFE_INTEGER - 1) {
    i = 0
  }
  return i++
}

export const handlers = [
  rest.post(`${baseURL}/api/v1/accounts/signin`, (req, res, ctx) => {
    const resultArray = [
      [
        ctx.status(200),
        ctx.json({
          id: faker.datatype.uuid(),
          email: faker.internet.email(),
          roles: [...new Array(faker.datatype.number({ max: MAX_ARRAY_LENGTH })).keys()].map((_) => ({
            id: faker.datatype.uuid(),
            createdAt: faker.date.past(),
            updatedAt: faker.date.past(),
            accountId: faker.datatype.uuid(),
            type: faker.lorem.slug(1),
          })),
        }),
      ],
      [
        ctx.status(401),
        ctx.json({
          message: faker.lorem.slug(1),
        }),
      ],
    ]

    return res(...resultArray[next() % resultArray.length])
  }),
  rest.post(`${baseURL}/api/v1/accounts/signup`, (req, res, ctx) => {
    const resultArray = [
      [
        ctx.status(201),
        ctx.json({
          success: faker.datatype.boolean(),
        }),
      ],
      [
        ctx.status(401),
        ctx.json({
          message: faker.lorem.slug(1),
        }),
      ],
    ]

    return res(...resultArray[next() % resultArray.length])
  }),
  rest.put(`${baseURL}/api/v1/accounts/:id`, (req, res, ctx) => {
    const resultArray = [
      [
        ctx.status(201),
        ctx.json({
          id: faker.datatype.uuid(),
          email: faker.internet.email(),
        }),
      ],
      [
        ctx.status(404),
        ctx.json({
          message: faker.lorem.slug(1),
        }),
      ],
    ]

    return res(...resultArray[next() % resultArray.length])
  }),
  rest.delete(`${baseURL}/api/v1/accounts/:id`, (req, res, ctx) => {
    const resultArray = [
      [
        ctx.status(200),
        ctx.json({
          success: faker.datatype.boolean(),
        }),
      ],
      [
        ctx.status(404),
        ctx.json({
          message: faker.lorem.slug(1),
        }),
      ],
    ]

    return res(...resultArray[next() % resultArray.length])
  }),
  rest.get(`${baseURL}/api/v1/accounts/:id`, (req, res, ctx) => {
    const resultArray = [
      [
        ctx.status(200),
        ctx.json({
          id: faker.datatype.uuid(),
          email: faker.internet.email(),
          roles: [...new Array(faker.datatype.number({ max: MAX_ARRAY_LENGTH })).keys()].map((_) => ({
            id: faker.datatype.uuid(),
            createdAt: faker.date.past(),
            updatedAt: faker.date.past(),
            accountId: faker.datatype.uuid(),
            type: faker.lorem.slug(1),
          })),
        }),
      ],
      [
        ctx.status(404),
        ctx.json({
          message: faker.lorem.slug(1),
        }),
      ],
    ]

    return res(...resultArray[next() % resultArray.length])
  }),
]

// This configures a Service Worker with the given request handlers.
export const startWorker = () => {
  if (typeof window === 'undefined') {
    const { setupServer } = require('msw/node')
    const server = setupServer(...handlers)
    server.listen()
  } else {
    const worker = setupWorker(...handlers)
    worker.start()
  }
}
