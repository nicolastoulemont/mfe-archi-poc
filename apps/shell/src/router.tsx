import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom'
import { contactRoute, editRoute, destroyRoute, contactsRoute, contactsIndexRoute } from 'contact_front'
import { signInRoute, signUpRoute } from 'auth_front'

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/' element={<div> To impl redirection </div>} />
      <Route /** /signin */ {...signInRoute} />
      <Route /** /signup */ {...signUpRoute} />
      <Route /** /contacts */ {...contactsRoute}>
        <Route /** /contacts index */ {...contactsIndexRoute} />
        <Route /** /contacts/:id */ {...contactRoute} />
        <Route /** /contacts/:id/edit */ {...editRoute} />
        <Route /** /contacts/:id/destroy */ {...destroyRoute} />
      </Route>
    </>
  )
)
