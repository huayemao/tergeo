export enum Mode {
  usual = 'usual',
  children = 'children',
}

export const getOptions = (mode) => {
  const mapping = {
    [Mode.usual]: {
      label: '普通模式',
    },
    [Mode.children]: {
      label: '成长记录模式',
    },
  }
  return mapping[mode]
}
