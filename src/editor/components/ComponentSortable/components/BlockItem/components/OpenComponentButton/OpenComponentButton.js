// @flow
import React from 'react';
import { FaArrowRight } from 'react-icons/fa';
import * as styles from './styles';
import { useGetEditorNavigateToComponent } from '../../../../../../context/context';

type Props = {
  componentKey: string,
};

const OpenComponentButton = ({ componentKey }: Props) => {
  const navigate = useGetEditorNavigateToComponent();
  return (
    <div
      className={styles.buttonClass}
      onClick={() => {
        navigate(componentKey);
      }}
    >
      <FaArrowRight size={10} />
    </div>
  );
};

export default OpenComponentButton;
