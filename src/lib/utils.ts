export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ')
}

export function formatGroupCount(groupCount: number) {
  return `${groupCount}individual group`
}