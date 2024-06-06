import React from 'react';
export const ThemeSubheading = (props: React.HTMLProps<HTMLHeadingElement>) => (
  <>
    <h2>{props.children}</h2>
    <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />
  </>
);
