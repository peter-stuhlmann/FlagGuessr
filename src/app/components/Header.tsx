'use client';

import Image from 'next/image';
import styled from 'styled-components';

import Score from './Score';

import { Category } from '../types';

export default function HeaderComponent({
  score,
  roundsPlayed,
  category,
}: {
  score: number;
  roundsPlayed: number;
  category: Category | null;
}): JSX.Element {
  return (
    <Header>
      <div>
        <Image
          src="/logo.png"
          width={318}
          height={50}
          alt="FlagGuessr"
          priority
        />
        {category && <div>{category.deu}</div>}
      </div>
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

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: center;
    margin-bottom: 0;
  }

  & > div:first-child {
    position: relative;

    img {
      max-width: 100%;
      height: auto;
    }

    div {
      position: absolute;
      bottom: -40px;
      right: -30px;
      transform: translateY(-50%) rotate(-5deg);
      color: #fff;
      font-size: 30px;
      background: #cb302e;
      padding: 0 5px;
      border-radius: 5px;
    }
  }
`;
