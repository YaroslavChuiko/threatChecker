import { type ComponentProps } from "react";

type Props = {
  className?: string;
} & ComponentProps<"svg">;

const NetwatchLogo = ({ className, ...rest }: Props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 550.07 52.8"
      fill="none"
      className={className}
      {...rest}
    >
      {/* <g id="a" /> */}
      {/* <g id="b">
        <g id="c">
          <g> */}
            <polygon
              fill="currentColor"
              points="532 0 532 21.43 505.29 21.43 505.29 0 487.22 0 487.22 52.8 505.29 52.8 505.29 32.4 532 32.4 532 52.8 550.07 52.8 550.07 0 532 0"
            />
            <path
              fill="currentColor"
              d="M44.88,0H0V52.8H18.07V11.98h26.8V52.8h18.07V11.98S62.95,0,44.88,0Z"
            />
            <path
              fill="currentColor"
              d="M423.26,11.98v28.86h0c.01,.59,.47,11.95,18.07,11.95h38.18v-11.98h-38.18V11.98h38.18V0h-38.18c-18.07,0-18.07,11.98-18.07,11.98Z"
            />
            <polygon
              fill="currentColor"
              points="70.67 0 70.67 52.8 127.12 52.8 127.12 40.82 88.74 40.82 88.74 11.98 127.12 11.98 127.12 0 70.67 0"
            />
            <rect
              fill="currentColor"
              x="92.04"
              y="20.41"
              width="23.45"
              height="11.98"
            />
            <polygon
              fill="currentColor"
              points="196.26 11.99 173.98 11.99 173.98 52.8 151.03 52.8 151.03 11.99 134.83 11.99 134.83 0 191.74 0 196.26 11.99"
            />
            <polygon
              fill="currentColor"
              points="359.99 11.99 377.92 11.99 377.92 52.8 400.87 52.8 400.87 11.99 417.06 11.99 417.06 0 355.48 0 359.99 11.99"
            />
            <path
              fill="currentColor"
              d="M300.08,0l-17.45,46.29c-1.48,3.91-5.23,6.51-9.39,6.51h-44.99c-4.19,0-7.93-2.6-9.41-6.51L201.39,0h18.68l15.02,40.81h31.27L281.39,0h18.7Z"
            />
            <polygon
              fill="currentColor"
              points="350.36 11.99 323.55 11.99 308.53 52.8 289.85 52.8 304.16 14.84 309.75 0 345.84 0 350.36 11.99"
            />
            <polygon
              fill="currentColor"
              points="338.26 28.89 347.07 52.8 365.74 52.8 356.73 28.89 338.26 28.89"
            />
            <rect
              fill="currentColor"
              x="240.38"
              y="5.13"
              width="20.71"
              height="25.59"
            />
          {/* </g>
        </g>
      </g> */}
    </svg>
  );
};

export default NetwatchLogo;
