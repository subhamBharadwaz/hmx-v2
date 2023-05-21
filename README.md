# HMX-V2

An open source e-commerce jogger store built using the new Next.js 13 (app dir), server components and everything new in Next.js 13.

> **Warning**
> This app is a work in progress. I'm rebuilding my previous ui [HMX](https://github.com/subhamBharadwaz/hmx/tree/master/client)


## About this project

HMX-V2 is a delightful and blazing-fast project built using Next.js 13 and React Server Components. It showcases a modern and streamlined online jogger store user interface (UI). While this project may not be for a real-world application, it serves as a demonstration of the capabilities and performance of Next.js and React Server Components.

In addition to the user interface, HMX-V2 also includes an admin dashboard that enables store administrators to manage products, users, orders and perform various administrative tasks. The admin dashboard provides a comprehensive and user-friendly interface for efficiently managing the jogger store.

This project incorporates the latest features and enhancements introduced in Next.js 13, such as improved performance optimizations, enhanced developer experience, and advanced server-side rendering capabilities. The utilization of React Server Components further enhances the performance by allowing components to be rendered on the server, resulting in faster initial page loads and improved interactivity. With its robust features and high-performance architecture, HMX-V2 is suitable for production use in an online jogger store application

## Features

- New `/app` dir,
- Routing, Layouts, Nested Layouts and Layout Groups
- Data Fetching, Caching and Mutation using **React Query**
- Loading UI
- Simple State manage with **Zustand**
- Metadata files
- Server and Client Components
- Middleware for protecting pages
- Authentication using **NextAuth.js**
- Easy checkout process for hassle-free purchases using **Razorpay**
- External api calls
- UI Components built using [shadcn ui](https://ui.shadcn.com/)
- Styled using **Tailwind CSS**
- Validations using **React Hook Form** and  **Zod**
- Responsive layout for seamless browsing across different devices
- Admin dashboard 
- Written in **TypeScript**


## Running Locally

1. Install dependencies using pnpm:

```sh
npm install
```

2. Copy `.env.example` to `.env.local` and update the variables.

```sh
cp .env.example .env.local
```

3. Start the development server:

```sh
npm run dev
```

## License

Licensed under the [MIT license](https://github.com/subhamBharadwaz/hmx-v2/blob/main/LICENSE.md).

## Contributing

Contributions from the community are always welcome. If you have any ideas or suggestions, feel free to open an issue or submit a pull request. We value your input and appreciate your contribution to make HMX-V2 even better.
