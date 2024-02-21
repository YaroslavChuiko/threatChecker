import Link from "next/link";
import { type ComponentProps } from "react";

type ButtonProps = {
  variant?: "primary" | "secondary";
} & ComponentProps<typeof Link>;

const LinkButton = ({ variant = "primary", ...rest }: ButtonProps) => {
  if (variant === "secondary") {
    return <SecondaryLinkButton {...rest} />;
  }

  return <PrimaryLinkButton {...rest} />;
};

export default LinkButton;

const PrimaryLinkButton = ({
  className,
  children,
  ...rest
}: ComponentProps<typeof Link>) => {
  return (
    <Link
      className={`flex h-[40px] w-full min-w-[150px] flex-shrink-0 items-center justify-center bg-primary px-6 py-2 font-main text-base font-medium  uppercase text-secondary transition  hover:bg-primary/70 ${className}`}
      {...rest}
    >
      {children}
    </Link>
  );
};

const SecondaryLinkButton = ({
  className,
  children,
  ...rest
}: ComponentProps<typeof Link>) => {
  return (
    <Link
      className={`flex h-[40px] w-full items-center justify-center border border-primary/30 bg-primary/10 px-6 py-2 font-medium  uppercase text-primary  transition hover:border-primary/100 hover:bg-primary hover:bg-primary/20 active:bg-primary/70 active:text-secondary ${className}`}
      {...rest}
    >
      {children}
    </Link>
  );
};
