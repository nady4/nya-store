<p align="center">
  <img src="./public/assets/icons/cat.svg" width="80px">
</p>
<h1 align="center">NYA STORE</h1>

<p align="center">
  🐱 Full Stack e-commerce platform using Next.js 15 (App Router), TypeScript, Prisma ORM, PostgreSQL, Redux Toolkit, and a complete Mercado Pago payment integration (checkout + redirect flows + webhooks). It handles authentication with NextAuth.js + JWT sessions. 🛍️
</p>

<p align="center">
  <img src="./public/assets/docs/1.png" width="100%">
  <img src="./public/assets/docs/2.png" width="49%">
  <img src="./public/assets/docs/3.png" width="49%">
  <img src="./public/assets/docs/4.png" width="100%">
  <img src="./public/assets/docs/5.png" width="49%">
  <img src="./public/assets/docs/6.png" width="49%">
</p>

<br>

## ✨ Features

- 🛍️ Product catalog with categories, stock and pricing.
- 🧺 Persistent shopping cart per user (PostgreSQL + Prisma).
- ❤️ User wishlist.
- 👤 Credential-based authentication (NextAuth.js, JWT sessions).
- 💳 Checkout with Mercado Pago (preferences, redirects, webhooks).
- 📦 Orders with items, quantities and totals + order history.
- 📱 Fully responsive UI with custom pixel-art / neon theme (Sass).

<br>

## 💾 Installation

Prerequisites:

- Node.js 18+
- PostgreSQL (local or remote)

Steps:

1. Clone the repository

   `git clone https://github.com/nady4/nya-store.git`

   `cd nya-store`

2. Install dependencies

   `npm install`

3. Create a `.env` file

   - `NEXTAUTH_URL`="http://localhost:3000"

   - `NEXTAUTH_SECRET`="yourSecret"

   - `DATABASE_URL`="postgresql://postgres:password@localhost:5432/nya-store"

   - `MP_ACCESS_TOKEN`="TEST-XXXXXXXXXXXXXXXXXXXXXXXXXXXX"

   - `NEXT_PUBLIC_MP_PUBLIC_KEY`="TEST-XXXXXXXXXXXXXXXXXXXXXXXXXXXX"

4. Run Prisma migrations

   `npx prisma migrate dev --name init`

5. (Optional) Seed example products

   `npx prisma db seed`

6. Start development server

   `npm run dev`

The app will be available at: `http://localhost:3000` 🐱

<br>

## 🔐 Environment Variables

Used in the project:

- `NEXTAUTH_URL`  
  Base URL for the app. Required by NextAuth and also reused for Mercado Pago `back_urls` and `notification_url`.

- `NEXTAUTH_SECRET`  
  Secret used to sign/encrypt NextAuth JWT sessions. Must be long and random.

- `DATABASE_URL`  
  PostgreSQL connection string, e.g.:

  `postgresql://postgres:password@localhost:5432/nya-store`

- `MP_ACCESS_TOKEN`  
  Mercado Pago **seller** access token.  
  In development always use a **TEST-...** token from a test seller account.

- `NEXT_PUBLIC_MP_PUBLIC_KEY`  
  Public key for Mercado Pago (test key in dev).  
  Prefixed with `NEXT_PUBLIC_`, so it’s exposed to the client and used in `initMercadoPago`.

In production, configure the same variable names on Vercel (or your provider), using your desired live/sandbox credentials.

<br>

## 🚀 Tech Stack

| Technology       | Notes                               |
| ---------------- | ----------------------------------- |
| Next.js          | 15.x (App Router)                   |
| React            | 18+/19                              |
| TypeScript       | Fully typed components & actions    |
| Prisma ORM       | 7.x + migrations + seed             |
| PostgreSQL       | Relational DB                       |
| NextAuth.js      | Credentials provider + JWT sessions |
| Redux Toolkit    | UI state (filters, search, etc.)    |
| Sass (SCSS)      | Theming + responsive layout         |
| Mercado Pago SDK | `@mercadopago/sdk-react` (Wallet)   |

<br>

## 🧠 Data Model (Prisma)

ERD:

<p align="center">
  <a href="https://dbdiagram.io/d/nya-store-666152b99713410b05e47081">
    <img src="./public/assets/docs/erd.png" width="100%">
  </a>
</p>

### `User`

Represents the person registered in the store.

| Column    | Type       | Details                        |
| --------- | ---------- | ------------------------------ |
| id        | String     | Primary key (`uuid()`) 🗝️      |
| username  | String     | Required                       |
| email     | String     | Required, unique               |
| password  | String     | Hashed password                |
| addressId | String?    | Unique FK → `Address.id` (1:1) |
| createdAt | DateTime   | `now()`                        |
| updatedAt | DateTime   | `@updatedAt`                   |
| address   | Address?   | Relation                       |
| orders    | Order[]    | User orders                    |
| wishlist  | WishList[] | Wishlist items                 |
| cart      | Cart[]     | Cart items                     |

<br>

### `Address`

Unique address per user.

| Column     | Type   | Details                   |
| ---------- | ------ | ------------------------- |
| id         | String | Primary key (`uuid()`) 🗝️ |
| street     | String | Required                  |
| city       | String | Required                  |
| state      | String | Required                  |
| postalCode | String | Required                  |
| country    | String | Required                  |
| user       | User?  | Inverse relation          |

<br>

### `Product`

Sellable product.

| Column     | Type        | Details                       |
| ---------- | ----------- | ----------------------------- |
| id         | String      | Primary key (`cuid()`) 🗝️     |
| name       | String      | Required                      |
| photo      | String      | Image URL/path                |
| price      | Float       | Required                      |
| category   | String      | Used for filters              |
| stock      | Int         | Current stock                 |
| orderItems | OrderItem[] | Items referencing the product |
| wishLists  | WishList[]  | Wishlist records              |
| carts      | Cart[]      | Cart records                  |

<br>

### `WishList`

Many-to-many between `User` and `Product`.

| Column    | Type    | Details                   |
| --------- | ------- | ------------------------- |
| id        | String  | Primary key (`uuid()`) 🗝️ |
| userId    | String  | FK → `User.id`            |
| productId | String  | FK → `Product.id`         |
| user      | User    | Relation                  |
| product   | Product | Relation                  |

Constraint:

- `@@unique([userId, productId])`

<br>

### `Cart`

Persistent cart.

| Column    | Type    | Details                   |
| --------- | ------- | ------------------------- |
| id        | String  | Primary key (`uuid()`) 🗝️ |
| userId    | String  | FK → User                 |
| productId | String  | FK → Product              |
| quantity  | Int     | Default 1                 |
| user      | User    | Relation                  |
| product   | Product | Relation                  |

Constraint:

- `@@unique([userId, productId])`

<br>

### `Order`

Purchase order generated during checkout.

| Column     | Type        | Details                                       |
| ---------- | ----------- | --------------------------------------------- |
| id         | String      | Primary key (`uuid()`) 🗝️                     |
| userId     | String      | FK → User                                     |
| status     | String      | `"pending"`, `"approved"`, `"rejected"`, etc. |
| total      | Float       | Order total                                   |
| createdAt  | DateTime    | `now()`                                       |
| updatedAt  | DateTime    | Updated automatically                         |
| user       | User        | Relation                                      |
| orderItems | OrderItem[] | Items in the order                            |

<br>

### `OrderItem`

Line item inside an order.

| Column    | Type    | Details                   |
| --------- | ------- | ------------------------- |
| id        | String  | Primary key (`uuid()`) 🗝️ |
| orderId   | String  | FK → Order                |
| productId | String  | FK → Product              |
| quantity  | Int     | Required                  |
| order     | Order   | Relation                  |
| product   | Product | Relation                  |

<br>

## 💳 Mercado Pago Integration (Overview)

- When the user confirms the cart, `/api/orders`:

  - Creates an `Order` with `pending` status.
  - Creates a Mercado Pago Preference.
  - Sends `back_urls`, `notification_url`, `external_reference`.

- Frontend initializes the `Wallet` using `NEXT_PUBLIC_MP_PUBLIC_KEY` and the returned `preferenceId`.

- Mercado Pago:
  - Redirects the user to success/failure pages.
  - Calls `/api/mp-webhook` → updates `Order.status`.

In development, webhooks **require a public HTTPS URL** (e.g. Vercel deploy).

<br>

## 🧪 Development Tip

Use Mercado Pago test accounts and test cards to run the entire flow safely.

<br>

## 📬 Contact

### 💌 Email: **dev@nady4.com**
### 💼 LinkedIn: [nady4](https://www.linkedin.com/in/nady4)
### 👩🏻‍💻 GitHub: [@nady4](https://github.com/nady4)
