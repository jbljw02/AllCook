import { useState } from "react";

export default function ContactInput({ name, height, placeholder, msgWhether, onChange }: { name: string, height: string, placeholder: string, msgWhether: boolean, onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void }) {

    type Form = {
        id: string,
        name: string,
        mail: string,
        tel: string,
        content: string,
    }

    // 회원의 문의 내용을 담는 state
    const [formData, setFormData] = useState<Form>({
        id: '',
        name: '',
        mail: '',
        tel: '',
        content: '',
    });

    return (
        <>
            <div className={`${msgWhether ? 'input-div-background' : 'input-div'}`}>
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
            `}</style>
        </>
    )
}