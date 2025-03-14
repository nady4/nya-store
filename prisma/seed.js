import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import products from "../src/util/products.json" with { type: "json" };

async function main() {
    console.log("🌱 Seeding products...");
  
    for (const product of products) {
      await prisma.product.create({
        data: product,
      });
    }
  
    console.log("✅ Seeding complete!");
  }
  
  main()
    .catch((error) => {
      console.error("❌ Error seeding database:", error);
      process.exit(1);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });