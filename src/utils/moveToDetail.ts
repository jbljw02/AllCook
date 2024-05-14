import router from "next/router";
import { Menu } from "@/redux/features/menuSlice";

export default function moveToDetail(name: string, seq: string, displayedMenu: Menu[]) {
    let selectedMenu = displayedMenu.find((item: { RCP_SEQ: string; }) => item.RCP_SEQ === seq);

    router.push({
        pathname: `/recipe/${seq}`,
        query: { name: name, seq: seq },
    });
    return selectedMenu;
}