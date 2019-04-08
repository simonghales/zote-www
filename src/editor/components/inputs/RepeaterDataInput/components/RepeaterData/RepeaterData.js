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
  updateDataItem: (itemKey: string, fieldKey: string, newValue: any) => void,
  removeDataItem: (itemKey: string) => void,
};

const RepeaterData = ({ data, model, updateDataItem, removeDataItem }: Props) => (
  <div className={styles.containerClass}>
    <div className={styles.labelClass}>
      <span>Data</span>
    </div>
    <div className={styles.itemsClass}>
      {Object.keys(data.items).map(itemKey => {
        const item = data.items[itemKey];
        const { values = {} } = item;
        return (
          <DataItem
            key={itemKey}
            values={values}
            model={model}
            update={(fieldKey: string, newValue: any) => {
              updateDataItem(itemKey, fieldKey, newValue);
            }}
            remove={() => {
              removeDataItem(itemKey);
            }}
          />
        );
      })}
    </div>
  </div>
);

export default RepeaterData;
