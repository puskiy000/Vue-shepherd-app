import React from 'react';

const PinLogo = ({ iconColor = '#6E7682' }: any) => {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12.4997 0.25V2.08333H11.583V7.58333L13.4163 10.3333V12.1667H7.91634V18.5833H6.08301V12.1667H0.583008V10.3333L2.41634 7.58333V2.08333H1.49967V0.25H12.4997ZM4.24967 2.08333V8.13847L2.7864 10.3333H11.2129L9.74967 8.13847V2.08333H4.24967Z"
        fill={iconColor}
      />
    </svg>
  );
};

export default PinLogo;
