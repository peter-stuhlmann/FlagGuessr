'use client';

import { styled } from 'styled-components';

export default function ScoreComponent({
  score,
  roundsPlayed,
}: {
  score: number;
  roundsPlayed: number;
}): JSX.Element {
  return (
    <Score>
      SCORE: {score}/{roundsPlayed}
    </Score>
  );
}

const Score = styled.div`
  text-align: right;
  color: #fff;
  font-size: 24px;
  margin-left: 15px;

  @media (max-width: 480px) {
    margin-top: 10px;
  }
`;
