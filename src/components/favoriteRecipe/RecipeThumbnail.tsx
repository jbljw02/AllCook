import { Menu, RootState } from "@/redux/store";
import { useSelector } from "react-redux";

export default function RecipeThumbnail({ recipes }: { recipes: Menu[] }) {
    let thumbnailClass = '';

    // 이미지의 개수에 따라 다른 클래스 속성을 지정
    switch (Array.isArray(recipes) && recipes.length) {
        case 1:
            thumbnailClass = 'one-image';
            break;
        case 2:
        case 3:
            thumbnailClass = 'two-images'; // 세 개의 이미지가 있어도 두 개만 보이도록 설정
            break;
        case 4:
            thumbnailClass = 'four-images';
            break;
        default:
            // 기본값 또는 4개 이상 이미지에 대한 처리
            thumbnailClass = 'four-images';
            break;
    }

    return (
        <>
            <div className={`thumbnail-div ${thumbnailClass}`}>
                {
                    Array.isArray(recipes) && recipes.map((recipe: Menu, index: number) => (
                        // recipes.length가 3이고 index가 2인 경우(즉, 세 번째 이미지)를 제외하고 이미지를 표시
                        (recipes.length !== 3 || index < 2) && (
                            <div
                                className="thumbnail-image"
                                style={{ backgroundImage: `url(${recipe.ATT_FILE_NO_MAIN})` }}
                                key={recipe.id}
                            />
                        )
                    ))
                }
            </div>
            <style jsx>{`
                .thumbnail-div {
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: center;
                    align-items: center;
                    gap: 3px;
                    width: 100%;
                    height: 100%;
                }
                .thumbnail-image {
                    background-size: cover; /* 이미지를 여백 없이(가능한 크게) */
                    background-position: center; /* 이미지를 중앙 정렬 */
                    border-radius: 3px;
                }
                /* 이미지가 한 개인 경우, 요소의 100% 만큼 채우기 */
                .one-image .thumbnail-image {
                    width: 100%;
                    height: 100%;
                }
                /* 두 개의 이미지가 있는 경우, 각각의 이미지가 부모 요소의 반씩 차지하도록 설정 */
                .two-images .thumbnail-image {
                    width: calc(50% - 3px); /* 요소 사이 공백을 채우기 위해 */
                    height: 100%;
                }
                /* 네 개의 이미지가 있는 경우 각각 1/4 크기로 설정 */
                .four-images .thumbnail-image {
                    width: calc(50% - 3px);
                    height: calc(50% - 3px);
                }
            `}</style>
        </>
    );
}

