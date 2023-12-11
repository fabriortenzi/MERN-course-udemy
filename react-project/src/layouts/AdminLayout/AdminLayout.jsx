import React from 'react';
import LogoWhite from '../../assets/svg/tincode-white.svg';
import { AdminMenu } from '../../components/Admin/AdminLayout';
import { Logout } from './Logout';
import './AdminLayout.scss';

export function AdminLayout(props) {
  const { children } = props;

  return (
    <div className="admin-layout">
      <div className="admin-layout__left">
        <div className="logo">
          <img src={LogoWhite} className="logo" />
        </div>
        <span><AdminMenu /></span>
      </div>
      <div className="admin-layout__right">
        <div className="admin-layout__right-header">
          <Logout />
        </div>
        <div className="admin-layout__right-content">{children}</div>
      </div>
    </div>
  );
}
