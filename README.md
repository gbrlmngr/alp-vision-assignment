
## Technology stack

- **Git** for version management
- **Nx** as the build system powering the project's **monorepo**
- **Husky**, **Lint Staged**, **ESLint**, **Prettier**, and **Commitlint** for the code quality pipeline
- **TypeScript** for strong type safety
- **TypeORM** for improved and safe database interactions
- **React I18n** for internationalization
- **Jest**, **supertest**, and **React Testing Library** for unit and integration testing
- **Joi** and **Zod** for configuration and data validations


## Running the application

1. Unpack the application archive
2. Change directory into the application directory
3. Run `docker compose up`
4. Once the containers are up, navigate to `http://localhost:8080`


## Troubleshooting

### Application not starting

Ensure that the `.env.postgres.production.local` and `.env.app.production.local` environment variable files exist inside the application directory

### Seeing outdated versions of the application or other applications on the same port

Ensure that you have cleared all caches that might interact with the application (Docker image caches, browser caches etc.)


## Questions

### Why is this project a monorepo?

There are two main reasons for which I opted for the monorepo set-up for this project: 1) it is easier to bundle the entire codebase in an archive while maintaining clear domain logic internally (through the workspaces feature of `npm`) and 2) it is easier to bundle common application logic together instead of duplicating it across application boundaries (e.g. both the API and the UI are using the validation schemas from `packages/shared/` package).


## Ending notes

It was fun building this project! Even though the core functionality of the application is simple and straightforward, the supporting pieces can extend to accommodate multiple scenarios and edge cases.
