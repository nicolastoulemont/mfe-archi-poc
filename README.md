# Federated modules POC

This proof of concept aims to try out how to organize a monorepo in order allow feature teams to iterate indenpendently on one or more products.

It aims to try out the following:

- [x] Split out the different domains within the product in separate and scoped workspaces with:
- [x] Micro-frontends to allow to teams to independly deploy their frontend.
- [x] Workspace scoped webservers
  - [x] Open-API compliant APIs to support contracts enforcing
  - [ ] Generated HTTP clients from the open-API schemas
  - [ ] Generated HTTP mock clients from the open-API schemas
- [x] Workspace scoped frontend development environment with storybook.
  - [x] storybook react-router setup
  - [x] storybook msw (http mocking) setup
- [x] Shared client global state store instance between the shells and sub-apps
- [x] Shared client http caching library instance between the shells and sub-apps
