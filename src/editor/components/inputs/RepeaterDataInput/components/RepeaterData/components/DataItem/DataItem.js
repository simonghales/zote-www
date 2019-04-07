// @flow
import React from 'react';
import { FaTrash, FaArrowUp, FaArrowDown, FaPlus } from 'react-icons/fa';
import * as styles from './styles';
import Input, { INPUT_THEMES } from '../../../../../../Input/Input';
import { RoundIconButton, SlimIconButton } from '../../../../../../Button/Button';

const DataItemInput = () => (
  <div className={styles.inputContainerClass}>
    <label className={styles.inputLabelClass}>Label</label>
    <div>
      <Input value="Hello World" theme={INPUT_THEMES.plain} />
    </div>
  </div>
);

type Props = {
  index: number,
};

const DataItem = ({ index }: Props) => {
  const AddButton = () => (
    <SlimIconButton icon={<FaPlus size={9} />} onClick={() => {}}>
      Add Item
    </SlimIconButton>
  );

  return (
    <div className={styles.containerClass}>
      {index === 0 && (
        <header className={styles.headerClass}>
          <AddButton />
        </header>
      )}
      <DataItemInput />
      <DataItemInput />
      <DataItemInput />
      <div className={styles.optionsClass}>
        <div className={styles.directionOptionsClass}>
          <RoundIconButton onClick={() => {}}>
            <FaArrowUp size={11} />
          </RoundIconButton>
          <RoundIconButton onClick={() => {}}>
            <FaArrowDown size={11} />
          </RoundIconButton>
        </div>
        <div>
          <RoundIconButton onClick={() => {}}>
            <FaTrash size={11} />
          </RoundIconButton>
        </div>
      </div>
      <footer className={styles.footerClass}>
        <AddButton />
      </footer>
    </div>
  );
};

export default DataItem;
