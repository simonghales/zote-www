// @flow
import React from 'react';
import Modal from 'react-responsive-modal';
import * as styles from './styles';

type Props = {
  children: any,
  isOpen: boolean,
  onClose: () => void,
};

const CustomModal = ({ children, isOpen, onClose }: Props) => (
  <Modal
    open={isOpen}
    onClose={onClose}
    classNames={{
      modal: styles.modalClass,
    }}
    showCloseIcon={false}
  >
    {children}
  </Modal>
);

export default CustomModal;
