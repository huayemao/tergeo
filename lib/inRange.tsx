export const inRange = (
  target,
  [left, right],
  include: 'left' | 'right' | undefined = undefined
) => {
  if (!include) return target < right && target > left

  const mapping = {
    left: target < right && (target > left || target === left),
    right: target < right || target === right,
  }
  return mapping[include]
}
