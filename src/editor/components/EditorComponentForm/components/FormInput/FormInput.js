// @flow
import React from 'react';
import type { Node } from 'react';
import { cx } from 'emotion';
import { FaCaretDown } from 'react-icons/fa';
import styles from './styles';
import TextInput from '../../../inputs/TextInput/TextInput';
import {
  FontFamilyInput,
  FontStyleInput,
  FontWeightInput,
  HtmlContainerInput,
  HtmlHeadingInput,
  HtmlInput,
} from '../../../inputs/SelectInput/SelectInput';
import ColorInput from '../../../inputs/ColorInput/ColorInput';
import { TextAlignInput } from '../../../inputs/RadioInput/RadioInput';
import ArrayKeyValueInput from '../../../inputs/ArrayKeyValueInput/ArrayKeyValueInput';
import DropdownMenu from '../../../DropdownMenu/DropdownMenu';
import DropdownMenuList from '../../../DropdownMenuList/DropdownMenuList';
import type { EditorFormInputModel, EditorFormInputPropInputModel } from '../../data/models';
import EditFormPropInput from '../EditFormPropInput/EditFormPropInput';
import PropLinkMenu from '../../../PropLinkMenu/PropLinkMenu';
import LinkedPropInput from '../LinkedPropInput/LinkedPropInput';

export type DefaultFormInputProps = {
  inputId: string,
  defaultValue: string,
  value: string,
  updateValue: (value: any) => void,
};

export const FORM_INPUT_TYPES = {
  string: 'string',
  fontFamily: 'fontFamily',
  fontWeight: 'fontWeight',
  fontStyle: 'fontStyle',
  textAlign: 'textAlign',
  color: 'color',
  html: 'html',
  htmlContainer: 'htmlContainer',
  htmlHeading: 'htmlHeading',
  htmlAttributes: 'htmlAttributes',
};

export type FormInputTypes = $Keys<typeof FORM_INPUT_TYPES>;

const MAPPED_FORM_INPUT_TYPES = {
  [FORM_INPUT_TYPES.string]: TextInput,
  [FORM_INPUT_TYPES.fontFamily]: FontFamilyInput,
  [FORM_INPUT_TYPES.fontWeight]: FontWeightInput,
  [FORM_INPUT_TYPES.fontStyle]: FontStyleInput,
  [FORM_INPUT_TYPES.color]: ColorInput,
  [FORM_INPUT_TYPES.textAlign]: TextAlignInput,
  [FORM_INPUT_TYPES.html]: HtmlInput,
  [FORM_INPUT_TYPES.htmlContainer]: HtmlContainerInput,
  [FORM_INPUT_TYPES.htmlHeading]: HtmlHeadingInput,
  [FORM_INPUT_TYPES.htmlAttributes]: ArrayKeyValueInput,
};

function getMappedFormInput(inputType: FormInputTypes) {
  const component = MAPPED_FORM_INPUT_TYPES[inputType];
  if (!component) {
    throw new Error(`No component matched for inputType "${inputType}"`);
  }
  return component;
}

type Props = {
  inputKey: string,
  name: string,
  value: any,
  defaultValue: any,
  inactive?: boolean,
  updateValue: (value: any) => void,
  inputType: FormInputTypes,
  componentKey: string,
  blockKey: string,
  // eslint-disable-next-line react/require-default-props
  propInput?: EditorFormInputPropInputModel | null,
};

export function getFormInputId(key: string) {
  return `form-input-${key}`;
}

const FormInputHeader = ({
  inputId,
  name,
  inactive,
  children,
  displayDropdown,
}: {
  inputId: string,
  name: string,
  inactive: boolean,
  children?: Node,
  displayDropdown?: () => void,
}) => (
  <div className={styles.headerWrapperClass}>
    <header className={styles.headerClass}>
      <label
        className={cx(styles.labelClass, {
          [styles.labelInactiveClass]: inactive,
        })}
        htmlFor={inputId}
      >
        {name}
      </label>
      {displayDropdown && (
        <div className={styles.dropdownClass} onClick={displayDropdown}>
          <FaCaretDown size={11} />
        </div>
      )}
    </header>
    {children}
  </div>
);

FormInputHeader.defaultProps = {
  children: undefined,
  displayDropdown: undefined,
};

const FormInputBody = ({
  inputId,
  value,
  defaultValue,
  updateValue,
  inputType,
}: {
  inputId: string,
  value: any,
  defaultValue: any,
  updateValue: (value: any) => void,
  inputType: FormInputTypes,
}) => {
  const Input = getMappedFormInput(inputType);
  return (
    <div>
      <Input
        inputId={inputId}
        value={value}
        defaultValue={defaultValue}
        updateValue={updateValue}
      />
    </div>
  );
};

const FormInput = ({
  inputKey,
  name,
  inactive = false,
  defaultValue,
  value,
  updateValue,
  inputType,
}: Props) => {
  const inputId = getFormInputId(inputKey);
  return (
    <div>
      <FormInputHeader inactive={inactive} inputId={inputId} name={name} />
      <FormInputBody
        updateValue={updateValue}
        value={value}
        defaultValue={defaultValue}
        inputType={inputType}
        inputId={inputId}
      />
    </div>
  );
};

FormInput.defaultProps = {
  inactive: false,
};

export default FormInput;

type State = {
  dropDownVisible: boolean,
  linkMenuVisible: boolean,
  editing: boolean,
};

type PropFormInputProps = Props & {
  linkedBlockKey: string | null,
  linkedPropKey: string | null,
};

export class PropFormInput extends React.Component<PropFormInputProps, State> {
  static defaultProps = {
    inactive: false,
  };

  constructor(props: PropFormInputProps) {
    super(props);
    this.state = {
      dropDownVisible: false,
      linkMenuVisible: false,
      editing: false,
    };
  }

  handleDisplayDropdown = () => {
    this.setState({
      dropDownVisible: true,
    });
  };

  handleHideDropdown = () => {
    this.setState({
      dropDownVisible: false,
    });
  };

  handleEditProp = () => {
    this.setState({
      editing: true,
    });
    this.handleHideDropdown();
  };

  handleStopEditingProp = () => {
    this.setState({
      editing: false,
    });
  };

  handleShowLinkPropMenu = () => {
    this.setState({
      linkMenuVisible: true,
    });
  };

  handleHideLinkPropMenu = () => {
    this.setState({
      linkMenuVisible: false,
    });
  };

  getDropdownMenuListOptions() {
    const { propInput } = this.props;
    const options = [];
    if (propInput) {
      if (propInput.linkable) {
        options.push({
          label: 'Link Prop',
          onClick: this.handleShowLinkPropMenu,
        });
      }
      if (propInput.editable) {
        options.push({
          label: 'Edit Prop',
          onClick: this.handleEditProp,
        });
      }
    }
    return options;
  }

  render() {
    const {
      inputKey,
      name,
      inactive = false,
      defaultValue,
      value,
      updateValue,
      inputType,
      componentKey,
      blockKey,
      linkedBlockKey,
      linkedPropKey,
    } = this.props;
    const { dropDownVisible, editing, linkMenuVisible } = this.state;
    const inputId = getFormInputId(inputKey);
    if (editing) {
      return (
        <EditFormPropInput
          componentKey={componentKey}
          blockKey={blockKey}
          propKey={inputKey}
          onSubmit={this.handleStopEditingProp}
        />
      );
    }
    return (
      <div>
        <FormInputHeader
          displayDropdown={this.handleDisplayDropdown}
          inactive={inactive}
          inputId={inputId}
          name={name}
        >
          {dropDownVisible && (
            <DropdownMenu close={this.handleHideDropdown}>
              <DropdownMenuList options={this.getDropdownMenuListOptions()} />
            </DropdownMenu>
          )}
          {linkMenuVisible && (
            <PropLinkMenu
              close={this.handleHideLinkPropMenu}
              componentKey={componentKey}
              blockKey={blockKey}
              propKey={inputKey}
            />
          )}
        </FormInputHeader>
        {!!linkedBlockKey && !!linkedPropKey ? (
          <LinkedPropInput
            linkedBlockKey={linkedBlockKey}
            linkedPropKey={linkedPropKey}
            componentKey={componentKey}
            blockKey={blockKey}
            propKey={inputKey}
            editLink={this.handleShowLinkPropMenu}
          />
        ) : (
          <FormInputBody
            updateValue={updateValue}
            value={value}
            defaultValue={defaultValue}
            inputType={inputType}
            inputId={inputId}
          />
        )}
      </div>
    );
  }
}

export function getFormInputComponent(input: EditorFormInputModel) {
  if (input.propInput) {
    return PropFormInput;
  }
  return FormInput;
}
