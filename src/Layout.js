import { Outlet } from 'react-router';
import React from 'react'

const Layout = () => {
  return (
    <React.Fragment>
      <div>{'header'}</div>
      <div>{Outlet}</div>
      <div>{'footer'}</div>
    </React.Fragment>
  )
}

export default Layout