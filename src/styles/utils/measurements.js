// @flow

import { ROOT_FONT_SIZE } from '../global';

export function getRem(pixels: number): string {
  return `${pixels / ROOT_FONT_SIZE}rem`;
}

export function getEm(pixels: number, fontSize: number): string {
  return `${pixels / fontSize}em`;
}
