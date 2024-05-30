import React from 'react';

export function ButtonComponent(props: { onClick: any; label: string }) {
  return (
    <button
      className="m-1 border border-gray-500 rounded-md bg-gray-400 p-1"
      onClick={props.onClick}
    >
      {props.label}
    </button>
  );
}

export function ValueButton(props: {
  onClick: any;
  label: string;
  value: string;
}) {
  return (
    <button
      className="m-1 border border-gray-500 rounded-md bg-gray-400 p-1 w-auto"
      onClick={props.onClick}
      value={props.value}
    >
      {props.label}
    </button>
  );
}
