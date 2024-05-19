import { RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import { setRecipeAddModal } from "@/redux/features/favoriteRecipeSlice";
import { useRouter } from "next/router";

export default function RecipeImg() {
    const dispatch = useDispatch();
    const router = useRouter();

    const user = useSelector((state: RootState) => state.user);
    const recipe = useSelector((state: RootState) => state.recipe); // 레시피의 상세 정보를 담고있는 state

    const saveRecipe = () => {
        if(user.name && user.email) {
            dispatch(setRecipeAddModal(true));
        }
        else {
            router.push('/signIn');
        }
    }

    return (
        <>
            <div className="recipe-img-section">
                <div
                    className="recipe-button-div"
                    onClick={saveRecipe}>
                    <div className="recipe-button">
                        <svg className="bookmark-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                            <path stroke="#000000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.3" d="m15 16-5-3.333L5 16V5.333c0-.353.15-.692.418-.942S6.05 4 6.428 4h7.143c.38 0 .743.14 1.01.39.269.25.419.59.419.943V16z" />
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
                    priority
                />
            </div>
            <style jsx>{`
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
                    cursor: pointer;
                }
                {/* recipe-button-div에 커서를 올리면, bookmark-svg의 css를 수정 */}
                .recipe-button-div:hover .bookmark-svg {
                    fill: #000000;
                }
                .recipe-button {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
                .recipe-button-div span {
                    font-size: 12px;
                }
                .bookmark-svg {
                    width: 17px;
                    margin-top: 0.6px;
                    margin-right: 2px;
                    fill: #ffffff;
                    transition: fill 0.2s ease;
                }
            `}</style>
        </>
    )
}