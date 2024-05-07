import { emailForm } from "@/pages/resetPassword";
import { loginForm } from "@/pages/signIn"
import { signUpForm } from "@/pages/signUp"
import { UserForm } from "@/pages/userDetail";

export type ParamsType = {
    formData: loginForm | signUpForm | emailForm | UserForm,
    formChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    type: string,
    name: string,
    value: string,
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

    return (
        <>
            <input
                onChange={formChange}
                type={type}
                name={name}
                onFocus={inputFocus}
                onBlur={inputBlur}
                value={value}
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