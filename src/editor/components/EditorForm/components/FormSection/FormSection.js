// @flow
import type { Node } from 'react';
import React from 'react';
import { cx } from 'emotion';
import styles from './styles';
import FormInput from '../FormInput/FormInput';
import type { EditorFormSectionRowModel } from '../../data/models';
import { getFormInput } from '../ReduxFormInput/ReduxFormInput';

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
  rows: Array<EditorFormSectionRowModel>,
};

const FormSection = ({ heading, rows }: Props) => (
  <div className={styles.containerClass}>
    <header className={styles.headerClass}>
      <div className={styles.headerTextClass}>{heading}</div>
    </header>
    <div>
      {rows.map((row, index) => (
        <Row key={index.toString()}>
          {row.columns.map(({ columns, input }) => (
            <Column columns={columns} key={input.key}>
              {getFormInput(input)}
            </Column>
          ))}
        </Row>
      ))}
    </div>
  </div>
);

export default FormSection;
