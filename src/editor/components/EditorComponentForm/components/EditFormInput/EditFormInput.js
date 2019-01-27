// @flow
import React from 'react';
import { cx } from 'emotion';
import { FaCheck } from 'react-icons/fa';
import styles from '../../views/PropsFormView/components/AddCustomPropForm/styles';
import { PropTypeInput } from '../../../inputs/SelectInput/SelectInput';
import { RoundIconActiveButton } from '../../../Button/Button';
import type { BlockPropsConfigTypes } from '../../../../../data/block/props/model';
import { PROP_TYPES_OPTIONS } from '../../../inputs/SelectInput/data';
import { getPropKey } from '../../../../../utils/string';
import TextInput from '../../../inputs/TextInput/TextInput';

type Props = {
  propKeys: Array<string>,
  onSubmit: (propName: string, propType: BlockPropsConfigTypes) => void,
  propName: string,
  propType: BlockPropsConfigTypes,
};

type State = {
  propNameInput: string,
  propTypeInput: BlockPropsConfigTypes,
};

const defaultPropType = PROP_TYPES_OPTIONS[0].value;

class EditFormInput extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      propNameInput: props.propName,
      propTypeInput: props.propType,
    };
  }

  handleSubmitForm = (event: any) => {
    const { onSubmit } = this.props;
    const { propNameInput, propTypeInput } = this.state;
    event.preventDefault();
    onSubmit(propNameInput, propTypeInput);
  };

  isValidPropName() {
    const { propKeys } = this.props;
    const { propNameInput } = this.state;
    const propKey = getPropKey(propNameInput);
    return !!propNameInput && !propKeys.includes(propKey);
  }

  handleUpdatePropName = (value: string) => {
    this.setState({
      propNameInput: value,
    });
  };

  handleUpdatePropType = (value: string) => {
    const propType: BlockPropsConfigTypes = (value: any);
    this.setState({
      propTypeInput: propType,
    });
  };

  isValidProp() {
    return this.isValidPropName();
  }

  render() {
    const { propNameInput, propTypeInput } = this.state;
    const propNameId = 'add-custom-prop-name';
    const propTypeId = 'add-custom-prop-type';
    return (
      <form className={styles.formClass} onSubmit={this.handleSubmitForm}>
        <div className={styles.formInputWrapperClass}>
          <label
            className={cx(styles.formLabelClass, {
              [styles.formLabelInactiveClass]: !this.isValidPropName(),
            })}
            htmlFor={propNameId}
          >
            Prop Name
          </label>
          <div>
            <TextInput
              inputId={propNameId}
              value={propNameInput}
              defaultValue=""
              updateValue={this.handleUpdatePropName}
              autoFocus
            />
          </div>
        </div>
        <div className={styles.formInputWrapperClass}>
          <label className={styles.formLabelClass} htmlFor={propTypeId}>
            Prop Type
          </label>
          <div>
            <PropTypeInput
              inputId={propTypeId}
              value={propTypeInput}
              defaultValue={defaultPropType}
              updateValue={this.handleUpdatePropType}
            />
          </div>
        </div>
        <div>
          <div className={styles.formLabelClass}>Save</div>
          <div className={styles.formSaveWrapperClass}>
            <RoundIconActiveButton disabled={!this.isValidProp()} type="submit">
              <FaCheck size={12} />
            </RoundIconActiveButton>
          </div>
        </div>
      </form>
    );
  }
}

export default EditFormInput;
