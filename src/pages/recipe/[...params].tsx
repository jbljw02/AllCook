import Header from "../../components/Header";
import HeaderOnContents from '../../components/HeaderOnContents';
import Footer from '../../components/Footer';
import Seo from "../../components/Seo";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { RootState, wrapper, Menu } from "../../redux/store";
import { useSelector } from "react-redux";
import Image from "next/image";
import { filterIngredString } from "@/utils/filterIngredString";
import { adjustForServings } from "@/utils/adjustForServings";

export default function RecipeDetail() {
    const [scrollPassContent, setScrollPassContent] = useState(false);  // 스크롤이 컨텐츠 영역을 지났는지
    const [headerSlide, setHeaderSlide] = useState(false);  // 헤더의 슬라이드를 처리하기 위함
    const contentsRef = useRef<HTMLDivElement>(null);

    const [inputHover, setInputHover] = useState<boolean>(false);  // input 안에 마우스가 들어갔는지

    const recipe = useSelector((state: RootState) => state.recipe);  // 레시피의 상세 정보를 담고있는 state
    const displayedMenu = useSelector((state: RootState) => state.displayedMenu);
    
    const [servings, setServings] = useState<number>(1);  // 레시피의 인분 수
    const [recipeIngredients, setRecipeIngredients] = useState('');  // 레시피의 재료

    useEffect(() => {
        // 레시피의 재료 문자열을 가공함
        let filteredString = filterIngredString(recipe);
        // 가공한 문자열을 바탕으로 인분 수만큼 값을 조정함
        let newRecipeIngredients = adjustForServings(filteredString, servings);
        setRecipeIngredients(newRecipeIngredients);
    }, [recipe, servings]);
    
    // 인분 수의 덧셈, 뺄셈
    const calculateServings = (param : string) => {
        if(param === 'plus') {
            setServings(servings + 1);
        }
        if(param === 'minus' && servings > 1) {
            setServings(servings - 1);
        }
    }
    
    return (
        <>
            <Seo title="레시피" />
            <div ref={contentsRef} className="contents-ref"></div>
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
                    <div className="recipe-top-section">
                        <div className="recipe-img-section">
                            <div className="recipe-button-div">
                                <div className="recipe-button">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20" className="bookmark-svg">
                                        <path stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.3" d="m15 16-5-3.333L5 16V5.333c0-.353.15-.692.418-.942S6.05 4 6.428 4h7.143c.38 0 .743.14 1.01.39.269.25.419.59.419.943V16z"/>
                                    </svg>
                                    <span>저장</span>
                                </div>
                            </div>
                            <Image 
                                src={recipe.ATT_FILE_NO_MK}
                                style={{
                                    borderRadius: 5,
                                }}  
                                width={320}
                                height={320}
                                alt={''}
                                />
                        </div>
                            {/* <div className="recipe-title">
                                {recipe.RCP_NM}
                                <span>{recipe.RCP_PAT2}</span>
                            </div>
                            <div className="recipe-ingredients">{recipeIngredients}</div> */}
                        <div className="recipe-intro">
                            <div className="recipe-title-div">
                            <div className="recipe-title">{recipe.RCP_NM}</div>
                            <div className="recipe-subtitle">{recipe.RCP_PAT2}</div>
                            </div>
                            <div className="recipe-middle-section">
                                <div className="per-person-div">
                                    <div>인분</div>
                                    <div 
                                        onMouseEnter={() => setInputHover(!inputHover)}
                                        onMouseLeave={() => setInputHover(!inputHover)}
                                        className="per-person-box">
                                        <input value={servings}></input>
                                        <span className={`${!inputHover ? "" : 'visible'} cal-svg`}>
                                            <svg onClick={() => {calculateServings('plus')}} className="minus" xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" viewBox="0 0 16 16" version="1.1">
                                                <g id="Page-2" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">        
                                                <g id="Desktop-1920-/-1080" stroke="#111111">            
                                                <g id="qty" transform="translate(3.000000, 5.000000)">
                                                <polyline id="Rectangle-3-Copy" transform="translate(5.000000, 5.000000) rotate(-225.000000) translate(-5.000000, -5.000000) " points="8 8 2 8 2 2"/></g>
                                                </g></g>
                                            </svg>
                                            <svg onClick={() => {calculateServings('minus')}} className="plus" xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" viewBox="0 0 16 16" version="1.1">       
                                                <g id="Page-2" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">        
                                                <g id="Desktop-1920-/-1080" stroke={`${servings === 1 ? '#c3c3c3' : '#111111'}`}>            
                                                <g id="qty" transform="translate(8.000000, 6.000000) rotate(-180.000000) translate(-8.000000, -6.000000) translate(3.000000, 1.000000)">                
                                                <polyline id="Rectangle-3-Copy" transform="translate(5.000000, 5.000000) rotate(-225.000000) translate(-5.000000, -5.000000) " points="8 8 2 8 2 2"/>            
                                                </g></g></g>
                                            </svg>
                                        </span>
                                    </div>
                                </div>
                                <div className="nutrition-check-button no-drag">
                                    <svg className="nutrition-check-svg" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M11 19c4.4183 0 8-3.5817 8-8 0-4.41828-3.5817-8-8-8-4.41828 0-8 3.58172-8 8 0 4.4183 3.58172 8 8 8ZM20.9984 21l-4.35-4.35" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                    <span>영양성분</span>
                                </div>
                            </div>
                            <div className="recipe-ingredients">{recipeIngredients}</div>

                            <div className="">
                                
                            </div>
                            {/* <div className="nutrition-title">레시피 영양정보</div>
                            <table className="nutrition-table">
                                <tr>
                                    <td>탄수화물</td>
                                    <td>{recipe.INFO_CAR} kcal</td>
                                </tr>
                                <tr>
                                    <td>열량</td>
                                    <td>{recipe.INFO_ENG} g</td>
                                </tr>
                                <tr>
                                    <td>지방</td>
                                    <td>{recipe.INFO_FAT} g</td>
                                </tr>
                                <tr>
                                    <td>나트륨</td>
                                    <td>{recipe.INFO_NA} mg</td>
                                </tr>
                                <tr>
                                    <td>단백질</td>
                                    <td>{recipe.INFO_PRO} g</td>
                                </tr>
                            </table> */}
                        </div>
                    </div>
                    {/* <div>
                        {recipe.MANUAL01.replace(/[a-zA-Z]/g, '')}
                    </div>
                    <div>
                        {recipe.MANUAL02.replace(/[a-zA-Z]/g, '')}
                    </div> */}
                    <div className="temp"></div>
                </div>
                <Footer />
            </div>
            <style jsx>{`
                .contents-container {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    margin-top: 60px;
                    color: #111111;
                }
                .recipe-top-section {
                    display: flex;
                    flex-direction: row;
                    justify-content: center;
                    align-items: center;
                }
                .recipe-img-section {
                    position: relative;
                }
                .recipe-button-div {
                    position: absolute;
                    top: 0;
                    right: 0;
                    margin-top: 13px;
                    margin-right: 13px;
                    background-color: #ffffff;
                    border-radius: 8px;
                    padding: 5px 12px 5px 9px;
                    border: 1px solid transparent;
                    border-radius: 8px;
                }
                .recipe-button {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    cursor: pointer;
                }
                .recipe-button-div span {
                    font-size: 12px;
                }
                .bookmark-svg {
                    width: 17px;
                    margin-top: 0.6px;
                    margin-right: 2px;
                }
                .recipe-intro {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    margin-left: 40px;
                    align-self: flex-start;
                    margin-top: 7px;
                }
                .recipe-title-div {
                    display: flex;
                    flex-direction: row;
                }
                .recipe-title {
                    font-size: 23px;
                    font-weight: 400;
                }
                .recipe-subtitle {
                    margin-top: 10px;
                    margin-left: 4px;
                    font-size: 14px;
                    color: #5C5C5C;
                }
                .recipe-middle-section {
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;
                    align-items: center;
                    padding-bottom: 30px;
                    border-bottom: 1px solid #5C5C5C;
                }
                .per-person-div {
                    display: flex;
                    flex-direction: column;
                    margin-top: 20px;
                }
                .per-person-div div:first-child {
                    font-size: 14px;
                    color: #5C5C5C;
                    font-weight: 300;
                }
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
                .nutrition-check-button {
                    display: flex;
                    flex-direction: row;
                    margin-top: 45px;
                    font-size: 14px;
                    border: 1px solid #e8e8e8;
                    border-radius: 8px;
                    padding: 10px;
                    cursor: pointer;
                    transition: border-color 0.3s ease;
                }
                .nutrition-check-button:hover {
                    border-color: rgb(130, 130, 130);
                }
                .nutrition-check-svg {
                    width: 16px;
                    margin-top: 1px;
                    margin-right: 5px;
                }
                .recipe-ingredients {
                    font-size: 15px;
                    margin-top: 30px;
                    max-width: 500px;
                    border-radius: 5px;
                    padding: 10px;
                    color: #2d2d2d;
                    background-color: #f2f2f2;
                }
                .recipe-intro {
                    display: flex;
                    flex-direction: column;
                    align-self: flex-start;
                    margin-top: 8px;
                    margin-left: 35px;
                }
                .nutrition-title {
                    font-size: 18px;
                    margin-bottom: 7px;
                }
                .nutrition-table {
                    width: 300px;
                }
                .nutrition-table tr {
                    border-bottom: 1px solid #5C5C5C;
                }
                .nutrition-table tr td:first-child {
                    color: #5C5C5C;
                    font-size: 15px;
                }
                 .nutrition-table tr td:last-child {
                    font-size: 15px;
                }
            `}</style>
        </>
    )
}

// export const getServerSideProps = wrapper.getServerSideProps(store => async () => {
    
//     const displayedMenu = store.getState().recipe;
//     const recipe = store.getState().recipe;

//     const selectedMenu = displayedMenu.find((item: { item: Menu; }) => item.RCP_SEQ === seq);
// })