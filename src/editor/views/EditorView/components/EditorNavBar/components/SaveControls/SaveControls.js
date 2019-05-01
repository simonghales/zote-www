// @flow
import React from 'react';
import { useReduxDispatch } from 'reactive-react-redux';
import { ActionCreators } from 'redux-undo';
import { FaRedo, FaUndo } from 'react-icons/fa';
import { cx } from 'emotion';
import * as styles from './styles';
import { useCanRedo, useCanUndo } from '../../../../../../state/hooks/history';
import { useHasUnsavedChanges } from '../../../../../../state/hooks/ui';

const SaveControls = () => {
  const unsavedChanges = useHasUnsavedChanges();

  const dispatch = useReduxDispatch();

  const canUndo = useCanUndo();
  const canRedo = useCanRedo();

  const handleUndo = () => {
    if (!canUndo) return;
    dispatch(ActionCreators.undo());
  };

  const handleRedo = () => {
    if (!canRedo) return;
    dispatch(ActionCreators.redo());
  };

  return (
    <div className={styles.containerClass}>
      <div
        className={cx(styles.smallButtonClass, {
          [styles.enabledButtonClass]: canUndo,
          [styles.disabledButtonClass]: !canUndo,
        })}
        onClick={handleUndo}
      >
        <FaUndo size={11} />
      </div>
      <div
        className={cx(styles.smallButtonClass, {
          [styles.enabledButtonClass]: canRedo,
          [styles.disabledButtonClass]: !canRedo,
        })}
        onClick={handleRedo}
      >
        <FaRedo size={11} />
      </div>
      <div
        className={cx(styles.saveChangesClass, {
          [styles.saveChangesDisabledClass]: !unsavedChanges,
        })}
      >
        {unsavedChanges ? 'Save Changes' : 'Published'}
      </div>
    </div>
  );
};

export default SaveControls;
