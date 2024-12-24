import { useRef, useEffect, useState } from 'react';


const Dimension = () => {
    const [is3DMode, setIs3DMode] = useState(false); // Trạng thái 2D/3D
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
  return (
    <div>
      <button
          onClick={toggle2D3D}
          style={{
            padding: '10px',
            background: '#fff',
            border: '1px solid #ccc',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          {is3DMode ? '2D' : '3D'}
        </button>
    </div>
  )
}

export default Dimension
