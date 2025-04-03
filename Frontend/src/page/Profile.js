import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/styles/profile.css";
import { AuthContext } from "../contexts/AuthContext";
import AccountApi from "../api/AccountApi";

const Profile = () => {
    const { currentUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const [dataUser, setDataUser] = useState({
        id: 0,
        username: "",
        email: "",
        role: "",
        departmentName: "",
        profileImage: "",
        firstName: "",
        lastName: ""
    });

    const [showImageList, setShowImageList] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const {login} = useContext(AuthContext);
    const getUser = async (id) => {
        try {
            const response = await AccountApi.findAccountById(id);
            if (response.status === 200) {
                setDataUser(response.data);
                console.log(response.data);
                
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        if (currentUser?.id) {
            getUser(currentUser.id);
        }
    }, [currentUser]);
    

    const handleChange = (e) => {
        setDataUser({ ...dataUser, [e.target.name]: e.target.value });
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedImage(file); // Lưu tệp ảnh vào state selectedImage
            const imageUrl = URL.createObjectURL(file); // Tạo URL tạm thời cho ảnh đã chọn
            setDataUser({ ...dataUser, profileImage: imageUrl }); // Cập nhật ảnh hiển thị trong UI
        }
    };
    
    const handleUpdate = async () => {
        const formData = new FormData();
        formData.append("firstName", dataUser.firstName);
        formData.append("lastName", dataUser.lastName);
        formData.append("email", dataUser.email);
    
        if (selectedImage) {
            formData.append("profileImage", selectedImage); 
        }

        console.log(dataUser);
        
        try {
            const response = await AccountApi.editProfile(currentUser.username, formData);
            if (response.status === 200) {
                alert("Edit profile successfully!");
                getUser(currentUser.id);
                login(dataUser) 
                navigate("/"); // Chuyển hướng về trang chính sau khi cập nhật thành công
            }
        } catch (error) {
            console.error("Lỗi cập nhật:", error);
            alert("Edit profile fail !");
        }
    };
    

    // Hủy chỉnh sửa
    const handleCancel = () => {
        setDataUser({ ...dataUser });
        setSelectedImage(null);
        navigate("/");

    };

    return (
        <div className="profile">
            <div className="profile-box box_1">
                <img src={dataUser?.profileImage || "/path/to/default-image.jpg"} alt="avatar" className="profile-image" />

                    <div className="image-list">
                        <label className="button-change-image">
                            Tải ảnh mới
                            <input type="file" className="input-change-image" onChange={handleImageUpload} hidden />
                        </label>
                    </div>
            </div>

            <div className="profile-box box_2">
                <div className="profile-info">
                    <div className="profile-info-item">
                        <label className="profile-info-label">Username:</label>
                        <input type="text" className="profile-info-value" value={dataUser.username} disabled />
                    </div>
                    <div className="profile-info-item">
                        <label className="profile-info-label">First Name:</label>
                        <input type="text" className="profile-info-value" name="firstName" value={dataUser.firstName} onChange={handleChange} />
                    </div>
                    <div className="profile-info-item">
                        <label className="profile-info-label">Last Name:</label>
                        <input type="text" className="profile-info-value" name="lastName" value={dataUser.lastName} onChange={handleChange} />
                    </div>
                    <div className="profile-info-item">
                        <label className="profile-info-label">Email:</label>
                        <input type="text" className="profile-info-value" name="email" value={dataUser.email} onChange={handleChange} />
                    </div>
                    <div className="profile-info-item">
                        <label className="profile-info-label">Department Name:</label>
                        <input type="text" className="profile-info-value" value={dataUser.departmentName} disabled />
                    </div>
                </div>
                <div className="profile-button">
                    <button className="profile-button-item" onClick={handleCancel}>Back</button>
                    <button className="profile-button-item" onClick={handleUpdate}>Update</button>
                </div>
            </div>
        </div>
    );
};

export default Profile;
