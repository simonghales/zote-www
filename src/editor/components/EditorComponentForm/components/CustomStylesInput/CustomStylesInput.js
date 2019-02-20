// @flow
import React from 'react';
import { connect } from 'react-redux';
import type { ReduxState } from '../../../../../redux/store';
import CustomStyle from './components/CustomStyle/CustomStyle';
import styles from './styles';
import { SlimIconDarkerButton } from '../../../Button/Button';

type CustomStyleModel = {
  key: string,
  value: string,
};

type Props = {
  blockStyleKey: string,
  styleStateKey: string,
  customStyles: Array<CustomStyleModel>,
};

class CustomStylesInput extends React.Component<Props> {
  render() {
    const { customStyles } = this.props;
    return (
      <div className={styles.containerClass}>
        {customStyles.map(customStyle => (
          <div className={styles.styleWrapperClass} key={customStyle.key}>
            <CustomStyle cssKey={customStyle.key} value={customStyle.value} />
          </div>
        ))}
        <div className={styles.addButtonWrapperClass}>
          <SlimIconDarkerButton>Add new css rule</SlimIconDarkerButton>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: ReduxState) => {
  const customStyles = [
    {
      key: 'background-color',
      value: 'red',
    },
    {
      key: 'background-size',
      value: 'cover',
    },
  ];
  return {
    customStyles,
  };
};

export default connect(mapStateToProps)(CustomStylesInput);
