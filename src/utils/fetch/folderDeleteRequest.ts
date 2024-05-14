import axios from "axios"

// 폴더 삭제 요청 전송
const folderDeleteRequest = async (email: string, folderIds: number[]) => {
    try {
        const data = {
            email: email,
            folderIds: folderIds,
        }
        const response = await axios.post('/api/userFavorite/folder/deleteFolder', data, {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
        })
        return response;
    } catch (error) {
        throw error;
    }
}

export default folderDeleteRequest;