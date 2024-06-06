export type Person = {
  name: {
    firstname: string;
    surname: string;
  };
};

export type PersonMap = { [k: string]: Person };
