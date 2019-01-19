// @flow
import React from 'react';
import { connect } from 'react-redux';
import styles from './styles';
import BlockItem from './components/BlockItem/BlockItem';
import type { SortableBlockModel } from './models';

type Props = {
  blocks: Array<SortableBlockModel>,
};

const ComponentSortable = ({ blocks }: Props) => (
  <div className={styles.containerClass}>
    {blocks.map(block => (
      <BlockItem selected />
    ))}
  </div>
);

export default ComponentSortable;

const mapStateToProps = () => ({
  blocks: [
    {
      icon: 'todo',
      name: 'Container',
      key: 'todo',
      children: [
        {
          icon: 'todo',
          name: 'Child',
          key: 'todo-child',
        },
      ],
    },
  ],
});

export const ReduxComponentSortable = connect(mapStateToProps)(ComponentSortable);
