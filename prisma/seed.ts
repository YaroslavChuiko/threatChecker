import { PrismaClient } from "@prisma/client";
import { SIGNATURES, THREATS } from "./initialData";

const prisma = new PrismaClient();

async function main() {
  await Promise.all(
    THREATS.map(async (threats) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      await prisma.threat.create({
        data: threats,
      });
    }),
  );
  console.log({ threats: THREATS });

  await Promise.all(
    SIGNATURES.map(async (Signature) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      await prisma.signature.create({
        data: Signature,
      });
    }),
  );
  console.log({ SIGNATURES });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
