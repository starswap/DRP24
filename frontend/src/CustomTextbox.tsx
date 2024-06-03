import React, { SyntheticEvent } from 'react';
type CustomTextboxProp = {
  displayValue: string;
  handleInput: (event: SyntheticEvent) => void;
};

export default function CustomTextbox({
  displayValue,
  handleInput
}: CustomTextboxProp) {
  return (
    <input
      placeholder="Or enter custom:"
      className="bg-gray-500 placeholder-black m-1 px-1"
      type="text"
      value={displayValue}
      onChange={handleInput}
    />
  );
}
