import React from "react";

type Props = {
  className?: string;
};

const Pyramid = ({ className }: Props) => {
  // return (
  //   <svg
  //     xmlns="http://www.w3.org/2000/svg"
  //     version="1.1"
  //     width="512"
  //     height="512"
  //     x="0"
  //     y="0"
  //     viewBox="0 0 32 32"
  //     className={className}
  //   >
  //     <g>
  //       <path
  //         d="M2.645 31h26.71l.848-1.383-6.81-13.612-1.059 2.127-5.485 10.96h-1.698l-5.475-10.96-1.069-2.127-6.81 13.612zM15.151 2.908h1.698l5.485 10.96 1.059 2.137 6.81-13.622L29.355 1H2.645l-.848 1.383 6.81 13.622 1.059-2.137z"
  //         fill="currentColor"
  //         opacity="1"
  //         data-original="currentColor"
  //       ></path>
  //       <path
  //         d="M21.266 16.005 16 5.474l-5.266 10.531L16 26.536z"
  //         fill="currentColor"
  //         opacity="1"
  //         data-original="currentColor"
  //       ></path>
  //     </g>
  //   </svg>
  // );
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      width="512"
      height="512"
      x="0"
      y="0"
      viewBox="0 0 32 32"
      className={className}
    >
      <g>
        <path
          d="M2 31h28l.895-1.447L24.118 16l6.777-13.553L30 1H2l-.895 1.447L7.882 16 1.105 29.553Zm26.382-2H17.618L23 18.236Zm0-26L23 13.764 17.618 3Zm-6.5 13L16 27.764 10.118 16 16 4.236ZM3.618 3h10.764L9 13.764ZM9 18.236 14.382 29H3.618Z"
          fill="currentColor"
          opacity="1"
          data-original="currentColor"
        ></path>
      </g>
    </svg>
  );
  // return (
  //   <svg
  //     xmlns="http://www.w3.org/2000/svg"
  //     version="1.1"
  //     width="512"
  //     height="512"
  //     x="0"
  //     y="0"
  //     viewBox="0 0 32 32"
  //     className={className}
  //   >
  //     <g>
  //       <path
  //         d="m30.895 29.553-14-28h-1.79l-14 28L2 31h28ZM16 4.236 21.382 15H10.618ZM3.618 29 9 18.236 14.382 29Zm7-12h10.764L16 27.764Zm7 12L23 18.236 28.382 29Z"
  //         fill="currentColor"
  //         opacity="1"
  //         data-original="currentColor"
  //       ></path>
  //     </g>
  //   </svg>
  // );
};

export default Pyramid;
