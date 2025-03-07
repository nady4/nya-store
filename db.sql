CREATE TABLE "user" (
    id TEXT PRIMARY KEY,
    addressId TEXT,
    username TEXT,
    email TEXT,
    password TEXT,
    addresses TEXT,
    cart TEXT,
    orders TEXT,
    wishlists TEXT,
    createdAt TIMESTAMP,
    updatedAt TIMESTAMP
);

CREATE TABLE cart (
    id TEXT PRIMARY KEY,
    userId TEXT,
    price FLOAT,
    FOREIGN KEY (userId) REFERENCES "user"(id)
);

CREATE TABLE "order" (
    id TEXT PRIMARY KEY,
    cartId TEXT,
    userId TEXT,
    status TEXT,
    createdAt TIMESTAMP,
    updatedAt TIMESTAMP,
    FOREIGN KEY (cartId) REFERENCES cart(id),
    FOREIGN KEY (userId) REFERENCES "user"(id)
);

CREATE TABLE payment (
    id TEXT PRIMARY KEY,
    orderId TEXT,
    paymentMethod TEXT,
    paymentDate TIMESTAMP,
    paymentStatus TEXT,
    FOREIGN KEY (orderId) REFERENCES "order"(id)
);

CREATE TABLE cartItem (
    id TEXT PRIMARY KEY,
    productId TEXT,
    cartId TEXT,
    size TEXT,
    quantity INTEGER,
    cost FLOAT,
    price FLOAT,
    paymentMethodDiscount FLOAT,
    quantityDiscount FLOAT,
    total FLOAT,
    FOREIGN KEY (cartId) REFERENCES cart(id),
    FOREIGN KEY (productId) REFERENCES product(id)
);

CREATE TABLE product (
    id TEXT PRIMARY KEY,
    cartItemId TEXT,
    wishListId TEXT,
    name TEXT,
    photo TEXT,
    price FLOAT
);

CREATE TABLE card (
    id TEXT PRIMARY KEY,
    paymentId TEXT,
    type TEXT,
    name TEXT,
    numbers TEXT,
    expiryDate TIMESTAMP,
    ccv TEXT,
    FOREIGN KEY (paymentId) REFERENCES payment(id)
);

CREATE TABLE wishList (
    id TEXT PRIMARY KEY,
    productId TEXT,
    userId TEXT,
    name TEXT,
    photo TEXT,
    FOREIGN KEY (productId) REFERENCES product(id),
    FOREIGN KEY (userId) REFERENCES "user"(id)
);

CREATE TABLE address (
    id TEXT PRIMARY KEY,
    userId TEXT,
    street TEXT,
    city TEXT,
    state TEXT,
    zipCode TEXT,
    FOREIGN KEY (userId) REFERENCES "user"(id)
);

CREATE TABLE shipment (
    id TEXT PRIMARY KEY,
    orderId TEXT,
    addressId TEXT,
    trackingNumber TEXT,
    shipmentStatus TEXT,
    shippedDate TIMESTAMP,
    deliveryDate TIMESTAMP,
    FOREIGN KEY (orderId) REFERENCES "order"(id),
    FOREIGN KEY (addressId) REFERENCES address(id)
);

ALTER TABLE address ADD COLUMN shipmentId TEXT;
ALTER TABLE address ADD CONSTRAINT fk_shipment FOREIGN KEY (shipmentId) REFERENCES shipment(id);
