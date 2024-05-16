import { setServings } from "@/redux/features/recipeSlice";
import { RootState } from "@/redux/store";
import { forwardRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const ServingsBox = forwardRef<HTMLDivElement, {}>((props, ref) => {
    const dispatch = useDispatch();

    const [inputHover, setInputHover] = useState<boolean>(false); // input 안에 마우스가 들어갔는지
    const servings = useSelector((state: RootState) => state.servings);

    // 인분 수의 덧셈, 뺄셈
    const calculateServings = (param: string) => {
        if (param === 'plus') {
            dispatch(setServings(servings + 1));
        }
        if (param === 'minus' && servings > 1) {
            dispatch(setServings(servings - 1));
        }
    }

    return (
        <>
            <div
                onMouseEnter={() => setInputHover(!inputHover)}
                onMouseLeave={() => setInputHover(!inputHover)}
                className="per-person-box"
                ref={ref}>
                <input 
                type="text"
                value={servings}
                readOnly />
                <span className={`${!inputHover ? "" : 'visible'} cal-svg`}>
                    <svg onClick={() => { calculateServings('plus') }} className="minus" xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" viewBox="0 0 16 16" version="1.1">
                        <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                            <g id="Desktop-1920-/-1080" stroke="#111111">
                                <g id="qty" transform="translate(3.000000, 5.000000)">
                                    <polyline id="Rectangle-3-Copy" transform="translate(5.000000, 5.000000) rotate(-225.000000) translate(-5.000000, -5.000000) " points="8 8 2 8 2 2" /></g>
                            </g></g>
                    </svg>
                    <svg onClick={() => { calculateServings('minus') }} className="plus" xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" viewBox="0 0 16 16" version="1.1">
                        <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                            <g id="Desktop-1920-/-1080" stroke={`${servings === 1 ? '#c3c3c3' : '#111111'}`}>
                                <g id="qty" transform="translate(8.000000, 6.000000) rotate(-180.000000) translate(-8.000000, -6.000000) translate(3.000000, 1.000000)">
                                    <polyline id="Rectangle-3-Copy" transform="translate(5.000000, 5.000000) rotate(-225.000000) translate(-5.000000, -5.000000) " points="8 8 2 8 2 2" />
                                </g></g></g>
                    </svg>
                </span>
            </div>
            <style jsx>{`
                .per-person-box {
                    position: relative;
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;
                    align-items: center;
                    border: none;
                    margin-top: 7px;
                }
                .cal-svg {
                    opacity: 0;
                    transition: opacity 0.2s ease-in-out;   
                }
                .visible {
                    opacity: 1;
                }
                .plus, .minus {
                    position: absolute;
                    width: 19px;
                    cursor: pointer;
                }
                .minus {
                    top: 0;
                    right: 0;
                    margin-right: 1px;
                    margin-top: 6px;
                }
                .plus {
                    bottom: 0;
                    right: 0;
                    margin-right: 1px;
                    margin-bottom: 3px;
                    fill: #575757;
                }
                .per-person-box input {
                    outline: none;
                    width: 60px;
                    height: 27px;
                    font-size: 14px;
                    text-align: left;
                    margin-top: 3px;
                    padding: 5px 0 5px 12px;
                    border-radius: 1px;
                    border: 1px solid #cecece;
                    font-weight: 300;
                    color: #5C5C5C;
                }
            `}</style>
        </>
    )
});

ServingsBox.displayName = 'ServingsBox';

export default ServingsBox;