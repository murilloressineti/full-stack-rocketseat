import { prisma } from "@/prisma";

async function seed() {
  await prisma.user.createMany({
    data: [
      {
        name: "Pedro da Silva",
        email: "pedro@email.com",
      },
      {
        name: "Maria da Silva",
        email: "maria@email.com",
      },
    ],
  });
}

seed().then(() => {
  console.log("Database seeded!");
  prisma.$disconnect();
});
