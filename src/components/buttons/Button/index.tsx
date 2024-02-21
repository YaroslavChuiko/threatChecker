import clsx from "clsx";
import { type ComponentProps } from "react";

type ButtonProps = {
  isLoading?: boolean;
  variant?: "primary" | "secondary";
} & ComponentProps<"button">;

const Button = ({
  isLoading = false,
  variant = "primary",
  ...rest
}: ButtonProps) => {
  if (variant === "secondary") {
    return <SecondaryButton {...rest} />;
  }

  return <PrimaryButton isLoading={isLoading} {...rest} />;
};

export default Button;
// box-shadow: rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px; shadow-[0px_2px_4px_0px,0px_2px_16px_0px]
// box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;

const PrimaryButton = ({
  className,
  isLoading,
  children,
  ...rest
}: Omit<ButtonProps, "variant">) => {
  return (
    <button
      className={clsx(
        `flex h-[40px] min-w-[150px] flex-shrink-0 items-center justify-center bg-primary bg-noise px-6 py-2 font-main text-base font-medium shadow-[0px_0px_5px_3px] shadow-primary/20 hover:shadow-[0px_2px_4px_0px,0px_2px_16px_0px]  uppercase text-secondary transition  hover:shadow-primary/40 ${className}`,
        {
          "animate-[buttonLoading_1.3s_linear_infinite] bg-gradient-to-r from-primary from-10% via-[#738b7b] via-30% to-primary to-60% bg-[length:600px_50px]":
            isLoading,
        },
      )}
      disabled={isLoading}
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
}: Omit<ButtonProps, "variant">) => {
  return (
    <button
      className={`flex h-[40px] w-full items-center justify-center border border-primary/30 bg-primary/10 px-6 py-2 font-medium  uppercase text-primary  transition hover:border-primary/100 hover:bg-primary hover:bg-primary/20 active:bg-primary/70 active:text-secondary shadow-[0px_0px_7px_1px]  hover:shadow-primary/30 shadow-primary/10 text-shadow-primary-lg ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
};
