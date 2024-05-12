import { setDisplayedMenu } from "@/redux/features/menuSlice";
import { RootState } from "@/redux/store";
import shuffleArray from "@/utils/shuffleArray";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";


export default function HashTags() {
    const dispatch = useDispatch();

    const allMenu = useSelector((state: RootState) => state.allMenu);

    const [recomHashTags, setRecomHashTags] = useState<string[]>(); // 사용자에게 추천할 해시태그

    // 해시태그를 클릭하면 일치하는 요소들을 반환
    const searchByHashTag = (hashTag: string) => {
        let filteredMenu = allMenu.filter(item => item.HASH_TAG === hashTag);
        dispatch(setDisplayedMenu(filteredMenu));
    }

    // allMenu가 업데이트 될 때, 해시태그를 업데이트함
    useEffect(() => {
        if (Array.isArray(allMenu)) {
            const hashTags = allMenu.map((item) => item.HASH_TAG);
            const uniqeHashTags = [...new Set(hashTags)]; // 중복 제거
            const nonEmptyHashTags = uniqeHashTags.filter(item => item.trim() !== '');  // 공백 문자를 제외하여 반환
            const fixedSideTags = (shuffleArray(nonEmptyHashTags)).slice(0, 8);
            setRecomHashTags(fixedSideTags);
        }
    }, [allMenu]);

    return (
        <>
            <div className="hash-tag-div">

                {
                    recomHashTags && recomHashTags.map((item) => {
                        return (
                            <span onClick={() => searchByHashTag(item)} className="no-drag">{item}</span>
                        )
                    })
                }
            </div>
            <style jsx>{`
                .hash-tag-div {
                    display: flex;
                    flex-direction: row;
                    justify-content: center;
                    margin-top: 23px;
                    width: auto;
                }
                .hash-tag-div span {
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
                .hash-tag-div span:hover {
                    border-color: #323232;
                }
                .hash-tag-div span:last-child {
                    margin-right: 0px;
                }
            `}</style>
        </>
    )
}