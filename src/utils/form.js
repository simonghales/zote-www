// @flow

export function buttonize(handlerFn: () => any) {
  return {
    role: 'button',
    onClick: handlerFn,
    onKeyPress: handlerFn,
  };
}
