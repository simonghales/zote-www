// @flow
import React from 'react';
import { connect } from 'react-redux';
import { DUMMY_SORTABLE_BLOCKS } from './models';
import type { SortableBlockModel } from './models';
import styles from './styles';
import NestList from './components/NestList/NestList';
import BlockItem from './components/BlockItem/BlockItem';

type Props = {
  blocks: Array<SortableBlockModel>,
};

const ComponentSortable = ({ blocks }: Props) => (
  <div className={styles.containerClass}>
    <BlockItem selected>
      <NestList blocks={blocks} />
    </BlockItem>
  </div>
);

export default ComponentSortable;

const mapStateToProps = () => ({
  blocks: DUMMY_SORTABLE_BLOCKS,
});

export const ReduxComponentSortable = connect(mapStateToProps)(ComponentSortable);
