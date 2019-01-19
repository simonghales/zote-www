// @flow
import React, { Component } from 'react';
import Nestable from 'react-nestable';
import styles from './styles';
import BlockItem from '../BlockItem/BlockItem';
import type { SortableBlockModel } from '../../models';

type Props = {
  blocks: Array<SortableBlockModel>,
};

function renderCondensedNestItem(item: SortableBlockModel) {
  return <BlockItem selected={item.selected} />;
}

class NestList extends Component<Props> {
  handleRenderItem = ({ item }: { item: SortableBlockModel }) => renderCondensedNestItem(item);

  render() {
    const { blocks } = this.props;
    return (
      <div className={styles.containerClass}>
        <Nestable
          items={blocks}
          renderItem={this.handleRenderItem}
          onChange={() => {}}
          maxDepth={50}
        />
      </div>
    );
  }
}

export default NestList;
