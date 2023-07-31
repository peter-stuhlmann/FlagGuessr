'use client';

import { styled } from 'styled-components';

export default function AnswerOption({
  option,
  index,
  handleNextFlag,
  correctAnswer,
  isAnswerCorrect,
  isAnswerSelected,
}: {
  option: string;
  index: number;
  handleNextFlag: any;
  correctAnswer: number | null;
  isAnswerCorrect: boolean | null;
  isAnswerSelected: boolean;
}): JSX.Element {
  return (
    <Option
      key={option}
      onClick={() => handleNextFlag(option)}
      $isAnswerCorrect={isAnswerCorrect && correctAnswer === index}
      $isAnswerWrong={!isAnswerCorrect && correctAnswer === index}
      $isAnswerSelected={isAnswerSelected}
    >
      {option}
    </Option>
  );
}

const Option = styled.div<{
  $isAnswerCorrect: boolean | null;
  $isAnswerWrong: boolean | null;
  $isAnswerSelected: boolean;
}>`
  background-color: ${(p) =>
    p.$isAnswerSelected
      ? p.$isAnswerCorrect
        ? '#00ce45'
        : '#cecece' && p.$isAnswerWrong
        ? '#ce0000'
        : '#cecece'
      : '#cecece'};
  padding: 10px 20px;
  margin-bottom: 20px;
  cursor: pointer;
  width: 300px;
  border-radius: 5px;
  user-select: none;

  ${(p) =>
    !p.$isAnswerSelected &&
    `&:hover {
      background-color: ${p.$isAnswerSelected ? '#cecece' : '#a5a5a5'}
  }`}
`;
