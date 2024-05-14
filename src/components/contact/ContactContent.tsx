import ContactInput from "../input/ContactInput";

interface FormData {
    id: string,
    name: string,
    mail: string,
    tel: string,
    content: string,
    submitted: boolean,
}

interface ParamsType {
    formData: FormData,
    formChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void,
}

export default function ContactContent({ formData, formChange }: ParamsType) {
    return (
        <>
            <div className="msg-div">
                <label className="msg-title">문의내용</label>
                <ContactInput
                    form={formData}
                    name="content"
                    height="190px"
                    placeholder=""
                    msgWhether={true}
                    onChange={formChange}
                />
                {
                    formData.submitted && formData.content === '' ?
                        <div className="input-warning">문의내용을 입력해주세요</div> :
                        null
                }
            </div>
            <style jsx>{`
                .msg-div {
                    margin-top: 15px;
                    width: 400px;
                }
                .msg-title {
                    font-size: 15.5px;
                    margin-left: 2px;
                }    
                .input-warning {
                    margin-top: 4px;
                    margin-left: 1px;
                    font-size: 11.5px;
                    color: #FF0000;
                }            
            `}</style>
        </>

    )
}