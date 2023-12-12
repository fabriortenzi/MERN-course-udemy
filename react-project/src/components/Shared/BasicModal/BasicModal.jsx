import React from 'react';
import { Modal } from 'semantic-ui-react';

export function BasicModal({ show, close, title, size = 'tiny', children }) {
  return (
    <Modal closeIcon open={show} onClose={close} size={size}>
      {title && <Modal.Header>{title}</Modal.Header>}
      <Modal.Content>{children}</Modal.Content>
    </Modal>
  );
}
