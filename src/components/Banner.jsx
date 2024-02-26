import React, { useState } from 'react';
import styled from 'styled-components';

export default function Banner({ onSearch }) {
  const [keyword, setKeyword] = useState('');

  return (
    <Article>
      <Section>
        <h1>지도를 검색해 보세요!</h1>
        <input
          type="text"
          placeholder="어떤 카페들이 있을까요?!"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <button type="button" onClick={() => onSearch(keyword)}>
          검색
        </button>
      </Section>
    </Article>
  );
}

const Article = styled.article`
  height: 200px;
  align-items: center;
  background-color: #fff9f3;
`;

const Section = styled.section`
  height: 100%;
  display: flex;
  flex-direction: column;
  place-content: center;
  gap: 20px;

  & h1 {
    width: 100%;
    text-align: center;
    font-size: 20px;
    color: #784b31;
  }

  & input {
    width: 400px;
    height: 40px;
    margin: 0 auto;
    padding-left: 10px;
    border: 1px solid #b6856a;
    border-radius: 10px;
  }

  & button {
    width: 100px;
    height: 40px;
    margin: 0 auto;
    background-color: #e0c3ae;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    font-size: 16px;
    color: #fff9f3;
  }
`;
