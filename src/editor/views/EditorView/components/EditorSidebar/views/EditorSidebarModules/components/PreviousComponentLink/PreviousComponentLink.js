// @flow
import React from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { connect } from 'react-redux';
import * as styles from './styles';
import type { ReduxRootState } from '../../../../../../../../../redux/store';
import { getReduxParentComponent } from '../../../../../../../../../redux/shared/state';
import type { ComponentModel } from '../../../../../../../../../data/component/model';
import { getComponentName } from '../../../../../../../../../data/component/state';
import { useGetEditorNavigateToComponent } from '../../../../../../../../context/context';

type Props = {
  parentComponent: ComponentModel | null,
};

const PreviousComponentLink = ({ parentComponent }: Props) => {
  const component = parentComponent;

  if (!component) return null;
  const navigate = useGetEditorNavigateToComponent();

  const handleClick = () => {
    navigate(component.key);
  };

  return (
    <div className={styles.buttonClass} onClick={handleClick}>
      <FaArrowLeft size={11} />
      <div className={styles.nameClass}>{getComponentName(component)}</div>
    </div>
  );
};

const mapStateToProps = (rootState: ReduxRootState) => {
  const parentComponent = getReduxParentComponent(rootState);
  return {
    parentComponent,
  };
};

export default connect(mapStateToProps)(PreviousComponentLink);
