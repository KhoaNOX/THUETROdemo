import React, { useState } from 'react';
import './App.css';

const QUAN_HCM = [
  "Quận 1", "Quận 3", "Quận 4", "Quận 5", "Quận 6", "Quận 7", "Quận 8", "Quận 10", "Quận 11", "Quận 12",
  "Quận Tân Bình", "Quận Bình Tân", "Quận Bình Thạnh", "Quận Tân Phú", "Quận Gò Vấp", "Quận Phú Nhuận",
  "Thành phố Thủ Đức", "Huyện Hóc Môn", "Huyện Củ Chi", "Huyện Nhà Bè", "Huyện Bình Chánh", "Huyện Cần Giờ"
];

const DATA_PHONG = Array.from({ length: 36 }, (_, i) => {
  const districts = [
    "Quận 1","Quận 3","Quận 5","Quận 10",
    "Quận Bình Thạnh","Quận Gò Vấp",
    "Thành phố Thủ Đức","Quận Tân Bình"
  ];

  const titles = [
    "Phòng trọ gần đại học, giá rẻ",
    "Phòng full nội thất cao cấp",
    "Phòng có gác, sạch đẹp",
    "Chung cư mini tiện nghi",
    "Phòng sinh viên giá tốt",
    "Phòng gần trung tâm, tiện đi lại",
    "Phòng mới xây, giờ giấc tự do"
  ];

  const universityAreas = [
    "Gần ĐH Quốc Gia",
    "Gần ĐH Bách Khoa",
    "Gần ĐH Kinh tế",
    "Gần ĐH GIAO THÔNG VẬN TẢI",
    "Gần ĐH Y Dược",
    "Gần ĐH Công nghiệp",
    "Gần ĐH Sư phạm",
    "Gần ĐH FPT"
  ];

  return {
    id: i + 1,
    title: titles[i % titles.length] + " - " + universityAreas[i % universityAreas.length],
    district: districts[i % districts.length],
    price: (Math.random() * 5 + 1).toFixed(1),
    area: Math.floor(Math.random() * 20 + 15),
    img: `/rooms/room${i + 1}.jpg`,    
    address: `Số ${100 + i} đường ABC`,
    electricity: "3.5k",
    water: "100k",
    extra: "Wifi free",
    owner: ["Anh Minh","Chị Lan","Anh Tuấn","Cô Hoa","ĐỘ MIXI","TRẦN HÀ LINH"][i % 4],
    phone: "09" + Math.floor(10000000 + Math.random() * 90000000)
  };
});

function App() {
  const [cccdPreview, setCccdPreview] = useState(null);
  const [roomPreviews, setRoomPreviews] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("Tất cả");
  const [maxPrice, setMaxPrice] = useState(15);
  const [showModal, setShowModal] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState(null);

  const filteredRooms = DATA_PHONG.filter(room => {
    const matchSearch = room.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchDistrict = selectedDistrict === "Tất cả" || room.district === selectedDistrict;
    const matchPrice = room.price <= maxPrice;
    return matchSearch && matchDistrict && matchPrice;
  });
  return (
    <div className="main-app">
      {/* 1. Thanh điều hướng */}
      <nav className="navbar">
        <div className="nav-content">
          <h2 className="logo" onClick={() => window.location.reload()}>THUÊ TRỌ <span className="logo-badge">DEMO</span></h2>
          <input type="text" placeholder="Tìm kiếm khu vực, tên phòng..." className="neo-input-search" onChange={(e) => setSearchTerm(e.target.value)} />
          <div className="nav-user">
            <span className="auth-link" onClick={() => setShowModal('login')}>Đăng nhập</span> | 
            <span className="auth-link" onClick={() => setShowModal('register')}>Đăng ký</span>
            <button className="btn-post" onClick={() => setShowModal('post')}>Đăng tin</button>
          </div>
        </div>
      </nav>

      {/* 2. Bố cục chính */}
      <div className="container main-layout">
        <aside className="sidebar">
          <div className="neo-card-filter">
            <h3>Bộ lọc</h3>
            <div className="filter-group">
              <label>Khu vực</label>
              <select onChange={(e) => setSelectedDistrict(e.target.value)} className="neo-select">
                <option>Tất cả</option>
                {QUAN_HCM.map(q => <option key={q} value={q}>{q}</option>)}
              </select>
            </div>
            <div className="filter-group">
              <label>Giá dưới: {maxPrice} triệu</label>
              <input type="range" min="1" max="15" step="0.1" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} className="neo-range" />
            </div>
          </div>
        </aside>

        <main className="listings">
          <div className="listing-header">
            <p>Tìm thấy <b>{filteredRooms.length}</b> phòng trọ minh bạch</p>
          </div>
          <div className="room-grid"> {/* Grid 3x3 */}
            {filteredRooms.map(room => (
              <div key={room.id} className="room-item neo-card" onClick={() => setSelectedRoom(room)}>
                <div className="img-holder" style={{backgroundImage: `url(${room.img})`}}></div>
                <div className="info">
                  <h4 className="title">{room.title}</h4>
                  <p className="area-text">{room.area} m² - {room.district}</p>
                  <p className="price-text">{room.price} triệu/tháng</p>
                  <span className="verify-badge">✓ Tin tin cậy</span>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>

      {/* 3. Footer*/}
      <footer className="footer">
        <div className="footer-grid">
          <div className="footer-col">
            <h4>Hỗ trợ khách hàng</h4>
            <p>Trung tâm trợ giúp</p><p>An toàn mua bán</p><p>Liên hệ hỗ trợ</p>
          </div>
          <div className="footer-col">
            <h4>Về THUÊ TRỌ DEMO</h4>
            <p>Email: <b>khoanox20507@gmail.com</b></p>
            <p>CSKH: <b>0936368386</b></p>
            <p>Địa chỉ: Tầng 82 Landmark 81, 720A Điện Biên Phủ, TP.HCM</p>
          </div>
          <div className="footer-col">
            <h4>Liên kết</h4>
            <div className="social-icons">
  <i className="fab fa-facebook"></i>
  <i className="fab fa-tiktok"></i>
  <i className="fab fa-instagram"></i>
</div>
          </div>
        </div>
      </footer>

      {/* 4. Hệ thống Modals */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(null)}>
          <div className={` modal-content auth-modal ${showModal === 'post' ? 'post-modal-scroll' : ''}`} onClick={e => e.stopPropagation()}>
            
            
            {showModal === 'post' && (
              <div className="post-form">
                <h2 className="form-title">Đăng tin minh bạch</h2>
                
                <div className="form-section">
                  <h3>1. Thông tin chung</h3>
                  <label>Tiêu đề</label>
                  <input type="text" className="neo-input" placeholder="Tiêu đề thu hút người thuê" />
                  <label>Khu vực TP.HCM</label>
                  <select className="neo-input">
                    {QUAN_HCM.map(q => <option key={q}>{q}</option>)}
                  </select>
                  <label>Mô tả chi tiết</label>
                  <textarea className="neo-input" rows="3" placeholder="Thông tin về phòng..."></textarea>
                </div>

                <div className="form-section">
                  <h3>2. Chi phí chi tiết</h3>
                  <div className="grid-2-col">
                    <input type="number" className="neo-input" placeholder="Giá thuê (Tr/th)" />
                    <input type="number" className="neo-input" placeholder="Diện tích (m²)" />
                  </div>
                  <div className="sub-fees">
                    <div className="fee-item"><label>Điện (kWh)</label><input className="neo-input" placeholder="3.500đ" /></div>
                    <div className="fee-item"><label>Nước</label><input className="neo-input" placeholder="100k/ng" /></div>
                    <div className="fee-item"><label>Dịch vụ</label><input className="neo-input" placeholder="Phí rác, wifi..." /></div>
                  </div>
                </div>

                <div className="form-section">
                  <h3>3. Xác thực danh tính</h3>
                  <label>Số điện thoại</label>
                  <input type="tel" className="neo-input" placeholder="09xx..." />
                  <label style={{display:'block', marginBottom:'12px'}}>
  <div className="upload-box-small" style={{cursor:'pointer'}}>
    📷 Tải ảnh mặt trước CCCD
    {cccdPreview && <img src={cccdPreview} alt="CCCD" style={{width:'100%', marginTop:'10px', borderRadius:'8px'}} />}
  </div>
  <input type="file" accept="image/*" style={{display:'none'}}
    onChange={(e) => {
      const file = e.target.files[0];
      if (file) setCccdPreview(URL.createObjectURL(file));
    }}
  />
</label>

{/* Upload ảnh phòng */}
<label style={{display:'block'}}>
  <div className="upload-box" style={{cursor:'pointer'}}>
    ➕ Ảnh thực tế phòng
    {roomPreviews.length > 0 && (
      <div style={{display:'flex', flexWrap:'wrap', gap:'8px', marginTop:'10px'}}>
        {roomPreviews.map((src, i) => (
          <img key={i} src={src} alt="" style={{width:'80px', height:'80px', objectFit:'cover', borderRadius:'8px'}} />
        ))}
      </div>
    )}
  </div>
  <input type="file" accept="image/*" multiple style={{display:'none'}}
    onChange={(e) => {
      const files = Array.from(e.target.files);
      setRoomPreviews(files.map(f => URL.createObjectURL(f)));
    }}
  />
</label>
                </div>

                <div className="commitment-box">
                  <input type="checkbox" id="commit" />
                  <label htmlFor="commit">Tôi cam kết thông tin đúng sự thật và minh bạch.</label>
                </div>
                <button 
    className="btn-post-final"
    onClick={() => alert("Đăng tin thành công (demo)")}
  >
    🚀 Đăng tin ngay
  </button>
              </div>
            )}

            {/* Modal Auth */}
            {(showModal === 'login' || showModal === 'register') && (
  <div className="auth-box">
    <h2>{showModal === 'login' ? 'Đăng nhập' : 'Đăng ký'}</h2>

    <input 
      className="auth-input"
      placeholder="Email hoặc số điện thoại"
    />

    <input 
      className="auth-input"
      type="password"
      placeholder="Mật khẩu"
    />

    {showModal === 'register' && (
      <input 
        className="auth-input"
        type="password"
        placeholder="Nhập lại mật khẩu"
      />
    )}

    <button 
  className="auth-btn"
  onClick={() => {
    if (showModal === 'login') {
      alert("Đăng nhập thành công (demo)");
    } else {
      alert("Đăng ký thành công (demo)");
    }
    setShowModal(null); 
  }}
>
  {showModal === 'login' ? 'Xác nhận' : 'Tạo tài khoản'}
</button>
  </div>
)}
          </div>
        </div>
      )}

      
      {selectedRoom && (
        <div className="modal-overlay" onClick={() => setSelectedRoom(null)}>
          <div className={`modal-content auth-modal ${showModal === 'post' ? 'post-modal-scroll' : ''}`}>
            <div className="detail-img" style={{backgroundImage: `url(${selectedRoom.img})`}}></div>
            <div className="detail-text">
              <h2 className="price-text">{selectedRoom.price} triệu/tháng</h2>
              <h3>{selectedRoom.title}</h3>
              <p>📍 {selectedRoom.address}, {selectedRoom.district}</p>
              <div className="fee-box">
                <span>⚡ Điện: {selectedRoom.electricity}</span>
                <span>💧 Nước: {selectedRoom.water}</span>
                <span>✨ Phụ phí: {selectedRoom.extra}</span>
              </div>
              <div className="contact-footer">
                <div className="owner">👤 <b>{selectedRoom.owner}</b></div>
                <button className="call-btn" onClick={() => alert(`Gọi: ${selectedRoom.phone}`)}>📞 Gọi {selectedRoom.phone}</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;