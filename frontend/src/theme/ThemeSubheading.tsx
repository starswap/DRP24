import React from 'react';
export const ThemeSubheading = (props: React.HTMLProps<HTMLHeadingElement>) => (
  <>
    <h2 className="text-3xl border border-0 border-b-[2px] border-black flex-1 w-full text-center pb-2 ">
      {props.children}
    </h2>
  </>
);
