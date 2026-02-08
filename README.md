# FE Challenge

## Getting Started
```bash
npm install
```

Then open **two terminals** and run:
```bash
npm start          # API server (port 5001)
npm run dev        # Frontend dev server (port 5173)
```

## Implementation

**Stack:** Vite + React 18 + TypeScript + MUI + TanStack Virtual + TanStack Query + Axios

**What it does:** Two side-by-side virtualized infinite-scroll lists (Users + Reviewers) loading 10K+ items. Only ~10-15 DOM nodes rendered at any time. Debounced search, skeleton loading, error/empty states, responsive mobile tabs.

**Key decisions:**
- `keepPreviousData` — no UI flash during search
- `memo` on hot-path components — verified no unnecessary re-renders
- `display: none` for mobile tabs — preserves scroll position and cache
- json-server only supports exact, case-sensitive search — documented in code

**Debug mode:** Append `?debug` to the URL (`http://localhost:5000/?debug`) to show a floating panel with virtualization stats (DOM nodes, loaded/total items, visible range, fetch status).

---

## Original Challenge

### General
In this challenge you will create a React app with a virtualized infinite scroll list.

### Task
1. Clone the repo.
2. Create a React app with a build system of your choice (e.g. RSPack, Vite, Webpack, etc.).
3. Implement an infinite scroll (data is lazy loaded) virtualized list component that will load data from the server. You can use a library or create your own implementation.
4. Display a list of **users** using the list component. A user item should include all fields except for `id`.
5. Add a **search** input that will filter the list by `name` **or** by `email` using the API.
6. Add a second list of **reviewers** to the app reusing the code you've created for users. Both lists should appear side by side, have their own search box, and load data from their respective api endpoints.

## Finishing the challenge
1. Don't forget to push your changes to your repo.
2. Send us a link to your repo.

## Technical Info

#### How to start
1. Install the dependencies.
2. Run `npm start` to start the server on port `3001`.

#### API
* Users are available on `localhost:3001/users`
* Reviewers are available on `localhost:3001/reviewers`
* This mock API uses a basic [json-server](https://github.com/typicode/json-server#paginate)

#### Requirements
1. User friendly - empty state, loading state, error state, etc...
2. Visually appealing - use a design system of your choice (e.g. Material UI, Ant Design, etc.) or create your own
3. Smooth scrolling
4. Scalable (support extremely high amount of items)

#### Notes:
* Don't be shy about using AI, as long as you understand the code and can explain it.
* Feel free to use any libraries you find useful for state management, calling APIs, etc.

Good Luck!
