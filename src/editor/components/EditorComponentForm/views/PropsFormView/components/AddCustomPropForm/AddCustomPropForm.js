// @flow
import React from 'react';
import { FaPlus, FaTimes } from 'react-icons/fa';
import { connect } from 'react-redux';
import { SlimIconButton } from '../../../../../Button/Button';
import styles from './styles';
import { PROP_TYPES_OPTIONS } from '../../../../../inputs/SelectInput/data';
import type { ReduxRootState, ReduxDataState } from '../../../../../../../redux/store';
import { getBlockPropsConfigKeys } from '../../../../../../../data/block/state';
import { getComponentBlockFromReduxEditorState } from '../../../../../../../redux/editor/state';
import type { BlockPropsConfigTypes } from '../../../../../../../data/block/props/model';
import { addNewPropToBlockRedux } from '../../../../../../../redux/editor/reducer';
import EditFormInput from '../../../../components/EditFormInput/EditFormInput';
import { getReduxPresentState } from '../../../../../../../redux/styles/state';
import { getReduxEditorState } from '../../../../../../../redux/shared/state';

type Props = {
  componentKey: string,
  blockKey: string,
  propKeys: Array<string>,
  addNewPropToBlock: (
    componentKey: string,
    blockKey: string,
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
  addingCustomProp: false,
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
    addNewPropToBlock(componentKey, blockKey, propTypeInput, propNameInput);
    this.setState({
      ...defaultState,
      addingCustomProp: false,
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

  handleSubmitForm = (propName: string, propType: BlockPropsConfigTypes) => {
    this.setState(
      {
        propNameInput: propName,
        propTypeInput: propType,
      },
      this.handleAddProp
    );
  };

  render() {
    const { propNameInput, propTypeInput } = this.state;
    const { propKeys } = this.props;
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
          <EditFormInput
            onSubmit={this.handleSubmitForm}
            propKeys={propKeys}
            propName={propNameInput}
            propType={propTypeInput}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = (rootState: ReduxRootState, { componentKey, blockKey }: Props) => {
  const editorState = getReduxEditorState(rootState);
  const block = getComponentBlockFromReduxEditorState(editorState, componentKey, blockKey);
  const propKeys = getBlockPropsConfigKeys(block);
  return {
    propKeys,
  };
};

const mapDispatchToProps = {
  addNewPropToBlock: (
    componentKey: string,
    blockKey: string,
    propType: BlockPropsConfigTypes,
    propLabel: string
  ) => addNewPropToBlockRedux(componentKey, blockKey, propType, propLabel),
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddCustomPropForm);
