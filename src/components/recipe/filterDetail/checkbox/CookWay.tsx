type CookWayNameKeys = 'steam' | 'boil' | 'grill' | 'stir' | 'fry' | 'etc';

const cookWayNames = {
    steam: '찌기',
    boil: '끓이기',
    grill: '굽기',
    stir: '볶기',
    fry: '튀기기',
    etc: '기타',
}

interface ParamsType {
    cookWayName: CookWayNameKeys,
    isChecked: boolean,
    changeCookCheck: (event: { target: { name: string; checked: boolean; }; }) => void,
}

export default function CookWay({ cookWayName, isChecked, changeCookCheck }: ParamsType) {
    const label = cookWayNames[cookWayName];

    return (
        <>
            <input
                id={`checkbox-${cookWayName}`}
                name={cookWayName}
                checked={isChecked}
                onChange={changeCookCheck}
                className='checkbox'
                type="checkbox" />
            <label
                className="no-drag cursor-pointer"
                htmlFor={`checkbox-${cookWayName}`}>
                {label}
            </label>
            <style jsx>{`
                .checkbox {
                    position: relative;
                    top: 1.72px;
                    margin-right: 5px;
                    cursor: pointer;
                }
            `}</style>
        </>
    )
}