import { NoneImage } from "./PreparingMenu";

export default function EmptyMenu({ width, height }: NoneImage) {
    return (
        <>
            <div
                style={{
                    width: width,
                    height: height,
                    backgroundColor: '#f4f5f6'
                }}>
            </div>
        </>
    )
}