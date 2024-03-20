import { setAllMenu, setDessertMenu } from "@/redux/features/menuSlice";
import { Menu, wrapper } from "@/redux/store";
import Image from "next/image";

type paramsType = {
    menu: Menu[],
    menuHovered: boolean[],
    category: string,
    menuClick: (name: string, seq: string) => void,
    imgMouseEnter: (index: number, param: string) => void,
    imgMouseOut: (index: number, param: string) => void,
}

export const RecomMenu: React.FC<paramsType> = ({ menu, menuHovered, category, menuClick, imgMouseEnter, imgMouseOut }) => {
    return (
        <table className="menu-table">
            <tbody>
                <tr>
                    {
                        menu.length !== undefined &&
                        menu.slice(0, 4).map((item, index) => {
                            const isHovered = menuHovered;
                            return (
                                <td>
                                    <div>
                                        <div onClick={() => menuClick(item.RCP_NM, item.RCP_SEQ)} className="td-content">
                                            <Image
                                                src={`${item.ATT_FILE_NO_MK}`}
                                                style={{
                                                    borderRadius: 8,
                                                    cursor: "pointer",
                                                    transition: "transform 0.3s ease",
                                                    transform: isHovered[index]
                                                        ? "scale(1.05)"
                                                        : "scale(1)"
                                                }}
                                                width={250}
                                                height={250}
                                                alt={""}
                                                onMouseEnter={() => imgMouseEnter(index, category)}
                                                onMouseLeave={() => imgMouseOut(index, category)}
                                            />
                                        </div>
                                        <div className="RCP_NM">{item.RCP_NM}</div>
                                        <div className="RCP_PAT2">{item.RCP_PAT2}</div>
                                    </div>
                                </td>
                            );
                        })}
                </tr>
            </tbody>
        </table>
    )
}