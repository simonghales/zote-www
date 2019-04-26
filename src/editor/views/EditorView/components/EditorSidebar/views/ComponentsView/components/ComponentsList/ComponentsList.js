// @flow
import React from 'react';
import { connect } from 'react-redux';
import ComponentItem from './components/ComponentItem/ComponentItem';
import {
  useReusableComponents,
  useSelectedPreviewComponentKey,
} from '../../../../../../../../state/hooks/components';
import {
  getComponentIcon,
  getComponentName,
} from '../../../../../../../../../data/component/state';
import { setSelectedPreviewComponentKeyRedux } from '../../../../../../../../../redux/ui/reducer';
import { goToEditComponent } from '../../../../../../../../routing/actions';

type Props = {
  selectComponent: (componentKey: string) => void,
};

const ComponentsList = ({ selectComponent }: Props) => {
  const components = useReusableComponents();
  const selectedComponentKey = useSelectedPreviewComponentKey();
  return (
    <div>
      {components.map(component => (
        <ComponentItem
          icon={getComponentIcon(component)}
          title={getComponentName(component)}
          key={component.key}
          onSelect={() => selectComponent(component.key)}
          onEdit={() => goToEditComponent(component.key)}
          active={component.key === selectedComponentKey}
        />
      ))}
    </div>
  );
};

const mapDispatchToProps = {
  selectComponent: (componentKey: string) => setSelectedPreviewComponentKeyRedux(componentKey),
};

export default connect(
  null,
  mapDispatchToProps
)(ComponentsList);
