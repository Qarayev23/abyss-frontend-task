export interface CategoryProps {
    id: number
    value: string
    isEdit: boolean
    children: CategoryProps[]
}

export interface CategoryComponentProps {
    item: CategoryProps
}

export interface FormProps {
    item?: CategoryProps
    setShow?: (show: boolean) => void
}