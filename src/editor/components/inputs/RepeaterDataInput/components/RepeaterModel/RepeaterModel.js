// @flow
import React from 'react';
import { FaPlus } from 'react-icons/fa';
import * as styles from './styles';
import RepeaterModelInput from './components/RepeaterModelInput/RepeaterModelInput';
import type { RepeaterDataPropModelModel } from '../../../../../../data/block/props/types/model';
import { SlimIconButton } from '../../../../Button/Button';

type Props = {
  model: RepeaterDataPropModelModel,
  updateField: (fieldKey: string, fieldLabel: string, fieldType: string) => void,
  createField: () => void,
  removeField: (fieldKey: string) => void,
};

const RepeaterModel = ({ model, updateField, createField, removeField }: Props) => (
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
            update={(label: string, type: string) => {
              updateField(fieldKey, label, type);
            }}
            remove={() => {
              removeField(fieldKey);
            }}
          />
        );
      })}
    </div>
    <footer className={styles.footerClass}>
      <SlimIconButton icon={<FaPlus size={9} />} onClick={createField}>
        Add Field
      </SlimIconButton>
    </footer>
  </div>
);

export default RepeaterModel;
