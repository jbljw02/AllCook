type FoodTypeNameKeys = 'rice' | 'sideDish' | 'specialDish' | 'stew' | 'dessert';

const foodTypeNames = {
    rice: '밥',
    sideDish: '반찬',
    specialDish: '일품',
    stew: '국&찌개',
    dessert: '후식',
}

interface ParamsType {
    foodTypeName: FoodTypeNameKeys,
    isChecked: boolean,
    changeFoodCheck: (event: { target: { name: string; checked: boolean; }; }) => void,
}

export default function FoodType({ foodTypeName, isChecked, changeFoodCheck }: ParamsType) {
    const label = foodTypeNames[foodTypeName];

    return (
        <>
            <input
                id={`checkbox-${foodTypeName}`}
                name={foodTypeName}
                checked={isChecked}
                onChange={changeFoodCheck}
                className='checkbox'
                type="checkbox" />
            <label
                className="no-drag cursor-pointer"
                htmlFor={`checkbox-${foodTypeName}`}>
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