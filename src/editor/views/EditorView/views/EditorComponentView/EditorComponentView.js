// @flow
import React from 'react';
import ModuleView from '../ModuleView/ModuleView';
import EditorRouteHandler from '../../../../routing/components/EditorRouteHandler';
import SelectedComponentRequiredWrapper from '../../../../components/SelectedComponentRequiredWrapper/SelectedComponentRequiredWrapper';

const EditorComponentView = () => (
  <EditorRouteHandler>
    <SelectedComponentRequiredWrapper>
      <ModuleView />
    </SelectedComponentRequiredWrapper>
  </EditorRouteHandler>
);

export default EditorComponentView;
