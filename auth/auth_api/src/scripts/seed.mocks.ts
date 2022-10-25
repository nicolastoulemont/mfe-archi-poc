import * as accountSchemas from '../modules/account/account.schema'
import * as accountRouteConfigs from '../modules/account/account.route.config'
import fs from 'fs/promises'

// "Schema#/properties/updateAccountByIdInputSchema" -> updateAccountByIdInputSchema
function getSchemaName(schemaRefString: string) {
  const [_, __, schemaName] = schemaRefString.replace(/['"]+/g, '').split('/')
  return schemaName
}

type RouteConfig = {
    path: string
    body?: string | undefined
    params?: string | undefined
    response?: Array<Record<number, string>>
  }

function getRoutesConfigMap(routeSchemas: any) {
  const routesConfigMap = []
  for (const routeSchema in routeSchemas) {
    // @ts-ignore
    const {
      path,
      options: { schema },
    }: { path: string; options: { schema: Record<any, any> } } = routeSchemas[routeSchema]
    let config: RouteConfig = { path }

    if (schema.body) {
      config['body'] = getSchemaName(JSON.stringify(schema.body['$ref']))
    }
    if (schema.params) {
      config['params'] = getSchemaName(JSON.stringify(schema.params['$ref']))
    }

    if (schema.response) {
      const responseSchemas = []
      for (const status in schema.response) {
        // @ts-ignore
        responseSchemas.push({ [status]: getSchemaName(schema.response[status]['$ref']) })
      }
      config['response'] = responseSchemas
    }

    routesConfigMap.push(config)
  }

  return routesConfigMap 
}

async function seedMocks() {
  console.log(accountSchemas)
  const routesSchemaNamesMap = getRoutesConfigMap(accountRouteConfigs)

  await fs.writeFile(
    './mocks.ts',
    `
  import { DefaultBodyType, MockedRequest, RestHandler, rest } from 'msw'
    

    export const authMocks = {
        ${routesSchemaNamesMap.map(())}
    }
  `
  )
}

seedMocks()
