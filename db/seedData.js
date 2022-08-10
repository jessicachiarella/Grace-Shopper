const {
  client,
  // declare your model imports here
  // for example, User
} = require(".");

async function dropTables() {
  try {
    console.log("Dropping All Tables...");
    await client.query(`
    DROP TABLE IF EXISTS "orderHistory";
    DROP TABLE IF EXISTS cart;
    DROP TABLE IF EXISTS "orderItems";
    DROP TABLE IF EXISTS categories;
    DROP TABLE IF EXISTS products;
    DROP TABLE IF EXISTS users;
    `);
    console.log("Finished dropping tables!")
  } catch (error) {
    console.error("Error dropping tables!");
    throw error;
  }
}

async function buildTables() {
  try {
    client.connect();
    console.log("Starting to build tables...");
    await client.query(`
  CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    fullname VARCHAR(255) NOT NULL,
    "isAdmin" BOOLEAN DEFAULT false
  );
  CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL,
    description VARCHAR(255) UNIQUE NOT NULL,
    price INTEGER,
    "categoryId" INTEGER REFERENCES categories (id),
    "categoryName" VARCHAR(255) REFERENCES categories (name), 
    image_url TEXT,
    "inStock" BOOLEAN DEFAULT true
  );
  CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL
  );
  CREATE TABLE "orderItems" (
    id SERIAL PRIMARY KEY,
    "cartId" INTEGER REFERENCES cart (id),
    "productId" INTEGER REFERENCES products (id),
    quantity INTEGER,
    price INTEGER REFERENCES products (price),
  );
  CREATE TABLE cart (
    id SERIAL PRIMARY KEY,
    "userId" INTEGER REFERENCES users (id),
    "isPurchased" BOOLEAN DEFAULT false,
  );
  CREATE TABLE "orderHistory" (
    id SERIAL PRIMARY KEY,
    "cartId" INTEGER REFERENCES cart (id),
    "datePurchased" DATE NOT NULL,
  );
  `);
  console.log("Finished creating tables!")
  } catch (error) {
    console.error("Error creating tables!");
    throw error;
  }
}

async function populateInitialData() {
  try {
    // create useful starting data by leveraging your
    // Model.method() adapters to seed your db, for example:
    // const user1 = await User.createUser({ ...user info goes here... })
  } catch (error) {
    throw error;
  }
}

buildTables()
  .then(populateInitialData)
  .catch(console.error)
  .finally(() => client.end());
