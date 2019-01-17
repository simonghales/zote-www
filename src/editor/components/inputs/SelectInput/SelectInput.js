// @flow
import React from 'react';
import type { DefaultFormInputProps } from '../../EditorComponentForm/components/FormInput/FormInput';
import { PlainDropdownSelect } from '../../DropdownSelect/DropdownSelect';

type Props = DefaultFormInputProps;

const SelectInput = () => (
  <PlainDropdownSelect onChange={() => {}} value={{ value: 'todo', label: 'todo?' }} options={[]} />
);

export default SelectInput;

export const FontFamilyInput = (props: Props) => <SelectInput {...props} />;
