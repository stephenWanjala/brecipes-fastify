# BRecipes

An API providing paginated holiday food recipes scraped from [BBC Food](https://www.bbc.co.uk/food). Recipes can be searched by cuisine or title.

## Features

*   **Comprehensive Recipe Data**: Access a wide range of holiday food recipes.
*   **Search Functionality**: Easily find recipes by cuisine or title.
*   **Pagination**: Efficiently browse through large sets of recipes.
*   **User Authentication**: Secure access with JWT-based authentication.
*   **API Key Support**: Alternative authentication method for seamless integration.
*   **Role-Based Access Control**: Differentiate user privileges with `USER` and `ADMIN` roles.
*   **Rate Limiting**: Prevent abuse and ensure fair usage on recipe endpoints.
*   **Robust Data Storage**: Powered by PostgreSQL database with Prisma ORM.

## Technologies Used

*   **Backend**:
    *   [Fastify](https://www.fastify.dev/): A fast and low-overhead web framework for Node.js.
    *   [Prisma](https://www.prisma.io/): Next-generation ORM for Node.js and TypeScript.
    *   [PostgreSQL](https://www.postgresql.org/): Powerful, open-source relational database.
    *   [JWT](https://jwt.io/): JSON Web Tokens for secure authentication.
*   **Monorepo Tool**:
    *   [Turborepo](https://turbo.build/repo): High-performance build system for JavaScript and TypeScript monorepos.
*   **API Documentation**:
    *   [Next.js](https://nextjs.org/): React framework for API documentation.
*   **Language**:
    *   [TypeScript](https://www.typescriptlang.org/): Strongly typed superset of JavaScript.

## Getting Started

### Using this example

To get started with this project, run the following command:

```sh
npx create-turbo@latest
```

### What's inside?

This Turborepo includes the following packages/apps:

*   `web`: The API Documentation [Next.js](https://nextjs.org/) app.
*   `api`: The [Fastify](https://fastify.dev/) backend API Service for The BRecipes API.

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

### Build

To build all apps and packages, navigate to the `brecipes-fastify` directory and run:

```sh
cd brecipes-fastify
npm run build
```

### Develop

To develop all apps and packages, navigate to the `brecipes-fastify` directory and run:

```sh
cd brecipes-fastify
npm run dev
```

### Remote Caching

> [!TIP]
> Vercel Remote Cache is free for all plans. Get started today at [vercel.com](https://vercel.com/signup?/signup?utm_source=remote-cache-sdk&utm_campaign=free_remote_cache).

Turborepo can use a technique known as [Remote Caching](https://turborepo.com/docs/core-concepts/remote-caching) to share cache artifacts across machines, enabling you to share build caches with your team and CI/CD pipelines.

By default, Turborepo will cache locally. To enable Remote Caching, you will need an account with Vercel. If you don't have an account, you can [create one](https://vercel.com/signup?utm_source=turborepo-examples), then enter the following commands from the root of your monorepo:

```sh
cd brecipes-fastify
npx turbo login
```

This will authenticate the Turborepo CLI with your [Vercel account](https://vercel.com/docs/concepts/personal-accounts/overview).

Next, you can link your Turborepo to your Remote Cache by running the following command from the root of your Turborepo:

```sh
npx turbo link
```

## API Endpoints

(This section would typically detail the API endpoints, their methods, request/response formats, and required authentication. Example below)

### Recipes

*   `GET /api/recipes`: Get all recipes (paginated).
*   `GET /api/recipes/search?title=<query>`: Search recipes by title.
*   `GET /api/recipes/search?cuisine=<query>`: Search recipes by cuisine.

### Authentication

*   `POST /api/auth/register`: Register a new user.
*   `POST /api/auth/login`: Log in a user and receive a JWT.
*   `POST /api/auth/apikey`: Generate an API key.

## Useful Links

Learn more about the power of Turborepo:

*   [Tasks](https://turborepo.com/docs/crafting-your-repository/running-tasks)
*   [Caching](https://turborepo.com/docs/crafting-your-repository/caching)
*   [Remote Caching](https://turborepo.com/docs/core-concepts/remote-caching)
*   [Filtering](https://turborepo.com/docs/crafting-your-repository/running-tasks#using-filters)
*   [Configuration Options](https://turborepo.com/docs/reference/configuration)
*   [CLI Usage](https://turborepo.com/docs/reference/command-line-reference)