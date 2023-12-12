import React, { useState } from 'react';
import { Tab, Button } from 'semantic-ui-react';
import { BasicModal } from '../../../components/Shared';
import { UserForm, ListUsers } from '../../../components/Admin/Users';
import './Users.scss';

export function Users() {
  const [showModal, setShowModal] = useState(false);
  const [reload, setReload] = useState(false);

  const handleShowModal = () => {
    setShowModal((prevState) => !prevState);
  };

  const handleReload = () => {
    setReload((prevState) => !prevState);
  };

  const panes = [
    {
      menuItem: 'Usuarios activos',
      render: () => (
        <Tab.Pane attached={false}>
          <ListUsers usersActive={true} reload={reload} onReload={handleReload} />
        </Tab.Pane>
      ),
    },
    {
      menuItem: 'Usuarios inactivos',
      render: () => (
        <Tab.Pane attached={false}>
          <ListUsers usersActive={false} reload={reload} onReload={handleReload} />
        </Tab.Pane>
      ),
    },
  ];

  return (
    <>
      <div className="users page">
        <Button className="users-page__add" primary onClick={handleShowModal}>
          Nuevo Usuario
        </Button>
        <Tab menu={{ secondary: true }} panes={panes} />
      </div>

      <BasicModal
        show={showModal}
        close={handleShowModal}
        title="crearNuevoUsuario"
      >
        <UserForm close={handleShowModal} onReload={handleReload} />
      </BasicModal>
    </>
  );
}
