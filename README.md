# Federated modules POC

This proof of concept combines is architected around dynamically loaded sub-apps represented as routes in a shell app.
It aims to test the following things in order to help large engineering teams split in feature teams to iterate safely, quickly and independently on a product:

- [x] how dynamically loaded routes can be added to the shell main router using the react-router v6.4 packages and features.
- [x] how to setup storybook development environment in the sub-apps to enable feature teams working on it independently from other teams:

  - [x] storybook reactreact setup
  - [x] storybook msw (http mocking layer)

- [x] how to share a client side http caching library instance between the shell and the sub-apps.
- [ ] how to share a global state management library between the shell and the sub-apps.
