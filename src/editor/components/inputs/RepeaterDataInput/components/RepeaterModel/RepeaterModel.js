// @flow
import React from 'react';
import * as styles from './styles';
import RepeaterModelInput from './components/RepeaterModelInput/RepeaterModelInput';
import type { RepeaterDataPropModelModel } from '../../../../../../data/block/props/types/model';

type Props = {
  model: RepeaterDataPropModelModel,
};

const RepeaterModel = ({ model }: Props) => (
  <div className={styles.containerClass}>
    <div className={styles.labelClass}>
      <span>Model</span>
    </div>
    <div>
      {Object.keys(model.fields).map(fieldKey => {
        const field = model.fields[fieldKey];
        return (
          <RepeaterModelInput
            key={fieldKey}
            fieldKey={fieldKey}
            label={field.label}
            type={field.type}
          />
        );
      })}
    </div>
  </div>
);

export default RepeaterModel;
