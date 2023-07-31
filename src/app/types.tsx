export type OriginalCountryObject = {
  name: {
    common: string;
  };
  translations: {
    deu: {
      common: string;
    };
  };
  flags: {
    svg: string;
  };
};

export type Country = {
  name: {
    deu: string;
    eng: string;
  };
  flag: string;
};
