import Link from "next/link";
import { type ComponentProps } from "react";
import { ROUTES } from "~/routes";
import NetwatchLogo from "../icons/NetwatchLogo";

type Props = {
  className?: string;
} & ComponentProps<"svg">;

const Logo = ({ className, ...rest }: Props) => {
  return (
    <Link
      className="flex items-center justify-center"
      href={ROUTES.PUBLIC.HOME}
    >
      <NetwatchLogo className={className} {...rest} />
    </Link>
  );
};

export default Logo;
