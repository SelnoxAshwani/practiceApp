import React, { useState,useEffect} from 'react';
import Uppy from '@uppy/core';
import { Dashboard } from '@uppy/react';
import XHRUpload from '@uppy/xhr-upload';
import RemoteSources from '@uppy/remote-sources'
import '@uppy/core/dist/style.css';
import '@uppy/dashboard/dist/style.css';
const FileUpload = () => {
  const [uploadedFiles, setUploadedFiles] = useState([]);

    const uppy = new Uppy({
        restrictions: { maxFileSize: 1000000, maxNumberOfFiles: 5, allowedFileTypes: ['image/*', 'video/*'] },
        autoProceed: false,
      });
      uppy.use(RemoteSources, {
        companionUrl: 'https://your-companion-url',
        sources: [ 'Dropbox', 'GoogleDrive' ],
    });
      // Set up the XHRUpload plugin
      uppy.setMeta({
        folder: 'sample22344',       // Example additional field
        media_name: 'bird.jpeg',   // Another example field
      });
    
      uppy.use(XHRUpload, {
        endpoint: 'https://mytx4uv5wqtobdr5ojx7qn3r5u0xaqli.lambda-url.us-east-1.on.aws/?type=media&action=upload', // Replace with your server endpoint
        fieldName: 'media_content',                      // Name of the field on the server
        formData: true,
        headers: { authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InN3YXBuaWxjaGF1aGFuMDhAZ21haWwuY29tIiwiX2lkIjoiNjZmZTIyNWVlMjFiZjQ1NjA2ODEwY2NjIiwiZXhwIjoxNzMwODI5MzIwfQ.o3sLldPPDoMyUv5ebhH0PQQJp1ODjae6E0hUdv4zfV4' }, // Example for adding headers (optional)
      });
    
    
      // Clean up Uppy instance on component unmount
      useEffect(() => {
        uppy.on('upload-success', (file, response) => {
          // Assuming `response.body` contains the file URL
          setUploadedFiles(prevFiles => [
            ...prevFiles,
            {
              id: file.id,
              name: file.name,
              url: response.body.url, // Update based on actual response format
            },
          ]);
        });
    
        // return () => uppy.close();
      }, []);
    
      // Event listeners for successful upload
      uppy.on('complete', (result) => {
        console.log('Upload successful:', result.successful);
      });
  
  return (
    <div>
      <h3>Upload your files</h3>
      <Dashboard 
        uppy={uppy}
        // plugins={['XHRUpload']}
        proudlyDisplayPoweredByUppy={false}
        hideUploadButton={false}
        hideProgressAfterFinish={true}
      />

        {/* Render uploaded files in a separate section */}
        <div className="uploaded-files-container">
        {uploadedFiles.map((file) => {
          console.log(file)
          return  <div key={file.id} className="uploaded-file">
            <img src={file.url} alt={file.name} className="uploaded-image" />
            <span>{file.name}</span>
          </div>
        })}
      </div>
    </div>
  );
};
export default FileUpload;
