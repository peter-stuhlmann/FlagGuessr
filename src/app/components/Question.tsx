'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { styled } from 'styled-components';

import AnswerOption from './AnswerOption';

import { Country } from '../types';

import { useFetch } from '../utils/useFetch';

const DELAY_CORRECT_ANSWER = 300;
const DELAY_WRONG_ANSWER = 1500;

export default function Question({
  score,
  setScore,
  roundsPlayed,
  setRoundsPlayed,
}: {
  score: number;
  setScore: (score: number) => void;
  roundsPlayed: number;
  setRoundsPlayed: (roundsPlayed: number) => void;
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

    // Randomize the order of the country objects
    const shuffledArray = [...data];

    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }

    setCountries(shuffledArray);

    // Create a list with country names
    const commonNamesArray = data.map((item) => item.name.deu);
    setCountriesList(commonNamesArray);
  }, [data]);

  useEffect(() => {
    const createOptions = () => {
      if (!countriesList || !countries) return;

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

  return isLoading ? (
    <Loading>Flaggen-Quiz wird geladen...</Loading>
  ) : (
    <>
      <FlagContainer>
        {countries && (
          <Image
            src={countries[currentCountry].flag}
            alt="Flagge"
            width={450}
            height={300}
          />
        )}
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
  );
}

const FlagContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 500px;

  img {
    width: 450px;
    height: auto;
    border: 1px solid #000;
  }
`;

const AnswerOptions = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Loading = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;
`;
