// @flow
import React from 'react';
import { FaCheck, FaPlus, FaTimes } from 'react-icons/fa';
import { cx } from 'emotion';
import { connect } from 'react-redux';
import { RoundIconActiveButton, SlimIconButton } from '../../../../../Button/Button';
import styles from './styles';
import TextInput from '../../../../../inputs/TextInput/TextInput';
import { PropTypeInput } from '../../../../../inputs/SelectInput/SelectInput';
import { PROP_TYPES_OPTIONS } from '../../../../../inputs/SelectInput/data';
import type { ReduxState } from '../../../../../../../redux/store';
import { getBlockPropsConfigKeys } from '../../../../../../../data/block/state';
import { getComponentBlockFromReduxEditorState } from '../../../../../../../redux/editor/state';
import { getPropKey } from '../../../../../../../utils/string';
import type { BlockPropsConfigTypes } from '../../../../../../../data/block/props/model';
import { addNewPropToBlockRedux } from '../../../../../../../redux/editor/reducer';

type Props = {
  componentKey: string,
  blockKey: string,
  propKeys: Array<string>,
  addNewPropToBlock: (
    componentKey: string,
    blockKey: string,
    propKey: string,
    propType: BlockPropsConfigTypes,
    propLabel: string
  ) => void,
};

type State = {
  addingCustomProp: boolean,
  propNameInput: string,
  propTypeInput: BlockPropsConfigTypes,
};

const defaultPropType = PROP_TYPES_OPTIONS[0].value;

const defaultState: State = {
  addingCustomProp: true,
  propNameInput: '',
  propTypeInput: defaultPropType,
};

class AddCustomPropForm extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      ...defaultState,
    };
  }

  handleAddProp = () => {
    const { componentKey, blockKey, addNewPropToBlock } = this.props;
    const { propNameInput, propTypeInput } = this.state;
    addNewPropToBlock(
      componentKey,
      blockKey,
      getPropKey(propNameInput),
      propTypeInput,
      propNameInput
    );
    this.setState({
      ...defaultState,
      addingCustomProp: false,
    });
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

  handleToggleAddingProp = () => {
    this.setState((state: State) => ({
      addingCustomProp: !state.addingCustomProp,
    }));
  };

  isAddingProp() {
    const { addingCustomProp } = this.state;
    return addingCustomProp;
  }

  isValidProp() {
    return this.isValidPropName();
  }

  handleSubmitForm = (event: any) => {
    event.preventDefault();
    this.handleAddProp();
  };

  render() {
    const { propNameInput, propTypeInput } = this.state;
    const propNameId = 'add-custom-prop-name';
    const propTypeId = 'add-custom-prop-type';
    const addingProp = this.isAddingProp();
    return (
      <div className={styles.containerClass}>
        <div className={styles.addClass}>
          <SlimIconButton
            onClick={this.handleToggleAddingProp}
            icon={addingProp ? <FaTimes size={9} /> : <FaPlus size={9} />}
          >
            {addingProp ? 'Cancel' : 'Add Prop'}
          </SlimIconButton>
        </div>
        {addingProp && (
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
        )}
      </div>
    );
  }
}

const mapStateToProps = (state: ReduxState, { componentKey, blockKey }: Props) => {
  const block = getComponentBlockFromReduxEditorState(state.editor, componentKey, blockKey);
  const propKeys = getBlockPropsConfigKeys(block);
  return {
    propKeys,
  };
};

const mapDispatchToProps = {
  addNewPropToBlock: (
    componentKey: string,
    blockKey: string,
    propKey: string,
    propType: BlockPropsConfigTypes,
    propLabel: string
  ) => addNewPropToBlockRedux(componentKey, blockKey, propKey, propType, propLabel),
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddCustomPropForm);
