'use client';
import React, { useEffect, useState } from 'react';
import clsx from 'clsx';

interface FixedSectionProps {
  children: React.ReactNode;
  threshold: number;
  classNameFixed?: string;
  classNameRelative?: string;
}

const FixedSection: React.FC<FixedSectionProps> = ({
  children,
  threshold,
  classNameFixed,
  classNameRelative,
}) => {
  const [isFixed, setIsFixed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= threshold) {
        setIsFixed(true);
      } else {
        setIsFixed(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold]);

  return (
    <div
      className={`w-full ${isFixed ? clsx('fixed flex gap-14 px-5 py-2 z-50 ', classNameFixed) : clsx('flex w-full gap-14 px-5 py-2 ', classNameRelative)}`}
    >
      {children}
    </div>
  );
};

export default FixedSection;
