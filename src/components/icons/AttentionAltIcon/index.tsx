import { type ComponentProps } from "react";

type Props = {
  className?: string;
} & ComponentProps<"svg">;

const AttentionAltIcon = ({ className, ...rest }: Props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 155.55 132"
      className={className}
      {...rest}
    >
      <path
        fill="currentColor"
        d="M145.61,0h-37.03l-3.94,5.91H50.9l-3.37-5.91H9.94L0,17.22,18.78,49.74h6.82l25.31,43.83-3.61,5.57,18.97,32.86h23.02l18.67-32.34-3.31-6.09,25.31-43.83h6.82l18.78-32.52L145.61,0ZM77.77,121.96L15.12,13.43h125.3l-62.65,108.52Z"
      />
      <circle fill="currentColor" cx="77.77" cy="80.6" r="7.97" />
    </svg>
  );
};

export default AttentionAltIcon;
