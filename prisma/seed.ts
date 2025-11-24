import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  await prisma.user.upsert({
    where: { username: "admin" },
    update: {},
    create: {
      username: "admin",
      password: "admin",
      role: "ADMIN",
    },
  });
  console.log("✔ Admin created");

  const fakeUsers = Array.from({ length: 200 }).map(() => ({
    username: faker.internet.username(),
    password: faker.internet.password(),
    role: faker.helpers.arrayElement(["USER", "MANAGER"]),
  }));

  await prisma.user.createMany({ data: fakeUsers });
  console.log("✔ Fake users created:", fakeUsers.length);

  const confidentialityLevels = [
    "CONFIDENTIAL",
    "RESTRICTED",
    "TOP SECRET",
  ];

  const fakeDocuments = Array.from({ length: 150 }).map(() => ({
    title: faker.company.catchPhrase(),
    content: faker.lorem.paragraphs(3),
    confidentialityLevel: faker.helpers.arrayElement(confidentialityLevels),
  }));

  await prisma.secretDocument.createMany({ data: fakeDocuments });
  console.log("✔ Secret documents created:", fakeDocuments.length);

  const allUsers: { id: number }[] = await prisma.user.findMany({
    select: { id: true },
  });

  const fakeAttempts = Array.from({ length: 300 }).map(() => ({
    userId: faker.helpers.arrayElement(allUsers).id,
    ipAddress: faker.internet.ipv4(),
    userAgent: faker.internet.userAgent(),
    success: faker.datatype.boolean(),
    timestamp: faker.date.recent({ days: 15 }),
  }));

  await prisma.loginAttempt.createMany({ data: fakeAttempts });
  console.log("✔ Login attempts created:", fakeAttempts.length);

  console.log("🌱 Database seeding complete!");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error("❌ Seeding failed:", e);
    await prisma.$disconnect();
    process.exit(1);
  });