import React,{useState} from 'react'
import axios from 'axios';

const Home = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');

  // Handle file selection
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file);
      setPreviewImage(URL.createObjectURL(file)); // Generate a preview URL
    }
  };

  // Handle file upload
  const handleUpload = async () => {
    if (!selectedImage) {
      alert('Please select an image first!');
      return;
    }

    const formData = new FormData();
    formData.append('image', selectedImage);

    try {
      setUploadStatus('Uploading...');
    
      const response = await axios.post('http://localhost:6001/upload_files', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setUploadStatus(`Upload successful: ${response.data.message}`);
    } catch (error) {
      setUploadStatus('Error uploading image!');
      console.error('Upload error:', error);
    }
  };

  return (
    <div style={{ textAlign: 'center' }}>
    <h2>Image Upload</h2>
    <input type="file" accept="image/*" onChange={handleImageChange} />
    {previewImage && (
      <div style={{ marginTop: '20px' }}>
        <img
          src={previewImage}
          alt="Selected"
          style={{ width: '200px', height: 'auto', borderRadius: '10px' }}
        />
      </div>
    )}
    <button
      onClick={handleUpload}
      style={{
        marginTop: '20px',
        padding: '10px 20px',
        backgroundColor: 'blue',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
      }}
    >
      {'Upload Image'}
    </button>
    {uploadStatus && (
      <p style={{ marginTop: '20px', color: 'green' }}>{uploadStatus}</p>
    )}
  </div>
  )
}
export default Home