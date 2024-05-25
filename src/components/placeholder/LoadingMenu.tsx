import { NoneImage } from "./PreparingMenu";

export default function LoadingMenu({ width, height }: NoneImage) {

    return (
        <div
            className="loading-menu-container"
            style={{ width: width, height: height, backgroundColor: '#f4f5f6' }}>
        </div>
    )
}