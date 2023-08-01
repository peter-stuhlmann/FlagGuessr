'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { styled } from 'styled-components';

import AnswerOption from './AnswerOption';

import { Category, Country } from '../types';

import { useFetch } from '../utils/useFetch';

const DELAY_CORRECT_ANSWER = 300;
const DELAY_WRONG_ANSWER = 1500;

export default function Question({
  score,
  setScore,
  roundsPlayed,
  setRoundsPlayed,
  category,
  setSelectedCategory,
  setStep,
}: {
  score: number;
  setScore: (score: number) => void;
  roundsPlayed: number;
  setRoundsPlayed: (roundsPlayed: number) => void;
  category: Category;
  setSelectedCategory: (selectedCategory: Category | null) => void;
  setStep: (step: number) => void;
}): JSX.Element {
  const [countries, setCountries] = useState<Country[] | null>(null);
  const [countriesList, setCountriesList] = useState<string[]>([]);
  const [currentCountry, setCurrentCountry] = useState<number>(0);
  const [options, setOptions] = useState<string[]>([]);

  const [isAnswerSelected, setIsAnswerSelected] = useState<boolean>(false);
  const [isWaitingForNext, setIsWaitingForNext] = useState<boolean>(false);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean | null>(null);

  const [correctAnswer, setCorrectAnswer] = useState<number | null>(null);

  const { data, isLoading, error } = useFetch();

  useEffect(() => {
    if (!data) return;

    // Filter by category (continent)
    const filteredArray =
      category.eng === 'Worldwide'
        ? [...data]
        : data.filter((country) => country.continents.includes(category.eng));

    // Randomize the order of the country objects
    const shuffledArray = [...filteredArray];

    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }

    setCountries(shuffledArray);

    // Create a list with country names
    const commonNamesArray = filteredArray.map((item) => item.name.deu);
    setCountriesList(commonNamesArray);
  }, [data, category]);

  useEffect(() => {
    const createOptions = () => {
      if (!countriesList || !countries || currentCountry === countries.length)
        return;

      // Make a copy of the country name array (countriesList) and remove the correct answer
      const remainingCountries = countriesList.slice();
      const currentCountryName = countries[currentCountry].name.deu;
      const indexToRemove = remainingCountries.indexOf(currentCountryName);
      remainingCountries.splice(indexToRemove, 1);

      // Randomize the country name array (countriesList) and select the first three countries as options
      const shuffledCountries = remainingCountries.sort(
        () => 0.5 - Math.random()
      );
      const selectedItems: string[] = shuffledCountries.slice(0, 3);

      // Add the correct answer to the options and randomly mix the answer choices
      selectedItems.push(currentCountryName);
      const shuffledOptions = selectedItems.sort(() => 0.5 - Math.random());
      setOptions(shuffledOptions);

      // Save the index of the correct answer in the options list
      const correctAnswerIndex = shuffledOptions.indexOf(currentCountryName);
      setCorrectAnswer(correctAnswerIndex);
    };

    if (!countries) return;
    createOptions();
  }, [countries, countriesList, currentCountry]);

  const handleNextFlag = (option: string) => {
    if (!countriesList || !countries || isWaitingForNext) return;

    setIsAnswerSelected(true);
    setRoundsPlayed(roundsPlayed + 1);

    // Check whether the selected answer is correct or not
    if (option === countries[currentCountry].name.deu) {
      setIsAnswerCorrect(true);
      setScore(score + 1);
    } else {
      setIsAnswerCorrect(false);
    }

    // Duration until the next flag is shown
    setTimeout(
      () => {
        setIsAnswerSelected(false);
        setCurrentCountry(currentCountry + 1);
        setIsWaitingForNext(false); // Reset the waiting state after DELAY seconds
      },
      // If the answer is correct wait DELAY_CORRECT_ANSWER, otherwise DELAY_WRONG_ANSWER
      option === countries[currentCountry].name.deu
        ? DELAY_CORRECT_ANSWER
        : DELAY_WRONG_ANSWER
    );

    setIsWaitingForNext(true); // Set the waiting state to prevent further selection
  };

  // Game reset
  const handleGameEndButton = () => {
    setSelectedCategory(null);
    setScore(0);
    setRoundsPlayed(0);
    setStep(0);
  };

  return isLoading ? (
    <Loading>Flaggen-Quiz wird geladen...</Loading>
  ) : (
    <>
      {countries && currentCountry < countries.length && (
        <>
          <FlagContainer>
            <Image
              src={countries[currentCountry].flag}
              alt="Flagge"
              width={450}
              height={300}
              priority
            />
          </FlagContainer>
          <AnswerOptions>
            {options &&
              options.map((option: string, index: number) => (
                <AnswerOption
                  key={option}
                  option={option}
                  index={index}
                  handleNextFlag={handleNextFlag}
                  correctAnswer={correctAnswer}
                  isAnswerCorrect={isAnswerCorrect}
                  isAnswerSelected={isAnswerSelected}
                />
              ))}
          </AnswerOptions>
        </>
      )}
      {countries && currentCountry === countries.length && (
        <GameEnd>
          <p>
            Du hast alle Flaggen{' '}
            {category.eng != 'Worldwide' && <>dieses Kontinents</>}{' '}
            durchgespielt.
          </p>
          <p>
            Erreichte Punktzahl: {score} von {roundsPlayed} gespielten Flaggen.
          </p>
          <button onClick={() => handleGameEndButton()}>
            Zurück zur Kategorieauswahl
          </button>
        </GameEnd>
      )}
    </>
  );
}

const FlagContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 500px;
  width: 450px;
  max-width: 100%;
  margin: 0 auto 15px auto;
  padding: 10px;
  box-sizing: border-box;

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: center;
    height: auto;
  }

  img {
    width: auto;
    max-width: 100%;
    height: auto;
    max-height: 100%;
    border: 1px solid #000;
  }
`;

const AnswerOptions = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 10px;
`;

const Loading = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;
`;

const BUTTON = '#01004b';
const BUTTON_HOVER = '#1c1a86';

const GameEnd = styled.div`
  text-align: center;
  padding: 10px;

  button {
    border: none;
    background-color: ${BUTTON};
    color: #fff;
    padding: 10px 20px;
    box-sizing: border-box;
    margin: 20px auto;
    cursor: pointer;
    width: 300px;
    max-width: 100%;
    border-radius: 5px;
    user-select: none;
    display: flex;
    justify-content: center;

    @media (min-width: 481px) {
      &:hover {
        background-color: ${BUTTON_HOVER};
      }
    }
  }
`;
