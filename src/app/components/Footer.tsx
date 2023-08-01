'use client';

import Link from 'next/link';
import styled from 'styled-components';

export default function FooterComponent(): JSX.Element {
  return (
    <Footer>
      <Message>
        Entwickelt von{' '}
        <Link href="https://instagram.com/peter.stuhlmann" target="_blank">
          Peter R. Stuhlmann
        </Link>
      </Message>
      <LegalLinks>
        <Link
          href="https://peter-stuhlmann-webentwicklung.de/impressum"
          target="_blank"
        >
          Impressum
        </Link>
        <Link
          href="https://peter-stuhlmann-webentwicklung.de/datenschutzerklaerung"
          target="_blank"
        >
          Datenschutz
        </Link>
      </LegalLinks>
    </Footer>
  );
}

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px;
  font-size: 14px;
  color: #fff;
  opacity: 0.7;

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: center;
  }

  a {
    text-decoration: none;
    color: inherit;
  }
`;

const Message = styled.div``;

const LegalLinks = styled.div`
  a {
    &:first-child {
      margin-right: 20px;
    }
  }
`;
