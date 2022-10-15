import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom'
import Root, { loader as rootLoader, action as rootAction } from './routes/root'
import Index from './routes/index'
import ErrorPage from './error-page'
import { queryClient } from '@poc/query'
import { contactRoute, editRoute, destroyRoute } from 'contactapp'
import { signInRoute, signUpRoute } from 'auth_front'

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
      <Route path={signInRoute.path} action={signInRoute.action} element={signInRoute.element} />
      <Route path={signUpRoute.path} action={signUpRoute.action} element={signUpRoute.element} />
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
