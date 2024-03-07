export const adjustForServings = (ingredients: string, servings: number) => {
    // 괄호 안의 내용을 찾는 정규표현식
    const regex = /\((.*?)\)/g;
    // 소수점을 포함한 숫자를 찾는 정규표현식
    const numberRegex = /\d+(\.\d+)?/g;
    // 분수를 찾는 정규표현식
    const fractionRegex = /(\d+)\/(\d+)/g;

    // 정규식을 이용해 숫자를 찾고, 찾은 숫자를 입력값으로 받아 인분 수만큼 곱한 뒤에 문자열로 변환
    let adjustedIngredients = ingredients.replace(numberRegex, num => {
        let result = parseFloat(num) * servings;
        if (Number.isInteger(result)) {
            return result.toString();
        } else {
            return result.toFixed(1);
        }
    });
    
    // 괄호 안의 내용을 찾음
    adjustedIngredients = adjustedIngredients.replace(regex, match => {
        // 분수(fraction)를 찾고, 분자(numerator)와 분모(denominator) 두 개의 인자를 사용하기 위해 ()를 사용
        return match.replace(fractionRegex, (fraction, numerator, denominator) => {
            // 분자에만 인분 수만큼 곱셈
            let result = parseInt(numerator) * servings / parseInt(denominator);
            if (Number.isInteger(result)) {
                // 결과가 정수인 경우 문자열로 즉시 변환
                return result.toString();
            } else {
                // 결과가 소수인 경우 소숫점 첫째 자리에서 반올림
                return result.toFixed(1);
            }
        });
    });

    return adjustedIngredients;
};
