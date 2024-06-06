import React from 'react';

export function ThemeButton(
  props: React.ButtonHTMLAttributes<HTMLButtonElement>
) {
  return (
    <button
      {...props}
      className={
        // eslint-disable-next-line react/prop-types
        `m-1 border border-gray-500 rounded-md ${props.className === '' || props.className === undefined ? 'bg-yellow-100' : props.className} p-1 `
      }
    />
  );
}
