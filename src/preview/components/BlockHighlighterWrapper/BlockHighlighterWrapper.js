// @flow
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { PREVIEW_BLOCK_HOVERED_CLIENT_RECT } from '../../event';
import { PreviewViewContext } from '../../views/PreviewView/context';
import type { DefaultBlockProps } from '../../../data/block/types/props';

type Props = DefaultBlockProps & {
  [string]: any,
};

export type BlockClientRect = {
  bottom: number,
  height: number,
  left: number,
  right: number,
  top: number,
  width: number,
  x: number,
  y: number,
};

export function withBlockHighlighter(WrappedComponent: any) {
  return class extends Component<Props> {
    static contextType = PreviewViewContext;

    childRef: {
      current?: any,
    };

    hovered: boolean = false;

    constructor(props: Props) {
      super(props);
      this.childRef = React.createRef();
    }

    isBlockHovered(): boolean {
      const { hoveredBlockKey } = this.context;
      const { zoteBlockKey } = this.props;
      return hoveredBlockKey === zoteBlockKey;
    }

    componentDidMount(): void {
      this.checkToUpdate();
    }

    componentDidUpdate(): void {
      this.checkToUpdate();
    }

    checkToUpdate() {
      if (this.isBlockHovered()) {
        if (!this.hovered) {
          this.hovered = true;
          this.updateHighlighter();
        }
      } else {
        this.hovered = false;
      }
    }

    updateHighlighter() {
      if (!this.childRef.current) return;
      let clientRect: BlockClientRect = {
        bottom: 0,
        height: 0,
        left: 0,
        right: 0,
        top: 0,
        width: 0,
        x: 0,
        y: 0,
      };
      let visible = false;
      try {
        // eslint-disable-next-line react/no-find-dom-node
        const domNode: any = ReactDOM.findDOMNode(this.childRef.current);
        if (domNode) {
          clientRect = domNode.getBoundingClientRect();
          visible = true;
        }
      } catch (e) {
        console.error(e);
      }
      const { zoteBlockKey } = this.props;
      window.dispatchEvent(
        new CustomEvent(PREVIEW_BLOCK_HOVERED_CLIENT_RECT, {
          detail: {
            clientRect,
            blockKey: zoteBlockKey,
            visible,
          },
        })
      );
    }

    render() {
      return <WrappedComponent {...this.props} ref={this.childRef} />;
    }
  };
}
