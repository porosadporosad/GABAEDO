import styled, { keyframes } from 'styled-components';

export default function RankList({ UserRank }) {
  
  const duplicatedUserRank = [...UserRank, ...UserRank];

  return (
    <ListSection>
      <InfiniteScroll length={UserRank.length}>
        {duplicatedUserRank.map((user, index) => (
          <RankListBox>
            <UserNickname key={index}>{(index === 0 || index === UserRank.length) && <CrownIcon>👑</CrownIcon>}{user.nickname}{(index === 0 || index === UserRank.length) && <CrownIcon>👑</CrownIcon>}</UserNickname>
            <PostsNumber>{user.number}개의 가배도</PostsNumber>
          </RankListBox>
        ))}
      </InfiniteScroll>
    </ListSection>
  );
}

const slide = keyframes`
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-100%);
  }
`;

const ListSection = styled.section`
  overflow: hidden;
  padding: 10px;
  display: flex; 
  align-items: center;
  text-align: center;
`;

const slideInfinite = keyframes`
  0% {
    transform: translateX(0%);
  }
  100% {
    transform: translateX(-50%);
  }
`;

const InfiniteScroll = styled.div`
  display: flex;
  animation: ${slideInfinite} 20s linear infinite;
`;


const RankListBox = styled.div`
  flex: 0 0 auto; 
  padding: 10px 0;
  min-width: calc(100% / 5 - 15px); 
  background-color: #e0c3ae;
  border-radius: 20px;
  box-shadow: 2px 2px 5px 2px #b6856aa7;
  margin-right: 15px;  
  display: flex; 
  justify-content: center;
  align-items: center; 
  flex-direction: column;
`;

const UserNickname = styled.h4`
  padding: 10px 0;
  font-family: 'SunBatang-Medium';
  color: #784b31;
`;

const PostsNumber = styled.p`
  font-size: 14px;
  color: #fff;
`;

const CrownIcon = styled.span`
  display: inline-block;
  font-size: 20px; 
  filter: brightness(1.4);
  margin-bottom: 5px;
`;