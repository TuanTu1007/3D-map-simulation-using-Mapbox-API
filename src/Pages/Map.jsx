import { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder'; // Import Geocoder
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';
import '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css';
import { FaMapMarkerAlt, FaLocationArrow } from 'react-icons/fa';
import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css'; // Import Geocoder CSS
import DirectionsSidebar from '../Components/Direction';
import { supabase } from '../Components/CreateUser';



const Map = () => {
  const mapRef = useRef();
  const mapContainerRef = useRef();
  const [tracking, setTracking] = useState(false); // Trạng thái theo dõi
  const [watchId, setWatchId] = useState(null); // ID của watchPosition
  const [coordinates, setCoordinates] = useState({ lat: 10.883749, lng:  106.808684 }); // Tọa độ mặc định
  const [isNightMode, setIsNightMode] = useState(false); // Trạng thái ngày/đêm
  const [is3DMode, setIs3DMode] = useState(false); // Trạng thái 2D/3D
  const [MapStyle, setMapStyle] = useState('mapbox://styles/mapbox/streets-v12'); //Trạng thái bản đồ (mặc định)
  const [showLayers, setShowLayers] = useState(false);
  const [places, setPlaces] = useState([]);
  const [showAtms, setShowAtms] = useState(false);
  const atmMarkers = useRef([]); // Lưu trữ các marker ATM

  // Lấy dữ liệu từ Supabase
  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase.from('places_atms').select('*');
      if (error) {
        console.error('Error fetching data:', error);
      } else {
        setPlaces(data);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    mapboxgl.accessToken = 'pk.eyJ1IjoiamFtZXMyMDAzIiwiYSI6ImNtM2ZhcTdhbjBueWwyanB5NGsxY3V3M3cifQ.4gW5S9bQj9h63cF5YnZ01Q';

    // Khởi tạo bản đồ
    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: MapStyle,
      center: [coordinates.lng, coordinates.lat],
      zoom: 15,
      pitch: 0, // Mặc định ở 2D
      bearing: 0, // Không xoay
    });

    // Thêm các điểm vào bản đồ
    places.forEach((place) => {
      const { lat, lng, title, address, imageUrl } = place;
      
      const popup = new mapboxgl.Popup({ offset: 25 })
        .setHTML(`
          <h3>${title}</h3>
          <p>${address}</p>
          <img src="${imageUrl}" alt="${title}" width="100" />
        `);

      new mapboxgl.Marker()
        .setLngLat([lng, lat])
        .setPopup(popup)
        .addTo(mapRef.current);
    });

    // Thêm Geocoder (hộp tìm kiếm)
    const geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl,
      marker: true,
      placeholder: 'Tìm kiếm địa điểm...',
      zoom: 16,
    });
    mapRef.current.addControl(geocoder, 'top-right');

    // Lắng nghe sự kiện mousemove
    mapRef.current.on('mousemove', (event) => {
      const { lng, lat } = event.lngLat;
      setCoordinates({ lng, lat });
    });

    // Lắng nghe sự kiện click
    mapRef.current.on('click', (event) => {
      const { lng, lat } = event.lngLat;
      console.log(`Clicked coordinates: Longitude: ${lng}, Latitude: ${lat}`);
    });

    // Thêm layer 3D khi bản đồ tải xong
    mapRef.current.on('style.load', () => {
      if (!mapRef.current.getLayer('3d-buildings')) {
        mapRef.current.addLayer({
          id: '3d-buildings',
          source: 'composite',
          'source-layer': 'building',
          filter: ['==', 'extrude', 'true'],
          type: 'fill-extrusion',
          paint: {
            'fill-extrusion-color': [
              'interpolate',
              ['linear'],
              ['get', 'height'],
              0, '#aaa',
              50, '#f28cb1',
              100, '#f1f075',
              200, '#51bbd6'
            ],
            'fill-extrusion-height': ['get', 'height'],
            'fill-extrusion-base': ['get', 'min_height'],
            'fill-extrusion-opacity': 1,
          },
          layout: {
            visibility: is3DMode ? 'visible' : 'none',
          },
        });
      }
      mapRef.current.addSource('mapbox-dem', {
        type: 'raster-dem',
        url: 'mapbox://mapbox.mapbox-terrain-dem-v1',
        tileSize: 512,
        maxzoom: 14,
      });

      // Thiết lập địa hình với độ phóng đại
      mapRef.current.setTerrain({ source: 'mapbox-dem', exaggeration: 1.0 }); // exaggeration để phóng đại độ cao

      // Thêm layer bóng để tăng chiều sâu (tùy chọn)
      mapRef.current.addLayer({
        id: 'hillshade',
        type: 'hillshade',
        source: 'mapbox-dem',
        layout: { visibility: 'visible' },
        paint: {},
      });

      // Thêm ánh sáng Mặt Trời
      mapRef.current.setLight({
        anchor: 'viewport', // Góc ánh sáng dựa trên góc nhìn
        position: [1.5, 90, 80], // [azimuthal, polar, radial]
        intensity: 0.5, // Cường độ ánh sáng
      });

      // Thêm sky layer
      mapRef.current.addLayer({
        id: 'sky',
        type: 'sky',
        paint: {
          'sky-type': 'atmosphere', // Bầu trời với hiệu ứng khí quyển
          'sky-atmosphere-sun': [0.0, 90.0], // Vị trí Mặt Trời (azimuthal, polar)
          'sky-atmosphere-sun-intensity': 10, // Cường độ ánh sáng Mặt Trời
          'sky-atmosphere-halo-color': 'transparent', // Màu viền ánh sáng Mặt Trời
          'sky-atmosphere-color': '#87ceeb', // Màu bầu trời
        },
      });

      mapRef.current.setFog(null);

      function updateSunPosition() {
        const now = new Date();
        const hours = now.getHours();
        const sunPosition = [(hours / 24) * 360 - 180, 50]; // Tính vị trí Mặt Trời
        map.setPaintProperty('sky', 'sky-atmosphere-sun', sunPosition);
      }

      // Cập nhật vị trí Mặt Trời mỗi 1 phút
      setInterval(updateSunPosition, 60000);
      updateSunPosition();
    });

    geocoder.on('result', (e) => {
      const { center } = e.result; // Lấy tọa độ của địa điểm được chọn
      const [lng, lat] = center;

      // Cập nhật tọa độ trung tâm
      setCoordinates({ lat, lng });

      // Thêm hoặc cập nhật hình tròn
      addCircleLayer(lng, lat);
    });

    const addCircleLayer = (lng, lat, radiusInMeters = 500) => {
      const radiusInDegrees = radiusInMeters / 111320; // Chuyển đổi bán kính từ mét sang độ

      if (mapRef.current.getSource('circle')) {
        // Cập nhật dữ liệu nếu hình tròn đã tồn tại
        mapRef.current.getSource('circle').setData({
          type: 'Feature',
          geometry: {
            type: 'Polygon',
            coordinates: [generateCircleCoords(lng, lat, radiusInDegrees)],
          },
        });
      } else {
        // Thêm hình tròn mới
        mapRef.current.addSource('circle', {
          type: 'geojson',
          data: {
            type: 'Feature',
            geometry: {
              type: 'Polygon',
              coordinates: [generateCircleCoords(lng, lat, radiusInDegrees)],
            },
          },
        });

        mapRef.current.addLayer({
          id: 'circle',
          type: 'fill',
          source: 'circle',
          paint: {
            'fill-color': '#007cbf',
            'fill-opacity': 0.3,
          },
        });
      }
    };

    // zoom in zoom out
    mapRef.current.addControl(new mapboxgl.NavigationControl(), 'bottom-left');
    mapRef.current.addControl(new mapboxgl.FullscreenControl(), 'bottom-left');

    const generateCircleCoords = (lng, lat, radiusInDegrees) => {
      const coordinates = [];
      const numSides = 64; // Số lượng điểm trên đường tròn (càng lớn càng mượt)

      for (let i = 0; i < numSides; i++) {
        const angle = (i * 360) / numSides;
        const theta = (Math.PI / 180) * angle; // Đổi sang radian
        const dx = radiusInDegrees * Math.cos(theta);
        const dy = radiusInDegrees * Math.sin(theta);

        coordinates.push([lng + dx, lat + dy]);
      }

      // Đóng đường tròn bằng cách lặp lại điểm đầu tiên
      coordinates.push(coordinates[0]);

      return coordinates;
    };

    //Hiển thị pop-up show thông tin địa lý của vị trí được chọn ngẫu nhiên
    mapRef.current.on('click', 'place-label', (event) => {
      if (event.features && event.features.length) {
        const feature = event.features[0];
        const coordinates = feature.geometry.coordinates;
        const name = feature.properties.name || 'Không rõ';

        // Hiển thị thông tin
        alert(`Tên địa điểm: ${name}\nTọa độ: ${coordinates.join(', ')}`);
      }
    });

    const fetchPlaceInfo = async (lng, lat) => {
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${mapboxgl.accessToken}`
      );
      const data = await response.json();
      return data;
    };

    mapRef.current.on('click', async (event) => {
      const { lng, lat } = event.lngLat;
      const placeInfo = await fetchPlaceInfo(lng, lat);

      if (placeInfo.features.length) {
        const placeNames = placeInfo.features.map(
          (feature) => `${feature.place_type[0]}: ${feature.text}`
        );

        // Hiển thị thông tin dưới dạng pop-up hoặc hộp thông tin
        const popupContent = `
          <strong>Vị trí:</strong><br />
          Latitude: ${lat.toFixed(6)}<br />
          Longitude: ${lng.toFixed(6)}<br />
          ${placeNames.join('<br />')}
        `;

        const popup = new mapboxgl.Popup()
          .setLngLat([lng, lat])
          .setHTML(popupContent)
          .addTo(mapRef.current);
      } else {
        console.log('Không tìm thấy thông tin địa điểm.');
      }
    });
    
  }, [isNightMode, is3DMode, MapStyle]); // Lắng nghe cả trạng thái ngày/đêm, 2D/3D và kiểu bản đồ

  // Xử lý hiển thị marker ATM
  useEffect(() => {
    if (showAtms) {
      // Thêm các marker vào bản đồ
      places.forEach((place) => {
        const { lat, lng, title, address, imageUrl } = place;

        const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(`
          <h3>${title}</h3>
          <p>${address}</p>
          <img src="${imageUrl}" alt="${title}" width="100" />
        `);

        const marker = new mapboxgl.Marker()
          .setLngLat([lng, lat])
          .setPopup(popup)
          .addTo(mapRef.current);

        atmMarkers.current.push(marker); // Lưu marker
      });
    } else {
      // Xóa tất cả các marker ATM khỏi bản đồ
      atmMarkers.current.forEach((marker) => marker.remove());
      atmMarkers.current = []; // Dọn dẹp mảng
    }
  }, [showAtms, places]);

  const changeMapStyle = (style) => {
    setMapStyle(style); // Cập nhật kiểu bản đồ
  };

  // Function to toggle between Day and Night modes
  const toggleDayNight = () => {
    const newStyle = isNightMode
      ? 'mapbox://styles/mapbox/dark-v10' // Đêm
      : 'mapbox://styles/mapbox/streets-v12'; // Ngày

    setMapStyle(newStyle); // Cập nhật kiểu bản đồ trong state
    setIsNightMode(!isNightMode); // Cập nhật trạng thái ngày/đêm

    // Đổi style của bản đồ
    mapRef.current.setStyle(newStyle);

    // Lắng nghe sự kiện style.load để thêm lại các layers
    mapRef.current.once('style.load', () => {
      // Thêm lại các layer hoặc thiết lập khác sau khi đổi style
      if (is3DMode && mapRef.current.getLayer('3d-buildings')) {
        mapRef.current.setLayoutProperty('3d-buildings', 'visibility', 'visible');
      }
    });
  };

  // Function to toggle between 2D and 3D modes
  const toggle2D3D = () => {
    if (is3DMode) {
      // Chuyển sang chế độ 2D
      mapRef.current.easeTo({
        pitch: 0, // Góc nghiêng trở về 0
        bearing: 0, // Không xoay
        duration: 1000, // Thời gian chuyển đổi
      });
      mapRef.current.setLayoutProperty('3d-buildings', 'visibility', 'none'); // Ẩn tòa nhà 3D
    } else {
      // Chuyển sang chế độ 3D
      mapRef.current.easeTo({
        pitch: 60, // Góc nghiêng để thấy 3D
        bearing: -17.6, // Xoay bản đồ để có góc nhìn 3D hợp lý
        duration: 1000, // Thời gian chuyển đổi
      });
      mapRef.current.setLayoutProperty('3d-buildings', 'visibility', 'visible'); // Hiển thị tòa nhà 3D
    }
    setIs3DMode(!is3DMode); // Cập nhật trạng thái 2D/3D
  };

  const handleLocateUser = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;

          // Di chuyển bản đồ đến vị trí hiện tại
          mapRef.current.flyTo({
            center: [longitude, latitude],
            zoom: 14,
          });

          // Thêm marker vào vị trí của người dùng
          new mapboxgl.Marker({ color: 'blue' })
            .setLngLat([longitude, latitude])
            .setPopup(
              new mapboxgl.Popup().setHTML('<strong>Vị trí của bạn</strong>')
            )
            .addTo(mapRef.current);
        },
        (error) => {
          console.error('Lỗi xác định vị trí:', error);
          alert('Không thể xác định vị trí của bạn.');
        }
      );
    } else {
      alert('Trình duyệt của bạn không hỗ trợ định vị.');
    }
  };

  const handleTrackUser = () => {
    if (!tracking) {
      if ('geolocation' in navigator) {
        const id = navigator.geolocation.watchPosition(
          (position) => {
            const { latitude, longitude } = position.coords;

            // Di chuyển bản đồ đến vị trí hiện tại
            mapRef.current.flyTo({
              center: [longitude, latitude],
              zoom: 14,
            });

            // Thêm marker nếu cần thiết (cập nhật nếu marker đã tồn tại)
            if (!mapRef.current.getLayer('user-location')) {
              mapRef.current.addSource('user-location', {
                type: 'geojson',
                data: {
                  type: 'Feature',
                  geometry: {
                    type: 'Point',
                    coordinates: [longitude, latitude],
                  },
                },
              });

              mapRef.current.addLayer({
                id: 'user-location',
                type: 'circle',
                source: 'user-location',
                paint: {
                  'circle-radius': 10,
                  'circle-color': '#007cbf',
                },
              });
            } else {
              mapRef.current.getSource('user-location').setData({
                type: 'Feature',
                geometry: {
                  type: 'Point',
                  coordinates: [longitude, latitude],
                },
              });
            }
          },
          (error) => {
            console.error('Lỗi theo dõi vị trí:', error);
          }
        );

        setWatchId(id);
        setTracking(true);
      } else {
        alert('Trình duyệt của bạn không hỗ trợ định vị.');
      }
    } else {
      // Dừng theo dõi
      navigator.geolocation.clearWatch(watchId);
      setTracking(false);

      // Xóa layer và marker nếu cần
      if (mapRef.current.getLayer('user-location')) {
        mapRef.current.removeLayer('user-location');
        mapRef.current.removeSource('user-location');
      }
    }
  };

  return (
    <div className="relative w-full h-screen">
      {/* Nút bật tắt chế độ Ngày/Đêm và 2D/3D */}
      <div className="absolute top-2 left-2 flex gap-2 z-10">
        <button
            onClick={() => setShowAtms(!showAtms)}
            className="px-4 py-2 bg-white border border-gray-300 rounded-md shadow-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {showAtms ? 'ATMs' : 'ẨN'}
        </button>
        <button
          onClick={toggleDayNight}
          className="px-4 py-2 bg-white border border-gray-300 rounded-md shadow-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {isNightMode ? 'Đêm' : 'Ngày'}
        </button>
        <button
          onClick={toggle2D3D}
          className="px-4 py-2 bg-white border border-gray-300 rounded-md shadow-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {is3DMode ? '2D' : '3D'}
        </button>
      </div>
  
      {/* Bản đồ */}
      <div
        id="map-container"
        ref={mapContainerRef}
        className="w-full h-full"
      />
  
      {/* Sidebar chỉ đường */}
      <div className="absolute left-0 top-1/2 transform -translate-y-1/2 rounded-md z-10">
        <DirectionsSidebar map={mapRef.current} />
      </div>
  
      {/* Nút Layer */}
      <div
        className="absolute bottom-2 right-2 z-10"
        style={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        {/* Nút hiển thị popup */}
        <button
          onClick={() => setShowLayers((prev) => !prev)}
          className="px-4 py-2 bg-white border border-gray-300 rounded-md shadow hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Layer
        </button>
  
        {/* Popup hiển thị các nút bản đồ */}
        {showLayers && (
          <div
            style={{
              position: 'absolute',
              bottom: '50px',
              right: '0',
              background: 'rgba(255, 255, 255, 0.9)',
              padding: '10px',
              borderRadius: '8px',
              boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              zIndex: 20,
            }}
          >
            <button
              onClick={() => changeMapStyle('mapbox://styles/mapbox/streets-v12')}
              className="px-4 py-2 bg-white border border-gray-300 rounded-md shadow hover:bg-gray-100 w-48"
            >
              Bản đồ thường
            </button>
            <button
              onClick={() => changeMapStyle('mapbox://styles/mapbox/satellite-streets-v12')}
              className="px-4 py-2 bg-white border border-gray-300 rounded-md shadow hover:bg-gray-100 w-48"
            >
              Bản đồ vệ tinh
            </button>
            <button
              onClick={() => changeMapStyle('mapbox://styles/mapbox/outdoors-v12')}
              className="px-4 py-2 bg-white border border-gray-300 rounded-md shadow hover:bg-gray-100 w-48"
            >
              Bản đồ địa hình
            </button>
            <button
              onClick={() => changeMapStyle('mapbox://styles/mapbox/traffic-night-v2')}
              className="px-4 py-2 bg-white border border-gray-300 rounded-md shadow hover:bg-gray-100 w-48"
            >
              Bản đồ giao thông
            </button>
          </div>
        )}
      </div>
  
      {/* Hiển thị tọa độ */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white bg-opacity-80 p-4 rounded-md shadow-md text-sm">
        <p className="w-full text-center"><strong>Tọa độ:</strong></p>
        <div>Latitude: {coordinates.lat.toFixed(6)}</div>
        <div>Longitude: {coordinates.lng.toFixed(6)}</div>
      </div>
  
      {/* Popup thông tin */}
      <div
        id="info-popup"
        className="absolute bottom-4 left-4 right-4 bg-white bg-opacity-90 p-4 rounded-md shadow-md hidden"
      />
  
      {/* Nút xác định và theo dõi vị trí */}
      <div className="absolute top-24 left-4 flex flex-col gap-4 bg-white border border-gray-300 rounded-md p-2">
        <button
          onClick={handleLocateUser}
          className="w-10 h-10 bg-gray-200 flex items-center justify-center rounded-full hover:bg-gray-300 focus:outline-none"
          title="Xác định vị trí của tôi"
        >
          <FaMapMarkerAlt size={20} className="text-blue-500" />
        </button>
        <button
          onClick={handleTrackUser}
          className={`w-10 h-10 flex items-center justify-center rounded-full focus:outline-none ${tracking ? 'bg-red-200' : 'bg-gray-200'} hover:bg-gray-300`}
          title={tracking ? 'Dừng theo dõi vị trí của tôi' : 'Theo dõi vị trí của tôi'}
        >
          <FaLocationArrow size={20} className={`${tracking ? 'text-red-500' : 'text-blue-500'}`} />
        </button>
      </div>
    </div>
  );
}

export default Map
