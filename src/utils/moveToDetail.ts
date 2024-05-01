import { Menu } from "@/redux/store";
import router from "next/router";

export default function moveToDetail(name: string, seq: string, displayedMenu: Menu[]) {
    let selectedMenu = displayedMenu.find((item: { RCP_SEQ: string; }) => item.RCP_SEQ === seq);

    router.push({
        pathname: `/recipe/${seq}`,
        query: { name: name, seq: seq },
    });
    return selectedMenu;
}