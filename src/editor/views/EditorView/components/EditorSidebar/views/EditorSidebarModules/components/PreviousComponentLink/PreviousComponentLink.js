// @flow
import React from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { connect } from 'react-redux';
import * as styles from './styles';
import type { ReduxState } from '../../../../../../../../../redux/store';
import {
  getReduxParentComponent,
  getReduxPreviousComponent,
} from '../../../../../../../../../redux/shared/state';
import type { ComponentModel } from '../../../../../../../../../data/component/model';
import { getComponentName } from '../../../../../../../../../data/component/state';
import { useGetEditorNavigateToComponent } from '../../../../../../../../context/context';

type Props = {
  previousComponent: ComponentModel | null,
  parentComponent: ComponentModel | null,
};

const PreviousComponentLink = ({ previousComponent, parentComponent }: Props) => {
  const component = previousComponent || parentComponent;

  console.log('previousComponent', previousComponent);

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

const mapStateToProps = (state: ReduxState) => {
  const previousComponent = getReduxPreviousComponent(state);
  const parentComponent = getReduxParentComponent(state);
  return {
    previousComponent,
    parentComponent,
  };
};

export default connect(mapStateToProps)(PreviousComponentLink);
