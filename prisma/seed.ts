import { PrismaClient } from "@prisma/client";

const threatSignatures = [
  {
    name: "String.prototype.indexOf()", // String.prototype.indexOf()
    pattern: "\\.indexOf\\(.*\\)", // double \ for correct seeding
    weight: 1,
    threatDetails: {
      connect: [{ name: "code injection" } ]
    },
  },
  {
    name: "String.prototype.charAt()", // String.prototype.charAt()
    pattern: "\\.charAt\\(.*\\)",
    weight: 1,
    threatDetails: {
      connect: [{ name: "code injection" } ]
    },
  },
  {
    name: "String.prototype.split()", // String.prototype.split()
    pattern: "\\.split\\(.*\\)",
    weight: 1,
    threatDetails: {
      connect: [{ name: "code injection" } ]
    },
  },
  {
    name: "String.fromCharCode()", // String.fromCharCode()
    pattern: "String\\.fromCharCode\\(.*\\)",
    weight: 1,
    threatDetails: {
      connect: [{ name: "code injection" } ]
    },
  },
  {
    name: "String.charCodeAt()", // String.charCodeAt()
    pattern: "String\\.charCodeAt\\(.*\\)",
    weight: 1,
    threatDetails: {
      connect: [{ name: "code injection" } ]
    },
  },
  {
    name: "eval()", // eval()
    pattern: "eval\\(.*\\)",
    weight: 5,
    threatDetails: {
      connect: [{ name: "cross-site scripting (XSS)" } ]
    },
  },
  {
    name: "setTimeout()", // setTimeout()
    pattern: "setTimeout\\(.*\\)",
    weight: 2,
    threatDetails: {
      connect: [{ name: "denial of service (DoS)" }, { name: "clickjacking" }]
    },
  },
  {
    name: "setInterval()", // setInterval()
    pattern: "setInterval\\(.*\\)",
    weight: 2,
    threatDetails: {
      connect: [{ name: "denial of service (DoS)" }, { name: "clickjacking" }]
    },
  },
  {
    name: "document.write()", // document.write()
    pattern: "document\\.write\\(.*\\)",
    weight: 4,
    threatDetails: {
      connect: [{ name: "cross-site scripting (XSS)" }]
    },
  },
  {
    name: "document.writeln()", // document.writeln()
    pattern: "document\\.writeln\\(.*\\)",
    weight: 4,
    threatDetails: {
      connect: [{ name: "cross-site scripting (XSS)" }]
    },
  },
  {
    name: "element.appendChild()", // element.appendChild()
    pattern: "\\.appendChild\\(.*\\)",
    weight: 2,
    threatDetails: {
      connect: [{ name: "cross-site scripting (XSS)" }]
    },
  },
  {
    name: "element.innerHTML", // element.innerHTML
    pattern: "\\.innerHTML\\s*=",
    weight: 4,
    threatDetails: {
      connect: [{ name: "cross-site scripting (XSS)" }]
    },
  },
  {
    name: "location.assign()", // location.assign()
    pattern: "location\\.assign\\(.*\\)",
    weight: 4,
    threatDetails: {
      connect: [{ name: "open redirection" }, { name: "phishing" }, { name: "session fixation" }]
    },
  },
  {
    name: "location.replace()", // location.replace()
    pattern: "location\\.replace\\(.*\\)",
    weight: 4,
    threatDetails: {
      connect: [{ name: "open redirection" }, { name: "phishing" }, { name: "session fixation" }]
    },
  },
  {
    name: "unescape()", // unescape()
    pattern: "unescape\\(.*\\)",
    weight: 5,
    threatDetails: {
      connect: [{ name: "cross-site scripting (XSS)" }]
    },
  },
  {
    name: "XMLHttpRequest", // XMLHttpRequest
    pattern: "XMLHttpRequest\\(.*\\)",
    weight: 3,
    threatDetails: {
      connect: [{ name: "cross-site request forgery (CSRF)" }]
    },
  },
];

const threatDetails = [
  {
    name: "code injection",
  },
  {
    name: "cross-site scripting (XSS)",
  },
  {
    name: "denial of service (DoS)",
  },
  {
    name: "clickjacking",
  },
  {
    name: "open redirection",
  },
  {
    name: "phishing",
  },
  {
    name: "session fixation",
  },
  {
    name: "cross-site request forgery (CSRF)",
  },
];

const prisma = new PrismaClient();

async function main() {
  await Promise.all(
    threatDetails.map(async (threatDetails) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      await prisma.threatDetails.create({
        data: threatDetails,
      });
    }),
  );
  console.log({ threatDetails });

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
