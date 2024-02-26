import styled from 'styled-components';
import { getPosts } from 'shared/database';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router';
import { useState } from 'react';
import CreatePost from './CreatePost';
import { hashtageData } from 'shared/hashtageData';

export default function PostList({ keyword }) {
  const { isLoading, data } = useQuery('posts', getPosts);
  const navigate = useNavigate();
  const [modalIsOpen, setModalIsOpen] = useState(false);

  if (isLoading) {
    return <h1>Loading</h1>;
  }

  const filteredData = data.filter((post) => post.title.includes(keyword) || post.content.includes(keyword));

  const boxClickHandler = (id) => {
    navigate(`detail/${id}`);
  };

  return (
    <>
      <AddPostModal modalIsOpen={modalIsOpen}>
        <CreatePost modalIsOpen={modalIsOpen} setModalIsOpen={setModalIsOpen} />
      </AddPostModal>
      <Article>
        <PostListHeader>
          <ListTitle>가배도 모아보기</ListTitle>
          <CreatePostBtn
            onClick={() => {
              setModalIsOpen(!modalIsOpen);
            }}
          >
            +
          </CreatePostBtn>
        </PostListHeader>
        <AllSection>
          {filteredData.map((post) => (
            <PostListBox key={post.id} onClick={() => boxClickHandler(post.postId)}>
              <h2>{post.title}</h2>
              <p>{post.content}</p>
            </PostListBox>
          ))}
        </AllSection>
        <ListTitle>태그별 가배도</ListTitle>
        <HashtagNav>
          {hashtageData.map((item) => (
            <button key={item}>{item}</button>
          ))}
        </HashtagNav>
      </Article>
    </>
  );
}

const Article = styled.article`
  width: 1200px;
  margin: 0 auto;
`;

const AddPostModal = styled.article`
  position: absolute;
  display: ${(props) => (props.modalIsOpen ? 'flex' : 'none')};
  justify-content: center;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  background-color: #ffffff58;
`;

const PostListHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ListTitle = styled.h1`
  height: 60px;
  line-height: 80px;

  font-family: 'SunBatang-Medium';
  font-size: 25px;
  color: #784b31;
`;

const CreatePostBtn = styled.button`
  width: 40px;
  height: 40px;
  margin: 10px 10px 0 0;

  background-color: #c70000;
  border: none;
  border-radius: 50%;
  color: #fff;
  font-size: 30px;
  cursor: pointer;
`;

const AllSection = styled.section`
  height: 242px;
  padding: 0 10px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  overflow-y: scroll;

  &::-webkit-scrollbar {
    width: 7px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #e0c3ae;
    border-radius: 5px;
    /* box-shadow: inset 0px 0px 5px #fff; */
  }
  &::-webkit-scrollbar-track {
    background-color: #fff9f3;
    border-radius: 5px;
  }
`;

const PostListBox = styled.div`
  width: 380px;
  height: 100px;
  padding: 10px;
  margin: 10px 0;
  text-align: center;
  cursor: pointer;

  /* border: 1px solid #c70000; */
  border-radius: 20px;
  box-shadow: 2px 2px 5px 2px #e0c3aea2;

  & h2 {
    font-family: 'SunBatang-Medium';
    padding: 10px;
    height: 30px;
    font-size: 18px;
    color: #784b31;
  }

  & p {
    padding: 10px;
    color: #b6856a;
  }
`;

const HashtagNav = styled.nav`
  height: 50px;
  line-height: 50px;
  margin: 10px 0;
  display: flex;
  justify-content: space-around;

  background-color: #fff9f3;
  border: 1px solid #e0c3ae;
  border-radius: 15px;

  & button {
    font-family: 'SunBatang-Medium';
    color: #b6856a;
    background-color: transparent;
    border: none;
    cursor: pointer;
  }
`;
