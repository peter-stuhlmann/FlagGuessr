'use client';

import { useState } from 'react';

import Footer from './components/Footer';
import Header from './components/Header';
import Question from './components/Question';

export default function Home(): JSX.Element {
  const [roundsPlayed, setRoundsPlayed] = useState<number>(0);
  const [score, setScore] = useState<number>(0);

  return (
    <>
      <Header score={score} roundsPlayed={roundsPlayed} />
      <main>
        <Question
          score={score}
          setScore={setScore}
          roundsPlayed={roundsPlayed}
          setRoundsPlayed={setRoundsPlayed}
        />
      </main>
      <Footer />
    </>
  );
}
