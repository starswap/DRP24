import React from 'react';
import { Link, LinkProps } from 'react-router-dom';

export function ThemeLink(props: LinkProps) {
  return (
    <Link
      {...props}
      className={
        // eslint-disable-next-line react/prop-types
        `m-1 border border-gray-500 rounded-md ${props.className === '' || props.className === undefined ? 'bg-green-100' : props.className} p-1 `
      }
    />
  );
}
