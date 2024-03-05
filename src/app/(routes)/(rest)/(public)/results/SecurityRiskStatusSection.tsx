"use client";

import clsx from "clsx";
import { type Session } from "next-auth";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import AttentionIcon from "~/components/icons/AttentionIcon";
import { ROUTES } from "~/routes";

type SecurityRiskStatusLabel =
  | "minimal"
  | "low"
  | "medium"
  | "high"
  | "critical";

type SecurityRiskStatusColor = "success" | "warning" | "error";

type SecurityRiskStatus = {
  label: SecurityRiskStatusLabel;
  color: SecurityRiskStatusColor;
};

const securityRiskLabels: SecurityRiskStatusLabel[] = [
  "minimal",
  "low",
  "medium",
  "high",
  "critical",
];

const calculateSecurityRiskStatus = (
  vulnerabilityCoef: number,
): SecurityRiskStatus => {
  if (vulnerabilityCoef < 0.2) {
    return { label: "minimal", color: "success" };
  }

  if (vulnerabilityCoef < 0.4) {
    return { label: "low", color: "warning" };
  }

  if (vulnerabilityCoef < 0.7) {
    return { label: "medium", color: "warning" };
  }

  if (vulnerabilityCoef < 0.8) {
    return { label: "high", color: "error" };
  }

  return { label: "critical", color: "error" };
};

const textColorMappings = {
  success: "text-success",
  warning: "text-warning",
  error: "text-error",
};

const bgColorMappings = {
  success: "bg-success",
  warning: "bg-warning",
  error: "bg-error",
};

const bgColorOpacityMappings = {
  success: "bg-success/20",
  warning: "bg-warning/20",
  error: "bg-error/20",
};

const dropShadowLgMappings = {
  success: "drop-shadow-success-lg",
  warning: "drop-shadow-warning-lg",
  error: "drop-shadow-error-lg",
};

const textShadowLgMappings = {
  success: "text-shadow-success-lg",
  warning: "text-shadow-warning-lg",
  error: "text-shadow-error-lg",
};

const textShadowMdMappings = {
  success: "text-shadow-success-md",
  warning: "text-shadow-warning-md",
  error: "text-shadow-error-md",
};

type Props = {
  vulnerabilityCoef: number;
  session: Session | null;
};

const SecurityRiskStatusSection = ({ vulnerabilityCoef, session }: Props) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const securityRiskStatus = calculateSecurityRiskStatus(vulnerabilityCoef);

  const signinRedirectUrl = `${ROUTES.AUTH.SIGNIN}?from=${pathname}?${searchParams.toString()}`;

  return (
    <div className="mb-7 w-full pl-4 pr-8">
      <div
        className={clsx(
          "mb-6 flex items-center justify-center gap-2 text-base font-medium uppercase",
          textColorMappings[securityRiskStatus.color],
        )}
      >
        <AttentionIcon
          className={clsx(
            "h-8",
            dropShadowLgMappings[securityRiskStatus.color],
          )}
        />
        <div className={clsx(textShadowLgMappings[securityRiskStatus.color])}>
          {securityRiskStatus.label} security risc
        </div>
      </div>
      <div className="mb-8">
        <div
          className={clsx(
            "mb-1 h-[5px]",
            `${bgColorOpacityMappings[securityRiskStatus.color]} ${
              dropShadowLgMappings[securityRiskStatus.color]
            }`,
          )}
        >
          <div
            style={{ width: `${vulnerabilityCoef * 100}%` }}
            className={clsx(
              "h-full",
              bgColorMappings[securityRiskStatus.color],
            )}
          ></div>
        </div>

        <div
          className={clsx(
            "flex items-center justify-between text-xs font-medium",
            // `text-shadow-${securityRiskStatus.color}-md text-${securityRiskStatus.color}`,
            `${textShadowMdMappings[securityRiskStatus.color]} ${
              textColorMappings[securityRiskStatus.color]
            }`,
          )}
        >
          {securityRiskLabels.map((label) => (
            <div key={label} className="capitalize">
              {label}
            </div>
          ))}
        </div>
      </div>

      {session ? (
        <div
          className={clsx(
            "mb-3 text-sm",
            // `text-shadow-${securityRiskStatus.color}-lg text-${securityRiskStatus.color}`,
            `${textShadowLgMappings[securityRiskStatus.color]} ${
              textColorMappings[securityRiskStatus.color]
            }`,
          )}
        >
          <span className="text-base font-medium uppercase">
            Possible attacks:{" "}
          </span>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati
          dignissimos placeat quod recusandae sit minus officia, ipsam, impedit
          quasi quisquam hic. Error, quis. Aperiam recusandae blanditiis vero
          repellendus, ea, in, autem incidunt quae atque magni mollitia harum
          totam maiores adipisci dolorem quis illo? Enim aliquid fugit nemo
          necessitatibus facere dolor!
        </div>
      ) : (
        <div
          className={clsx(
            "mb-3 flex flex-col items-center justify-center px-6 py-2 text-sm  text-secondary",
            // `drop-shadow-${securityRiskStatus.color}-lg bg-${securityRiskStatus.color}`,
            `${bgColorMappings[securityRiskStatus.color]} ${
              dropShadowLgMappings[securityRiskStatus.color]
            }`,
          )}
        >
          <div className="font-bold uppercase">Access denied!</div>
          <div className="font-medium">
            <Link href={signinRedirectUrl} className="font-semibold underline">
              Sign in
            </Link>{" "}
            to access the report and more details
          </div>
        </div>
      )}
    </div>
  );
};

export default SecurityRiskStatusSection;
