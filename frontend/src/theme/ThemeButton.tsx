import React from 'react';

export function ThemeButton(
  props: React.ButtonHTMLAttributes<HTMLButtonElement>
) {
  return (
    <button
      {...props}
      className={
        'm-1 border border-gray-500 rounded-md bg-gray-400 p-1 ' +
        // eslint-disable-next-line react/prop-types
        (props.className ?? '')
      }
    />
  );
}