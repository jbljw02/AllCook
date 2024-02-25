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

export default function RecipeDetail() {
    const [scrollPassContent, setScrollPassContent] = useState(false);  // 스크롤이 컨텐츠 영역을 지났는지
    const [headerSlide, setHeaderSlide] = useState(false);  // 헤더의 슬라이드를 처리하기 위함
    const contentsRef = useRef<HTMLDivElement>(null);

    const router = useRouter();
    const { name, seq } = router.query;

    const [recipeIngredients, setRecipeIngredients] = useState('');

    const recipe = useSelector((state: RootState) => state.recipe);  // 레시피의 상세 정보를 담고있는 state
    const displayedMenu = useSelector((state: RootState) => state.displayedMenu);

    // 레시피의 재료 문자열을 가공함
    useEffect(() => {
        let filteredString = filterIngredString(recipe);
        setRecipeIngredients(filteredString);
    }, [recipe]);
    
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
                        <Image 
                            src={recipe.ATT_FILE_NO_MK}
                            style={{
                                borderRadius: 5,
                            }}  
                            width={320}
                            height={320}
                            alt={''}
                        />
                        <div className="recipe-intro">
                            <div className="recipe-title">{recipe.RCP_NM}</div>
                            <div className="recipe-ingredients">
    {
        recipeIngredients
    }
</div>










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
                }
                .recipe-top-section {
                    display: flex;
                    flex-direction: row;
                    justify-content: center;
                    align-items: center;
                }
                .recipe-intro {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    margin-left: 20px;
                    align-self: flex-start;
                    margin-top: 7px;
                }
                .recipe-title {
                    font-size: 25px;
                    font-weight: 400;
                }
                .recipe-ingredients {
                    font-size: 15px;
                    margin-top: 10px;
                    max-width: 570px;
                    border-radius: 5px;
                    padding: 10px;
                    color: #2d2d2d;
                    background-color: #f2f2f2;
                }
                p {
                    margin-block-start : 0px;
                    margin-block-end: 0px;
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