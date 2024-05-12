import Header from "../../components/header/Header";
import HeaderOnContents from '../../components/header/HeaderOnContents';
import Footer from '../../components/Footer';
import Seo from "../../components/Seo";
import { useEffect, useRef, useState } from "react";
import { RootState, Menu } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import { filterIngredString } from "@/utils/filterManual/filterIngredString";
import { adjustForServings } from "@/utils/filterManual/adjustForServings";
import moveToDetail from "@/utils/moveToDetail";
import { setNutritionVisible, setRecipe, setServings } from "@/redux/features/recipeSlice";
import AddFolderModal from "@/components/modal/AddFolderModal";
import AddCompletePopUp from "@/components/favoriteRecipe/AddCompletePopUp";
import { setAddedRecipeInfo, setRecipeAddModal, setRecipeMoveModal } from "@/redux/features/favoriteRecipeSlice";
import ReviewContainer from "@/components/recipeDetail/review/ReviewContainer";
import MenuTable from "@/components/table/MenuTable";
import NutritionBox from "@/components/recipeDetail/nutrition/NutritionBox";
import ServingsBox from "@/components/recipeDetail/servingsBox";
import RecipeImg from "@/components/recipeDetail/RecipeImg";
import Manual from "@/components/recipeDetail/Manual";
import RelatedRecipes from "@/components/recipeDetail/RelatedRecipes";

export default function RecipeDetail() {
    const dispatch = useDispatch();

    const scrollPassContent = useSelector((state: RootState) => state.scrollPassContent);
    const headerSlide = useSelector((state: RootState) => state.headerSlide);

    const recipe = useSelector((state: RootState) => state.recipe); // 레시피의 상세 정보를 담고있는 state
    const servings = useSelector((state: RootState) => state.servings); // 레시피의 인분 수 
    const [recipeIngredients, setRecipeIngredients] = useState(''); // 레시피의 재료

    useEffect(() => {
        // 페이지를 새로고침 하면 state가 초기화되기 때문에, 로컬 스토리지에서 선택된 레시피를 가져와서 업데이트
        if (recipe.RCP_NM === "") {
            let selectedRecipe = localStorage.getItem('selectedRecipe');
            selectedRecipe = JSON.parse(selectedRecipe as string);
            dispatch(setRecipe(selectedRecipe));
        }
        // 페이지에 도착하면 로컬 스토리지에 현재 선택된 레시피를 담음
        else {
            localStorage.setItem('selectedRecipe', JSON.stringify(recipe));
        }
    }, [recipe])

    // 레시피의 재료를 설정하고 조정
    useEffect(() => {
        // 레시피의 재료 문자열을 가공함
        let filteredString = filterIngredString(recipe);
        // 가공한 문자열을 바탕으로 인분 수만큼 값을 조정함
        let newRecipeIngredients = adjustForServings(filteredString, servings);
        setRecipeIngredients(newRecipeIngredients);
    }, [recipe, servings]);

    const nutritionVisible = useSelector((state: RootState) => state.nutritionVisible);
    const nutritionRef = useRef<HTMLDivElement | null>(null);
    const servingsBoxRef = useRef<HTMLDivElement | null>(null);

    // 영양성분 및 인분 수 박스 바깥을 클릭하면 영양성분 박스를 닫음
    useEffect(() => {
        const nutritionOutsideClick = (event: MouseEvent) => {
            if (nutritionRef.current &&
                !nutritionRef.current.contains(event.target as Node) &&
                servingsBoxRef.current &&
                !servingsBoxRef.current.contains(event.target as Node)) {
                dispatch(setNutritionVisible(false));
            }
        }

        // 사용자가 마우스를 누를 때마다 웹 페이지에 이벤트 발생
        document.addEventListener("mousedown", nutritionOutsideClick);
        return () => {
            document.removeEventListener("mousedown", nutritionOutsideClick);
        }
    }, [nutritionRef]);

    const recipeAddModal = useSelector((state: RootState) => state.recipeAddModal);
    const addedRecipeInfo = useSelector((state: RootState) => state.addedRecipeInfo);
    const [isShowPopUp, setIsShowPopUp] = useState<boolean>(false);
    const recipeMoveModal = useSelector((state: RootState) => state.recipeMoveModal);

    // 레시피 추가 완료 팝업을 관리
    const handleCompletePopUp = () => {
        // 레시피 추가 정보가 존재하는 경우에만 팝업 띄우도록
        if (addedRecipeInfo.folderId !== null) {
            setIsShowPopUp(true);

            // 5초 후에 팝업을 제거, state도 초기 상태로 돌려놓아 레시피가 추가됐을 때만 팝업이 올라오도록
            setTimeout(() => {
                dispatch(setAddedRecipeInfo({
                    folderId: null,
                    imgString: '',
                    folderName: '',
                }));
                setIsShowPopUp(false);
            }, 4000);
        }
    }

    useEffect(() => {
        handleCompletePopUp();
    }, [addedRecipeInfo, recipeMoveModal]);

    // 컴포넌트가 마운트 되기 전, 혹시 팝업이 열려있을 수 있으니 닫음
    useEffect(() => {
        setIsShowPopUp(false)
    }, []);

    return (
        <>
            <Seo title="레시피" />
            <div className="container">
                {
                    isShowPopUp &&
                    // 레시피 추가 완료 시 띄울 팝업
                    <AddCompletePopUp
                        imgString={addedRecipeInfo.imgString}
                        folderName={addedRecipeInfo.folderName}
                    />
                }
                {/* 레시피의 폴더 변경 시 띄울 모달 */}
                <AddFolderModal
                    isModalOpen={recipeMoveModal}
                    setIsModalOpen={(isOpen) => dispatch(setRecipeMoveModal(isOpen))}
                    isMoving={true}
                />
                <AddFolderModal
                    isModalOpen={recipeAddModal}
                    setIsModalOpen={(isOpen) => dispatch(setRecipeAddModal(isOpen))}
                />
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
                            <>
                                <Header
                                    position="relative"
                                    backgroundColor="#ffffff"
                                    color="#111111"
                                    borderColor="#e8e8e8"
                                    svgFill="#000000"
                                    lightLogo={false}
                                    inputBackgroundColor="#f2f2f2" />
                                <HeaderOnContents
                                    className={
                                        !headerSlide ?
                                            'slide-down' :
                                            'slide-up'
                                    }
                                />
                            </>
                    }
                </div>
                <div className="container-float-top">
                    {/* 헤더와 풋터를 제외한 영역 */}
                    <div className="contents-container">
                        <div className="recipe-top-section">
                            <RecipeImg />
                            <div className="recipe-intro">
                                <div className="recipe-title-div">
                                    <div className="recipe-title">{recipe.RCP_NM}</div>
                                    <div className="recipe-subtitle">{recipe.RCP_PAT2}</div>
                                </div>
                                <div className="recipe-serv-ingred-div">
                                    <div className="per-person-div">
                                        <div>인분</div>
                                        <ServingsBox
                                            ref={servingsBoxRef}
                                        />
                                    </div>
                                    <div ref={nutritionRef} className="nutrition-button-div">
                                        <div
                                            onClick={() => dispatch(setNutritionVisible(!nutritionVisible))}
                                            className="nutrition-check-button no-drag"
                                            style={{ backgroundColor: nutritionVisible ? '#f2f2f2' : '' }}>
                                            <svg className="nutrition-check-svg" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M11 19c4.4183 0 8-3.5817 8-8 0-4.41828-3.5817-8-8-8-4.41828 0-8 3.58172-8 8 0 4.4183 3.58172 8 8 8ZM20.9984 21l-4.35-4.35" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                            </svg>
                                            <span>영양성분</span>
                                        </div>
                                        {
                                            nutritionVisible &&
                                            <NutritionBox />
                                        }
                                    </div>
                                </div>
                                {/* 레시피의 재료를 보여주는 영역 */}
                                <div className="recipe-ingredients">{recipeIngredients}</div>
                            </div>
                        </div>
                        {/* 요리 방법, 관련 레시피를 보여주는 영역 */}
                        <div className="recipe-middle-section">
                            {/* 요리 방법을 알려주는 영역 */}
                            <div className="manual-section">
                                <Manual />
                            </div>
                            {/* 관련 레시피를 보여주는 영역 */}
                            <div className="related-recipe-section">
                                <RelatedRecipes />
                            </div>
                        </div>
                        <ReviewContainer />
                    </div>
                </div>
                <Footer />
            </div >
            <style jsx>{`
                .contents-container {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    margin-top: 70px;
                    color: #111111;
                    margin-left: auto;
                    margin-right: auto;
                    height: 100%;
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
                    align-self: flex-start;
                    margin-left: 35px;
                }
                .recipe-title-div {
                    display: flex;
                    flex-direction: row;
                }
                .recipe-title {
                    font-size: 28px;
                    font-weight: 400;
                }
                .recipe-subtitle {
                    margin-top: 13.5px;
                    margin-left: 4px;
                    font-size: 15px;
                    color: #5C5C5C;
                }
                .recipe-serv-ingred-div {
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;
                    align-items: center;
                    padding-bottom: 30px;
                    border-bottom: 1px solid #5C5C5C;
                }
                .nutrition-button-div {
                    display: flex;
                    justify-content: center;
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
                    font-size: 16px;
                    margin-top: 30px;
                    width: 700px;
                    border-radius: 5px;
                    padding: 10px;
                    color: #2d2d2d;
                    background-color: #f2f2f2;
                }
                .recipe-middle-section {
                    display: flex;
                    flex-direction: column;
                    width: 100%;
                    margin-top: 80px;
                    margin-bottom: 80px;
                }
                .manual-section {
                    display: flex;
                    flex-direction: column;
                    justify-content: flex-start;
                }
                .related-recipe-section {
                    display: flex;
                    flex-direction: column;
                    justify-content: flex-start;
                    margin-top: 80px;
                }
            `}</style>
        </>
    )
}

export const getServerSideProps = () => {
    return {
        props: {}
    }
}