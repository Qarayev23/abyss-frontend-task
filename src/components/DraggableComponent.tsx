import { useCallback, useEffect, useState } from 'react'
import { useDraggable } from '../hooks/useDraggable';
import Category from './Category';
import Form from './Form';
import { AiOutlinePlus } from "react-icons/ai";
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { setPosition } from '../redux/features/zoomSlice';

const DraggableComponent = () => {
    const { categories } = useAppSelector(state => state.categoryReducer)
    const { zoomLevel, isCenter } = useAppSelector(state => state.zoomSlice)
    const dispatch = useAppDispatch();

    const handleDrag = useCallback(
        ({ x, y }: { x: number; y: number }) => ({
            x: Math.max(0, x),
            y: Math.max(0, y),
        }),
        []
    );

    const [ref, pressed] = useDraggable({
        onDrag: handleDrag,
        isCenter
    });

    const [show, setShow] = useState(false)

    useEffect(() => {
        isCenter && dispatch(setPosition(false))
    }, [pressed, ondrag])

    return (
        <div
            ref={ref}
            className="draggable"
            style={{ cursor: pressed ? "grabbing" : "grab" }}
        >
            <div className={`zoom-${(zoomLevel / 100).toString().replace('.', '-')} tree vertical`}>
                <li>
                    <div className="holder">
                        <div className='node--root'>Categories</div>
                        <div className="icon-holder">
                            <button className="icon" onClick={() => setShow(true)}>
                                <AiOutlinePlus />
                            </button>
                        </div>
                    </div>

                    <ul>
                        {categories.map((item, index) => (
                            <Category key={index} item={item} />
                        ))}
                        {show && <li><Form setShow={setShow} /></li>}
                    </ul>
                </li>
            </div>
        </div>
    );
};

export default DraggableComponent