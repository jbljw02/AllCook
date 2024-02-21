import { Menu } from "../redux/store";

export const searchByMenuIngredient = (event: React.KeyboardEvent<HTMLInputElement>, allMenu: Menu[]) => {
    // 메뉴, 재료명으로 검색
    const searchedMenu = allMenu.filter((item: Menu) =>
        (item.RCP_NM).includes(event.currentTarget.value) ||
        (item.RCP_PARTS_DTLS).includes(event.currentTarget.value));

    return searchedMenu;
}