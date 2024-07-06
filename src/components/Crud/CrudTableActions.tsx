import { ReactNode } from 'react'

type CrudActionsProps = {
  children?: ReactNode
}

export const CrudTableActions = ({ children }: CrudActionsProps) => {
  return (
    <div className="flex justify-content-center">
      <>{children}</>
    </div>
  )
}
