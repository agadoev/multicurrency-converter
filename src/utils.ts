export const extract = (
  obj: Record<string, unknown>,
  keys: string[]): Record<string, unknown> => {

  var entries = Object
    .entries(obj)
    .filter(([key, _]) => keys.includes(key))

  return Object.fromEntries(entries)
}

export const addOrRemove = <T>(arr: T[], item: T) =>
  arr.includes(item)
    ? arr.filter(i => i !== item)
    : [...arr, item];

export const empty = (value: any) => 
  Object.keys(value).length == 0 ||
  value == null || 
  value == undefined

export const removeLast = (str: string): string => {
  if (str === '')
    return str

  return str.substring(0, str.length - 1);
}
