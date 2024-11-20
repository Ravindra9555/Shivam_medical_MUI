import axios from 'axios';
import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap'; // Using react-bootstrap for the modal
 import { useUser } from '../../../context/UserContext';
const UserCompleteProfile = () => {
  const [show, setShow] = useState(true); // Show modal when user logs in
  const [name, setName] = useState('');
  const [profilePic, setProfilePic] = useState(null);
  const [preview, setPreview] = useState(null);
   const {setUser, user} = useUser();


  // Handle profile picture change and preview
  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    setProfilePic(file);
    setPreview(URL.createObjectURL(file)); // Create a preview URL
  };

  // Handle form submission
  const handleSubmit = async() => {
    // Here you can add logic to save name and profilePic
    try {
         const res= await axios.post(`${import.meta.env.VITE_BASEURL}/v1/api/users/update`,{
            name,
            profilePic,
            id: user.id
         },{
           headers: {
               Authorization: `Bearer ${sessionStorage.getItem('userToken')}`,
               'Content-Type':'multipart/form-data'
           }
         })
         if(res.status===200){
             console.log('Profile updated successfully');
             setUser({
              id: res.data.data._id,
              email: res.data.data.email,
            
              profilePic: res.data.data.profilePic,
              name: res.data.data.name,
              role: res.data.data.role,
             })

         }
        
    } catch (error) {
         console.error('Error updating profile:', error);
        
    }

    // console.log('Profile Name:', name);
    // console.log('Profile Picture:', profilePic);
    setShow(false); // Close modal after submission
  };

  return (
    <Modal show={show} onHide={() => setShow(false)} centered>
      <Modal.Header closeButton>
        <Modal.Title>Complete Your Profile</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form>
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-3 d-flex gap-3">
        <div>

            <label className="form-label">Profile Picture</label>
            <input
              type="file"
              className="form-control"
              accept="image/*"
              onChange={handleProfilePicChange}
            />
        </div>
          {preview && (
            <div className="mb-3">
           
              <img src={preview} alt="Profile Preview" className="img-thumbnail rounded-circle" width="100" height={100} />
            </div>
          )}
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShow(false)}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UserCompleteProfile;
