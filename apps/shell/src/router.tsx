import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom'
import Root, { loader as rootLoader, action as rootAction } from './routes/root'
import Index from './routes/index'
import ErrorPage from './error-page'
import { queryClient } from "@poc/query'
import { contactRoute, editRoute, destroyRoute } from 'contactapp'

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path='/'
      loader={rootLoader(queryClient)}
      action={rootAction(queryClient)}
      element={<Root />}
      errorElement={<ErrorPage />}
    >
      <Route index element={<Index />} />
      <Route
        path={contactRoute.path}
        loader={contactRoute.loader}
        action={contactRoute.action}
        element={contactRoute.element}
        errorElement={contactRoute.errorElement}
      />
      <Route path={editRoute.path} loader={editRoute.loader} action={editRoute.action} element={editRoute.element} />
      <Route path={destroyRoute.path} action={destroyRoute.action} />
    </Route>
  )
)
