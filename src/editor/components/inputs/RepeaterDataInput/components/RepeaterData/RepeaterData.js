// @flow
import React from 'react';
import * as styles from './styles';
import DataItem, { AddDataItemButton } from './components/DataItem/DataItem';
import type {
  RepeaterDataPropDataModel,
  RepeaterDataPropModelModel,
} from '../../../../../../data/block/props/types/model';

const sortDataItems = (data: RepeaterDataPropDataModel): Array<string> => {
  const { order } = data;
  return order;
};

type Props = {
  data: RepeaterDataPropDataModel,
  model: RepeaterDataPropModelModel,
  addDataItem: (position: number) => void,
  updateDataItem: (itemKey: string, fieldKey: string, newValue: any) => void,
  removeDataItem: (itemKey: string) => void,
  updateDataItemPosition: (itemKey: string, position: number) => void,
};

const RepeaterData = ({
  data,
  model,
  addDataItem,
  updateDataItem,
  removeDataItem,
  updateDataItemPosition,
}: Props) => (
  <div className={styles.containerClass}>
    <div className={styles.labelClass}>
      <span>Data</span>
    </div>
    <div className={styles.itemsClass}>
      <div className={styles.addItemClass}>
        <AddDataItemButton
          add={() => {
            addDataItem(0);
          }}
        />
      </div>
      {sortDataItems(data).map((itemKey, index) => {
        const item = data.items[itemKey];
        const { values = {} } = item;
        return (
          <DataItem
            key={itemKey}
            index={index}
            values={values}
            model={model}
            update={(fieldKey: string, newValue: any) => {
              updateDataItem(itemKey, fieldKey, newValue);
            }}
            remove={() => {
              removeDataItem(itemKey);
            }}
            addDataItem={addDataItem}
            moveUp={() => {
              updateDataItemPosition(itemKey, index - 1);
            }}
            moveDown={() => {
              updateDataItemPosition(itemKey, index + 1);
            }}
          />
        );
      })}
    </div>
  </div>
);

export default RepeaterData;
