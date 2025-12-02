<p align="center">
  <img src="./public/assets/icons/cat.svg" width="80px">
</p>
<h1 align="center">NYA STORE</h1>

<p align="center">
  🐾 Neon cyber-cat e-commerce built with Next.js, Prisma, Redux Toolkit and PostgreSQL 🐾
</p>

<p align="center">
  <img src="./public/assets/docs/desktop_home_1.png" width="100%">
  <img src="./public/assets/docs/mobile_product_1.png" width="49%">
  <img src="./public/assets/docs/mobile_product_2.png" width="49%">
  <img src="./public/assets/docs/desktop_product_1.png" width="100%">
  <img src="./public/assets/docs/mobile_register_1.png" width="49%">
  <img src="./public/assets/docs/mobile_signin_1.png" width="49%">
</p>

<br>

## ✨ Features

- 🛍️ Product catalog with categories, stock management and prices.
- 🧺 Persistent shopping cart per user (PostgreSQL + Prisma).
- ❤️ Wishlist per user.
- 👤 Authentication with credentials (NextAuth.js, JWT sessions).
- 💳 Checkout with Mercado Pago (preferences + redirects + webhooks).
- 📦 Orders with items, quantities and total, plus order history.
- 📱 Fully responsive UI with custom pixel-art / neon aesthetics (Sass).

<br>

## 💾 Installation

Prerequisites:

- Node.js 18+
- PostgreSQL running locally (or a remote instance)

Steps:

1. Clonar el repositorio

   git clone https://github.com/nady4/nya-store.git
   cd nya-store

2. Instalar dependencias

   npm install

3. Crear archivo `.env` (local)

   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="yourSecret" # genera algo largo y random
   DATABASE_URL="postgresql://postgres:password@localhost:5432/nya-store"
   MP_ACCESS_TOKEN="TEST-XXXXXXXXXXXXXXXXXXXXXXXXXXXX"
   NEXT_PUBLIC_MP_PUBLIC_KEY="TEST-XXXXXXXXXXXXXXXXXXXXXXXXXXXX"

4. Ejecutar migraciones de Prisma

   npx prisma migrate dev --name init

5. (Opcional) Poblar la base de datos con productos de ejemplo

   npx prisma db seed

6. Levantar la app en modo desarrollo

   npm run dev

La app estará disponible en: http://localhost:3000 🐱

<br>

## 🔐 Environment Variables

Usadas actualmente por el proyecto:

- `NEXTAUTH_URL`  
  URL base de la aplicación (ej: `http://localhost:3000` en dev, `https://tu-dominio` en producción).  
  La usa NextAuth y también se reutiliza para `back_urls` y `notification_url` de Mercado Pago.

- `NEXTAUTH_SECRET`  
  Clave secreta para firmar/encriptar tokens de sesión de NextAuth. Debe ser una string larga y aleatoria.

- `DATABASE_URL`  
  Connection string de PostgreSQL. Ejemplo local:

  `postgresql://postgres:password@localhost:5432/nya-store`

- `MP_ACCESS_TOKEN`  
  Access token del vendedor en Mercado Pago.  
  En desarrollo: usar SIEMPRE el token de prueba (`TEST-...`) de una cuenta vendedor de prueba.

- `NEXT_PUBLIC_MP_PUBLIC_KEY`  
  Public key de Mercado Pago (también en modo prueba en desarrollo).  
  Al llevar el prefijo `NEXT_PUBLIC_`, se expone en el cliente y se usa para `initMercadoPago`.

En producción debés configurar los mismos nombres de variables en tu proveedor (Vercel, etc.) usando las credenciales de producción o de sandbox que quieras.

<br>

## 🚀 Tech Stack

| Technology       | Notes                                     |
| ---------------- | ----------------------------------------- |
| Next.js          | 15.x (App Router)                         |
| React            | 18+/19                                    |
| TypeScript       | Full-typed components & actions           |
| Prisma ORM       | 7.x + `prisma migrate` / `prisma db seed` |
| PostgreSQL       | Relational database                       |
| NextAuth.js      | Credentials provider + JWT sessions       |
| Redux Toolkit    | UI state (filters, search, etc.)          |
| Sass (SCSS)      | Theming + responsive layout               |
| Mercado Pago SDK | `@mercadopago/sdk-react` (Wallet)         |

<br>

## 🧠 Data Model (Prisma)

Diagrama (ERD):

<p align="center">
  <a href="https://dbdiagram.io/d/nya-store-666152b99713410b05e47081">
    <img src="./public/assets/docs/erd.png" width="100%">
  </a>
</p>

### `User`

Representa a la persona que se registra y compra en la tienda.

| Column    | Type       | Details                        |
| --------- | ---------- | ------------------------------ |
| id        | String     | Primary key (`uuid()`) 🗝️      |
| username  | String     | Required                       |
| email     | String     | Required, unique               |
| password  | String     | Hashed password                |
| addressId | String?    | Unique FK → `Address.id` (1:1) |
| createdAt | DateTime   | Default `now()`                |
| updatedAt | DateTime   | Auto `@updatedAt`              |
| address   | Address?   | Optional relation              |
| orders    | Order[]    | Orders made by the user        |
| wishlist  | WishList[] | Wishlist items                 |
| cart      | Cart[]     | Items currently in cart        |

<br>

### `Address`

Dirección única asociada a un usuario (envío/facturación simple).

| Column     | Type   | Details                   |
| ---------- | ------ | ------------------------- |
| id         | String | Primary key (`uuid()`) 🗝️ |
| street     | String | Required                  |
| city       | String | Required                  |
| state      | String | Required                  |
| postalCode | String | Required                  |
| country    | String | Required                  |
| user       | User?  | Optional inverse relation |

<br>

### `Product`

Producto vendible en la tienda.

| Column     | Type        | Details                        |
| ---------- | ----------- | ------------------------------ |
| id         | String      | Primary key (`cuid()`) 🗝️      |
| name       | String      | Required                       |
| photo      | String      | URL / path to image            |
| price      | Float       | Required                       |
| category   | String      | Required (used for filters)    |
| stock      | Int         | Required, stock actual         |
| orderItems | OrderItem[] | Items referencing this product |
| wishLists  | WishList[]  | Wishlist records               |
| carts      | Cart[]      | Cart records                   |

<br>

### `WishList`

Relación muchos-a-muchos entre `User` y `Product` para favoritos.

| Column    | Type    | Details                   |
| --------- | ------- | ------------------------- |
| id        | String  | Primary key (`uuid()`) 🗝️ |
| userId    | String  | FK → `User.id`            |
| productId | String  | FK → `Product.id`         |
| user      | User    | Relation                  |
| product   | Product | Relation                  |

Constraints:

- `@@unique([userId, productId])` → no se puede repetir el mismo producto en la wishlist del mismo user.

<br>

### `Cart`

Carrito persistente por usuario.

| Column    | Type    | Details                   |
| --------- | ------- | ------------------------- |
| id        | String  | Primary key (`uuid()`) 🗝️ |
| userId    | String  | FK → `User.id`            |
| productId | String  | FK → `Product.id`         |
| quantity  | Int     | Default `1`               |
| user      | User    | Relation                  |
| product   | Product | Relation                  |

Constraints:

- `@@unique([userId, productId])` → un ítem por producto + usuario.

<br>

### `Order`

Orden de compra asociada a un usuario, generada al crear una preferencia de pago.

| Column     | Type        | Details                                                      |
| ---------- | ----------- | ------------------------------------------------------------ |
| id         | String      | Primary key (`uuid()`) 🗝️                                    |
| userId     | String      | FK → `User.id`                                               |
| status     | String      | `"pending"`, `"approved"`, `"rejected"`, `"cancelled"`, etc. |
| total      | Float       | Importe total de la orden                                    |
| createdAt  | DateTime    | Default `now()`                                              |
| updatedAt  | DateTime    | `@updatedAt`                                                 |
| user       | User        | Relation                                                     |
| orderItems | OrderItem[] | Items que componen la orden                                  |

<br>

### `OrderItem`

Línea dentro de una `Order`.

| Column    | Type    | Details                   |
| --------- | ------- | ------------------------- |
| id        | String  | Primary key (`uuid()`) 🗝️ |
| orderId   | String  | FK → `Order.id`           |
| productId | String  | FK → `Product.id`         |
| quantity  | Int     | Required                  |
| order     | Order   | Relation                  |
| product   | Product | Relation                  |

<br>

## 💳 Mercado Pago Integration (overview)

- Cuando el usuario confirma el carrito, se llama a `/api/orders`:

  - Se crea una `Order` en la DB con `status = "pending"` y los `OrderItem`.
  - Se crea una Preferencia en Mercado Pago usando `MP_ACCESS_TOKEN`.
  - Se envía:
    - `back_urls` → `/success`, `/failure`, `/pending`.
    - `notification_url` → `/api/mp-webhook`.
    - `external_reference = order.id`.

- El frontend inicializa el `Wallet` con `NEXT_PUBLIC_MP_PUBLIC_KEY` y el `preferenceId` devuelto.

- Mercado Pago:
  - Redirige al usuario a la URL de éxito o error.
  - Llama al webhook `/api/mp-webhook`, donde se consulta el pago y se actualiza `Order.status`.

En desarrollo, el flujo completo solo se puede testear contra una URL pública HTTPS (por ejemplo un deploy en Vercel) porque Mercado Pago no puede acceder a `localhost`.

<br>

## 🧪 Development Tip

- Usar cuentas de prueba de Mercado Pago (seller + buyer) y tarjetas de test para simular pagos sin dinero real.

<br>

## 📬 Contact

### 💌 Email: dev@nady4.com

### 💼 LinkedIn: <a href="https://www.linkedin.com/in/nady4">linkedin.com/in/nady4</a>

### 👩🏻‍💻 GitHub: <a href="https://github.com/nady4">github.com/nady4</a>
