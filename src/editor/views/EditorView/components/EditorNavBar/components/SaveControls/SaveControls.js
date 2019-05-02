// @flow
import React, { useState } from 'react';
import { useReduxDispatch } from 'reactive-react-redux';
import { ActionCreators } from 'redux-undo';
import { FaRedo, FaUndo } from 'react-icons/fa';
import { cx } from 'emotion';
import * as styles from './styles';
import { useCanRedo, useCanUndo } from '../../../../../../state/hooks/history';
import { useHasUnsavedChanges } from '../../../../../../state/hooks/ui';
import { storeReduxStateInFirestore } from '../../../../../../../firebase/site/actions';

const SaveControls = () => {
  const unsavedChanges = useHasUnsavedChanges();

  const dispatch = useReduxDispatch();

  const [saving, setSaving] = useState(false);

  const canUndo = useCanUndo();
  const canRedo = useCanRedo();

  const handleUndo = () => {
    if (saving) return;
    if (!canUndo) return;
    dispatch(ActionCreators.undo());
  };

  const handleRedo = () => {
    if (saving) return;
    if (!canRedo) return;
    dispatch(ActionCreators.redo());
  };

  const handleSave = () => {
    if (!unsavedChanges || saving) return;
    setSaving(true);
    storeReduxStateInFirestore()
      .then(() => {
        setSaving(false);
      })
      .catch(error => {
        console.error(error);
        setSaving(false);
      });
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
        onClick={handleSave}
      >
        {unsavedChanges ? (saving ? 'Saving...' : 'Save Changes') : 'Published'}
      </div>
    </div>
  );
};

export default SaveControls;
