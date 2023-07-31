'use client';

import Image from 'next/image';
import styled from 'styled-components';
import Score from './Score';

export default function HeaderComponent({
  score,
  roundsPlayed,
}: {
  score: number;
  roundsPlayed: number;
}): JSX.Element {
  return (
    <Header>
      <Image src="/logo.png" width={318} height={50} alt="FlagGuessr" />
      <Score score={score} roundsPlayed={roundsPlayed} />
    </Header>
  );
}

const Header = styled.div`
  padding: 10px;
  margin-bottom: -100px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;
