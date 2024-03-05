import { PrismaClient, type ThreatSignature } from "@prisma/client";

const threatSignatures: Omit<ThreatSignature, "id">[] = [
  {
    name: "String.prototype.indexOf()", // String.prototype.indexOf()
    pattern: "\\.indexOf\\(.*\\)", // double \ for correct seeding
    description: "code injection",
    weight: 1,
  },
  {
    name: "String.prototype.charAt()", // String.prototype.charAt()
    pattern: "\\.charAt\\(.*\\)",
    description: "code injection",
    weight: 1,
  },
  {
    name: "String.prototype.split()", // String.prototype.split()
    pattern: "\\.split\\(.*\\)",
    description: "code injection",
    weight: 1,
  },
  {
    name: "String.fromCharCode()", // String.fromCharCode()
    pattern: "String\\.fromCharCode\\(.*\\)",
    description: "code injection",
    weight: 1,
  },
  {
    name: "String.charCodeAt()", // String.charCodeAt()
    pattern: "String\\.charCodeAt\\(.*\\)",
    description: "code injection",
    weight: 1,
  },
  {
    name: "eval()", // eval()
    pattern: "eval\\(.*\\)",
    description: "cross-site scripting (XSS) attacks",
    weight: 5,
  },
  {
    name: "setTimeout()", // setTimeout()
    pattern: "setTimeout\\(.*\\)",
    description: "denial of service (DoS) attacks, clickjacking attacks",
    weight: 2,
  },
  {
    name: "setInterval()", // setInterval()
    pattern: "setInterval\\(.*\\)",
    description: "denial of service (DoS) attacks, clickjacking attacks",
    weight: 2,
  },
  {
    name: "document.write()", // document.write()
    pattern: "document\\.write\\(.*\\)",
    description: "cross-site scripting (XSS) attacks",
    weight: 4,
  },
  {
    name: "document.writeln()", // document.writeln()
    pattern: "document\\.writeln\\(.*\\)",
    description: "cross-site scripting (XSS) attacks",
    weight: 4,
  },
  {
    name: "element.appendChild()", // element.appendChild()
    pattern: "\\.appendChild\\(.*\\)",
    description: "cross-site scripting (XSS) attacks",
    weight: 2,
  },
  {
    name: "element.innerHTML", // element.innerHTML
    pattern: "\\.innerHTML\\s*=",
    description: "cross-site scripting (XSS) attacks",
    weight: 4,
  },
  {
    name: "location.assign()", // location.assign()
    pattern: "location\\.assign\\(.*\\)",
    description: "open redirection attacks, phishing attacks, session fixation attacks",
    weight: 4,
  },
  {
    name: "location.replace()", // location.replace()
    pattern: "location\\.replace\\(.*\\)",
    description: "open redirection attacks, phishing attacks, session fixation attacks",
    weight: 4,
  },
  {
    name: "unescape()", // unescape()
    pattern: "unescape\\(.*\\)",
    description: "cross-site scripting (XSS) attacks",
    weight: 5,
  },
  {
    name: "XMLHttpRequest", // XMLHttpRequest
    pattern: "XMLHttpRequest\\(.*\\)",
    description: "cross-site request forgery (CSRF) attacks",
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
