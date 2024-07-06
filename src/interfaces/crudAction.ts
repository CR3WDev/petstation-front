export type IButtonColor = 'secondary' | 'success' | 'info' | 'warning' | 'danger' | 'help'

export interface IActionType {
  onClick: () => void
  icon: JSX.Element
  severity: any
  label: string
}
