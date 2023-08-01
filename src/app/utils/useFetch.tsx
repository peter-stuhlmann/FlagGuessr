import { useEffect, useState } from 'react';

import { Country, OriginalCountryObject } from '../types';

export function useFetch() {
  const [data, setData] = useState<Country[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const apiUrl =
    'https://restcountries.com/v3.1/independent?status=true&fields=flags,name,translations,continents';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error('Fehler beim Abrufen der Daten');
        }

        const responseData = await response.json();

        const transformedData = responseData.map(
          (countryObject: OriginalCountryObject) => {
            return {
              name: {
                eng: countryObject.name.common,
                deu: countryObject.translations.deu.common,
              },
              flag: countryObject.flags.svg,
              continents: countryObject.continents,
            };
          }
        );

        setData(transformedData);
        setIsLoading(false);
        setError(null);
      } catch (error) {
        console.error('Fehler beim Abrufen der Daten:', error);
        setError('Es ist ein Fehler aufgetreten.'); // Fehlermeldung setzen
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, isLoading, error };
}
