import axios from "axios";

// 폴더명의 변경을 요청
const sendNewFolderName = async (email: string, folderId: number, newFolderName: string) => {
    try {
        const data = {
            email: email,
            folderId: folderId,
            newFolderName: newFolderName,
        }
        const response = await axios.post('/api/updateFolderName', data, {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
        });
        console.log("폴더명 변경 완료: ", response);
        return response;
    } catch (error) {
        console.error("폴더명 변경 실패: ", error);
        throw Error;
    }
}

export default sendNewFolderName;