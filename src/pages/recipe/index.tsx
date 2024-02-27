import Header from "../../components/Header"
import Footer from "../../components/Footer"
import { useDispatch, useSelector } from "react-redux"
import { Menu, RootState, wrapper } from "../../redux/store";
import { setAllMenu, setDisplayedMenu } from "../../redux/features/menuSlice";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Seo from "../../components/Seo";
import MultiRangeSlider from "../../components/multiRangeSlider";
import { setNutritionInfo } from "../../redux/features/nutritionSlice";
import { NutritionKey } from "../../redux/features/nutritionSlice";
import { searchByKey, searchByRange } from "../../utils/filterMenu";
import SortList from "../../components/SortList";
import HeaderOnContents from '../../components/HeaderOnContents';
import { useRouter } from "next/router";
import { setRecipe } from "@/redux/features/recipeSlice";

export default function Recipe() {
    const dispatch = useDispatch();

    const [scrollPassContent, setScrollPassContent] = useState(false);  // 스크롤이 컨텐츠 영역을 지났는지
    const [headerSlide, setHeaderSlide] = useState(false);  // 헤더의 슬라이드를 처리하기 위함
    const contentsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // 헤더가 배너 영역에 도달하면 스타일을 바꾸기 위한 함수
        const checkScrollLocation = () => {
            const margin = 50;
            if (contentsRef.current !== null) {
                if (!scrollPassContent && window.scrollY > contentsRef.current.offsetTop + margin) {
                    setScrollPassContent(true);
                    setHeaderSlide(false)
                }
                else if (scrollPassContent && window.scrollY <= contentsRef.current.offsetTop - margin) {
                    setHeaderSlide(true)
                    setTimeout(() => {
                        setScrollPassContent(false);
                    }, 300);
                }
            }
        };

        window.addEventListener('scroll', checkScrollLocation);
        return () => {
            window.removeEventListener('scroll', checkScrollLocation);
        };
    }, [scrollPassContent]);

    const allMenu = useSelector((state: RootState) => state.allMenu);
    const displayedMenu = useSelector((state: RootState) => state.displayedMenu);

    // 화면이 첫 렌더링 될 때 보일 메뉴를 allMenu와 동일하게 업데이트
    useEffect(() => {
        // 페이지를 이동하지 않은 경우에만 업데이트(검색을 통해 이동하지 않은 경우에만)
        if (!sessionStorage.getItem('navigated')) {
            dispatch(setDisplayedMenu(allMenu));
        }
        sessionStorage.removeItem('navigated');
    }, [allMenu])

    const [sliderKey, setSliderKey] = useState(0);

    // 피셔-예이츠 셔플 알고리즘
    // 배열의 마지막 요소부터 처음 요소까지 반복, 각 반복에서 해당 요소와 그 이전의 무작위 위치의 요소를 교환
    const shuffle = (array: string[]) => {
        for (let i = array.length - 1; i > 0; i--) {
            // 0 이상 i(현재 요소의 인덱스) 이하의 무작위 정수를 얻음
            const j = Math.floor(Math.random() * (i + 1));
            // 요소의 위치를 교환
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    // allMenu가 업데이트 될 때, 해시태그를 업데이트함
    useEffect(() => {
        const hastTags = allMenu.map((item) => item.HASH_TAG);
        const uniqeHashTags = [...new Set(hastTags)];  // 중복 제거
        const nonEmptyHashTags = uniqeHashTags.filter(item => item.trim() !== '');  // 공백 문자를 제외하여 반환
        const fixedSideTags = (shuffle(nonEmptyHashTags)).slice(0, 8);
        setRecomHashTags(fixedSideTags);
    }, [allMenu]);

    // 음식의 종류, 요리 방법, 영양성분의 선택 여부 및 범위를 담는 state들 
    const [foodType, setFoodType] = useState({
        sideDish: false,  // 반찬
        specialDish: false,  // 일품
        stew: false,  // 국&찌개
        dessert: false,  // 후식
    });
    const [cookWay, setCookWay] = useState({
        steam: false,  // 찌기
        boil: false,  // 끓이기
        grill: false,  // 굽기
        stir: false,  // 볶기
        fry: false,  // 튀기기
        etc: false,  // 기타
    });

    const nutritionInfo = useSelector((state: RootState) => state.nutritionInfo);

    // 음식의 종류, 요리 방법의 체크 여부를 토글
    const changefoodCheck = (event: { target: { name: string; checked: boolean; }; }) => {
        setFoodType({
            ...foodType,  // 다른 요소는 그대로 유지
            [event.target.name]: event.target.checked,  // 파라미터로 받은 요소의 체크 여부를 토글
        })
    }
    const changeCookCheck = (event: { target: { name: string; checked: boolean; }; }) => {
        setCookWay({
            ...cookWay,
            [event.target.name]: event.target.checked,
        })
    }

    const [isSortClicked, setIsSortClicked] = useState<boolean>(false);
    const [recomHashTags, setRecomHashTags] = useState<string[]>();  // 사용자에게 추천할 해시태그

    // 해시태그를 클릭하면 일치하는 요소들을 반환
    const searchByHashTag = (hashTag: string) => {
        let filteredMenu = allMenu.filter(item => item.HASH_TAG === hashTag);
        dispatch(setDisplayedMenu(filteredMenu));
    }

    // 필터를 적용하여 검색
    const searchByFilter = () => {
        setFilterVisible(false);

        // Object.entries = 객체f의 키, 값 쌍을 배열로 반환
        // ex) ['sideDish', false], ['specialDish', true]...
        // ([]) = 배열 구조 분해 할당 => 각 위치에 있는 요소를 파라미터에 할당
        const foodTypeEntries = Object.entries(foodType).filter(([key, value]) => value === true);
        const cookWayEntries = Object.entries(cookWay).filter(([key, value]) => value === true);

        let filteredMenu = allMenu;

        // 값이 true인 경우가 없을 때(선택된 항목이 없는 경우)는 기존 메뉴로 되돌림
        if (foodTypeEntries.length === 0 && cookWayEntries.length === 0) {
            filteredMenu = allMenu;
        }
        // 음식의 종류만 선택된 경우
        else if (foodTypeEntries.length !== 0 && cookWayEntries.length === 0) {
            filteredMenu = searchByKey(foodTypeEntries, 'RCP_PAT2', allMenu);
        }
        // 요리 방법만 선택된 경우
        else if (foodTypeEntries.length === 0 && cookWayEntries.length !== 0) {
            filteredMenu = searchByKey(cookWayEntries, 'RCP_WAY2', allMenu);
        }
        // 음식의 종류, 요리 방법 모두 선택된 경우
        else if (foodTypeEntries.length !== 0 && cookWayEntries.length !== 0) {
            filteredMenu = searchByKey(foodTypeEntries, 'RCP_PAT2', allMenu);
            filteredMenu = searchByKey(cookWayEntries, 'RCP_WAY2', filteredMenu);
        }

        let finalFilteredMenu = searchByRange(filteredMenu, nutritionInfo);
        dispatch(setDisplayedMenu(finalFilteredMenu));  // 최종 분류 결과를 dispatch
        setCurrentPage(1);  // 화면에 출력되는 메뉴가 변경되었기 때문에 페이지를 초기 상태로 돌림
    }

    // 체크박스를 모두 해제
    const unCheck = () => {
        // foodType의 키를 배열로 만듦
        // reduce = 배열의 값을 누적시킴. ex) [1,2,3,4] = 1+2, 3+3, 6+4
        // 각 키에 대해서 false로 만들고, 다음 반복에서 그 값을 유지시키고 다음 키에 대한 값을 또 false로 만듦
        setFoodType(Object.keys(foodType).reduce((prev, key) => {
            return { ...prev, [key]: false };
        }, { sideDish: false, specialDish: false, stew: false, dessert: false }));
        setCookWay(Object.keys(cookWay).reduce((prev, key) => {
            return { ...prev, [key]: false };
        }, { steam: false, boil: false, grill: false, stir: false, fry: false, etc: false }));

        Object.keys(nutritionInfo).forEach((key: string) => {
            dispatch(setNutritionInfo({ name: key as NutritionKey, values: { min: 0, max: 1000 } }));
        })

        setSliderKey(sliderKey + 1);
    }

    const [currentPage, setCurrentPage] = useState(1);  // 현재 페이지 번호
    const trPerPage = 6;  // 한 페이지에 출력할 tr의 개수
    const tdPerPage = 24;  // 한 페이지에 출력할 td의 개수
    const [currentBlock, setCurrentBlock] = useState(1);  // 현재 페이지 블록의 번호
    const pagesPerBlock = 10;  // 한 블록에 출력할 페이지 번호의 개수
    const totalPagecount = Math.ceil(displayedMenu.length / tdPerPage);  // 전체 페이지의 수의 올림값
    const startPage = (currentBlock - 1) * pagesPerBlock + 1;  // 페이지의 시작 인덱스
    // 마지막 페이지는 10, 20, 30.. 등등이 마지막 페이지 번호가 아닐 수 있음
    // 그렇기 때문에 전체 페이지의 개수와 현재 블록의 마지막 인덱스중 더 작은 값을 endPage로 설정
    // ex) 23이 마지막 페이지 번호라고 한다면, 30과 23중엔 23이 작은 값이므로 23 할당
    const endPage = Math.min(currentBlock * pagesPerBlock, totalPagecount);

    // 현재 페이지 번호가 변경될 때마다 블록번호를 업데이트
    // currentPage가 1~10일 때, currentBlock은 1, 11~20일 때 2...
    useEffect(() => {
        setCurrentBlock(Math.ceil(currentPage / pagesPerBlock));
    }, [currentPage]);

    // 버튼을 통해 페이지를 이동
    const movePage = (param: string) => {
        if (param === 'up' && currentPage < totalPagecount) {
            setCurrentPage(currentPage + 1)
        }
        if (param === 'down' && currentPage > 1) {
            setCurrentPage(currentPage - 1)
        }
    }

    const [isHovered, setIsHovered] = useState(new Array(displayedMenu.length).fill(false));  // 페이지 전체에 있는 이미지의 hover 여부를 관리

    const imgMouseEnter = (globalIndex: number) => {
        setIsHovered(prev => {
            // state의 이전 상태를 그대로 가져와서, 마우스가 들어온 인덱스만 true로 변경
            const newHoverState = [...prev];
            newHoverState[globalIndex] = true;
            return newHoverState;
        });
    }
    const imgMouseOut = (globalIndex: number) => {
        setIsHovered(prev => {
            const newHoverState = [...prev];
            // state의 이전 상태를 그대로 가져와서, 마우스가 나간 인덱스만 false로 변경
            newHoverState[globalIndex] = false;
            return newHoverState;
        });
    };

    const [filterVisible, setFilterVisible] = useState<boolean>(false);  // '상세검색' 클릭 시 띄워지는 창을 관리하기 위한 state
    const filterRef = useRef<HTMLDivElement | null>(null);

    // filter-div 외부를 클릭하면 창을 닫음
    useEffect(() => {
        const filterOutsideClick = (event: MouseEvent) => {
            if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
                setFilterVisible(false);
            }
        }

        // 사용자가 마우스를 누를 때마다 웹 페이지에 이벤트 발생
        document.addEventListener("mousedown", filterOutsideClick);
        return () => {
            document.removeEventListener("mousedown", filterOutsideClick);
        }
    }, [filterRef])

    // RangeSlider의 파라미터를 받아와서 dispatch
    // 고차함수 - 다른 함수를 인자로 받거나 함수를 결과로 반환
    const infoChange = (name: NutritionKey) => (min: number, max: number) => {
        dispatch(setNutritionInfo({ name, values: { min, max } }));
    }

    const carInfoChange = infoChange('car');
    const engInfoChange = infoChange('eng');
    const fatInfoChange = infoChange('fat');
    const naInfoChange = infoChange('na');
    const proInfoChange = infoChange('pro');

    const router = useRouter();

    // 특정 메뉴를 클릭하면 해당 메뉴의 레시피 페이지로 이동
    const moveToDetail = (name: string, seq: string) => {
        let selectedMenu = displayedMenu.find(item => item.RCP_SEQ === seq);
        dispatch(setRecipe(selectedMenu));  // 선택된 메뉴로 dispatch
        // console.log("재료(가공 전) : ", selectedMenu?.RCP_PARTS_DTLS);

        router.push({
            pathname: `/recipe/${seq}`,
            query: {name: name, seq: seq},
        })
    }

    // console.log("displayedMenu : ", displayedMenu.length);

    // let arr = [];

    // allMenu.map((item, index) => {
    //     console.log(item.RCP_SEQ)
    // })

    return (
        <>
            <Seo title="메뉴" />
            <div ref={contentsRef} className="contents-ref" />
            <div className="container">
                <div className="header-container">
                    {
                        // 스크롤이 contents-container 영역을 지나치면 헤더가 사라지도록 설정
                        !scrollPassContent ?
                            <Header
                                position="relative"
                                backgroundColor="#ffffff"
                                color="#111111"
                                borderColor="#e8e8e8"
                                svgFill="#000000"
                                lightLogo={false}
                                inputBackgroundColor="#f2f2f2" /> :
                            <HeaderOnContents
                                className={
                                    !headerSlide ?
                                        'slide-down' :
                                        'slide-up'
                                }
                            />
                    }
                </div>
                {/* 헤더와 풋터를 제외한 영역 */}
                <div className="contents-container">
                    {/* 정렬, 해시태그, 상세검색 등을 보여주는 영역 */}
                    <div className="top-contents-section">
                        <div className="sortList-section">
                            {/* 레시피의 정렬 기준을 결정하는 영역 */}
                            <SortList currentPage={currentPage} setCurrentPage={setCurrentPage} />
                        </div>
                        <div className="hash-tag-section">
                            {
                                recomHashTags && recomHashTags.map((item) => {
                                    return (
                                        <span onClick={() => searchByHashTag(item)} className="no-drag">{item}</span>
                                    )
                                })
                            }
                        </div>
                        <div ref={filterRef} className="filter-button-div">
                            <span className='filter-button' onClick={() => setFilterVisible(!filterVisible)}>
                                <svg className="filter-svg" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M2 4H14" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" />
                                    <path d="M4 8H12" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" />
                                    <path d="M6 12H10" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" />
                                </svg>
                                <span className="no-drag">상세검색</span>
                            </span>
                            {
                                filterVisible &&
                                <div className="filter-detail">
                                    <div className="filter-checkbox-div">
                                        <div className="filter-detail-category">음식의 종류</div>
                                        <div className="filter-detail-div">
                                            <span className="filter-detail-span">
                                                <input
                                                    id="checkbox-sideDish"
                                                    name='sideDish'
                                                    checked={foodType.sideDish}
                                                    onChange={changefoodCheck}
                                                    className='filter-detail-span checkbox'
                                                    type="checkbox" />
                                                <label className="no-drag" htmlFor="checkbox-sideDish">반찬</label>
                                            </span>
                                            <span className="filter-detail-span">
                                                <input
                                                    id="checkbox-specialDish"
                                                    name='specialDish'
                                                    checked={foodType.specialDish}
                                                    onChange={changefoodCheck}
                                                    className='checkbox'
                                                    type="checkbox" />
                                                <label className="no-drag" htmlFor="checkbox-specialDish">일품</label>
                                            </span>
                                            <span className="filter-detail-span">
                                                <input
                                                    id="checkbox-stew"
                                                    name='stew'
                                                    checked={foodType.stew}
                                                    onChange={changefoodCheck}
                                                    className='checkbox'
                                                    type="checkbox" />
                                                <label className="no-drag" htmlFor="checkbox-stew">국&찌개</label>
                                            </span>
                                            <span className="filter-detail-span">
                                                <input
                                                    id="checkbox-dessert"
                                                    name='dessert'
                                                    checked={foodType.dessert}
                                                    onChange={changefoodCheck}
                                                    className='checkbox'
                                                    type="checkbox" />
                                                <label className="no-drag" htmlFor="checkbox-dessert">후식</label>
                                            </span>
                                        </div>
                                        <div className="filter-detail-category">요리 방법</div>
                                        <div className="filter-detail-div">
                                            <span className="filter-detail-span">
                                                <input
                                                    id="checkbox-steam"
                                                    name='steam'
                                                    checked={cookWay.steam}
                                                    onChange={changeCookCheck}
                                                    className='checkbox'
                                                    type="checkbox" />
                                                <label className="no-drag" htmlFor="checkbox-steam">찌기</label>
                                            </span>
                                            <span className="filter-detail-span">
                                                <input
                                                    id="checkbox-boil"
                                                    name="boil"
                                                    checked={cookWay.boil}
                                                    onChange={changeCookCheck}
                                                    className='checkbox'
                                                    type="checkbox" />
                                                <label className="no-drag" htmlFor="checkbox-boil">끓이기</label>
                                            </span>
                                            <span className="filter-detail-span">
                                                <input
                                                    id="checkbox-grill"
                                                    name="grill"
                                                    checked={cookWay.grill}
                                                    onChange={changeCookCheck}
                                                    className='checkbox'
                                                    type="checkbox" />
                                                <label className="no-drag" htmlFor="checkbox-grill">굽기</label>
                                            </span>
                                            <span className="filter-detail-span">
                                                <input
                                                    id="checkbox-stir"
                                                    name="stir"
                                                    checked={cookWay.stir}
                                                    onChange={changeCookCheck}
                                                    className='checkbox'
                                                    type="checkbox" />
                                                <label className="no-drag" htmlFor="checkbox-stir">볶기</label>
                                            </span>
                                            <span className="filter-detail-span">
                                                <input
                                                    id="checkbox-fry"
                                                    name="fry"
                                                    checked={cookWay.fry}
                                                    onChange={changeCookCheck}
                                                    className='checkbox'
                                                    type="checkbox" />
                                                <label className="no-drag" htmlFor="checkbox-fry">튀기기</label>
                                            </span>
                                            <span className="filter-detail-span">
                                                <input
                                                    id="checkbox-etc"
                                                    name="etc"
                                                    checked={cookWay.etc}
                                                    onChange={changeCookCheck}
                                                    className='checkbox'
                                                    type="checkbox" />
                                                <label className="no-drag" htmlFor="checkbox-etc">기타</label>
                                            </span>
                                        </div>
                                        <div className="filter-detail-category">영양성분</div>
                                        <div className="filter-detail-div">
                                            <span className="filter-detail-span range-span">
                                                탄수화물
                                                <div className="input-slide-container">
                                                    {/* key를 부여해서 슬라이더 자체를 재렌더링 시킴 */}
                                                    <MultiRangeSlider key={sliderKey} min={0} max={1000} unit="g" onChange={carInfoChange} />
                                                </div>
                                            </span>
                                            <span className="filter-detail-span range-span">
                                                열량
                                                <div className="input-slide-container">
                                                    <MultiRangeSlider key={sliderKey} min={0} max={1000} unit="kcal" onChange={engInfoChange} />
                                                </div>
                                            </span>
                                            <span className="filter-detail-span range-span">
                                                지방
                                                <div className="input-slide-container">
                                                    <MultiRangeSlider key={sliderKey} min={0} max={1000} unit="g" onChange={fatInfoChange} />
                                                </div>
                                            </span>
                                            <span className="filter-detail-span range-span">
                                                나트륨
                                                <div className="input-slide-container">
                                                    <MultiRangeSlider key={sliderKey} min={0} max={1000} unit="mg" onChange={naInfoChange} />
                                                </div>
                                            </span>
                                            <span className="filter-detail-span range-span">
                                                단백질
                                                <div className="input-slide-container">
                                                    <MultiRangeSlider key={sliderKey} min={0} max={1000} unit="g" onChange={proInfoChange} />
                                                </div>
                                            </span>
                                        </div>
                                    </div>
                                    <div className="filter-submit">
                                        {/* filter-button-div 하위에 존재하기 때문에 이벤트 버블링 발생 - 막도록 설정 */}
                                        <div onClick={(e) => { e.stopPropagation(); searchByFilter(); }}>필터 적용하기</div>
                                        <div onClick={unCheck}>필터 지우기</div>
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                    {/* 메뉴를 보여주는 영역 */}
                    <div className="menu-section">
                        <table className="menu-table">
                            <tbody>
                                {
                                    displayedMenu.length !== undefined &&
                                    // new Array를 이용하여 새 배열 생성(displayedMenu를 4로 나눈 몫만큼 map을 사용하기 위함)
                                    // displayedMenu의 길이를 4로 나누고 소수점이 떨어지지 않을 경우를 대비하여 Math.ceil을 이용해 올림
                                    // Math.min을 통해 tr의 최대 개수를 trPerPage(6개) 만큼으로 제한
                                    // 그 후에, map은 undefined은 무시하기 때문에 fill을 사용해 모든 요소를 0으로 초기화
                                    Array(Math.min(Math.ceil(displayedMenu.length / 4), trPerPage)).fill(0).map((_, index) => {
                                        // 한 페이지에 출력할 메뉴의 개수를 설정
                                        // 1페이지 = slice(0, 24), 2페이지 = slice(24, 48)...
                                        const startIndex = (currentPage - 1) * tdPerPage;
                                        const endIndex = startIndex + tdPerPage;
                                        const menuPerPage = displayedMenu.slice(startIndex, endIndex);
                                        // 0번째 tr = slice(0, 4), 2번째 tr = slice(4, 8)... 4개씩 나누어 출력
                                        const items = menuPerPage.slice(index * 4, index * 4 + 4);
                                        const hoverState = isHovered;
                                        return (
                                            <tr>
                                                {
                                                    items.map((item, localIndex) => {
                                                        // 단순 index를 사용하면 현재 tr 내부로 제한되기 때문에, 페이지 전체의 인덱스를 계산해서 사용
                                                        const globalIndex = startIndex + index * 4 + localIndex;
                                                        return (
                                                            <td>
                                                                <div>
                                                                    <div onClick={() => moveToDetail(item.RCP_NM, item.RCP_SEQ)} className="td-content">
                                                                        <Image
                                                                            src={`${item.ATT_FILE_NO_MK}`}
                                                                            style={{
                                                                                borderRadius: 8,
                                                                                cursor: 'pointer',
                                                                                transition: 'transform 0.3s ease',
                                                                                transform: hoverState[globalIndex] ? 'scale(1.05)' : 'scale(1)'
                                                                            }}
                                                                            width={250}
                                                                            height={250}
                                                                            alt={''}
                                                                            onMouseEnter={() => imgMouseEnter(globalIndex)}
                                                                            onMouseLeave={() => imgMouseOut(globalIndex)}
                                                                        />
                                                                    </div>
                                                                    <div className='RCP_NM'>{item.RCP_NM}</div>
                                                                    <div className='RCP_PAT2'>{item.RCP_PAT2}</div>
                                                                </div>
                                                            </td>
                                                        )
                                                    })
                                                }
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                    <div className="pagination-section">
                        {
                            // 현재 페이지가 첫 페이지라면, 이전 페이지로 이동할 수 없음을 알림
                            currentPage !== 1 ?
                                <span
                                    onClick={() => movePage('down')}>
                                    <svg className="movePage-svg left" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16"><path stroke={currentPage === 1 ? '#E8EBEE' : 'currentColor'} stroke-linecap="round" stroke-width="1.4" d="m6 12 4-4-4-4"></path>
                                    </svg>
                                </span> :
                                <span
                                    id="no-movePage-span">
                                    <svg className="no-movePage-svg left" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16"><path stroke={currentPage === 1 ? '#E8EBEE' : 'currentColor'} stroke-linecap="round" stroke-width="1.4" d="m6 12 4-4-4-4"></path>
                                    </svg>
                                </span>
                        }
                        {
                            /* Array는 배열을 생성하여 내부를 undefined로 채움
                            하지만 Array.from은 반복 가능한 객체를 얕은 복사하여 새 배열 생성(배열의 각 요소를 사용해야 할 때 사용) */
                            // ex) startPage = 11, endPage = 20
                            // length = 10, startPage + index = 11 + 0, 11 + 1, ... 11 + 9
                            // 즉, 11, 12, 13, .. 20으로 이루어진 배열 생성 
                            Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index)
                                .map((pageNumber) => {
                                    return (
                                        pageNumber === currentPage ?
                                            <span
                                                onClick={() => setCurrentPage(pageNumber)}
                                                style={{ backgroundColor: '#002312', color: '#ffffff' }}
                                                className="a">
                                                {pageNumber}
                                            </span> :
                                            <span className="pagination-hover" onClick={() => setCurrentPage(pageNumber)}>{pageNumber}</span>
                                    )
                                })
                        }
                        {
                            // 현재 페이지가 마지막 페이지라면, 이후 페이지로 이동할 수 없음을 알림
                            currentPage !== totalPagecount ?
                                <span
                                    onClick={() => movePage('up')}
                                    className="movePage-span">
                                    <svg className="movePage-svg right"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none" viewBox="0 0 16 16">
                                        <path
                                            stroke={currentPage === Math.ceil(displayedMenu.length / tdPerPage) ? '#E8EBEE' : 'currentColor'}
                                            stroke-linecap="round"
                                            stroke-width="1.4" d="m6 12 4-4-4-4">
                                        </path>
                                    </svg>
                                </span> :
                                <span
                                    id="no-movePage-span">
                                    <svg
                                        className="no-movePage-svg right"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none" viewBox="0 0 16 16">
                                        <path
                                            stroke={currentPage === Math.ceil(displayedMenu.length / tdPerPage) ? '#E8EBEE' : 'currentColor'}
                                            stroke-linecap="round"
                                            stroke-width="1.4"
                                            d="m6 12 4-4-4-4">
                                        </path>
                                    </svg>
                                </span>
                        }
                    </div>
                </div>
                <Footer />
            </div>
            <style jsx> {`
                .contents-container {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    height: 100%;
                }
                .top-contents-section {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    color: #111111;
                    margin-top: 13px;
                    margin-bottom: 5px;
                    width: 1080px;
                }
                .sort-button {
                    display: flex;
                    justify-content: center;
                    margin-top: 20px;
                    margin-left: 12px;
                    padding: 5px 5px 5px 10px;
                    border: 1px solid #e8e8e8;
                    border-radius: 8px;
                    cursor: pointer;
                    transition: border-color 0.3s ease;
                }
                .sort-button:hover {
                    border-color: rgb(130, 130, 130);
                }
                .sort-button span {
                    font-size: 13px;
                    font-weight: 500;
                }
                .sort-svg {
                    position: relative;
                    width: 18px;
                    top: 1px;
                    margin-left: 20px;
                }
                .sortList-section {
                    margin-right: 115px;
                }
                .hash-tag-section {
                    display: flex;
                    flex-direction: row;
                    justify-content: center;
                    margin-top: 23px;
                    width: auto;
                }
                .hash-tag-section span {
                    font-size: 13px;
                    margin-right: 10px;
                    padding: 5px 8px;
                    background-color: #f2f2f2;
                    color: #323232;
                    border: 1px solid #f2f2f2;
                    border-radius: 6px;
                    cursor: pointer;
                    transition: border-color 0.2s ease;
                }
                .hash-tag-section span:hover {
                    border-color: #323232;
                }
                .hash-tag-section span:last-child {
                    margin-right: 0px;
                }
                .filter-button-div {
                    display: flex;
                    justify-content: center;
                }
                .filter-button {
                    display: flex;
                    justify-content: center;
                    margin-top: 20px;
                    margin-right: 10px;
                    padding: 5px 13px 5px 10px;
                    border: 1px solid #e8e8e8;
                    border-radius: 8px;
                    cursor: pointer;
                    transition: border-color 0.3s ease;
                }
                .filter-button:hover {
                    border-color: rgb(130, 130, 130);
                }
                .filter-svg {
                    position: relative;
                    width: 17.5px;
                    top: 0.5px;
                    margin-right: 5px;
                }
                .filter-button-div span {
                    font-size: 13px;
                    font-weight: 500;
                }    
                {/* .contents-container {
                    display: flex;
                    flex-direction: row;
                    justify-content: center;
                    padding: 0 10%;
                    color: #111111;
                    margin-top: 30px;
                } */}
                .filter-section {
                    margin-top: 25px;
                    margin-right: 80px;
                }
                #filter-title {
                    display: flex;
                    justify-content: flex-start;
                }
                #filter-title span {
                    font-weight: 400;
                    font-size: 18px;
                }
                .filter-section div {
                    display: flex;
                    justify-content: space-between;
                    padding: 20px 0 20px 0;
                    border-bottom: 1px solid #d1d1d1;
                }
                .filter-section div span {
                    margin-right: 65px;
                    font-weight: 300;
                    font-size: 15px;
                }
                .filter-detail { 
                    position: absolute;
                    display: flex;
                    flex-direction: column;
                    top: 175px;
                    margin-right: 360px;
                    padding: 30px 40px 30px 40px;
                    border: 1px solid #e8e8e8;
                    border-radius: 10px;
                    background-color: #ffffff;
                    cursor: auto;
                    z-index: 1000;
                    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);
                }
                .filter-checkbox-div {
                    padding-bottom: 40px;
                    border-bottom: 1px solid #e8e8e8;
                }
                .filter-detail-category:first-child {
                    margin-top: 0px;
                } 
                .filter-detail-category {
                    font-size: 15px;
                    margin-top: 25px;
                    margin-bottom: 7px;
                    font-weight: 500;
                }
                .filter-detail-div {
                    margin-left: -2px;
                }
                .filter-detail-span {
                    margin-right: 14px;
                    font-size: 14px !important;
                    font-weight: 300 !important;
                    cursor: pointer;
                }
                .input-slide-container {
                    margin: 12px 0 40px 1.5px;
                }
                .range-span {
                    display: block;
                    cursor: auto;
                    margin-top: 14px;
                    margin-left: 3px;
                }
                .checkbox {
                    position: relative;
                    top: 1.72px;
                    margin-right: 5px;
                    cursor: pointer;
                }
                label {
                    cursor: pointer;
                }
                .filter-submit {
                    display: flex;  
                    flex-direction: row;
                    margin-top: 45px;
                    font-size: 13.5px;
                }
                .filter-submit div {
                    margin-right: 20px;
                    padding: 5px 10px 5px 10px;
                    border: 1px solid #e8e8e8;
                    border-radius: 8px;
                    cursor: pointer;
                    transition: border-color 0.3s ease;
                }
                .filter-submit div:hover {
                    border-color: rgb(130, 130, 130);
                }
                .menu-section {
                    display: flex;
                    justify-content: center;
                    margin-top: 30px;
                    width: 1080px;
                }
                .pagination-section {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    margin-top: 40px;
                    margin-bottom: 65px;
                }
                .pagination-section span {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    cursor: pointer;
                    border-radius: 50%;
                    margin-top: 6px;
                    margin-right: 13px;
                    width: 32px;
                    height: 32px;
                    font-size: 15px;
                    transition: background-color 0.2s ease;
                }
                .pagination-hover:hover {
                    background-color: #E8EBEE;
                }
                .pagination-section span:first-child {
                    margin-top: 0px;
                }
                .pagination-section span:last-child {
                    margin-top: 0px;
                    margin-right: 0px;
                }
                #no-movePage-span {
                    cursor: auto;
                }
                .movePage-svg {
                    padding: 5px 5px 5px 5px;
                    border: 1px solid #ebeef0;
                    border-radius: 50%;
                    position: relative;
                    top: 4.5px;
                    width: 17px;
                    transition: background-color 0.2s ease;
                }
                .movePage-svg:hover {
                    background-color: #E8EBEE;
                }
                .no-movePage-svg {
                    padding: 5px 5px 5px 5px;
                    border: 1px solid #ebeef0;
                    border-radius: 50%;
                    position: relative;
                    top: 4.5px;
                    width: 17px;
                }
                .left {
                    transform: rotate(180deg);
                }
            `}</style>
        </>
    )
}

export const getServerSideProps = wrapper.getServerSideProps(store => async () => {
    const API_KEY = process.env.API_KEY;

    const allMenu = store.getState().allMenu;
    // 홈 화면을 통해 접근하지 않을 경우, allMenu가 undefined 상태이기 때문에 업데이트
    if (allMenu.length === undefined) {
        const startParam = 1;
        const endParam = 1000;

        const response = await fetch(`http://openapi.foodsafetykorea.go.kr/api/
        ${API_KEY}/COOKRCP01/json/${startParam}/${endParam}`, {
            method: "GET",
        });
        const jsonResult = await response.json();
        const result = jsonResult.COOKRCP01.row;

        // 포함하지 않을 문자열을 필터링하는 정규식
        // 미완된 음식의 이미지나, 워터마크가 있는 이미지를 필터링하기 위함
        const regex = /(uploadimg\/(2014|2015|2019|2020|2021|2023)|common\/ecmFileView\.do\?)/;

        const excludeSeqs = ['2981', '886', '3217', '977', '745', '760'];

        const menuData = result.filter((item: Menu) => {
            const match = (item.ATT_FILE_NO_MK).match(regex);
            return match === null && !excludeSeqs.includes(item.RCP_SEQ);
        });

        store.dispatch(setAllMenu(menuData));
    }

    return {
        props: {}
    }
})