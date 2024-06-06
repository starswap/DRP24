import { useState } from 'react';
import { ThemeButton } from '../theme/ThemeButton';

export type MultiPageFormStateProps<T> = {
  state: T;
  updateState: React.Dispatch<React.SetStateAction<T>>;
};

export type MultiPageFormProps<T> = {
  confirm: (state: T) => void;
  cancel: () => void;
  defaultValue: T;
  pages: Array<(s: MultiPageFormStateProps<T>) => JSX.Element>;
  displayOnEveryPage: (s: MultiPageFormStateProps<T>) => JSX.Element;
};

export function MultiPageForm<T>({
  confirm,
  cancel,
  defaultValue,
  pages,
  displayOnEveryPage
}: MultiPageFormProps<T>) {
  const [pageNum, setPageNum] = useState(0);
  const [state, setState] = useState<T>(defaultValue);
  const stateAndSetter = {
    state: state,
    updateState: setState
  };

  const handleNext = () => {
    if (pageNum === pages.length - 1) {
      confirm(state);
    } else {
      setPageNum((pageNum) => pageNum + 1);
    }
  };

  const handleBack = () => {
    if (pageNum === 0) {
      cancel();
    } else {
      setPageNum((pageNum) => pageNum - 1);
    }
  };

  const Page = pages[pageNum];

  return (
    <div className="flex flex-col items-center mx-auto p-4r p-2 w-full">
      <Page {...stateAndSetter} />
      <div>
        <ThemeButton onClick={handleBack}>Back</ThemeButton>
        <ThemeButton onClick={handleNext}>
          {pageNum === pages.length - 1 ? 'Confirm' : 'Next'}
        </ThemeButton>
      </div>
      {displayOnEveryPage(stateAndSetter)}
    </div>
  );
}
