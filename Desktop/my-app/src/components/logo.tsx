import React from 'react';

interface LogoProps {
  height: string | number;
}

const Logo: React.FC<LogoProps> = ({ height }) => {
  return (
    <div>
      <img
         src={require('./_logo.png')}
        alt="Logo ammic"
        style={{ height: height, width: 'auto' }}
      />
    </div>
  );
};

export default Logo;
