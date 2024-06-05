import { ThemeButton } from '../theme/ThemeButton';

export type ThemeGridProps = {
  save: (a: string) => void;
  selected: (a: string) => boolean;
  options: string[];
  display?: (a: string) => string;
  width: number;
};

export function ThemeGrid({
  save,
  selected,
  options,
  display,
  width
}: ThemeGridProps) {
  return (
    <>
      <div className={'grid grid-cols-' + width}>
        {options.map((v) => (
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
        ))}
      </div>
    </>
  );
}
