import React from 'react';
import { Map, MapMarker, MapTypeControl, ZoomControl } from "react-kakao-maps-sdk";
import styled from 'styled-components';
import { SearchBar } from '../components/Mapsearch';

function Detail() {
  
  const handleSearch = (searchTerm) => {
    console.log(searchTerm); 
  };

  return (
    <StFullScreenContainer>
      <StSidebarContainer>
        <SearchBar onSearch={handleSearch} />
      </StSidebarContainer>
      <Map
        center={{ lat: 37.506320759000715, lng: 127.05368251210247 }}
        style={{
          width: 'calc(100% - 300px)', 
          height: '100%', 
          borderRadius: '20px', 
          marginLeft: '300px', 
        }}
      >
        <MapTypeControl position={"TOPRIGHT"} />
        <ZoomControl position={"RIGHT"} />
        <MapMarker
          position={{ lat: 37.506320759000715, lng: 127.05368251210247 }}
        >
          <StMarkerContent>
            {/* 핀 찍힐 위치의 커스텀 내용을 여기에 작성합니다. */}
          </StMarkerContent>
        </MapMarker>
      </Map>
    </StFullScreenContainer>
  );
}

export default Detail;

const StFullScreenContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StSidebarContainer = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 300px; 
  height: 100%;
  background-color: #f5f5f5;
  padding: 20px;
  box-sizing: border-box;
  overflow-y: auto; 
`;

const StMarkerContent = styled.div`
  color: #9971ff;
  font-size: 19px;
  font-weight: 700;
  border: 4px solid #9971ff;
  border-radius: 10px;
  padding: 2.5px;
  `;
