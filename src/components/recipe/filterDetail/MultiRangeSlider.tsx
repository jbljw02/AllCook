import React, { ChangeEvent, FC, useCallback, useEffect, useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { resetNutritionInfo } from '@/redux/features/nutritionSlice';

interface MultiRangeSliderProps {
    min: number;
    max: number;
    unit: string;
    onChange: (minVal: number, maxVal: number) => void;
}

const MultiRangeSlider: FC<MultiRangeSliderProps> = ({ min, max, unit, onChange }) => {
    const dispatch = useDispatch();
    
    const [minVal, setMinVal] = useState<number>(min);
    const [maxVal, setMaxVal] = useState<number>(max);
    const minValRef = useRef(min);
    const maxValRef = useRef(max);
    const range = useRef<HTMLDivElement>(null);

    useEffect(() => {
        dispatch(resetNutritionInfo());
    }, []);

    // 퍼센테이지로 변경
    const getPercent = useCallback((value: number) =>
        Math.round(((value - min) / (max - min)) * 100), [min, max])

    // 범위의 너비를 왼쪽에서 줄이도록 설정
    useEffect(() => {
        const minPercent = getPercent(minVal);
        const maxPercent = getPercent(maxValRef.current);

        if (range.current) {
            range.current.style.left = `${minPercent}%`;
            range.current.style.width = `${maxPercent - minPercent}%`;
        }
    }, [minVal, min, max]);

    // 범위의 너비를 오른쪽에서 줄이도록 설정
    useEffect(() => {
        const minPercent = getPercent(minValRef.current);
        const maxPercent = getPercent(maxVal);

        if (range.current) {
            range.current.style.width = `${maxPercent - minPercent}%`;
        }
    }, [maxVal, min, max]);

    // 최소값을 설정
    const minValChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = Math.min(Number(event.target.value), maxVal - 1);
        setMinVal(value);
        minValRef.current = value;
        // 최대값 및 최소값을 onChange의 파라미터로 전송
        onChange(minValRef.current, maxValRef.current);
    }

    // 최대값을 설정
    const maxValChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = Math.max(Number(event.target.value), minVal + 1);
        setMaxVal(value);
        maxValRef.current = value;
        onChange(minValRef.current, maxValRef.current);
    }

    return (
        <>
            <div className="slide-container">
                <input
                    type="range"
                    min={min}
                    max={max}
                    value={minVal}
                    onChange={minValChange}
                    className="thumb thumb--left"
                    style={{ zIndex: minVal > max - 100 ? "5" : undefined }} />
                <input
                    type="range"
                    min={min}
                    max={max}
                    value={maxVal}
                    onChange={maxValChange}
                    className="thumb thumb--right" />
                <div className="slider">
                    <div className="slider__track"></div>
                    <div ref={range} className="slider__range"></div>
                    <div className="slider__left-value">{`${minVal} ${unit}`}</div>
                    <div className="slider__right-value">{`${maxVal} ${unit}`}</div>
                </div>
            </div>
            <style jsx>{`
                .slide-container {
                    display: flex;
                    align-items: center;
                    {/* justify-content: center; */}
                }
                .slider {
                    position: relative;
                    width: 380px;
                }
                .slider__track,
                .slider__range,
                .slider__left-value,
                .slider__right-value {
                    position: absolute;
                }
                .slider__track,
                .slider__range {
                    border-radius: 3px;
                    height: 2px;
                }
                {/* 슬라이더 미선택 범위 */}
                .slider__track {
                    background-color: #e8e8e8;
                    width: 100%;
                    z-index: 1;
                }
                {/* 슬라이더 선택 범위 */}
                .slider__range {
                    background-color: #111111;
                    z-index: 2;
                }
                .slider__left-value,
                .slider__right-value {
                    color: #111111;
                    font-size: 12px;
                    margin-top: 11px;
                }
                {/* 좌측 슬라이더 */}
                .slider__left-value {
                    left: 1px;
                    color: #5C5C5C;
                }
                {/* 우측 슬라이더 */}
                .slider__right-value {
                    right: 1px;
                    color: #5C5C5C;
                }
                {/* 기본 커서 삭제 */}
                .thumb,
                .thumb::-webkit-slider-thumb {
                    -webkit-appearance: none;
                }
                {/* 커서 */}
                .thumb {
                    pointer-events: none;
                    position: absolute;
                    height: 0;
                    width: 380px;
                    outline: none;
                    margin-left: -0.1px;
                }
                {/* 왼쪽 커서 */}
                .thumb--left {
                    z-index: 3;
                    margin-top: 0px;
                }
                {/* 오른쪽 커서 */}
                .thumb--right {
                    z-index: 4;
                    margin-top: 0px;
                }
                /* 크롬 */
                .thumb::-webkit-slider-thumb {
                    background-color: #111111;
                    border: none;
                    border-radius: 50%;
                    cursor: pointer;
                    height: 8px;
                    width: 8px;
                    margin-top: 4px;
                    pointer-events: all;
                    position: relative;
                }
                /* 파이어폭스 */
                .thumb::-moz-range-thumb {
                    background-color: #111111;
                    border: none;
                    border-radius: 50%;
                    cursor: pointer;
                    height: 8px;
                    width: 8px;
                    margin-top: 4px;
                    pointer-events: all;
                    position: relative;
                }
            `}</style>
        </>
    );
};

export default MultiRangeSlider;