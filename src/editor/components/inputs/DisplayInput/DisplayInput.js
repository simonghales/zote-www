// @flow
import React from 'react';
import { DisplayRadioOptions } from '../RadioInput/RadioInput';
import type { DefaultFormInputProps } from '../../EditorComponentForm/components/FormInput/FormInput';
import DisplayFlexInputs from './components/DisplayFlexInputs/DisplayFlexInputs';

type Props = DefaultFormInputProps;

const DisplayInput = (props: Props) => {
  const { value } = props;
  return (
    <React.Fragment>
      <DisplayRadioOptions {...props} />
      {value === 'flex' && <DisplayFlexInputs />}
    </React.Fragment>
  );
};

export default DisplayInput;
