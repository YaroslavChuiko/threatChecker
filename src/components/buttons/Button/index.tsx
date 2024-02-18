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

const PrimaryButton = ({
  className,
  isLoading,
  children,
  ...rest
}: Omit<ButtonProps, "variant">) => {
  return (
    <button
      className={clsx(
        `flex h-[40px] min-w-[150px] flex-shrink-0 items-center justify-center bg-mainColor px-6 py-2 font-main text-base font-medium  uppercase text-secondaryColor transition  hover:bg-mainColor/70 ${className}`,
        {
          "animate-[buttonLoading_1.3s_linear_infinite] bg-gradient-to-r from-mainColor from-10% via-[#738b7b] via-30% to-mainColor to-60% bg-[length:600px_50px]":
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
      className={`flex h-[40px] w-full items-center justify-center border border-mainColor/30 bg-mainColor/10 px-6 py-2 font-medium  uppercase text-mainColor  transition hover:border-mainColor/100 hover:bg-mainColor hover:bg-mainColor/20 active:bg-mainColor/70 active:text-secondaryColor ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
};
