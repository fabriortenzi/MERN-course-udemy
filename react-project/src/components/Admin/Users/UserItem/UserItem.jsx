import React, { useState } from 'react';
import { Image, Button, Icon, Confirm } from 'semantic-ui-react';
import IMAGES from '../../../../assets';
import { env } from '../../../../utils';
import { BasicModal } from '../../../Shared';
import { User } from '../../../../api';
import { UserForm } from '../UserForm';
import { useAuth } from '../../../../hooks';
import './UserItem.scss';

const userController = new User();

export function UserItem({ user, onReload }) {
  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState('');

  const [showConfirm, setShowConfirm] = useState(false);
  const [confirmMessage, setConfirmMessage] = useState('');

  const [isDeleted, setIsDeleted] = useState(false);

  const { accessToken } = useAuth();

  const handleCloseModal = () => {
    setShowModal((prevState) => !prevState);
  };
  const handleCloseConfirm = () => {
    setShowConfirm((prevState) => !prevState);
  };
  const onActivateDeactivate = async () => {
    try {
      await userController.updateUser(accessToken, user._id, {
        active: !user.active,
      });
      onReload();
      handleCloseConfirm();
    } catch (error) {
      console.error(error);
    }
  };

  const openUserUpdate = () => {
    setTitleModal(`Actualizar ${user.email}`);
    handleCloseModal();
  };

  const openDeactivateActivateConfirm = () => {
    setIsDeleted(false);
    setConfirmMessage(
      user.active
        ? `Desactivar usuario ${user.email}`
        : `Activar usuario ${user.email}`
    );
    handleCloseConfirm();
  };

  const openDeleteConfirm = () => {
    setIsDeleted(true);
    setConfirmMessage(`Eliminar usuario ${user.email}`);
    handleCloseConfirm();
  };

  const onDelete = async () => {
    try {
      await userController.deleteUser(accessToken, user._id);
      onReload();
      handleCloseConfirm();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="user-item">
        <div className="user-item__info">
          <Image
            avatar
            src={
              user.avatar ? `${env.BASE_PATH}/${user.avatar}` : IMAGES.noAvatar
            }
          />
          <div>
            <p>
              {user.lastName} {user.firstName}
            </p>
            <p>{user.email}</p>
          </div>
        </div>

        <div>
          <Button icon primary onClick={openUserUpdate}>
            <Icon name="pencil" />
          </Button>
          <Button
            icon
            color={user.active ? 'orange' : 'teal'}
            onClick={openDeactivateActivateConfirm}
          >
            <Icon name={user.active ? 'ban' : 'check'} />
          </Button>
          <Button icon color="red" onClick={openDeleteConfirm}>
            <Icon name="trash" />
          </Button>
        </div>
      </div>

      <BasicModal show={showModal} close={handleCloseModal} title={titleModal}>
        <UserForm close={handleCloseModal} onReload={onReload} user={user} />
      </BasicModal>

      <Confirm
        open={showConfirm}
        onCancel={handleCloseConfirm}
        onConfirm={isDeleted ? onDelete : onActivateDeactivate}
        content={confirmMessage}
        size="mini"
      />
    </>
  );
}
