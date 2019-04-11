// @flow
import type { Node } from 'react';
import React, { Component } from 'react';
import { cx } from 'emotion';
import styles from './styles';
import { getFormInputComponent } from '../FormInput/FormInput';
import type { EditorFormInputModel, EditorFormSectionColumnModel } from '../../data/models';
import ReduxFormInput from '../ReduxFormInput/ReduxFormInput';
import { EditorComponentFormContext } from '../EditorComponentFormContextWrapper/context';
import type { EditorComponentFormContextState } from '../EditorComponentFormContextWrapper/context';
import FormSection from '../FormSection/FormSection';
import { getBlockStylesSelector } from '../StylesStateFormSection/StylesStateFormSection';

const Column = ({ children, columns }: { children: Node, columns: number }) => (
  <div
    className={cx(styles.columnClass, {
      [styles.sharedRowColumnClass]: columns < 4, // 4 is full
    })}
    style={{
      gridColumn: `span ${columns}`,
    }}
  >
    {children}
  </div>
);

const Row = ({ children }: { children: Node }) => (
  <div className={cx(styles.rowClass, styles.rowGridClass)}>{children}</div>
);

type Props = {
  heading: string,
  columns: Array<EditorFormSectionColumnModel>,
  visibilityKey: string,
};

export function getFormInput(
  input: EditorFormInputModel,
  componentKey: string,
  blockKey: string,
  blockStyleKey: string,
  styleStateKey: string
): Node {
  if (input.reduxConnected) {
    return (
      <ReduxFormInput
        input={input}
        componentKey={componentKey}
        blockKey={blockKey}
        blockStyleKey={blockStyleKey}
        styleStateKey={styleStateKey}
        reduxType={input.reduxConnected.type}
      />
    );
  }
  const FormInputComponent = getFormInputComponent(input);
  return (
    <FormInputComponent
      inputKey={input.key}
      name={input.name}
      value={input.value}
      defaultValue={input.defaultValue}
      inactive={input.inactive}
      updateValue={input.onChange}
      inputType={input.inputType}
      dropDownComponent={input.dropdownMenu}
      componentKey={componentKey}
      blockKey={blockKey}
      propInput={input.propInput}
      blockStyleKey={blockStyleKey}
      styleStateKey={styleStateKey}
    />
  );
}

class FormColumnsSection extends Component<Props> {
  context: EditorComponentFormContextState;

  static contextType = EditorComponentFormContext;

  render() {
    const { heading, columns, visibilityKey } = this.props;
    const { componentKey, blockKey, blockStyleKey, blockStylesSelector } = this.context;
    if (columns.length === 0) return null;
    const styleStateKey = getBlockStylesSelector(blockStylesSelector, blockKey);
    return (
      <FormSection visibilityKey={visibilityKey} heading={heading}>
        <Row>
          {columns.map(({ columns: numberOfColumns, input }) => (
            <Column columns={numberOfColumns} key={input.key}>
              {getFormInput(input, componentKey, blockKey, blockStyleKey, styleStateKey)}
            </Column>
          ))}
        </Row>
      </FormSection>
    );
  }
}

export default FormColumnsSection;
