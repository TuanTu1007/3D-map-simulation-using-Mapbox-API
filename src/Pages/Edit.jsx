import React, { useState, useEffect } from 'react';
import { supabase } from '../Components/CreateUser';

const Edit = () => {
  const [users, setUsers] = useState([]);
  const [profileImage, setProfileImage] = useState(null);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [imageURL, setImageURL] = useState(''); // State to store the uploaded image URL
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [formData, setFormData] = useState({
    Full_name: '',
    phone_number: '',
    gender: '',
    dob: '',
    img: '',
    email: '',
  });

  useEffect(() => {
    const fetchUsers = async () => {
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      if (authError) {
        console.error('Error fetching current user:', authError.message);
        setShowErrorPopup(true);
        return;
      }

      if (user) {
        const { data, error } = await supabase
          .from('user_profiles')
          .select('id, username, Full_name, phone_number, gender, dob, img')
          .eq('id', user.id)
          .single();
  
        const { data: emailData, error: emailError } = await supabase
          .from('user_profiles_all')
          .select('email')
          .eq('profile_id', user.id)
          .single();
  
        if (error || emailError) {
          console.error('Error fetching user data:', error?.message || emailError?.message);
          setShowErrorPopup(true);
        } else if (data && emailData) {
          setFormData({
            email: emailData.email || '',
            Full_name: data.Full_name || '',
            phone_number: data.phone_number || '',
            gender: data.gender || '',
            dob: data.dob || '',
            img: data.img || '',
            username: data.username || '', // Thêm username vào formData
          });
        }
      }
    };

    fetchUsers();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 1024 * 1024) {
        alert('File size must be less than 1MB');
        return;
      }
      if (!['image/jpeg', 'image/png'].includes(file.type)) {
        alert('Only JPEG and PNG formats are allowed');
        return;
      }

      setProfileImage(URL.createObjectURL(file));

      const fileName = `profile-image-${Date.now()}.jpg`;

      const uploadImage = async () => {
        try {
          const { data: uploadData, error: uploadError } = await supabase.storage
            .from('avatars')
            .upload(fileName, file, { upsert: true });

          if (uploadError) {
            console.error('Error uploading image:', uploadError);
            alert('Failed to upload image: ' + uploadError.message);
            return;
          }

          const publicURL = supabase.storage
            .from('avatars')
            .getPublicUrl(fileName)
            .data.publicUrl;

          if (!publicURL) {
            console.error('Failed to retrieve public URL.');
            alert('Failed to retrieve public URL for the image');
            return;
          }

          setImageURL(publicURL);
        } catch (err) {
          console.error('Image upload failed:', err);
          alert('Không thể tải ảnh lên. Vui lòng thử lại.');
        }
      };
      uploadImage();
    }
  };

  const handleUpdate = async () => {
    const { Full_name, phone_number, gender, dob } = formData;
    const updatedImageURL = imageURL || formData.img;
  
    if (!updatedImageURL) {
      console.error('Image URL is missing');
      alert('Không thể lưu ảnh, vui lòng thử lại!');
      return;
    }
  
    try {
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError || !user) {
        console.error('Failed to retrieve user:', userError);
        alert('Không thể xác định người dùng, vui lòng thử lại!');
        return;
      }
  
      console.log('Updating user with ID:', user.id);
  
      const updatedData = { Full_name, phone_number, gender, dob, img: updatedImageURL };
      console.log('Data to update:', updatedData);
  
      const { data: updateData, error: updateError } = await supabase
        .from('user_profiles')
        .update(updatedData)
        .eq('id', user.id);
  
      if (updateError) {
        console.error('Update failed:', updateError.details || updateError.message);
        alert('Lỗi cập nhật dữ liệu, kiểm tra lại thông tin nhập!');
        return;
      }
  
      if (updateData) {
        console.log('Update successful:', updateData);
        alert('Thông tin đã được cập nhật thành công!');
      }
    } catch (error) {
      console.error('Unexpected error:', error);
      alert('Đã xảy ra lỗi, vui lòng thử lại!');
    }
  };
  
  


  const handleSave = async () => {
    const { Full_name, phone_number, gender, dob, imageURL } = formData;
  
    // // Kiểm tra các trường nhập liệu
    // if (!Full_name || !phone_number || !gender || !dob || (!imageURL && !formData.img)) {
    //   // Hiển thị popup lỗi
    //   setShowErrorPopup(true);
  
    //   // Ẩn popup sau 3 giây
    //   setTimeout(() => {
    //     setShowErrorPopup(false);
    //   }, 3000);
    //   return;
    // }
  
    // Gọi hàm cập nhật thông tin
    await handleUpdate();
  
    // Hiển thị popup thành công
    setShowSuccessPopup(true);
  
    // Ẩn popup sau 3 giây
    setTimeout(() => {
      setShowSuccessPopup(false);
    }, 3000);
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handlePasswordUpdate = async () => {
    const { currentPassword, newPassword, confirmPassword } = passwordData;

    if (!currentPassword || !newPassword || !confirmPassword) {
      alert('Vui lòng nhập đầy đủ thông tin mật khẩu.');
      return;
    }

    if (newPassword !== confirmPassword) {
      alert('Mật khẩu mới và xác nhận mật khẩu không khớp.');
      return;
    }

    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (error) {
      setShowErrorPopup(true);
  
      // Ẩn popup sau 3 giây
      setTimeout(() => {
        setShowErrorPopup(false);
      }, 3000);
      return;
    } else {
      // Hiển thị popup thành công
      setShowSuccessPopup(true);
    
      // Ẩn popup sau 3 giây
      setTimeout(() => {
        setShowSuccessPopup(false);
      }, 3000);
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-semibold">Hồ Sơ Của Tôi</h1>
      <h2 className="text-1xl font-semibold mt-5 mb-2">Quản lý thông tin hồ sơ để bảo mật tài khoản</h2>
      <hr className="mb-4 border-t-2 border-black" />
      {showSuccessPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
        <div className="bg-white p-6 rounded-md w-1/3 text-center">
          <div className="text-green-500 text-3xl mb-4">
            <i className="fa fa-check-circle"></i>
          </div>
          <h2 className="text-lg font-semibold">Thông báo</h2>
          <p className="text-sm text-gray-700">Cập nhật thông tin thành công</p>
        </div>
      </div>
      )}
      {showErrorPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-md w-1/3 text-center">
            <div className="text-red-500 text-3xl mb-4">
              <i className="fa fa-times-circle"></i>
            </div>
            <h2 className="text-lg font-semibold">Thông báo</h2>
            <p className="text-sm text-gray-700">Cập nhật không thành công. Vui lòng kiểm tra lại thông tin.</p>
          </div>
        </div>
      )}
      <div className="flex space-x-6 ml-5">
        <div className="w-48">
          <div className="flex justify-center mb-4">
            <img
              src={profileImage || formData.img || 'https://via.placeholder.com/150'}
              alt="Profile"
              className="rounded-full w-32 h-32 object-cover"
            />
          </div>
          <input
            type="file"
            onChange={handleImageChange}
            className="block w-full text-gray-700"
          />
          <p className="text-xs text-gray-500 mt-1">
            Dung lượng file tối đa 1 MB. Định dạng: JPEG, PNG.
          </p>
        </div>

        <div className="flex-1 ml-10">
          <div className="flex mb-4">
            <label className="text-gray-700 w-1/4 text-right mr-10">Tên đăng nhập</label>
            {formData.username}
          </div>
          <div className="flex mb-4">
            <label className="text-gray-700 w-1/4 text-right mr-10">Tên</label>
            <input
              type="text"
              name="Full_name"
              value={formData.Full_name}
              onChange={handleChange}
              className="p-2 w-3/4 border border-gray-300 rounded-md"
            />
          </div>
          <div className="flex mb-4">
            <label className="text-gray-700 w-1/4 text-right mr-10">Email</label>
            <div className="w-3/4">
              <input
                type="email"
                value={formData.email}
                readOnly
                className="p-2 w-full border border-gray-300 rounded-md"
              />
            </div>
          </div>

          <div className="flex mb-4">
            <label className="text-gray-700 w-1/4 text-right mr-10">Số điện thoại</label>
            <div className="w-3/4">
              <input
                type="text"
                name="phone_number"
                value={formData.phone_number}
                onChange={handleChange}
                className="p-2 w-full border border-gray-300 rounded-md"
              />
            </div>
          </div>

          <div className="flex mb-4">
            <label className="text-gray-700 w-1/4 text-right mr-10">Giới tính</label>
            <div className="flex space-x-4 w-3/4">
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  checked={formData.gender === 'male'}
                  onChange={handleChange}
                  className="mr-2"
                />
                Nam
              </label>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  checked={formData.gender === 'female'}
                  onChange={handleChange}
                  className="mr-2"
                />
                Nữ
              </label>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="other"
                  checked={formData.gender === 'other'}
                  onChange={handleChange}
                  className="mr-2"
                />
                Khác
              </label>
            </div>
          </div>
          <div className="flex mb-4">
            <label className="text-gray-700 w-1/4 text-right mr-10">Ngày sinh</label>
            <div className="w-3/4">
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                className="p-2 w-full border border-gray-300 rounded-md"
              />
            </div>
          </div>
          <div className="flex justify-center mt-6">
            <button
              onClick={handleSave}
              className="bg-blue-500 hover:bg-gray-500 text-white px-8 py-2 rounded-md"
            >
              Lưu
            </button>
          </div>
        </div>
      </div>
      {/* Giao diện cập nhật mật khẩu */}
      <div className="mt-8">
        <h2 className="text-1xl font-semibold mt-5 mb-2">Thay đổi mật khẩu</h2>
        <hr className="mb-4 border-t-2 border-black" />
        <div className="flex mb-4 ml-60">
          <label className="text-gray-700 w-1/4 text-right mr-10">Mật khẩu hiện tại</label>
          <div className="w-3/4">
            <input
              type="password"
              name="currentPassword"
              onChange={handlePasswordChange}
              className="p-2 w-full border border-gray-300 rounded-md"
            />
          </div>
        </div>
        <div className="flex mb-4 ml-60">
          <label className="text-gray-700 w-1/4 text-right mr-10">Mật khẩu mới</label>
          <div className="w-3/4">
            <input
              type="password"
              name="newPassword"
              value={passwordData.newPassword}
              onChange={handlePasswordChange}
              className="p-2 w-full border border-gray-300 rounded-md"
            />
          </div>
        </div>
        <div className="flex mb-4 ml-60">
          <label className="text-gray-700 w-1/4 text-right mr-10">Xác nhận mật khẩu mới</label>
          <div className="w-3/4">
            <input
              type="password"
              name="confirmPassword"
              value={passwordData.confirmPassword}
              onChange={handlePasswordChange}
              className="p-2 w-full border border-gray-300 rounded-md"
            />
          </div>
        </div>
        <div className="flex justify-center mt-6 ml-60">
            <button
              onClick={handlePasswordUpdate}
              className="bg-blue-500 hover:bg-gray-500 text-white px-8 py-2 rounded-md"
            >
              Thay đổi
            </button>
          </div>
      </div>
    </div>
  );
};

export default Edit;