import React from 'react';

function ButtonComponent(props: { onClick: any; label: string }) {
  return <button onClick={props.onClick}>{props.label}</button>;
}

export default ButtonComponent;
