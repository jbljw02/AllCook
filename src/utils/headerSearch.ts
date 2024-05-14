import { Menu } from "@/redux/features/menuSlice";

export const searchByMenuIngredient = (inputValue: string, allMenu: Menu[]) => {
    // 메뉴, 재료명으로 검색
    const searchedMenu = allMenu.filter((item: Menu) =>
        (item.RCP_NM).includes(inputValue) ||
        (item.RCP_PARTS_DTLS).includes(inputValue));

    return searchedMenu;
}