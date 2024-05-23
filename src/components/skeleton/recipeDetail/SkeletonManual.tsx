import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'

export default function SkeletonManual() {
    return (
        Array.from({ length: 6 }, (_, index) => (
            <Skeleton
                key={index}
                style={{ width: '697px', height: '88.5px', marginTop: '15px' }}
            />
        ))
    )
}