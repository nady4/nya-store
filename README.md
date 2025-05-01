<p align="center">
    <img src="./public/assets/icons/cat.svg" height="50px">
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

## 🗄️ Database

<p align="center">
    <a href="https://dbdiagram.io/d/nya-store-666152b99713410b05e47081">
        <img src="./public/assets/docs/erd.png" width="100%">
    </a>
</p>

<br>

## 📬 Contact

- 💌 Email: **nadyajerochim@gmail.com**
- 💼 LinkedIn: [/nady4](https://www.linkedin.com/in/nady4)
- 👩🏻‍💻 GitHub: [@nady4](https://github.com/nady4)
