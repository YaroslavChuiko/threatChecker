import { type MalwareSignature, PrismaClient } from "@prisma/client";


const malwareSignatures: Omit<MalwareSignature, "id">[] = [
  {
    name: "indexOf", // String.prototype.indexOf()
    regExp: "/.indexOf(.*)/g",
    description: "test",
    weight: 1,
  },
  {
    name: "charAt", // String.prototype.charAt()
    regExp: "/.charAt(.*)/g",
    description: "test",
    weight: 1,
  },
  {
    name: "split", // String.prototype.split()
    regExp: "/.split(.*)/g",
    description: "test",
    weight: 1,
  },
  {
    name: "String.fromCharCode", // String.fromCharCode()
    regExp: "/String.fromCharCode(.*)/g",
    description: "test",
    weight: 1,
  },
  {
    name: "String.charCodeAt", // String.charCodeAt()
    regExp: "/String.charCodeAt(.*)/g",
    description: "test",
    weight: 1,
  },
  {
    name: "eval", // eval()
    regExp: "/eval(.*)/g",
    description: "test",
    weight: 5,
  },
  {
    name: "setTimeout", // setTimeout()
    regExp: "/setTimeout(.*)/g",
    description: "test",
    weight: 2,
  },
  {
    name: "setInterval", // setInterval()
    regExp: "/setInterval(.*)/g",
    description: "test",
    weight: 2,
  },
  {
    name: "document.write", // document.write()
    regExp: "/document.write(.*)/g",
    description: "test",
    weight: 4,
  },
  {
    name: "document.writeln", // document.writeln()
    regExp: "/document.writeln(.*)/g",
    description: "test",
    weight: 4,
  },
  {
    name: "appendChild", // element.appendChild()
    regExp: "/.appendChild(.*)/g",
    description: "test",
    weight: 2,
  },
  {
    name: "innerHTML", // element.innerHTML
    regExp: "/.innerHTMLs*=/g",
    description: "test",
    weight: 4,
  },
  {
    name: "location.assign", // location.assign()
    regExp: "/location.assign(.*)/g",
    description: "test",
    weight: 4,
  },
  {
    name: "location.replace", // location.replace()
    regExp: "/location.replace(.*)/g",
    description: "test",
    weight: 4,
  },
  {
    name: "unescape", // unescape()
    regExp: "/unescape(.*)/g",
    description: "test",
    weight: 5,
  },
  {
    name: "XMLHttpRequest", // XMLHttpRequest
    regExp: "/XMLHttpRequest(/g",
    description: "test",
    weight: 3,
  },
];

const prisma = new PrismaClient();

async function main() {
  await Promise.all(
    malwareSignatures.map(async (malwareSignature) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      await prisma.malwareSignature.create({
        data: malwareSignature,
      });
    }),
  );
  console.log({ malwareSignatures });
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
