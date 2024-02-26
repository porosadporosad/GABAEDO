import { addDoc, collection } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCurrentUser } from 'shared/database';
import { db } from 'shared/firebase';
import styled from 'styled-components';
import { hashtageData } from 'shared/hashtageData';

export default function CreatePost({ modalIsOpen, setModalIsOpen }) {
  const navigate = useNavigate();
  const { data } = useCurrentUser();
  const { fullEmail, nickname } = data;
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [hashtag, setHashtag] = useState([]);
  const [postId, setPostId] = useState('');

  // 모달이 켜지면 포스트 id 가 만들어집니다.
  useEffect(() => {
    setPostId(crypto.randomUUID());
  }, []);

  const addHashtag = (e) => {
    if (hashtag.length >= 4) {
      // 4개까지만 고를 수 있도록 배열 길이 조절
      hashtag.length = 4;
    } else {
      setHashtag((prev) => {
        // 중복 해시태그 방지
        if (!prev.includes(e.target.value)) {
          return [...prev, e.target.value];
        } else {
          return prev;
        }
      });
    }
  };

  const addPost = async (e) => {
    e.preventDefault();

    const newPost = {
      postId,
      userId: fullEmail,
      nickname,
      createdAt: new Date().toISOString(),
      title,
      content,
      hashtag
    };

    try {
      await addDoc(collection(db, 'posts'), newPost);

      // 모달 끄기
      setModalIsOpen(!modalIsOpen);
      navigate(`detail/${postId}`);
    } catch (error) {
      console.error('게시글 추가하기 에러', error);
      throw error;
    }
  };

  return (
    <AddPostModalbody>
      <h1>새 가배도 등록 ☕️</h1>
      <PostForm>
        <h2>타이틀</h2>
        <PostInput
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="ex) 공부하기 좋은 잠실 카페"
        />
        <h2>소개 한마디</h2>
        <PostInput
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="ex) 작업하러 가기 좋았던 곳들이에요."
        />
        <PostSelect defaultValue="default" onChange={addHashtag}>
          <option value="default" disabled>
            # 태그를 골라주세요. (1개~4개)
          </option>
          {hashtageData.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </PostSelect>
        <HashtagSection>
          {hashtag.map((item) => (
            <p key={item}>{item}</p>
          ))}
        </HashtagSection>
        <BtnSection>
          <button
            onClick={(e) => {
              e.preventDefault();
              setModalIsOpen(!modalIsOpen);
            }}
          >
            취소하기
          </button>
          <button onClick={addPost}>등록하기</button>
        </BtnSection>
      </PostForm>
    </AddPostModalbody>
  );
}

const AddPostModalbody = styled.section`
  width: 400px;
  margin: auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;

  background-color: #e0c3ae;
  border: 2px solid #784b31;
  border-radius: 50px;
  box-shadow: 5px 5px 20px 3px #e0c3ae;

  & h1 {
    height: 50px;
    line-height: 45px;

    font-size: 1.5rem;
    font-family: 'SunBatang-Medium';
    color: #784b31;
  }
`;

const PostForm = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;

  gap: 15px;

  & h2 {
    margin-top: 3px;
    font-family: 'SunBatang-Bold';
    color: #784b31;
  }
`;

const PostInput = styled.input`
  height: 50px;
  display: block;
  padding: 10px;

  border: none;
  border-radius: 15px;
`;

const PostSelect = styled.select`
  height: 40px;
  padding: 10px;

  color: #784b31;
  border: none;
  border-radius: 15px;
`;

const HashtagSection = styled.section`
  display: flex;
  justify-content: center;
  gap: 10px;
  flex-wrap: wrap;

  & p {
    padding: 10px 20px;

    font-size: 13px;
    color: #784b31;
    background-color: #fff;
    /* border: 1px solid #784b31; */
    border-radius: 30px;
  }
`;

const BtnSection = styled.section`
  height: 50px;
  display: flex;
  gap: 10px;

  & button {
    width: 50%;

    font-size: 17px;
    color: #fff;
    background-color: #c70000;
    border: none;
    border-radius: 15px;
    cursor: pointer;
  }
`;
