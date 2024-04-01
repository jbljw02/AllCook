import { Form } from "@/pages/contact";

export default function ContactInput({ form, name, height, placeholder, msgWhether, onChange, emailValid }: { form: Form, name: keyof Form, height: string, placeholder: string, msgWhether: boolean, onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void, emailValid?: boolean, }) {

    // 전송 버튼이 눌렀는데 필드가 비어있는지 확인
    const checkSubmittedAndEmpty = (fieldName: keyof Form) => {
        // submitted를 사용하는 이유는, 필드가 비어있는지만 확인하면 초기 상태부터 input에 빨간줄을 긋게 되기 때문
        return form.submitted && form[fieldName] === '';
    }

    // input-div의 클래스를 결정
    const inputClass = (fieldName: keyof Form) => {
        let baseClass = msgWhether ? 'input-div-background' : 'input-div';
        if (checkSubmittedAndEmpty(fieldName) && fieldName !== 'tel') {
            return `${baseClass} input-warning`
        }
        if(fieldName === 'mail' && !emailValid) {
            return `${baseClass} input-warning`
        }
        return baseClass;
    }

    return (
        <>
            <div className={inputClass(name)}>
                <textarea name={name} className="search-input" style={{ height: height }} placeholder={placeholder} onChange={onChange} />
            </div>
            <style jsx>{`
                .input-div {
                    background-color: transparent;
                    border-bottom: 1px solid #787878;
                    margin-right: 0px;
                }
                .input-div-background {
                    border-radius: 5px;
                    border: 1px solid #787878;
                    margin-top: 10px;
                }
                .search-input {
                    background-color: transparent;
                    padding-left: 6px;
                    font-size: 14px;
                    width: 98%;
                    resize: none;
                }
                .input-warning {
                    border-color: #FF0000;
                }
                {/* textarea::placeholder {
                    color: #FF0000;
                } */}
            `}</style>
        </>
    )
}