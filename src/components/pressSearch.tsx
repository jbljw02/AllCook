import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";

export default function pressSearch(event: { key: string; }) {
    const allMenu = useSelector((state: RootState) => state.allMenu);

    if (event.key === 'Enter') {
    }

}