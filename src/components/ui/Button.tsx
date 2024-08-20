'use client';

import { type ComponentProps } from 'react';

export function Button({ children, ...props }: ComponentProps<'button'>) {
  const { className, ...otherProps } = props;

  return (
    <button
      className={`bg-light-green text-foreground hover:bg-light-green/80 hover:text-foreground/80 rounded-full px-12 py-6 ${className}`}
      type="button"
      {...otherProps}
    >
      {children}
    </button>
  );
}
