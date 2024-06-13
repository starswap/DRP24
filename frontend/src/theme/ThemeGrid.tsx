import React from 'react';
import { ThemeButton } from '../theme/ThemeButton';

export type ThemeGridProps = {
  save: (a: string) => void;
  selected: (a: string) => boolean;
  options: string[];
  display?: (a: string) => string;
  width: number;
  addButtons: boolean;
};

export function ThemeGrid({
  save,
  selected,
  options,
  display,
  width,
  addButtons
}: ThemeGridProps) {
  return (
    <>
      <div className={'grid grid-cols-' + width}>
        {options.map((v) => (
          <div key={v}>
            <ThemeButton
              key={v}
              onClick={(event) => {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                save((event as any).target.value);
              }}
              value={v}
              className={selected(v) ? 'bg-green-400' : ''}
            >
              {display === undefined ? v : display(v)}
            </ThemeButton>
            {addButtons && (
              <ThemeButton
                key={v}
                onClick={(event) => {
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  save((event as any).target.value);
                }}
                value={v}
                className={selected(v) ? 'bg-green-400' : ''}
              >
                {!selected(v) ? 'Add' : 'Remove'}
              </ThemeButton>
            )}
          </div>
        ))}
      </div>
    </>
  );
}
