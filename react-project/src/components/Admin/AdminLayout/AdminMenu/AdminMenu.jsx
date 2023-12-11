import React from 'react';
import { Menu, Icon } from 'semantic-ui-react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../../../hooks';
import './AdminMenu.scss';

export function AdminMenu() {
  const { pathname } = useLocation();
  const {
    user: { role },
  } = useAuth();
  const isAdmin = role === 'admin';
  console.log(isAdmin);

  const isCurrentPath = (path) => {
    return path === pathname;
  };

  return (
    <Menu className="admin-menu" fluid vertical icon text>
      {isAdmin && (
        <>
          <Menu.Item
            as={Link}
            to="/admin/users"
            active={isCurrentPath('/admin/users')}
          >
            <Icon name="user outline" />
            Usuario
          </Menu.Item>

          <Menu.Item
            as={Link}
            to="/admin/menu"
            active={isCurrentPath('/admin/menu')}
          >
            <Icon name="bars" />
            Menu
          </Menu.Item>

          <Menu.Item
            as={Link}
            to="/admin/courses"
            active={isCurrentPath('/admin/courses')}
          >
            <Icon name="computer" />
            Cursos
          </Menu.Item>

          <Menu.Item
            as={Link}
            to="/admin/newsletter"
            active={isCurrentPath('/admin/newsletter')}
          >
            <Icon name="mail" />
            Newsletter
          </Menu.Item>
        </>
      )}

      <Menu.Item
        as={Link}
        to="/admin/blog"
        active={isCurrentPath('/admin/blog')}
      >
        <Icon name="comment alternate outline" />
        Blog
      </Menu.Item>
    </Menu>
  );
}
