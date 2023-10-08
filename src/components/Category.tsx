import { AiOutlinePlus } from "react-icons/ai";
import { MdClose, MdModeEdit } from "react-icons/md"
import Form from "./Form";
import { useState } from "react";
import { CategoryComponentProps } from "../types";
import { useAppDispatch } from "../redux/hooks";
import { deleteCategory, editForm } from "../redux/features/categorySlice";

const Category = ({ item }: CategoryComponentProps) => {
    const dispatch = useAppDispatch()
    const [show, setShow] = useState(false)

    return (
        <li>
            {item?.value && item?.isEdit ? (<Form item={item} />) : (
                <div className="holder">
                    <div className="node">{item?.value}</div>
                    <div className="icon-holder">
                        <button className="icon"
                            onClick={() => setShow(true)}
                        >
                            <AiOutlinePlus />
                        </button>
                        <button className="icon"
                            onClick={() => dispatch(editForm(item?.id!))}
                        >
                            <MdModeEdit />
                        </button>
                        <button className="icon icon--close"
                            onClick={() => dispatch(deleteCategory(item?.id!))}
                        >
                            <MdClose />
                        </button>
                    </div>
                </div>
            )}
            <ul className="category-list">
                {
                    item?.children && item.children.length > 0 && (
                        item.children.map((element, index) => (
                            <Category key={index} item={element} />
                        ))
                    )
                }

                {show && <li> <Form item={item} setShow={setShow} /></li>}
            </ul>
        </li>
    )
}

export default Category