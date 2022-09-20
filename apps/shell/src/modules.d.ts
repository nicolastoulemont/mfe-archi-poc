declare module 'sort-by'
declare module 'contactapp' {
  import { RouteObject } from 'react-router-dom'
  const destroyRoute: RouteObject
  const contactRoute: RouteObject
  const editRoute: RouteObject
  export default [contactRoute, editRoute, destroyRoute]
}
