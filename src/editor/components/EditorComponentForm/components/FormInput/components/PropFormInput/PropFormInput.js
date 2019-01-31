// @flow
import React from 'react';
import { getFormInputId } from '../../FormInput';
import type { FormInputProps } from '../../props';
import FormInputHeader from '../FormInputHeader/FormInputHeader';
import DropdownMenu from '../../../../../DropdownMenu/DropdownMenu';
import DropdownMenuList from '../../../../../DropdownMenuList/DropdownMenuList';
import PropLinkMenu from '../../../../../PropLinkMenu/PropLinkMenu';
import LinkedPropInput from '../../../LinkedPropInput/LinkedPropInput';
import FormInputBody from '../FormInputBody/FormInputBody';
import EditFormPropInput from '../../../EditFormPropInput/EditFormPropInput';
import { MENU_LAYOUTS } from '../../../../../Menu/Menu';

type State = {
  dropDownVisible: boolean,
  linkMenuVisible: boolean,
  editing: boolean,
};

type PropFormInputProps = FormInputProps & {
  linkedBlockKey?: string | null,
  linkedPropKey?: string | null,
};

export class PropFormInput extends React.Component<PropFormInputProps, State> {
  static defaultProps = {
    inactive: false,
    linkedBlockKey: null,
    linkedPropKey: null,
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
    this.handleHideDropdown();
  };

  handleHideLinkPropMenu = () => {
    this.setState({
      linkMenuVisible: false,
    });
  };

  handleCloseMenus = () => {
    this.handleHideDropdown();
    this.handleHideLinkPropMenu();
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
          onDropdownClosed={this.handleCloseMenus}
          inactive={inactive}
          inputId={inputId}
          name={name}
        >
          {dropDownVisible && (
            <DropdownMenu layout={MENU_LAYOUTS.fixed} close={this.handleHideDropdown}>
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
