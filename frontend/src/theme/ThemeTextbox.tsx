import React from 'react';

export default function ThemeTextbox(
  props: React.InputHTMLAttributes<HTMLInputElement>
) {
  return (
    <input
      className="bg-white border-black border border-2 rounded-[4px] placeholder-black m-1 px-1"
      type="text"
      {...props}
    />
  );
}
