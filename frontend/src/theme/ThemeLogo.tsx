import React from 'react';
import logo from '../static/old_ppl_logo.png';

export function ThemeLogo() {
  return (
    <div className="fixed top-0 left-0 z-50 p-3">
      <img src={logo} alt="logo" className="w-8 h-auto" />
    </div>
  );
}
