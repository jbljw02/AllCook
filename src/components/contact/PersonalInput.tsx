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
    emailValid: boolean,
    formChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void,
}

export default function PersonalInput({ formData, emailValid, formChange }: ParamsType) {
    return (
        <>
            <div className="personal-info">
                <div className="name-div">
                    <ContactInput
                        form={formData}
                        name="name"
                        height="25px"
                        placeholder="이름(필수)"
                        msgWhether={false}
                        onChange={formChange}
                    />
                    {
                        formData.submitted && formData.name === '' ?
                            <div className="input-warning">이름을 입력해주세요</div> :
                            null
                    }
                </div>
                <div className="personal-div">
                    <div className="email">
                        <ContactInput
                            form={formData}
                            name="mail"
                            height="25px"
                            placeholder="이메일(필수)"
                            msgWhether={false}
                            onChange={formChange}
                            emailValid={emailValid}
                        />
                        {
                            formData.submitted && formData.mail === '' ?
                                <div className="input-warning">이메일을 입력해주세요</div> :
                                null
                        }
                        {
                            formData.submitted && formData.mail !== '' && !emailValid ?
                                <div className="input-warning">유효한 이메일을 입력해주세요</div> :
                                null
                        }
                    </div>
                    <div className="tel">
                        <ContactInput
                            form={formData}
                            name="tel"
                            height="25px"
                            placeholder="연락처(선택)"
                            msgWhether={false}
                            onChange={formChange}
                        />
                    </div>
                </div>
            </div>
            <style jsx>{`
                .personal-info {
                    display: flex;
                    flex-direction: column;
                    margin-right: 20px;
                }
                .name-div {
                    margin-bottom: 20px;
                    width: 400px;
                }               
                .personal-div {
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;
                    margin-bottom: 20px;
                }
                .input-warning {
                    margin-top: 4px;
                    margin-left: 1px;
                    font-size: 11.5px;
                    color: #FF0000;
                }
                .email, .tel {
                    width: 185px;
                }
            `}</style>
        </>
    )
}