import { PrismaClient } from "@prisma/client";
import products from "../src/data/products.json" assert { type: "json" };

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding products...");

  for (const product of products) {
    await prisma.product.upsert({
      where: { id: product.id },
      update: {},
      create: product,
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
