import React, { useState, useEffect } from 'react';
import { Loader } from 'semantic-ui-react';
import { size, map } from 'lodash';
import { Menu } from '../../../../api';
import { MenuItem } from '../MenuItem/MenuItem';

const menuController = new Menu();

export function ListMenu({ active, reload, onReload }) {
  const [menus, setMenus] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        setMenus(null);
        const response = await menuController.getMenu(active);
        setMenus(response['response']);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [active, reload]);

  if (!menus) return <Loader active inline="centered" />;
  if (size(menus) === 0) return 'No hay ningun menu';

  return map(menus, (menu) => (
    <MenuItem key={menu._id} menu={menu} onReload={onReload} />
  ));
}
