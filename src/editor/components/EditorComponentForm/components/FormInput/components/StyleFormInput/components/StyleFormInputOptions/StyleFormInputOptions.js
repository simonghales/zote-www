// @flow
import React from 'react';
import { connect } from 'react-redux';
import DropdownMenuList from '../../../../../../../DropdownMenuList/DropdownMenuList';
import { clearModuleStyleValueRedux } from '../../../../../../../../../redux/styles/reducer';

type Props = {
  styleKey: string,
  styleStateKey: string,
  styleValueKey: string,
  clearValue: () => void,
};

class StyleFormInputOptions extends React.Component<Props> {
  render() {
    const { clearValue } = this.props;
    const options = [
      {
        label: 'Clear value',
        onClick: clearValue,
      },
    ];
    return <DropdownMenuList options={options} />;
  }
}

// todo - trigger menu to hide when option is selected

const mapDispatchToProps = (dispatch: any, { styleKey, styleStateKey, styleValueKey }: Props) => ({
  clearValue: () => dispatch(clearModuleStyleValueRedux(styleKey, styleStateKey, styleValueKey)),
});

export default connect(
  null,
  mapDispatchToProps
)(StyleFormInputOptions);
