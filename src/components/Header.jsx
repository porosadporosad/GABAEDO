import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import { auth, db } from '../shared/firebase';
import { collection, doc, updateDoc } from 'firebase/firestore';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useCurrentUser } from 'shared/database';
// import { useQuery } from 'react-query';
// import { getCurrentUser } from 'shared/database';

export default function Header() {
  const [isLogin, setIsLogin] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [userImg, setUserImg] = useState('');

  const navigate = useNavigate();
  // const { data } = useCurrentUser();

  const userId = JSON.parse(localStorage.getItem('userId'));

  // console.log('userDocRef', userDocRef);

  useEffect(() => {
    const loginCheck = () => {
      // 현재 유저가 로그인 되어있는지 확인
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setUserImg(user.photoURL);
          setIsLogin(true);
        } else {
          setIsLogin(false);
        }
      });
    };
    loginCheck();
  }, []);

  const logoutClick = async () => {
    const logoutConfirm = window.confirm('로그아웃 하시겠습니까?');
    if (logoutConfirm) {
      // await updateDoc(userDocRef, { isloggedin: false })
      // const userDocRef = doc(db, 'users', userId);
      // await userDocRef.doc(userId).update({ isloggedin: false });
      // const infoRef = doc(db, 'users', userId);
      // await updateDoc(infoRef, { isloggedin: false });

      //로그아웃
      signOut(auth)
        .then(() => {
          window.localStorage.clear();
          toast.success('로그아웃되었습니다.');
          navigate('/');
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      return false;
    }
  };

  // 다른곳 클릭 시 메뉴 끄기
  const userMenuOnBlur = () => {
    setTimeout(() => {
      setIsActive(false);
    }, 200);
  };

  // 유저메뉴 열기 닫기
  const userIsActiveBtn = () => {
    setIsActive(!isActive);
  };

  return (
    <MenuHeader>
      <StLink to="/">
        <h3>가배도</h3>
      </StLink>
      <nav>
        <MenuUl>
          <StLink to="/about">
            <li>사이트 소개</li>
          </StLink>
          {isLogin ? (
            <ProfileBtnDiv>
              <ImgDiv tabIndex={0} onBlur={userMenuOnBlur}>
                <ImgStyle onClick={userIsActiveBtn} src={userImg} alt="프로필사진" />
              </ImgDiv>
              <UserMenuDiv onBlur={userMenuOnBlur}>
                <UserBtn onClick={userIsActiveBtn}>🔽</UserBtn>
                <UserUl $isActive={isActive}>
                  <UserLi>
                    <StyledLink to="/mypage">마이 페이지</StyledLink>
                  </UserLi>
                  <UserLi>
                    <Logout onClick={logoutClick}>로그아웃</Logout>
                  </UserLi>
                </UserUl>
              </UserMenuDiv>
            </ProfileBtnDiv>
          ) : (
            <StLink to="/login">
              <li>로그인 / 회원가입</li>
            </StLink>
          )}
        </MenuUl>
      </nav>
    </MenuHeader>
  );
}

const MenuHeader = styled.header`
  height: 50px;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  z-index: 1000;

  background-color: white;
  border-bottom: 1px solid #001d84;

  & h2 {
  }
`;

const StLink = styled(Link)`
  text-decoration: none;

  & h3 {
    font-family: 'SunBatang-Medium';
    color: #784b31;
  }
`;

const MenuUl = styled.ul`
  display: flex;
  gap: 20px;
  align-items: center;

  & li {
    color: #b6856a;
  }
`;

//dd

const ImgDiv = styled.div`
  width: 3rem;
  height: 3rem;
  cursor: pointer;
  overflow: hidden;
  border-radius: 50%;
`;

const ImgStyle = styled.img`
  height: 100%;
  object-fit: cover;
`;

const UserMenuDiv = styled.div`
  position: relative;
`;

const UserBtn = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
`;

const UserUl = styled.ul`
  display: ${({ $isActive }) => ($isActive ? 'block' : 'none')};
  position: absolute;
  top: 100%;
  right: 0;
  background-color: white;
  min-width: 7rem;
  box-shadow: 0 0.5rem 2rem #f5f5f5;
  z-index: 1;
  color: #b6856a;
`;

const UserLi = styled.li`
  list-style: none;
`;

const StyledLink = styled(Link)`
  display: block;
  padding: 0.6rem;
  text-decoration: none;
  color: #b6856a;
  &:hover {
    background-color: #f5f5f5;
  }
`;

const Logout = styled.span`
  display: block;
  padding: 0.6rem;
  background-color: transparent;
  border: none;
  cursor: pointer;
  &:hover {
    background-color: #f5f5f5;
  }
`;

const ProfileBtnDiv = styled.div`
  display: flex;
  align-items: center;
`;
