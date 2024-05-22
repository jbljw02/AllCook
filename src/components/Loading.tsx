import Image from 'next/image';
import loadingSpinner from '../../public/images/loading.gif';

export default function Loading() {
    return (
        <>
            <div className='loading-container'>
                <Image
                    src={loadingSpinner}
                    alt=""
                    width={80}
                    height={80}
                    fetchPriority="high"
                />
            </div>
            <style jsx>{`
                .loading-container {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 100%; 
                    width: 100%;
            `}</style>
        </>
    );
}
