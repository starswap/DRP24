import { HTMLProps } from 'react';

export function ThemeHeading(props: HTMLProps<HTMLHeadingElement>) {
  return <h1 className="text-3xl mb-5" {...props} />;
}
