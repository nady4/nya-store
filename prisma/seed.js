import { PrismaClient } from "@prisma/client";
import { readFile } from "fs/promises";
import { join } from "path";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding products...");

  const productsPath = join(process.cwd(), "src/data/products.json");
  const productsData = await readFile(productsPath, "utf-8");
  const products = JSON.parse(productsData);

  for (const product of products) {
    await prisma.product.upsert({
      where: { name: product.name },
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
