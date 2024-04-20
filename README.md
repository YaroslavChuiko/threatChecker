<head>
    <div align="center">
        <h1 align="center">ThreatChecker</h1>
    </div>
</head>

<div align="center">
  <img alt="nextdotjs" src="https://img.shields.io/badge/-next.js-000000.svg?style=for-the-badge&logo=nextdotjs&logoColor=white" />
  <img alt="TypeScript" src="https://img.shields.io/badge/-TypeScript-3178C6.svg?style=for-the-badge&logo=TypeScript&logoColor=white" />
  <img alt="react" src="https://img.shields.io/badge/-React-61DAFB.svg?style=for-the-badge&logo=react&logoColor=black" />
  <img alt="trpc" src="https://img.shields.io/badge/-trpc-2596BE.svg?style=for-the-badge&logo=trpc&logoColor=white" />
  <img alt="zod" src="https://img.shields.io/badge/-zod-3E67B1.svg?style=for-the-badge&logo=zod&logoColor=white" />
  <img alt="reactquery" src="https://img.shields.io/badge/-react%20query-FF4154.svg?style=for-the-badge&logo=reactquery&logoColor=white" />
  <img alt="nextauth" src="https://img.shields.io/badge/-nextauth.js-000000.svg?style=for-the-badge&logo=nextdotjs&logoColor=white" />
  <img alt="tailwindcss" src="https://img.shields.io/badge/-tailwind%20CSS-4285F4.svg?style=for-the-badge&logo=tailwindcss&logoColor=white" />
  <img alt="chartdotjs" src="https://img.shields.io/badge/-chart.js-FF6384.svg?style=for-the-badge&logo=chartdotjs&logoColor=white" />
  <img alt="Prisma" src="https://img.shields.io/badge/-Prisma-2D3748.svg?style=for-the-badge&logo=prisma&logoColor=white" />
  <img alt="postgresql" src="https://img.shields.io/badge/-postgresql-4169E1.svg?style=for-the-badge&logo=postgresql&logoColor=white" />
  <img alt="virustotal" src="https://img.shields.io/badge/-virustotal%20API-394EFF.svg?style=for-the-badge&logo=virustotal&logoColor=white" />
  <img alt="vercel" src="https://img.shields.io/badge/-vercel-000000.svg?style=for-the-badge&logo=vercel&logoColor=white" />
  <img alt="pnpm" src="https://img.shields.io/badge/-pnpm-F69220.svg?style=for-the-badge&logo=pnpm&logoColor=white" />
  <img alt="pwa" src="https://img.shields.io/badge/-pwa-5A0FC8.svg?style=for-the-badge&logo=pwa&logoColor=white" />
</div>

<div align="center">
  <h3>ThreatChecker is a free website security scanner. Remote scanners have limited access and results are not guaranteed.</h3>    
  <p><a href="https://threat-checker.vercel.app/" target="_blank">Website</a></p>
</div>

<br/>

## About

This is a [T3 Stack](https://create.t3.gg/) project bootstrapped with `create-t3-app`.

A chat application, written in Next.js, with the use of tRPC, NextAuth.js, Tailwind CSS, Prisma.

## Setup & Run

Prior to setup, create an `.env` file based on the `.env.example`.
Then proceed:

1. `pnpm install`
2. Create PostgreSQL database and add [connection url](https://www.prisma.io/docs/reference/database-reference/connection-urls#env) as value for `DATABASE_URL`
3. `npx prisma db push`
4. Generate a secret value for `NEXTAUTH_SECRET`. You can generate a new secret on the command line with: `openssl rand -base64 32`
5. Create a [Google OAuth App](https://console.developers.google.com/apis/credentials) and add values for `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET`
6. Create a [Discord OAuth App](https://create.t3.gg/en/usage/next-auth#setting-up-the-default-discordprovider) and add values for `DISCORD_CLIENT_ID` and `DISCORD_CLIENT_SECRET`
7. Create a [GitHub OAuth App](https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/creating-an-oauth-app). Make sure to set Authorization callback URL to http://localhost:3000/api/auth/callback/github. After that add values for `GITHUB_CLIENT_ID` and `GITHUB_CLIENT_SECRET`
8. Create [Mailtrap account](https://mailtrap.io/) and add values for `EMAIL_SERVER_USER`, `EMAIL_SERVER_PASSWORD`, `EMAIL_SERVER_HOST`, `EMAIL_SERVER_PORT`, `EMAIL_FROM`
9. Create [VirusTotal account](https://www.virustotal.com/) and add values for `VIRUS_TOTAL_API_KEY`
10. `npx prisma db seed`
11. `pnpm run dev`

<br/>

## Deployment diagram

![deployment-diagram](https://github.com/YaroslavChuiko/threatChecker/assets/32570823/9deea909-e62f-4c40-88cd-c3e23400b0b4)

## Entity-relationship diagram

![Entity-relationship diagram](https://github.com/YaroslavChuiko/threatChecker/assets/32570823/a7a9e145-0e2e-46a3-8d80-c3fcbc902d16)

## Snapshots

### Sign in

![image](https://github.com/YaroslavChuiko/threatChecker/assets/32570823/3e911f80-3dbe-4a96-8737-d9ff7f009d72)

![image](https://github.com/YaroslavChuiko/threatChecker/assets/32570823/5129130b-5411-42c6-a6b6-6ce338ed550e)

### Home

![image](https://github.com/YaroslavChuiko/threatChecker/assets/32570823/247d1905-fa57-468b-97e1-b868eddc5565)

### Results

![image](https://github.com/YaroslavChuiko/threatChecker/assets/32570823/89033d5f-cb90-4f4e-9ecd-4beb9808ba31)

![image](https://github.com/YaroslavChuiko/threatChecker/assets/32570823/c61913bc-e85f-44cd-8868-45401886e1f3)

### Statistics

![image](https://github.com/YaroslavChuiko/threatChecker/assets/32570823/8d6fc59b-01e2-44c2-91f1-b1742e3d332c)
