import clsx from "clsx";
import { type ComponentProps } from "react";
import { cn } from "~/utils/cn";

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

const PrimaryButton = ({
  className,
  isLoading,
  children,
  ...rest
}: Omit<ButtonProps, "variant">) => {
  return (
    <button
      className={clsx(
        cn(
          "flex h-[40px] min-w-[150px] flex-shrink-0 items-center justify-center bg-primary px-6 py-2 font-main text-base font-medium uppercase text-secondary shadow-[0px_0px_5px_3px]  shadow-primary/20 transition hover:shadow-[0px_2px_4px_0px,0px_2px_16px_0px]  hover:shadow-primary/40",
          className,
        ),
        {
          "animate-[button-loading_1.3s_linear_infinite] bg-gradient-to-r from-primary from-10% via-[#738b7b] via-30% to-primary to-60% bg-[length:600px_50px]":
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
      className={`text-shadow-primary-lg  ${cn(
        "flex h-[40px] w-full items-center justify-center border border-primary/30 bg-primary/10 px-6 py-2  font-medium uppercase  text-primary shadow-[0px_0px_7px_1px] shadow-primary/10 transition hover:border-primary/100 hover:bg-primary/20  hover:shadow-primary/30 active:bg-primary/70 active:text-secondary",
        className,
      )}`}
      {...rest}
    >
      {children}
    </button>
  );
};
