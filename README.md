<p align="center">
    <img src="./public/assets/icons/cat.svg" width="80px">
</p>
<h1 align="center"> NYA STORE </h1>

<p align="center">
🐱 E-commerce built with Next.js, Redux Toolkit, Prisma and PostgreSQL 🛒
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

## 💾 Installation & Setup

```sh
# 📥 Clone the repository
git clone https://github.com/nady4/nya-store.git

# 📂 Move to the project folder
cd nya-store

# 📦 Install dependencies
npm install

# 🛠️ Create .env file
cat <<EOF > .env
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="yourSecret"
DATABASE_URL="postgresql://postgres:password@localhost:5432/nya-store"
EOF

# 🚀 Run the app
npm run dev
```

<br>

## Environment Variables 🔐️

The following environment variables are used in this code:

- `NEXTAUTH_URL` : The base URL of your application, used by NextAuth.js to generate callback URLs.
- `NEXTAUTH_SECRET` : A secret string used to encrypt session tokens and other sensitive data in NextAuth.js.
- `DATABASE_URL` : The connection string for your database.

<br>

## 🚀 Tech Stack

| Technology    | Version  |
| ------------- | -------- |
| Next.js       | 15.2.1   |
| React         | ^19.0.0  |
| TypeScript    | ^5       |
| Prisma ORM    | ^6.5.0   |
| Redux Toolkit | ^2.6.1   |
| NextAuth.js   | ^4.24.11 |
| Sass          | ^1.85.1  |

<br>

## 💾 Database

<p align="center">
    <a href="https://dbdiagram.io/d/nya-store-666152b99713410b05e47081">
        <img src="./public/assets/docs/erd.png" width="100%">
    </a>
</p>

### `User`

| Column     | Type     | Restrictions                                 |
| ---------- | -------- | -------------------------------------------- |
| id         | STRING   | PRIMARY KEY 🔑                               |
| addressId  | STRING   | FK 🔑 → Address(id)                          |
| orderId    | STRING   | FK 🔑 → Order(id)                            |
| wishlistId | STRING   | FK 🔑 → Wishlist(id)                         |
| username   | STRING   | NOT NULL, UNIQUE                             |
| email      | STRING   | NOT NULL, UNIQUE                             |
| password   | STRING   | NOT NULL                                     |
| createdAt  | DATETIME | DEFAULT CURRENT_TIMESTAMP                    |
| updatedAt  | DATETIME | ON UPDATE CURRENT_TIMESTAMP                  |

<br>

### `Address`

| Column      | Type     | Restrictions                                |
| ----------- | -------- | ------------------------------------------- |
| id          | STRING   | PRIMARY KEY 🔑                              |
| userId      | STRING   | FK 🔑 → User(id)                            |
| shipmentId  | STRING   | FK 🔑 → Shipment(id)                        |
| street      | STRING   | NOT NULL                                    |
| city        | STRING   | NOT NULL                                    |
| state       | STRING   |                                             |
| zipCode     | STRING   |                                             |

<br>

### `Shipment`

| Column         | Type     | Restrictions                                |
| -------------- | -------- | ------------------------------------------- |
| id             | STRING   | PRIMARY KEY 🔑                              |
| orderId        | STRING   | FK 🔑 → Order(id)                           |
| addressId      | STRING   | FK 🔑 → Address(id)                         |
| trackingNumber | STRING   | UNIQUE                                      |
| shipmentStatus | STRING   | NOT NULL                                    |
| shippedDate    | DATETIME |                                             |
| deliveryDate   | DATETIME |                                             |

<br>

### `Order`

| Column       | Type     | Restrictions                                |
| ------------ | -------- | ------------------------------------------- |
| id           | STRING   | PRIMARY KEY 🔑                              |
| orderItemId  | STRING   | FK 🔑 → OrderItem(id)                       |
| userId       | STRING   | FK 🔑 → User(id)                            |
| status       | STRING   | NOT NULL                                    |
| createdAt    | DATETIME | DEFAULT CURRENT_TIMESTAMP                   |
| updatedAt    | DATETIME | ON UPDATE CURRENT_TIMESTAMP                 |

<br>

### `OrderItem`

| Column                | Type     | Restrictions                                |
| --------------------- | -------- | ------------------------------------------- |
| id                    | STRING   | PRIMARY KEY 🔑                              |
| userId                | STRING   | FK 🔑 → User(id)                            |
| productId             | STRING   | FK 🔑 → Product(id)                         |
| cardId                | STRING   | FK 🔑 → Card(id)                            |
| size                  | STRING   |                                             |
| quantity              | INTEGER  | NOT NULL                                    |
| cost                  | FLOAT    |                                             |
| price                 | FLOAT    | NOT NULL                                    |
| paymentMethodDiscount | FLOAT    |                                             |
| quantityDiscount      | FLOAT    |                                             |
| total                 | FLOAT    | NOT NULL                                    |

<br>

### `Product`

| Column     | Type     | Restrictions                                |
| ---------- | -------- | ------------------------------------------- |
| id         | STRING   | PRIMARY KEY 🔑                              |
| cartItemId | STRING   | FK 🔑 → OrderItem(id)                       |
| wishlistId | STRING   | FK 🔑 → Wishlist(id)                        |
| name       | STRING   | NOT NULL                                    |
| photo      | STRING   |                                             |
| price      | FLOAT    | NOT NULL                                    |

<br>

### `Wishlist`

| Column    | Type     | Restrictions                                |
| --------- | -------- | ------------------------------------------- |
| id        | STRING   | PRIMARY KEY 🔑                              |
| productId | STRING   | FK 🔑 → Product(id)                         |
| userId    | STRING   | FK 🔑 → User(id)                            |
| name      | STRING   | NOT NULL                                    |
| photo     | STRING   |                                             |

<br>

### `Payment`

| Column        | Type     | Restrictions                                |
| ------------- | -------- | ------------------------------------------- |
| id            | STRING   | PRIMARY KEY 🔑                              |
| orderId       | STRING   | FK 🔑 → Order(id)                           |
| paymentMethod | STRING   | NOT NULL                                    |
| paymentDate   | DATETIME |                                             |
| paymentStatus | STRING   | NOT NULL                                    |

<br>

### `Card`

| Column     | Type     | Restrictions                                |
| ---------- | -------- | ------------------------------------------- |
| id         | STRING   | PRIMARY KEY 🔑                              |
| paymentId  | STRING   | FK 🔑 → Payment(id)                         |
| type       | STRING   | NOT NULL                                    |
| name       | STRING   | NOT NULL                                    |
| numbers    | STRING   | NOT NULL, UNIQUE                            |
| expiryDate | DATETIME | NOT NULL                                    |
| ccv        | STRING   | NOT NULL                                    |

<br>

## 📬 Contact

- 💌 Email: **dev@nady4.com.com**
- 💼 LinkedIn: [/nady4](https://www.linkedin.com/in/nady4)
- 👩🏻‍💻 GitHub: [@nady4](https://github.com/nady4)
