// @flow
import { camelCase } from 'lodash';
import type {
  HtmlAttributeEntryModel,
  HtmlAttributesPropValue,
  RepeaterDataPropModel,
  RepeaterDataPropModelFieldModel,
} from './model';
import type { BlockPropConfigModel } from '../model';
import { BLOCK_PROPS_CONFIG_TYPES } from '../model';

function cssToObj(css) {
  const obj = {};
  const s = css
    .toLowerCase()
    .replace(/-(.)/g, (m, g) => g.toUpperCase())
    .replace(/;\s?$/g, '')
    .split(/:|;/g);
  for (let i = 0; i < s.length; i += 2)
    obj[s[i].replace(/\s/g, '')] = s[i + 1].replace(/^\s+|\s+$/g, '');
  return obj;
}

export function convertStyleCssStringToObject(
  css: string
): {
  [string]: string,
} {
  const style = cssToObj(css);
  const correctedStyle = {};
  Object.keys(style).forEach(styleKey => {
    correctedStyle[camelCase(styleKey)] = style[styleKey];
  });
  return correctedStyle;
}

export function getSafeHtmlAttributeKey(key: string): string {
  switch (key) {
    case 'class':
      return 'className';
    default:
      return key;
  }
}

export function getSafeHtmlAttributeValue(key: string, value: string): any {
  switch (key) {
    case 'style':
      return convertStyleCssStringToObject(value);
    default:
      return value;
  }
}

export function getSafeHtmlAttributeKeyValue(key: string, value: string): HtmlAttributeEntryModel {
  const safeKey = getSafeHtmlAttributeKey(key);
  const safeValue = getSafeHtmlAttributeValue(key, value);
  return {
    key: safeKey,
    value: safeValue,
  };
}

export function getReactPropsFromHtmlAttributes(
  htmlAttributes: HtmlAttributesPropValue
): {
  [string]: string,
} {
  const props = {};
  htmlAttributes.forEach(attribute => {
    const { key, value } = getSafeHtmlAttributeKeyValue(attribute.key, attribute.value);
    props[key] = value;
  });
  return props;
}

export function isPropConfigBlockType(propConfig?: BlockPropConfigModel | null): boolean {
  return !!propConfig && propConfig.type === BLOCK_PROPS_CONFIG_TYPES.blocks;
}

export function isPropConfigComponentReferenceType(
  propConfig?: BlockPropConfigModel | null
): boolean {
  return !!propConfig && propConfig.type === BLOCK_PROPS_CONFIG_TYPES.componentReference;
}

export function getRepeaterDataFields(
  prop: RepeaterDataPropModel
): Array<RepeaterDataPropModelFieldModel> {
  const { model } = prop;
  const { fields = {} } = model;
  return Object.keys(fields).map(fieldKey => fields[fieldKey]);
}
