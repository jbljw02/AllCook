import axios from "axios"

// 폴더 삭제 요청 전송
const folderDeleteRequest = async (email: string, folderIds: number[]) => {
    try {
        const data = {
            email: email,
            folderIds: folderIds,
        }
        const response = await axios.post('/api/deleteFolder', data, {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
        })
        console.log("폴더 삭제 성공: ", response);
        return response;
    } catch (error) {
        console.error("폴더 삭제 실패: ", error);
        throw Error;
    }
}

export default folderDeleteRequest;