import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'

export default function SkeletonImg() {
    return (
        <Skeleton style={{ width: '320px', height: '320px' }} />
    );
}