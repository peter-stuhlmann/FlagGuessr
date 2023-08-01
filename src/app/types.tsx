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
  continents: string[];
};

export type Country = {
  name: {
    deu: string;
    eng: string;
  };
  flag: string;
  continents: string[];
};

export type Category = {
  eng: string;
  deu: string;
};
