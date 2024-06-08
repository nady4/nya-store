import User from "./models/User.ts";
import Address from "./models/Address.ts";

const nadyaAddress: Address = {
    id: "1",
    street: "123 Main St",
    city: "Anytown",
    state: "CA",
    zip: "12345",
};

const nadya: User = {
    id: "1",
    name: "Nadya",
    addresses: [nadyaAddress],
    orders: [],
    wishLists: [],
    username: "nady4",
    email: "nadyajerochim@gmail.com",
    password: "password123",
    createdAt: new Date(),
    updatedAt: new Date(),
};

console.log(nadya);
