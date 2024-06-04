"use client";

import clsx from "clsx";
import { type Session } from "next-auth";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import AttentionIcon from "~/components/icons/AttentionIcon";
import { ROUTES } from "~/routes";
import {
  type SecurityRiskStatusLabel,
  getSecurityRiskStatus,
  type SecurityRiskStatusColor,
} from "~/services/security-risc-level-service";

const securityRiskLabels: SecurityRiskStatusLabel[] = [
  "minimal",
  "low",
  "medium",
  "high",
  "critical",
];

type StylesMappings = {
  [key in SecurityRiskStatusColor]: string;
};

const textColorMappings: StylesMappings = {
  success: "text-success",
  warning: "text-warning",
  error: "text-error",
};

const bgColorMappings: StylesMappings = {
  success: "bg-success",
  warning: "bg-warning",
  error: "bg-error",
};

const bgColorOpacityMappings: StylesMappings = {
  success: "bg-success/20",
  warning: "bg-warning/20",
  error: "bg-error/20",
};

const dropShadowLgMappings: StylesMappings = {
  success: "drop-shadow-success-lg",
  warning: "drop-shadow-warning-lg",
  error: "drop-shadow-error-lg",
};

const textShadowLgMappings: StylesMappings = {
  success: "text-shadow-success-lg",
  warning: "text-shadow-warning-lg",
  error: "text-shadow-error-lg",
};

const textShadowMdMappings: StylesMappings = {
  success: "text-shadow-success-md",
  warning: "text-shadow-warning-md",
  error: "text-shadow-error-md",
};

type Props = {
  securityRiskCoef: number;
  possibleAttacks: string[];
  session: Session | null;
};

const SecurityThreatStatusSection = ({
  securityRiskCoef,
  possibleAttacks,
  session,
}: Props) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const securityRiskStatus = getSecurityRiskStatus(securityRiskCoef);

  const signinRedirectUrl = `${
    ROUTES.AUTH.SIGNIN
  }?from=${pathname}?${searchParams.toString()}`;

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
            style={{ width: `${securityRiskCoef * 100}%` }}
            className={clsx(
              "h-full",
              bgColorMappings[securityRiskStatus.color],
            )}
          ></div>
        </div>

        <div
          className={clsx(
            "flex items-center justify-between text-xs font-medium",
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
            `${textShadowLgMappings[securityRiskStatus.color]} ${
              textColorMappings[securityRiskStatus.color]
            }`,
          )}
        >
          <span className="text-base font-medium uppercase">
            Possible attacks:{" "}
          </span>
          {possibleAttacks.length === 0 ? (
            <span className="text-base">None</span>
          ) : (
            `${possibleAttacks.join(", ")}.`
          )}
        </div>
      ) : (
        <div
          className={clsx(
            "mb-3 flex flex-col items-center justify-center px-6 py-2 text-sm  text-secondary",
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

export default SecurityThreatStatusSection;
