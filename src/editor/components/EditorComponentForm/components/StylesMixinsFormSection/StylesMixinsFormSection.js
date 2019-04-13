// @flow
import React from 'react';
import { connect } from 'react-redux';
import { stylesMixinsFormSection } from '../../data/styles';
import FormSection from '../FormSection/FormSection';
import TagsList from '../TagsList/TagsList';
import type { ReduxState } from '../../../../../redux/store';
import { getStyleMixinsFromRedux } from './state';

type Props = {
  styleKey: string,
};

const StylesMixinsFormSection = () => {
  const tags = [];
  const handleOnSelect = () => {};
  const handleOnRemove = () => {};
  return (
    <FormSection
      heading={stylesMixinsFormSection.heading}
      columns={stylesMixinsFormSection.columns}
      visibilityKey={stylesMixinsFormSection.key}
    >
      <TagsList tags={tags} onSelect={handleOnSelect} onRemove={handleOnRemove} />
    </FormSection>
  );
};

const mapStateToProps = (state: ReduxState, { styleKey }: Props) => {
  const mixins = getStyleMixinsFromRedux(state, styleKey);
  console.log('mixins', mixins);
  return {};
};

export default connect(mapStateToProps)(StylesMixinsFormSection);
