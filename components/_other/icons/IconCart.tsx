import React from 'react';

const IconCart: React.FC<React.HTMLAttributes<HTMLOrSVGElement>> = props => {
  return (
    <svg
      {...props}
      data-name="Layer 1"
      id="Layer_1"
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M42,56.1H22a11,11,0,0,1-11-11V28.17a11,11,0,0,1,11-11H42a11,11,0,0,1,11,11V45.1A11,11,0,0,1,42,56.1ZM22,21.17a7,7,0,0,0-7,7V45.1a7,7,0,0,0,7,7H42a7,7,0,0,0,7-7V28.17a7,7,0,0,0-7-7Z"
        fill={'currentColor'}
      />
      <path
        d="M44,32.14H40V19a7.17,7.17,0,0,0-7.17-7.17H31.17A7.17,7.17,0,0,0,24,19V32.14H20V19A11.18,11.18,0,0,1,31.17,7.83h1.67A11.18,11.18,0,0,1,44,19Z"
        fill={'currentColor'}
      />
      <circle cx="42" cy="31.99" r="3.01" fill={'currentColor'} />
      <circle cx="22" cy="31.99" r="3.01" fill={'currentColor'} />
    </svg>
  );
};
export default IconCart;
