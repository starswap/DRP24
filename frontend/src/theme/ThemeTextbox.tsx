import React from 'react';

export default function ThemeTextbox(
  props: React.InputHTMLAttributes<HTMLInputElement>
) {
  return (
    <input
      className="bg-gray-500 placeholder-black m-1 px-1"
      type="text"
      {...props}
    />
  );
}
