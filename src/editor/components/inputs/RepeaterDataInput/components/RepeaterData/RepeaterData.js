// @flow
import React from 'react';
import * as styles from './styles';
import DataItem from './components/DataItem/DataItem';
import type {
  RepeaterDataPropDataModel,
  RepeaterDataPropModelModel,
} from '../../../../../../data/block/props/types/model';

type Props = {
  data: RepeaterDataPropDataModel,
  model: RepeaterDataPropModelModel,
};

const RepeaterData = ({ data, model }: Props) => (
  <div className={styles.containerClass}>
    <div className={styles.labelClass}>
      <span>Data</span>
    </div>
    <div className={styles.itemsClass}>
      {Object.keys(data.items).map((itemKey, index) => {
        const item = data.items[itemKey];
        const { values = {} } = item;
        return <DataItem key={itemKey} index={index} values={values} model={model} />;
      })}
    </div>
  </div>
);

export default RepeaterData;
