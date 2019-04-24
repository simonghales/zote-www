// @flow
import React from 'react';
import type { PageModel } from '../../../../../data/page/model';
import { useMappedPageBlocks } from '../../../../../editor/state/hooks/pages';
import ModulePreview from '../../../ModulePreview/ModulePreview';

type Props = {
  pageKey: string,
};

const PageParser = ({ pageKey }: Props) => {
  const mappedPageBlocks = useMappedPageBlocks(pageKey);
  return <ModulePreview data={mappedPageBlocks} />;
};

export default PageParser;
