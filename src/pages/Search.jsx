import React, { useState } from 'react';
import { Map, MapMarker, MapTypeControl, ZoomControl } from 'react-kakao-maps-sdk';
import styled from 'styled-components';
import SearchSidePage from '../components/search/SearchSidePage';

function Search() {
  const [searchResults, setSearchResults] = useState([]);
  const [zoomLevel, setZoomLevel] = useState(5);
  const [mapCenter, setMapCenter] = useState({ lat: 37.575489, lng: 126.976733 });

  const moveToLocation = (lat, lng) => {
    setMapCenter({ lat, lng });
    setZoomLevel(2); // 줌 레벨을 변경하는 값, 필요에 따라 조정
  };

  const handleSearch = (searchQuery) => {
    const ps = new window.kakao.maps.services.Places();

    const placesSearchCB = (data, status) => {
      if (status === window.kakao.maps.services.Status.OK) {
        setMapCenter({ lat: parseFloat(data[0].y), lng: parseFloat(data[0].x) });
        setSearchResults(data);
        console.log('검색 결과:', data);
      } else {
        alert('검색 결과를 찾을 수 없습니다.');
      }
    };

    ps.keywordSearch(searchQuery, placesSearchCB);
  };

  return (
    <StFullScreenContainer>
      <SearchSidePage onSearch={handleSearch} searchResults={searchResults} onMoveToLocation={moveToLocation} />
      <Map
        center={mapCenter}
        style={{
          width: 'calc(100% - 400px)',
          height: '100%',
          marginLeft: '400px'
        }}
        level={zoomLevel}
      >
        <MapTypeControl position={'TOPRIGHT'} />
        <ZoomControl position={'RIGHT'} />
        {searchResults.map((result, index) => (
          <MapMarker key={index} position={{ lat: parseFloat(result.y), lng: parseFloat(result.x) }} />
        ))}
      </Map>
    </StFullScreenContainer>
  );
}

export default Search;

const StFullScreenContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
`;
