// @flow
import type { Node } from 'react';
import React, { Component } from 'react';
import { cx } from 'emotion';
import { FaChevronDown, FaChevronRight } from 'react-icons/fa';
import styles from './styles';
import { getFormInputComponent } from '../FormInput/FormInput';
import type { EditorFormInputModel, EditorFormSectionColumnModel } from '../../data/models';
import ReduxFormInput from '../ReduxFormInput/ReduxFormInput';
import { EditorComponentFormContext } from '../../context';
import type { EditorComponentFormContextState } from '../../context';
import FormSection from '../FormSection/FormSection';

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
  visible?: boolean,
  setVisible: (visible: boolean) => void,
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

  static defaultProps = {
    visible: true,
  };

  static contextType = EditorComponentFormContext;

  render() {
    const { heading, columns, visible, setVisible } = this.props;
    const { componentKey, blockKey, blockStyleKey, styleStateKey } = this.context;
    return (
      <FormSection visible={visible} heading={heading} setVisible={setVisible}>
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