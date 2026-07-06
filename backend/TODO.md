# Express-Backend TODO

## Step 1: Consolidate/namespace routes
- ✅ Namespace contacts endpoints under `/api/contacts/*` using `routes/web.js`.
- ✅ Namespace books endpoints under `/api/books/*` using `routes/book_routes.js`.
- ✅ Update `server.js` mounting paths accordingly.


## Step 2: Add basic request validation
- ✅ Add `400` handling for invalid/missing `id` in contact route.
- Keep existing `runValidators` behavior.


## Step 3: Request validation for books
- Pending: add `400` handling for invalid/missing `id` in `book_routes.js`.

## Step 4: Remove/avoid duplicate contact router confusion
- Ensure `api/contact api.js` is not mounted anywhere (or update it to match the canonical `/api/contacts` contract).

## Step 5: Quick smoke test
- Start backend and hit `/health`.
- Verify at least:
  - `POST /api/contacts/create`
  - `GET /api/contacts/all`
  - `POST /api/books/create-book`
  - `GET /api/books/book-list`

