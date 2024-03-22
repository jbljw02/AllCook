import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export default function SkeletonUI({ length }: { length: number }) {
    return (
        <>
            <div className='skeleton-grid'>
                {
                    Array.from({ length }, (_, index) => (
                        <div className='skeleton-div'>
                            <Skeleton className="skeleton-img" style={{ height: '250px' }} count={1} />
                            <Skeleton className='skeleton-title' count={1} />
                        </div>
                    ))
                }
            </div>
            <style jsx>{`
                .skeleton-grid {
                    display: flex;
                    flex-wrap: wrap; /* width를 넘어서면 다음 줄로 넘어감 */
                    justify-content: center;
                    width: 100%;
                }
                .skeleton-div {
                    display: flex;
                    flex-direction: column;
                    box-sizing: border-box;
                    width: 25%; /* 한 줄에 4개의 아이템이 들어갈 수 있도록 */
                    padding: 10.5px;
                }
                .skeleton-img, .skeleton-title {
                    width: 100%;
                }
            `}</style>
        </>
    )
}
