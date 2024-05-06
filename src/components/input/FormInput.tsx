import { emailForm } from "@/pages/resetPassword";
import { loginForm } from "@/pages/signIn"
import { signUpForm } from "@/pages/signUp"

export type ParamsType = {
    formData: loginForm | signUpForm | emailForm,
    formChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    type: string,
    name: string,
    value: any,
    inputFocus: (e: React.ChangeEvent<HTMLInputElement>) => void,
    inputBlur: (e: React.ChangeEvent<HTMLInputElement>) => void,
    placeholder: string,
}

export default function FormInput({
    type,
    name,
    formData,
    formChange,
    value,
    inputFocus,
    inputBlur,
    placeholder }: ParamsType) {
        
    const inputValue = (formData as any)[value];

    return (
        <>
            <input
                onChange={formChange}
                type={type}
                name={name}
                onFocus={inputFocus}
                onBlur={inputBlur}
                value={inputValue}
                placeholder={placeholder} />
            <style jsx>{`
                input {
                    outline: none;
                    width: 100%;
                    height: 42px;
                    font-size: 14px;
                    padding-left: 12px;
                    padding-top: 3px;
                    padding-bottom: 3px;
                    border-radius: 10px;
                    border: none;
                }
            `}</style>
        </>
    )
}