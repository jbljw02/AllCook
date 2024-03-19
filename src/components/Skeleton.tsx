import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export default function SkeletonUI() {

    return (
        <div style={{width: '80%'}}>
            <Skeleton count={5} />
        </div>
    )
}