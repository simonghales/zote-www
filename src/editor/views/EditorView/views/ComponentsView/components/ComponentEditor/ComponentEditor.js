// @flow
import React from 'react';
import { FaEdit } from 'react-icons/fa';
import * as styles from './styles';
import EditorHeader from '../../../../../../components/EditorHeader/EditorHeader';
import type { ComponentModel } from '../../../../../../../data/component/model';
import { getComponentName } from '../../../../../../../data/component/state';
import { goToEditComponent } from '../../../../../../routing/actions';
import { SlimIconButton } from '../../../../../../components/Button/Button';

type Props = {
  component: ComponentModel,
};

const ComponentEditor = ({ component }: Props) => (
  <div className={styles.containerClass}>
    <EditorHeader title={getComponentName(component)} />
    <section className={styles.bodyClass}>
      <div>
        <SlimIconButton
          icon={<FaEdit size={9} />}
          onClick={() => {
            goToEditComponent(component.key);
          }}
        >
          Edit Block
        </SlimIconButton>
      </div>
    </section>
  </div>
);

export default ComponentEditor;
