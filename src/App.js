import React from 'react'
import FileUpload from './FileUpload';
import ConfigRoute from './Routes/Configroutes'
import { createBrowserRouter, RouterProvider } from 'react-router';
function App() {
  const router = createBrowserRouter(ConfigRoute);
  return (
    <div className="App">
          <RouterProvider router={router} />
    </div>
  );
}
export default App;
