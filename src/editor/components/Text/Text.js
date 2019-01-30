// @flow
import React from 'react';
import type { Node } from 'react';
import styles from './styles';

const Text = ({ children }: { children: Node }) => <p className={styles.textClass}>{children}</p>;

export default Text;
