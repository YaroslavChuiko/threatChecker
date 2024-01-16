import { PrismaClient, type ThreatSignature } from "@prisma/client";

const threatSignatures: Omit<ThreatSignature, "id">[] = [
  {
    name: "indexOf", // String.prototype.indexOf()
    pattern: "\\.indexOf\\(.*\\)", // double \ for correct seeding
    description: "test",
    weight: 1,
  },
  {
    name: "charAt", // String.prototype.charAt()
    pattern: "\\.charAt\\(.*\\)",
    description: "test",
    weight: 1,
  },
  {
    name: "split", // String.prototype.split()
    pattern: "\\.split\\(.*\\)",
    description: "test",
    weight: 1,
  },
  {
    name: "String.fromCharCode", // String.fromCharCode()
    pattern: "String\\.fromCharCode\\(.*\\)",
    description: "test",
    weight: 1,
  },
  {
    name: "String.charCodeAt", // String.charCodeAt()
    pattern: "String\\.charCodeAt\\(.*\\)",
    description: "test",
    weight: 1,
  },
  {
    name: "eval", // eval()
    pattern: "eval\\(.*\\)",
    description: "test",
    weight: 5,
  },
  {
    name: "setTimeout", // setTimeout()
    pattern: "setTimeout\\(.*\\)",
    description: "test",
    weight: 2,
  },
  {
    name: "setInterval", // setInterval()
    pattern: "setInterval\\(.*\\)",
    description: "test",
    weight: 2,
  },
  {
    name: "document.write", // document.write()
    pattern: "document\\.write\\(.*\\)",
    description: "test",
    weight: 4,
  },
  {
    name: "document.writeln", // document.writeln()
    pattern: "document\\.writeln\\(.*\\)",
    description: "test",
    weight: 4,
  },
  {
    name: "appendChild", // element.appendChild()
    pattern: "\\.appendChild\\(.*\\)",
    description: "test",
    weight: 2,
  },
  {
    name: "innerHTML", // element.innerHTML
    pattern: "\\.innerHTML\\s*=",
    description: "test",
    weight: 4,
  },
  {
    name: "location.assign", // location.assign()
    pattern: "location\\.assign\\(.*\\)",
    description: "test",
    weight: 4,
  },
  {
    name: "location.replace", // location.replace()
    pattern: "location\\.replace\\(.*\\)",
    description: "test",
    weight: 4,
  },
  {
    name: "unescape", // unescape()
    pattern: "unescape\\(.*\\)",
    description: "test",
    weight: 5,
  },
  {
    name: "XMLHttpRequest", // XMLHttpRequest
    pattern: "XMLHttpRequest\\(.*\\)",
    description: "test",
    weight: 3,
  },
];

const prisma = new PrismaClient();

async function main() {
  await Promise.all(
    threatSignatures.map(async (threatSignature) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      await prisma.threatSignature.create({
        data: threatSignature,
      });
    }),
  );
  console.log({ threatSignatures });
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
