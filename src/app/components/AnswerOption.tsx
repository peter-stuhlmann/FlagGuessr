'use client';

import { useEffect, useState } from 'react';
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
  const [numbering, setNumbering] = useState<string | null>(null);

  useEffect(() => {
    index === 0 && setNumbering('A');
    index === 1 && setNumbering('B');
    index === 2 && setNumbering('C');
    index === 3 && setNumbering('D');
  }, [index]);

  return (
    <Option
      key={option}
      onClick={() => handleNextFlag(option)}
      $isAnswerCorrect={isAnswerCorrect && correctAnswer === index}
      $isAnswerWrong={!isAnswerCorrect && correctAnswer === index}
      $isAnswerSelected={isAnswerSelected}
    >
      <Numbering>{numbering}</Numbering> {option}
    </Option>
  );
}

const DEFAULT_ANSWER = '#01004b';
const DEFAULT_ANSWER_HOVER = '#1c1a86';
const CORRECT_ANSWER = '#008f30';
const WRONG_ANSWER = '#ce0000';

const Option = styled.div<{
  $isAnswerCorrect: boolean | null;
  $isAnswerWrong: boolean | null;
  $isAnswerSelected: boolean;
}>`
  background-color: ${(p) =>
    p.$isAnswerSelected
      ? p.$isAnswerCorrect
        ? CORRECT_ANSWER
        : DEFAULT_ANSWER && p.$isAnswerWrong
        ? WRONG_ANSWER
        : DEFAULT_ANSWER
      : DEFAULT_ANSWER};
  color: #fff;
  padding: 10px 20px;
  margin-bottom: 20px;
  cursor: pointer;
  width: 300px;
  border-radius: 5px;
  user-select: none;
  display: flex;

  ${(p) =>
    !p.$isAnswerSelected &&
    `&:hover {
      background-color: ${
        p.$isAnswerSelected ? DEFAULT_ANSWER : DEFAULT_ANSWER_HOVER
      }
  }`}
`;

const Numbering = styled.div`
  width: 25px;
`;
