import { useState } from "react"
import { AiOutlinePlus } from "react-icons/ai"
import { MdClose } from "react-icons/md"
import { FormProps } from "../types"
import { useAppDispatch } from "../redux/hooks"
import { createCategory, editForm, updateCategory } from "../redux/features/categorySlice"

const Form = ({ setShow, item }: FormProps) => {
    const dispatch = useAppDispatch()
    const [value, setValue] = useState(item?.isEdit ? item.value : "")

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (value.trim().length > 0) {
            item?.isEdit ? dispatch(updateCategory({ id: item.id, value })) : dispatch(createCategory({ id: item?.id ? item?.id : null, value }))
            setValue("")
            setShow && setShow(false)
        }
    }

    const handleClose = () => {
        if (item?.isEdit) {
            dispatch(editForm(item.id!))
        } else {
            setShow && setShow(false)
        }
    }

    return (
        <div className="holder">
            <form className="category-form" onSubmit={handleSubmit}>
                <input type="text" value={value} onChange={(e) => setValue(e.target.value)} />
                <div className="icon-holder icon-holder--form">
                    <button type="submit" className="icon">
                        <AiOutlinePlus />
                    </button>
                    <button type="button" className="icon icon--close" onClick={handleClose}>
                        <MdClose />
                    </button>
                </div>
            </form>
        </div>
    )
}

export default Form