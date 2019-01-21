// @flow
import React from 'react';
import type { MappedBlockModel } from '../../data/block/model';
import { parseMappedBlocks } from '../../../parser/parser';

type Props = {
  data: Array<MappedBlockModel>,
};

const ModulePreview = ({ data }: Props) => (
  <React.Fragment>{parseMappedBlocks(data)}</React.Fragment>
);

export default ModulePreview;
