import { Menu } from "@/redux/store";
import axios from "axios";

const sendNewFolder = async (email: string, folderId: number, folderName: string, recipes: Menu[]) => {
    try {
        const data = {
            email: email,
            folderId: folderId,
            folderName: folderName,
            recipes: recipes,
        }
        const response = await axios.post('/api/addNewFolder', data, {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
        });
        return response;
    } catch (error) {
        console.error("폴더 추가 실패: ", error);
    }
}

export default sendNewFolder;