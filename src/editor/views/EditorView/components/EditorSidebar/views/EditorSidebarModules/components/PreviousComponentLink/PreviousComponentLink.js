// @flow
import React from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { connect } from 'react-redux';
import * as styles from './styles';
import type { ReduxState } from '../../../../../../../../../redux/store';
import { getReduxPreviousComponent } from '../../../../../../../../../redux/shared/state';
import type { ComponentModel } from '../../../../../../../../../data/component/model';
import { getComponentName } from '../../../../../../../../../data/component/state';
import { useGetEditorNavigateToComponent } from '../../../../../../../../context/context';

type Props = {
  previousComponent: ComponentModel | null,
};

const PreviousComponentLink = ({ previousComponent }: Props) => {
  if (!previousComponent) return null;
  const navigate = useGetEditorNavigateToComponent();
  return (
    <div
      className={styles.buttonClass}
      onClick={() => {
        navigate(previousComponent.key);
      }}
    >
      <FaArrowLeft size={11} />
      <div className={styles.nameClass}>{getComponentName(previousComponent)}</div>
    </div>
  );
};

const mapStateToProps = (state: ReduxState) => {
  const previousComponent = getReduxPreviousComponent(state);
  return {
    previousComponent,
  };
};

export default connect(mapStateToProps)(PreviousComponentLink);
