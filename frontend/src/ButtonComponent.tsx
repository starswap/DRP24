import React from 'react';

export function ButtonComponent(props: { onClick: any; label: string }) {
  return <button onClick={props.onClick}>{props.label}</button>;
}

export function ValueButton(props: {
  onClick: any;
  label: string;
  value: string;
}) {
  return (
    <button onClick={props.onClick} value={props.value}>
      {props.label}
    </button>
  );
}
