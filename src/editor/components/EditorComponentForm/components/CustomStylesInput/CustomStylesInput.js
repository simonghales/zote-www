// @flow
import React from 'react';
import { connect } from 'react-redux';
import type { ReduxRootState, ReduxDataState } from '../../../../../redux/store';
import CustomStyle from './components/CustomStyle/CustomStyle';
import styles from './styles';
import { SlimIconDarkerButton } from '../../../Button/Button';
import { getReduxPresentState, getReduxStyleStyles } from '../../../../../redux/styles/state';
import {
  clearModuleStyleValueRedux,
  setModuleStyleValueRedux,
} from '../../../../../redux/styles/reducer';

type CustomStyleModel = {
  key: string,
  value: string,
};

type Props = {
  blockStyleKey: string,
  styleStateKey: string,
  customStyles: Array<CustomStyleModel>,
  updateCustomStyle: (previousCssKey: string, cssKey: string, value: string) => void,
  removeCustomStyle: (cssKey: string) => void,
};

type State = {
  addingNewStyle: boolean,
};

class CustomStylesInput extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      addingNewStyle: false,
    };
  }

  handleAddNewCss = () => {
    this.setState({
      addingNewStyle: true,
    });
  };

  handleAddNewCustomStyle = (cssKey: string, value: string) => {
    const { updateCustomStyle } = this.props;
    if (cssKey && value) {
      this.setState({
        addingNewStyle: false,
      });
      updateCustomStyle('', cssKey, value);
    }
  };

  handleCancelAddNewCustomStyle = () => {
    this.setState({
      addingNewStyle: false,
    });
  };

  handleUpdateCustomStyle = (previousCssKey: string, cssKey: string, value: string) => {
    const { updateCustomStyle } = this.props;
    updateCustomStyle(previousCssKey, cssKey, value);
  };

  handleRemoveCustomStyle = (cssKey: string) => {
    const { removeCustomStyle } = this.props;
    removeCustomStyle(cssKey);
  };

  renderAddCss() {
    return (
      <div className={styles.addButtonWrapperClass}>
        <SlimIconDarkerButton onClick={this.handleAddNewCss}>Add new css rule</SlimIconDarkerButton>
      </div>
    );
  }

  render() {
    const { customStyles } = this.props;
    const { addingNewStyle } = this.state;
    return (
      <div className={styles.containerClass}>
        {customStyles.map(customStyle => (
          <div className={styles.styleWrapperClass} key={customStyle.key}>
            <CustomStyle
              cssKey={customStyle.key}
              value={customStyle.value}
              removeCustomStyle={() => {
                this.handleRemoveCustomStyle(customStyle.key);
              }}
              updateCustomStyle={(cssKey: string, value: string) => {
                this.handleUpdateCustomStyle(customStyle.key, cssKey, value);
              }}
            />
          </div>
        ))}
        {addingNewStyle ? (
          <CustomStyle
            cssKey=""
            value=""
            focusOnMount
            newCustomStyle
            removeCustomStyle={this.handleCancelAddNewCustomStyle}
            updateCustomStyle={this.handleAddNewCustomStyle}
          />
        ) : (
          this.renderAddCss()
        )}
      </div>
    );
  }
}

const mapStateToProps = (
  rootState: ReduxRootState,
  { blockStyleKey, styleStateKey }: Props
) => {
  const state = getReduxPresentState(rootState);
  const customStyles = getReduxStyleStyles(state, styleStateKey, blockStyleKey);
  return {
    customStyles,
  };
};

const mapDispatchToProps = (dispatch: any, { blockStyleKey, styleStateKey }: Props) => ({
  updateCustomStyle: (previousCssKey: string, cssKey: string, value: string) => {
    if (previousCssKey && previousCssKey !== cssKey) {
      dispatch(clearModuleStyleValueRedux(blockStyleKey, styleStateKey, previousCssKey));
    }
    dispatch(setModuleStyleValueRedux(blockStyleKey, styleStateKey, cssKey, value));
  },
  removeCustomStyle: (cssKey: string) => {
    dispatch(clearModuleStyleValueRedux(blockStyleKey, styleStateKey, cssKey));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CustomStylesInput);
