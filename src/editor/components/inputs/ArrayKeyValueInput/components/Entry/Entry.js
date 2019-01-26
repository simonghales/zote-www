// @flow
import React from 'react';
import { FaTimes, FaCheck } from 'react-icons/fa';
import styles from './styles';
import { RoundIconActiveButton, RoundIconButton } from '../../../../Button/Button';
import { SlimPlainInput } from '../../../../Input/Input';
import { cleanKeyString } from '../../../../../../utils/string';

type Props = {
  label: string,
  value: string,
  onSave: (label: string, value: string) => void,
  onRemove: () => void,
};

type State = {
  label: string,
  value: string,
  editingLabel: boolean,
  editingValue: boolean,
};

class Entry extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      label: props.label,
      value: props.value,
      editingLabel: false,
      editingValue: false,
    };
  }

  isEditing() {
    const { editingLabel, editingValue } = this.state;
    return editingLabel || editingValue;
  }

  handleEditLabel = () => {
    const { label } = this.props;
    this.setState({
      label,
      editingLabel: true,
    });
  };

  handleEditValue = () => {
    const { value } = this.props;
    this.setState({
      value,
      editingValue: true,
    });
  };

  handleUpdateStateLabel = (value: string) => {
    this.setState({
      label: cleanKeyString(value),
    });
  };

  handleUpdateStateValue = (value: string) => {
    this.setState({
      value,
    });
  };

  handleSaveChanges = () => {
    const { onSave } = this.props;
    const { label, value } = this.state;
    onSave(label, value);
    this.setState({
      editingLabel: false,
      editingValue: false,
    });
  };

  renderLabel() {
    const { label } = this.props;
    const { editingLabel } = this.state;
    if (editingLabel) {
      const { label: stateLabel } = this.state;
      return (
        <SlimPlainInput
          value={stateLabel}
          onChangeString={this.handleUpdateStateLabel}
          placeholder="Attribute"
          autoFocus
        />
      );
    }
    return (
      <div className={styles.labelClass} onClick={this.handleEditLabel}>
        {label}
      </div>
    );
  }

  renderValue() {
    const { value } = this.props;
    const { editingValue } = this.state;
    if (editingValue) {
      const { value: stateValue } = this.state;
      return (
        <SlimPlainInput
          value={stateValue}
          onChangeString={this.handleUpdateStateValue}
          placeholder="Value"
          autoFocus
        />
      );
    }
    return (
      <div className={styles.valueClass} onClick={this.handleEditValue}>
        {value}
      </div>
    );
  }

  renderDeleteButton() {
    const { onRemove } = this.props;
    return (
      <RoundIconButton onClick={onRemove}>
        <FaTimes size={12} />
      </RoundIconButton>
    );
  }

  renderSaveButton() {
    const { label } = this.state;
    return (
      <RoundIconActiveButton disabled={!label} type="submit">
        <FaCheck size={12} />
      </RoundIconActiveButton>
    );
  }

  handleFormSubmit = (event: any) => {
    event.preventDefault();
    this.handleSaveChanges();
  };

  render() {
    const isEditing = this.isEditing();
    return (
      <form className={styles.containerClass} onSubmit={this.handleFormSubmit}>
        <div className={styles.labelWrapperClass}>{this.renderLabel()}</div>
        <div className={styles.valueWrapperClass}>{this.renderValue()}</div>
        <div className={styles.buttonClass}>
          {isEditing ? this.renderSaveButton() : this.renderDeleteButton()}
        </div>
      </form>
    );
  }
}

export default Entry;
