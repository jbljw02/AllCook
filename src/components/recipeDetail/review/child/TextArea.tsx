import { ChangeEvent } from "react";

type Params = {
    value: string,
    onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
    placeholder?: string,
}

export default function TextArea({ value, onChange, placeholder }: Params) {
    return (
        <>
            <div className="review-textarea">
                <textarea
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder} />
            </div>
            <style jsx>{`
                .review-textarea {
                    display: flex;
                    flex-direction: column;
                    border: 1px solid #e8e8e8;
                    border-radius: 5px;
                    height: 115px;
                    padding: 10px;
                    margin-top: 15px;
                }
                textarea {
                    background-color: transparent;
                    width: 100%;
                    font-size: 15px;
                    outline: none;
                    border: none;
                    resize: none;
                }
                /* Chrome, Opera, Safari */
                textarea::-webkit-input-placeholder {
                    color: gray;
                    font-weight: 300;
                }
                /* Firefox */
                textarea::-moz-placeholder {
                    color: gray;
                    font-weight: 300;
                }
            `}</style>
        </>
    )
}