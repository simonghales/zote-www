// @flow
import React, { useContext } from 'react';
import { SelectedComponentContext } from '../SelectedComponentContextWrapper/context';

type Props = {
  children: any,
};

const SelectedComponentRequiredWrapper = ({ children }: Props) => {
  const component = useContext(SelectedComponentContext);
  if (!component) return null;
  return children;
};

export default SelectedComponentRequiredWrapper;

export const selectedComponentRequired = (WrappedComponent: any) => (
  <SelectedComponentRequiredWrapper>
    <WrappedComponent />
  </SelectedComponentRequiredWrapper>
);
