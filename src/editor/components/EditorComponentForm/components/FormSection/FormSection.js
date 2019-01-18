// @flow
import type { Node } from 'react';
import React, { Component } from 'react';
import { cx } from 'emotion';
import { FaChevronDown, FaChevronRight } from 'react-icons/fa';
import styles from './styles';
import FormInput from '../FormInput/FormInput';
import type {
  EditorFormInputModel,
  EditorFormSectionColumnModel,
  EditorFormSectionRowModel,
} from '../../data/models';
import ReduxFormInput from '../ReduxFormInput/ReduxFormInput';
import { EditorComponentFormContext } from '../../context';
import type { EditorComponentFormContextState } from '../../context';

const Column = ({ children, columns }: { children: Node, columns: number }) => (
  <div
    className={styles.columnClass}
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
      />
    );
  }
  return (
    <FormInput
      inputKey={input.key}
      name={input.name}
      value={input.value}
      defaultValue={input.defaultValue}
      inactive={input.inactive}
      updateValue={input.onChange}
      inputType={input.inputType}
    />
  );
}

class FormSection extends Component<Props> {
  context: EditorComponentFormContextState;

  static defaultProps = {
    visible: true,
  };

  static contextType = EditorComponentFormContext;

  handleToggleVisible = () => {
    const { setVisible, visible = true } = this.props;
    setVisible(!visible);
  };

  render() {
    const { heading, columns, visible } = this.props;
    const { componentKey, blockKey, blockStyleKey, styleStateKey } = this.context;
    return (
      <div className={styles.containerClass}>
        <header className={styles.headerClass} onClick={this.handleToggleVisible}>
          <div className={styles.headerTextClass}>{heading}</div>
          <div className={styles.headerIconClass}>
            {visible ? <FaChevronDown size={8} /> : <FaChevronRight size={8} />}
          </div>
        </header>
        <div
          className={cx({
            [styles.hiddenBodyClass]: !visible,
          })}
        >
          <Row>
            {columns.map(({ columns: numberOfColumns, input }) => (
              <Column columns={numberOfColumns} key={input.key}>
                {getFormInput(input, componentKey, blockKey, blockStyleKey, styleStateKey)}
              </Column>
            ))}
          </Row>
        </div>
      </div>
    );
  }
}

export default FormSection;
