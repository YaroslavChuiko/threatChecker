import { type ComponentProps } from "react";

type ButtonProps = {
  variant?: "primary" | "secondary";
} & ComponentProps<"button">;

const Button = ({ variant = "primary", ...rest }: ButtonProps) => {
  if (variant === "secondary") {
    return <SecondaryButton {...rest} />;
  }

  return <PrimaryButton {...rest} />;
};

export default Button;

const PrimaryButton = ({
  className,
  children,
  ...rest
}: ComponentProps<"button">) => {
  return (
    <button
      className={`flex h-[40px] w-full min-w-[150px] flex-shrink-0 items-center justify-center bg-mainColor px-6 py-2 font-main text-base font-medium  uppercase text-secondaryColor transition  hover:bg-mainColor/70 ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
};

const SecondaryButton = ({
  className,
  children,
  ...rest
}: ComponentProps<"button">) => {
  return (
    <button
      className={`flex h-[40px] w-full items-center justify-center border border-mainColor/30 bg-mainColor/10 px-6 py-2 font-medium  uppercase text-mainColor  transition hover:border-mainColor/100 hover:bg-mainColor hover:bg-mainColor/20 active:bg-mainColor/70 active:text-secondaryColor ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
};
