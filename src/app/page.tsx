'use client';

import { useState } from 'react';
import { styled } from 'styled-components';

import Footer from './components/Footer';
import Header from './components/Header';
import Question from './components/Question';

import { categories } from './data/data';

import { Category } from './types';

export default function GameScreen(): JSX.Element {
  const [roundsPlayed, setRoundsPlayed] = useState<number>(0);
  const [score, setScore] = useState<number>(0);

  const [step, setStep] = useState<number>(0);

  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );

  const handleCategoryClick = (category: Category) => {
    setSelectedCategory(category);
    setStep(1);
  };

  return (
    <>
      <Header
        score={score}
        roundsPlayed={roundsPlayed}
        category={selectedCategory}
      />
      <main>
        {step === 0 && (
          <Container>
            <Heading>Wähle eine Kategorie</Heading>
            {categories.map((category: Category) => (
              <Category
                key={category.deu}
                onClick={() => handleCategoryClick(category)}
              >
                {category.deu}
              </Category>
            ))}
          </Container>
        )}

        {step === 1 && selectedCategory && (
          <Question
            score={score}
            setScore={setScore}
            roundsPlayed={roundsPlayed}
            setRoundsPlayed={setRoundsPlayed}
            category={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            setStep={setStep}
          />
        )}
      </main>
      <Footer />
    </>
  );
}

const CATEGORY = '#01004b';
const CATEGORY_HOVER = '#1c1a86';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 10px;
`;

const Heading = styled.div`
  font-size: 24px;
  color: #fff;
  margin: 20px;
`;

const Category = styled.div`
  background-color: ${CATEGORY};
  color: #fff;
  padding: 10px 20px;
  box-sizing: border-box;
  margin-bottom: 20px;
  cursor: pointer;
  width: 300px;
  max-width: 100%;
  border-radius: 5px;
  user-select: none;
  display: flex;

  @media (min-width: 481px) {
    &:hover {
      background-color: ${CATEGORY_HOVER};
    }
  }
`;
