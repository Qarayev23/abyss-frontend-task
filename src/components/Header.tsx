import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai"
import { useState } from "react";
import { FaCheck, FaLocationArrow } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { decreaseZoomLevel, setPosition, increaseZoomLevel, setZoomLevel } from "../redux/features/zoomSlice";

const Header = () => {
    const dispatch = useAppDispatch();
    const { zoomLevel } = useAppSelector(state => state.zoomSlice);

    const zoomOptions = [60, 70, 80, 90, 100, 110, 120, 130, 140, 150];
    const [active, setActive] = useState(false)

    const handleOptions = (e: React.MouseEvent<HTMLLIElement>) => {
        const target = e.target as HTMLLIElement;
        dispatch(setZoomLevel(Number(target.innerText.replace('%', ''))));
        setActive(!active);
    }

    return (
        <div className="header">
            <div className="header__right">
                <button className="header__btn" onClick={() => dispatch(setPosition(true))}>
                    <FaLocationArrow />
                </button>
                <div className="header-zoom">
                    <button onClick={() => dispatch(increaseZoomLevel())} className="header__btn">
                        <AiOutlinePlus />
                    </button>
                    <button className="header__btn header-zoom__count" onClick={() => setActive(!active)}>
                        {zoomLevel}%
                    </button>
                    <button onClick={() => dispatch(decreaseZoomLevel())}  className="header__btn">
                        <AiOutlineMinus />
                    </button>

                    <ul className={active ? "header-zoom__list active" : "header-zoom__list"}>
                        {
                            zoomOptions.map((zoom) => (
                                <li
                                    key={zoom}
                                    className={zoomLevel === zoom ? "header-zoom__item active" : "header-zoom__item"}
                                    onClick={handleOptions}>
                                    <span>{zoom}%</span>
                                    {zoomLevel === zoom && <FaCheck />}
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Header