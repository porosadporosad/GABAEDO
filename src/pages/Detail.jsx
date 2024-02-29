import React, { useEffect, useState } from 'react';
import { Map, MapMarker, MapTypeControl, ZoomControl } from 'react-kakao-maps-sdk';
import styled from 'styled-components';
import { useQuery } from 'react-query';
import { getPosts, getPlaces } from 'shared/database';
import SidePage from 'components/detail/SidePage';
import { useParams } from 'react-router';
import Searchmodal from 'components/detail/Searchmodal';
import Loading from 'components/Loading';

const mapCenterDefault = { lat: 37.578611, lng: 126.977222 };

export default function Detail() {
  const [isOpenIndex, setIsOpenIndex] = useState(null);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [mapCenter, setMapCenter] = useState(mapCenterDefault);

  const closeModal = () => {
    setSelectedPlace(null);
  };

  /** 파이어베이스에서 게시글 & 장소 정보를 불러옴 */
  const { isLoading: isLoadingPosts, isError: isErrorPosts, data: postsData } = useQuery('posts', getPosts);
  const { isLoading: isLoadingPlaces, isError: isErrorPlaces, data: placesData } = useQuery('places', getPlaces);
  const { id } = useParams();

  const handlePlaceClick = (lat, lng) => {
    setMapCenter({ lat, lng });
  };

  useEffect(() => {
    // 초기화를 이곳으로 이동
    const firstPlace = placesData && placesData.length > 0 ? placesData[0] : mapCenterDefault;
    setMapCenter(firstPlace);
  }, [placesData]);

  useEffect(() => {
    const placeData = placesData && placesData.filter((item) => item.postId === id);
    if (placeData && placeData.length > 0) {
      setMapCenter({ lat: placeData[0].lat, lng: placeData[0].lng });
    }
  }, [placesData, id]);

  if (isLoadingPosts || isLoadingPlaces) {
    return <Loading text="Loading" />;
  }

  if (isErrorPosts || isErrorPlaces) {
    return <Loading text="Error" />;
  }

  const postData = postsData && postsData.find((post) => post.id === id);
  const placeData = placesData && placesData.filter((item) => item.postId === id);

  // 클릭한 마커의 인덱스를 저장
  const handleMarkerClick = (index) => {
    setIsOpenIndex(index);
    setSelectedPlace(placeData[index]);
  };

  return (
    <StFullScreenContainer>
      <SidePage postData={postData} placeData={placeData} onPlaceClick={handlePlaceClick} />
      {selectedPlace && (
        <ModalContainer>
          <Searchmodal closeModal={closeModal} placeData={placeData} selectedPlace={selectedPlace} />
        </ModalContainer>
      )}
      <Map
        center={mapCenter}
        style={{
          width: 'calc(100% - 450px)',
          height: '100%',
          marginLeft: '450px'
        }}
      >
        <MapTypeControl position={'TOPRIGHT'} />
        <ZoomControl position={'RIGHT'} />
        {placeData.map((place, index) => (
          <MapMarker
            key={place.name}
            position={{ lat: place.lat, lng: place.lng }}
            clickable={true}
            onClick={() => handleMarkerClick(index)}
          >
            {isOpenIndex === index && (
              <div>
                <div style={{ textAlign: 'center', padding: '10px', minWidth: '150px', color: '#784b31' }}>
                  {place.name}
                </div>
              </div>
            )}
          </MapMarker>
        ))}
      </Map>
    </StFullScreenContainer>
  );
}

const StFullScreenContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
`;

const ModalContainer = styled.div`
  position: absolute;
  top: 0;
  left: 450px;
  width: 350px;
  height: 100%;
  z-index: 9999;

  background-color: white;
  border-right: 1px solid #001d84;
  transition: right 0.3s ease;
`;
