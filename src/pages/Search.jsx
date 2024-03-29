import styled from 'styled-components';
import AddModal from 'components/search/Addmodal';
import SearchSidePage from 'components/search/SearchSidePage';
import { useState } from 'react';
import { useParams } from 'react-router';
import { Map, MapMarker, MapTypeControl, ZoomControl } from 'react-kakao-maps-sdk';

export default function Search() {
  const { id } = useParams();
  const [isOpen, setIsOpen] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(5);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [mapCenter, setMapCenter] = useState({ lat: 37.575489, lng: 126.976733 });

  const moveToLocation = (lat, lng) => {
    setMapCenter({ lat, lng });
    setZoomLevel(1); // 줌 레벨을 변경하는 값, 필요에 따라 조정
  };

  const handleSearch = (searchQuery) => {
    const ps = new window.kakao.maps.services.Places();

    const placesSearchCB = (data, status) => {
      if (status === window.kakao.maps.services.Status.OK) {
        setMapCenter({ lat: parseFloat(data[0].y), lng: parseFloat(data[0].x) });
        setSearchResults(data);
      } else {
        alert('검색 결과를 찾을 수 없습니다.');
      }
    };

    ps.keywordSearch(searchQuery, placesSearchCB);
  };

  const handleMarkerClick = (result) => {
    setSelectedPlace(result);
    setIsModalOpen(true);
  };

  const handleModalCancel = () => {
    setIsModalOpen(false);
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
          <MapMarker
            key={index}
            position={{ lat: parseFloat(result.y), lng: parseFloat(result.x) }}
            onClick={() => handleMarkerClick(result)}
            clickable={true}
            onMouseOver={() => setIsOpen(index)}
            onMouseOut={() => setIsOpen(null)}
          >
            {isOpen === index && (
              <Tooltip>
                추가하려면 <br />
                클릭 해주세요
              </Tooltip>
            )}
          </MapMarker>
        ))}
        <AddModal isOpen={isModalOpen} onCancel={handleModalCancel} selectedPlace={selectedPlace} id={id} />
      </Map>
    </StFullScreenContainer>
  );
}

const StFullScreenContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
`;

const Tooltip = styled.div`
  min-width: 150px;
  padding: 10px 20px;
  text-align: center;

  font-size: 16px;
  color: #784b31;
`;
