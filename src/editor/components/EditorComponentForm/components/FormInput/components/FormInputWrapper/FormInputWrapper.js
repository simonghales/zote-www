// @flow
import React from 'react';
import FormInputHeader from '../FormInputHeader/FormInputHeader';

type Props = {
  inactive?: boolean,
  inputId?: string,
  name: string,
  children: any,
};

const FormInputWrapper = ({ inactive = false, inputId = '', name, children }: Props) => (
  <div>
    <FormInputHeader inactive={inactive} inputId={inputId} name={name} />
    <div>{children}</div>
  </div>
);

export default FormInputWrapper;
