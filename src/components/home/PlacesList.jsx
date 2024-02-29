import { useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import youtubeIcon from 'assets/youtube-icon.png';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function PlacesData({ placesData }) {
  const navigate = useNavigate();
  const [cafeName, setCafeName] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
          params: {
            key: process.env.REACT_APP_YOUTUBE,
            part: 'snippet',
            q: `카페 ${cafeName}`,
            type: 'video',
            maxResults: 6
          }
        });
        setSearchResults(response.data.items);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    fetchData();
  }, [cafeName]);

  return (
    <ListSection>
      <PlacesSection>
        {placesData.map((place) => (
          <PlaceBox key={place.id}>
            <h2>{place.name}</h2>
            <h3>{place.address}</h3>
            <BtnSection>
              <MoveToDetailBtn onClick={() => navigate(`detail/${place.postId}`)}>가배도 보러가기</MoveToDetailBtn>
              <YoutubeBtn onClick={() => setCafeName(place.name)}>
                <YoutubeIcon src={youtubeIcon} alt="유튜브 아이콘" />
              </YoutubeBtn>
            </BtnSection>
          </PlaceBox>
        ))}
      </PlacesSection>
      <YoutubeSection>
        <InnerBox>
          {searchResults.map((item) => (
            <div key={item.etag}>
              <div>
                <a
                  href={`https://www.youtube.com/watch?v=${item.id.videoId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={item.snippet.thumbnails.high.url} alt="" />
                </a>
              </div>
              <h1>{item.snippet.title}</h1>
            </div>
          ))}
        </InnerBox>
      </YoutubeSection>
    </ListSection>
  );
}

const bounceAnimation = keyframes`
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-5px);
  }
  100% {
    transform: translateY(0);
  }
`;

const ListSection = styled.section`
  height: 395px;
  /* padding: 0 10px; */
  display: grid;
  grid-template-columns: 330px 1fr;
  /* gap: 15px; */
`;

const PlacesSection = styled.section`
  padding: 0 10px;
  overflow-y: scroll;
`;

const PlaceBox = styled.div`
  width: 300px;
  height: 120px;
  padding: 10px;
  margin: 10px 0;
  text-align: center;

  /* border: 1px solid #c70000; */
  background-color: #fff9f3;
  border-radius: 20px;
  box-shadow: 2px 2px 5px 2px #e0c3aea2;

  & h2 {
    font-family: 'SunBatang-Medium';
    padding: 10px;
    height: 30px;
    font-size: 18px;
    color: #784b31;
  }

  & h3 {
    padding: 10px;
    color: #b6856a;
  }
`;

const BtnSection = styled.section`
  display: flex;
  justify-content: center;
  gap: 20px;
  height: 30px;

  & button {
    background-color: transparent;
    border: none;
    cursor: pointer;
  }
`;

const MoveToDetailBtn = styled.button`
  padding: 0 10px;
  color: #c70000;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const YoutubeBtn = styled.button`
  &:hover img {
    animation: ${bounceAnimation} 1s infinite;
  }
`;

const YoutubeIcon = styled.img`
  height: 100%;
`;

const YoutubeSection = styled.section`
  overflow-y: scroll;
`;

const InnerBox = styled.div`
  margin: 10px;
  padding: 0 20px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  text-align: center;

  /* border-top: 2px solid #e0c3ae; */

  & img {
    width: 100%;
    border-radius: 20px;
  }
  & h1 {
    margin-top: 2px;
    line-height: 30px;
    color: #784b31;
  }
`;
