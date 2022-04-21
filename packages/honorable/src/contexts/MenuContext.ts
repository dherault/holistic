import { Dispatch, MouseEvent, ReactNode, SetStateAction, createContext } from 'react'

export type MenuStateType = {
  value?: any
  renderedItem?: ReactNode
  event?: MouseEvent
  activeItemIndex?: number
  focused?: boolean
}

export type MenuStateDispatcherType = Dispatch<SetStateAction<MenuStateType>>
export type MenuContextType = [MenuStateType, MenuStateDispatcherType]

export default createContext<MenuContextType>([{}, () => {}])
