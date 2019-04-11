// @flow
import React from 'react';
import { cx } from 'emotion';
import AddCustomPropForm from './components/AddCustomPropForm/AddCustomPropForm';
import styles from './styles';
import BlockProps from './components/BlockProps/BlockProps';
import type { PassedProps } from './shared';
import { CONTENT_FORM_VIEW_TYPES } from './shared';

type Props = PassedProps & {
  addPropsEnabled?: boolean,
};

const PropsFormView = ({ addPropsEnabled, blockKey, componentKey, viewType }: Props) => (
  <React.Fragment>
    {addPropsEnabled && <AddCustomPropForm componentKey={componentKey} blockKey={blockKey} />}
    <div
      className={cx(styles.containerClass, {
        [styles.containerNoMarginClass]: addPropsEnabled,
      })}
    >
      <BlockProps blockKey={blockKey} componentKey={componentKey} viewType={viewType} />
    </div>
  </React.Fragment>
);

PropsFormView.defaultProps = {
  addPropsEnabled: false,
};

export default PropsFormView;

export const ContentFormView = (props: PassedProps) => (
  <PropsFormView {...props} viewType={CONTENT_FORM_VIEW_TYPES.content} />
);

export const HtmlFormView = (props: PassedProps) => (
  <PropsFormView {...props} viewType={CONTENT_FORM_VIEW_TYPES.html} />
);
