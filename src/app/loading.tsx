'use client'

import React from 'react';
import { MoonLoader } from 'react-spinners';
import styled from '@emotion/styled';

// 스타일드 컴포넌트를 생성
const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center; /* 컨텐츠를 수직, 수평 중앙 정렬 */
  height: 100vh; /* 화면 전체 높이 */
`;

// const LoadingText = styled.p`
//   margin-top: 100px;
//   margin-Left: 20px;
//   font-size: 20px;
// `;
const Loading: React.FC = () => {
  return (
    <LoadingContainer>
      <MoonLoader color={'#000000'} loading={true} size={150} />
      {/* <LoadingText>...</LoadingText> */}
    </LoadingContainer>
  );
};

export default Loading;
