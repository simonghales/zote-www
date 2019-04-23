// @flow
import React from 'react';
import ModuleIframeWrapper from '../../../../../../components/ModuleIframeWrapper/ModuleIframeWrapper';
import { useSelectedPageMappedBlocks } from '../../../../../../state/hooks/pages';

const PagePreview = () => {
  const data = useSelectedPageMappedBlocks();
  const width = '100%';
  const height = '100%';
  const zoom = 100;
  return (
    <ModuleIframeWrapper data={data} width={width} height={height} zoom={zoom} hoveredBlockKey="" />
  );
};

export default PagePreview;
