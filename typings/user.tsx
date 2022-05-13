export enum Mode {
  permanent = 'permanent',
  primary = 'primary',
  children = 'children',
}

export const getOptions = (mode) => {
  const mapping = {
    [Mode.permanent]: {
      label: '全部恒牙',
      key: Mode.permanent,
    },
    [Mode.primary]: {
      label: '全部乳牙',
      key: Mode.primary,
    },
    [Mode.children]: {
      label: '成长记录模式',
      key: Mode.children,
    },
  }
  return mapping[mode]
}
