// @flow

import React from 'react';
import type { DefaultFormInputProps } from '../../EditorComponentForm/components/FormInput/FormInput';
import Entry from './components/Entry/Entry';
import styles from './styles';
import { PlainInput, SlimPlainInput } from '../../Input/Input';
import { SlimSolidButton, SolidButton } from '../../Button/Button';
import { cleanKeyString } from '../../../../utils/string';
import { addNewEntryToEntries, removeEntryFromEntries, updateEntryInEntries } from './modifiers';
import { doesEntryExistInEntries, getEntriesFromPropValue } from './state';

export type EntryModel = {
  key: string,
  value: string,
};

type Props = DefaultFormInputProps;

type State = {
  keyInput: string,
  valueInput: string,
  entries: Array<EntryModel>,
};

class ArrayKeyValueInput extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      keyInput: '',
      valueInput: '',
      entries: getEntriesFromPropValue(props.value),
    };
  }

  handleUpdateValue = (entries: Array<EntryModel>) => {
    const { updateValue } = this.props;
    this.setState({
      entries,
    });
    updateValue(entries);
  };

  handleAddNewEntry = () => {
    const { entries, keyInput, valueInput } = this.state;
    if (doesEntryExistInEntries(keyInput, entries)) {
      console.warn(`Entry "${keyInput}" already exists.`);
      return;
    }
    const updatedEntries = addNewEntryToEntries(keyInput, valueInput, entries);
    this.setState({
      keyInput: '',
      valueInput: '',
    });
    this.handleUpdateValue(updatedEntries);
  };

  handleFormSubmit = (event: any) => {
    event.preventDefault();
    this.handleAddNewEntry();
  };

  handleRemoveEntry = (index: number) => {
    const { entries } = this.state;
    const updatedEntries = removeEntryFromEntries(index, entries);
    this.handleUpdateValue(updatedEntries);
  };

  handleUpdateKeyInput = (event: SyntheticInputEvent<HTMLInputElement>) => {
    const { value } = event.target;
    this.setState({
      keyInput: cleanKeyString(value),
    });
  };

  handleUpdateValueInput = (event: SyntheticInputEvent<HTMLInputElement>) => {
    const { value } = event.target;
    this.setState({
      valueInput: value,
    });
  };

  handleUpdateEntry = (index: number, label: string, value: string) => {
    const { entries } = this.state;
    const updatedEntries = updateEntryInEntries(index, label, value, entries);
    this.handleUpdateValue(updatedEntries);
  };

  render() {
    const { keyInput, valueInput, entries } = this.state;
    return (
      <div className={styles.containerClass}>
        <form className={styles.formClass} onSubmit={this.handleFormSubmit}>
          <div className={styles.formKeyClass}>
            <SlimPlainInput
              value={keyInput}
              onChange={this.handleUpdateKeyInput}
              placeholder="Attribute"
            />
          </div>
          <div className={styles.formValueClass}>
            <SlimPlainInput
              value={valueInput}
              onChange={this.handleUpdateValueInput}
              placeholder="Value"
            />
          </div>
          <div className={styles.formButtonClass}>
            <SlimSolidButton disabled={!keyInput} type="submit">
              Add
            </SlimSolidButton>
          </div>
        </form>
        {entries.length > 0 && (
          <div className={styles.entriesContainerClass}>
            {entries.map((entry, index: number) => (
              <Entry
                key={entry.key}
                label={entry.key}
                value={entry.value}
                onSave={(label: string, value: string) => {
                  this.handleUpdateEntry(index, label, value);
                }}
                onRemove={() => {
                  this.handleRemoveEntry(index);
                }}
              />
            ))}
          </div>
        )}
      </div>
    );
  }
}

export default ArrayKeyValueInput;
