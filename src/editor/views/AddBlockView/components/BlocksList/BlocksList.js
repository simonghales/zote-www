// @flow
import React from 'react';
import { connect } from 'react-redux';
import type { ReduxState } from '../../../../../redux/store';
import * as styles from './styles';
import { getDefaultBlocks } from '../../../../../data/block/types/state';
import BlockItem from './components/BlockItem/BlockItem';
import { mapBlockTypesToAddBlock, mapComponentsToAddBlock } from './state';
import type { AddBlockModel } from './state';
import { getComponentsFromReduxEditorState } from '../../../../../redux/editor/state';
import { getAddableComponents } from '../../../../../data/component/state';
import { getSelectedComponentKeySelector } from '../../../../state/reselect/component';

function filterBlocks(blocks: Array<AddBlockModel>, filter: string): Array<AddBlockModel> {
  return blocks.filter(block => block.name.toLowerCase().indexOf(filter.toLowerCase()) > -1);
}

type Props = {
  blocks: Array<AddBlockModel>,
  filter: string,
  addBlock: (
    blockKey: string,
    generateProps?: {
      [string]: any,
    }
  ) => void,
};

const BlocksList = ({ blocks, filter, addBlock }: Props) => (
  <ul className={styles.containerClass}>
    {filterBlocks(blocks, filter).map(block => (
      <li className={styles.itemClass} key={block.key}>
        <BlockItem
          name={block.name}
          icon={block.icon}
          add={() => addBlock(block.blockTypeKey, block.generateProps)}
        />
      </li>
    ))}
  </ul>
);

const mapStateToProps = (state: ReduxState) => {
  const componentKey = getSelectedComponentKeySelector(state);
  const blocks = getDefaultBlocks();
  const mappedBlocks = mapBlockTypesToAddBlock(blocks);
  const components = getComponentsFromReduxEditorState(state.editor);
  const mappedComponents = mapComponentsToAddBlock(getAddableComponents(components, componentKey));
  const finalBlocks = mappedBlocks.concat(mappedComponents);
  return {
    blocks: finalBlocks,
  };
};

export default connect(mapStateToProps)(BlocksList);
