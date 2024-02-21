import { RefObject, SetStateAction, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Anek_Tamil } from 'next/font/google';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { setAllMenu, setDisplayedMenu } from '@/redux/features/menuSlice';
import { searchByMenuIngredient } from '../utils/headerSearch'
import router, { useRouter } from 'next/router';

const titleFont = Anek_Tamil({
    subsets: ['latin'],
    weight: ['100', '200', '300', '400', '500'],
});

type Position = 'static' | 'relative' | 'absolute' | 'fixed' | 'sticky';

export default function Header({ position, backgroundColor, color, borderColor, svgFill, lightLogo, inputBackgroundColor }: { position: Position, backgroundColor: string, color: string, borderColor: string, svgFill: string, lightLogo: boolean, inputBackgroundColor: string }) {
    const dispatch = useDispatch();
    const router = useRouter();

    const allMenu = useSelector((state: RootState) => state.allMenu);
    const displayedMenu = useSelector((state: RootState) => state.displayedMenu);

    const [inputValue, setInputValue] = useState<string>();
    const changeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    }

    const pressSearch = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            let newDisplayedMenu = searchByMenuIngredient(event, allMenu);
            dispatch(setDisplayedMenu(newDisplayedMenu));

            // 현재 위치가 레시피 페이지가 아닌 경우에만 세션 스토리지에 이동 했음을 담고, 페이지를 이동시킴
            if (router.pathname !== '/recipe') {
                sessionStorage.setItem('navigated', 'true');
                router.push('/recipe');
            }

            // 검색어가 공란일 경우 초기 상태로 되돌림
            if (inputValue === '') {
                dispatch(setDisplayedMenu(allMenu));
            }
        }
    }


    return (
        <>
            <header
                style={{
                    position: position,
                    backgroundColor: backgroundColor,
                    color: color,
                    borderColor: borderColor,
                }}
                className='header'>
                <div className='header-div'>
                    {/* 메뉴 네비게이션 바 */}
                    <div className='left-nav'>
                        <span className='home'>
                            <Link
                                style={{ textDecoration: 'none', color: 'inherit' }}
                                href={'/'}>
                                Home
                            </Link>
                        </span>
                        <span className='recipe'>
                            <Link
                                style={{ textDecoration: 'none', color: 'inherit' }}
                                href={'/recipe'}>
                                Recipe
                            </Link>
                        </span>
                        <span className='contact'>
                            <Link
                                style={{ textDecoration: 'none', color: 'inherit' }}
                                href={'/contact'}>
                                Contact
                            </Link>
                        </span>
                    </div>
                    {/* 타이틀 이미지 */}
                    <div className='title-logo-div'>
                        {
                            lightLogo ?
                                <>
                                    <svg xmlns="http://www.w3.org/2000/svg" className='title-logo' viewBox="0 0 593 415">
                                        <path d="M126.705 222.807C134.265 218.847 142.305 216.867 150.825 216.867C159.345 216.867 166.185 218.367 171.345 221.367C176.625 224.247 179.265 228.387 179.265 233.787C179.265 236.787 178.665 239.607 177.465 242.247C176.385 244.767 175.365 246.567 174.405 247.647C173.445 248.727 172.005 250.107 170.085 251.787C167.085 244.947 163.365 239.727 158.925 236.127C154.605 232.527 149.145 230.727 142.545 230.727C135.945 230.727 130.125 232.707 125.085 236.667C120.165 240.627 116.265 245.547 113.385 251.427C110.625 257.307 108.285 263.907 106.365 271.227C103.125 283.587 101.505 295.767 101.505 307.767C101.505 327.087 104.625 341.907 110.865 352.227C117.105 362.547 126.405 367.707 138.765 367.707C145.485 367.707 151.425 365.607 156.585 361.407C161.865 357.207 165.885 351.087 168.645 343.047C171.645 346.407 173.145 350.547 173.145 355.467C173.145 361.707 169.065 367.407 160.905 372.567C152.865 377.727 143.805 380.307 133.725 380.307C116.325 380.307 103.365 374.367 94.8449 362.487C86.3249 350.607 82.0649 335.127 82.0649 316.047C82.0649 296.607 85.7849 278.487 93.2249 261.687C101.385 243.207 112.545 230.247 126.705 222.807ZM235.081 266.907C229.441 266.907 224.521 269.067 220.321 273.387C216.241 277.587 213.181 282.927 211.141 289.407C207.301 301.407 205.381 313.587 205.381 325.947C205.381 338.187 207.901 347.967 212.941 355.287C217.981 362.607 225.001 366.267 234.001 366.267C239.761 366.267 244.741 364.167 248.941 359.967C253.141 355.647 256.261 350.247 258.301 343.767C262.141 331.407 264.061 319.167 264.061 307.047C264.061 294.807 261.481 285.087 256.321 277.887C251.281 270.567 244.201 266.907 235.081 266.907ZM225.181 379.587C212.701 379.587 203.041 374.907 196.201 365.547C189.361 356.187 185.941 344.307 185.941 329.907C185.941 321.147 187.321 312.327 190.081 303.447C192.841 294.447 196.621 286.227 201.421 278.787C206.221 271.227 212.401 265.107 219.961 260.427C227.521 255.747 235.681 253.407 244.441 253.407C256.921 253.407 266.521 258.087 273.241 267.447C280.081 276.807 283.501 288.687 283.501 303.087C283.501 317.847 280.141 331.827 273.421 345.027C266.101 359.307 256.681 369.327 245.161 375.087C238.921 378.087 232.261 379.587 225.181 379.587ZM356.753 266.907C351.113 266.907 346.193 269.067 341.993 273.387C337.913 277.587 334.853 282.927 332.813 289.407C328.973 301.407 327.053 313.587 327.053 325.947C327.053 338.187 329.573 347.967 334.613 355.287C339.653 362.607 346.673 366.267 355.673 366.267C361.433 366.267 366.413 364.167 370.613 359.967C374.813 355.647 377.933 350.247 379.973 343.767C383.813 331.407 385.733 319.167 385.733 307.047C385.733 294.807 383.153 285.087 377.993 277.887C372.953 270.567 365.873 266.907 356.753 266.907ZM346.853 379.587C334.373 379.587 324.713 374.907 317.873 365.547C311.033 356.187 307.613 344.307 307.613 329.907C307.613 321.147 308.993 312.327 311.753 303.447C314.513 294.447 318.293 286.227 323.093 278.787C327.893 271.227 334.073 265.107 341.633 260.427C349.193 255.747 357.353 253.407 366.113 253.407C378.593 253.407 388.193 258.087 394.913 267.447C401.753 276.807 405.173 288.687 405.173 303.087C405.173 317.847 401.813 331.827 395.093 345.027C387.773 359.307 378.353 369.327 366.833 375.087C360.593 378.087 353.933 379.587 346.853 379.587ZM453.405 346.647C453.405 357.927 455.685 366.147 460.245 371.307C456.525 375.627 452.385 377.787 447.825 377.787C438.465 377.787 433.785 369.867 433.785 354.027C433.785 348.147 435.945 330.627 440.265 301.467C444.585 272.307 446.745 251.367 446.745 238.647C446.745 225.807 445.485 216.867 442.965 211.827C445.845 209.187 449.565 207.867 454.125 207.867C458.805 207.867 462.165 209.307 464.205 212.187C466.245 215.067 467.265 219.387 467.265 225.147C467.265 230.787 466.665 238.047 465.465 246.927C464.265 255.807 462.645 266.667 460.605 279.507C458.685 292.347 457.245 302.727 456.285 310.647C467.805 299.607 477.765 288.927 486.165 278.607C494.565 268.167 499.305 260.727 500.385 256.287C505.305 256.287 509.205 257.067 512.085 258.627C515.085 260.187 516.585 262.167 516.585 264.567C516.585 268.527 502.845 283.287 475.365 308.847C487.005 328.527 495.405 341.487 500.565 347.727C507.765 356.487 515.025 361.407 522.345 362.487C522.225 368.367 520.665 372.507 517.665 374.907C514.785 377.187 511.905 378.327 509.025 378.327C501.585 378.327 493.365 371.367 484.365 357.447C480.165 350.847 475.905 343.827 471.585 336.387C467.265 328.947 464.205 323.727 462.405 320.727L454.305 327.927C453.705 335.487 453.405 341.727 453.405 346.647Z" fill="white" />
                                        <path d="M244.964 163.911C243.044 168.231 239.204 170.391 233.444 170.391C227.684 170.391 223.064 168.891 219.584 165.891C216.224 162.891 213.464 157.911 211.304 150.951C209.264 143.991 207.524 134.751 206.084 123.231H153.344C147.224 137.031 144.164 147.711 144.164 155.271C144.164 158.751 144.884 161.631 146.324 163.911C143.444 168.231 139.304 170.391 133.904 170.391C128.504 170.391 125.804 167.391 125.804 161.391C125.804 158.031 126.824 153.111 128.864 146.631C131.024 140.031 138.764 122.931 152.084 95.331C165.404 67.611 173.684 48.831 176.924 38.991C180.284 29.031 181.964 22.611 181.964 19.731C181.964 16.851 181.784 14.691 181.424 13.251C185.384 10.491 189.704 9.11097 194.384 9.11097C199.064 9.11097 202.784 10.311 205.544 12.711C208.424 14.991 210.884 19.491 212.924 26.211C215.084 32.931 217.484 50.751 220.124 79.671C222.884 108.591 226.004 129.051 229.484 141.051C232.004 149.931 237.164 157.551 244.964 163.911ZM194.384 36.471C191.624 42.951 185.924 54.951 177.284 72.471C168.644 89.991 162.464 102.831 158.744 110.991H204.824C204.224 103.431 203.204 93.591 201.764 81.471C200.444 69.231 199.544 61.491 199.064 58.251C197.624 49.731 196.064 42.471 194.384 36.471ZM294.005 19.011C294.005 25.611 291.665 44.271 286.985 74.991C282.425 105.711 280.145 127.011 280.145 138.891C280.145 150.651 282.425 158.991 286.985 163.911C283.265 168.231 279.125 170.391 274.565 170.391C265.205 170.391 260.525 162.471 260.525 146.631C260.525 140.751 262.625 123.231 266.825 94.071C271.145 64.911 273.305 43.971 273.305 31.251C273.305 18.411 272.045 9.47098 269.525 4.43098C270.845 3.35098 272.705 2.45097 275.105 1.73097C277.625 0.890973 279.785 0.470975 281.585 0.470975C285.785 0.470975 288.905 1.91097 290.945 4.79097C292.985 7.67097 294.005 12.411 294.005 19.011ZM353.45 19.011C353.45 25.611 351.11 44.271 346.43 74.991C341.87 105.711 339.59 127.011 339.59 138.891C339.59 150.651 341.87 158.991 346.43 163.911C342.71 168.231 338.57 170.391 334.01 170.391C324.65 170.391 319.97 162.471 319.97 146.631C319.97 140.751 322.07 123.231 326.27 94.071C330.59 64.911 332.75 43.971 332.75 31.251C332.75 18.411 331.49 9.47098 328.97 4.43098C330.29 3.35098 332.15 2.45097 334.55 1.73097C337.07 0.890973 339.23 0.470975 341.03 0.470975C345.23 0.470975 348.35 1.91097 350.39 4.79097C352.43 7.67097 353.45 12.411 353.45 19.011Z" fill="white" />
                                        <path d="M433.696 11.0782C425.1 11.7982 416.424 16.1535 411.039 22.4444C410.455 23.129 409.7 24.1086 409.348 24.6279C402.735 34.3889 400.309 51.3614 403.208 67.5313C403.771 70.6945 403.963 71.3318 406.258 78.0359C407.435 81.4469 407.949 83.654 408.623 88.0683C409.74 95.3743 410.304 104.462 410.062 111.261C409.911 115.77 409.67 116.844 407.254 124.185C404.738 131.81 404.124 134.229 403.912 137.31C403.711 140.213 404.174 142.609 405.332 144.569C406.227 146.103 408.16 148.098 410.093 149.479C412.237 151.001 419.081 154.719 422.433 156.171C429.861 159.393 437.199 161.128 446.58 161.848C449.157 162.049 455.287 162.049 456.696 161.86C462.303 161.093 466.983 159.487 469.661 157.422C471.442 156.053 471.946 154.813 472.147 151.332C472.298 148.782 472.419 147.271 472.751 143.424C473.365 136.259 473.737 133.757 474.623 130.5C475.126 128.67 475.831 127.006 477.401 123.949C480.743 117.434 484.357 111.143 491.775 98.986C496.113 91.857 498.046 88.6466 500.28 84.8225C501.378 82.9341 502.998 80.184 503.884 78.6968C508.182 71.4617 510.084 67.6494 511.353 63.66C513.255 57.6759 513.537 49.1425 512.057 42.2614C511.453 39.4523 510.557 36.9383 509.43 34.92C508.615 33.4565 506.954 31.4854 505.565 30.3287C503.371 28.4993 500.472 27.201 497.361 26.6344C495.932 26.3748 492.62 26.2803 490.97 26.4456C488.373 26.717 483.722 27.8383 483.722 28.1924C483.722 28.275 483.602 28.3694 483.451 28.4166C483.29 28.452 483.098 28.5111 483.018 28.5347C482.907 28.5583 482.786 28.3222 482.585 27.6849C482.213 26.5282 481.276 24.8994 480.471 24.0142C478.81 22.1965 476.677 21.1933 473.506 20.733C472.338 20.5559 471.312 20.5323 467.466 20.5441C461.397 20.5677 459.978 20.4143 457.502 19.4937C455.811 18.8563 454.643 18.2544 450.506 15.882C445.685 13.1201 444.497 12.5418 442.252 11.8808C439.766 11.1491 436.474 10.8422 433.696 11.0782ZM438.176 14.0644C441.497 14.4184 444.014 15.1738 447.033 16.72C447.758 17.0977 448.895 17.6524 449.58 17.9711C451.825 19.0216 453.113 19.8714 454.059 20.8864C454.522 21.4057 454.663 21.7362 454.411 21.7362C454.341 21.7362 453.848 21.9723 453.314 22.2437C446.802 25.6902 440.813 36.655 439.132 48.1864C438.79 50.5588 438.467 56.7435 438.558 59.3283C438.639 61.7479 438.981 63.0935 439.816 64.2383C440.118 64.6396 441.145 65.572 441.205 65.4894C441.215 65.4776 441.165 64.8285 441.085 64.0495C440.873 61.9958 440.793 55.9527 440.934 53.781C441.356 47.431 442.333 42.3322 444.014 37.7291C446.017 32.2408 449.036 27.9445 452.569 25.5485C453.365 25.0056 455.066 24.1322 456.042 23.7663C462.766 21.2405 470.677 21.4647 475.861 24.3446C480.099 26.6934 482.182 30.4231 482.937 36.9619C483.119 38.5317 483.088 42.9578 482.877 45.2239C482.555 48.6822 481.85 51.2906 480.381 54.4656C479.354 56.6727 478.78 57.6995 475.771 62.6331C473.596 66.1976 472.741 67.7556 471.815 69.8683C470.909 71.922 470.879 71.8512 472.278 71.1784C475.438 69.6558 479.193 64.3091 482.122 57.2038C483.008 55.0675 483.37 54.017 483.934 52.0696C485.041 48.2454 485.222 46.593 484.991 42.0844C484.699 36.4072 484.789 34.92 485.534 33.1024C486.42 30.9897 488.111 29.8212 491.473 28.995C493.023 28.6173 495.61 28.4757 496.918 28.6881C501.216 29.4081 504.538 32.2408 506.843 37.139C508.111 39.83 508.967 42.9578 509.48 46.7701C509.933 50.1103 510.024 54.017 509.702 56.0235C508.876 61.087 506.833 67.5077 504.629 71.9574C504.045 73.1377 498.318 83.9373 496.929 86.4749C493.285 93.1435 490.577 97.5342 487.245 102.232C486.36 103.459 485.293 105.017 484.86 105.69C481.951 110.21 480.26 112.335 478.508 113.692C476.807 115.014 475.408 115.014 474.221 113.704C473.264 112.642 473.224 111.485 474.059 109.538C474.563 108.381 476.566 104.616 479.092 100.107C480.34 97.8647 481.74 95.3743 482.182 94.5599C483.028 93.0255 485.132 88.9417 485.132 88.8355C485.132 88.7411 483.924 89.4847 483.431 89.8741C482.333 90.7594 481.055 92.3527 479.978 94.2058C479.616 94.8195 478.579 96.8142 477.683 98.6319C475.338 103.377 474.533 104.734 473.013 106.516C472.127 107.543 471.01 108.464 470.164 108.853C469.339 109.231 467.628 109.243 466.41 108.865C464.145 108.157 462.061 106.41 461.186 104.474C460.783 103.577 460.662 102.881 460.662 101.347C460.652 98.3486 461.477 95.15 463.4 90.6767C464.296 88.5994 464.376 88.3752 464.215 88.2335C464.074 88.1155 463.994 88.1509 463.692 88.4224C462.253 89.7561 461.337 91.6564 460.219 95.6221C459.464 98.3132 459.142 99.2692 458.639 100.261C458.136 101.276 457.149 102.456 456.525 102.798C455.378 103.424 453.727 103.353 451.009 102.586C450.093 102.326 448.513 101.913 447.486 101.653C444.769 100.969 443.53 100.414 442.655 99.4463C441.739 98.443 441.537 97.3336 441.618 93.7691C441.719 89.6617 441.356 85.6015 440.521 81.3053C440.229 79.8299 440.179 79.6765 439.997 79.7119C439.796 79.7473 439.786 79.7945 439.836 81.3407C439.937 84.4684 439.887 90.5823 439.756 91.9633C439.464 94.9848 438.84 97.1801 438.055 97.9827C437.612 98.443 436.716 98.9387 435.81 99.222C434.794 99.5289 432.176 99.5997 430.878 99.34C429.61 99.0922 428.503 98.6791 427.697 98.1598C427.063 97.7467 426.409 96.9913 426.248 96.5192C426.198 96.3657 425.956 93.4032 425.694 89.945C425.443 86.4749 425.211 83.5242 425.181 83.3708C425.151 83.1937 425.06 83.1111 424.899 83.1111C424.637 83.1111 424.557 83.3472 424.295 84.8815C424.124 85.9202 424.064 86.7582 423.933 90.2518C423.762 94.5009 423.409 95.8936 422.141 97.2863C421.004 98.5493 419.474 99.3046 418.568 99.0568C417.591 98.7853 417.138 98.0063 416.726 95.8582C416.615 95.2917 416.555 93.8045 416.484 90.0748C416.373 83.6422 416.192 82.1787 414.672 75.2032C414.34 73.6806 413.948 71.8866 413.807 71.2138C413.555 70.0925 413.525 70.0099 413.324 70.0807C413.213 70.128 413.102 70.1634 413.092 70.1752C413.082 70.187 413.203 71.8158 413.364 73.7868C414.34 85.4835 414.642 91.9987 414.36 95.0084C414.24 96.3185 413.938 98.0417 413.706 98.6673C413.535 99.1512 413.193 99.6351 413.012 99.6351C412.518 99.6351 411.774 97.3926 411.25 94.3356C411.089 93.3914 410.797 91.1016 410.596 89.2486C409.972 83.4062 409.851 82.8869 406.781 72.4295C406.298 70.8007 405.714 68.5464 405.472 67.4133C402.815 54.9377 404.134 41.0339 408.985 30.5884C410.123 28.1216 411.361 26.1977 413.062 24.2148C414.411 22.645 415.468 21.6418 417.239 20.2609C421.819 16.7082 427.103 14.6427 433.143 14.0289C434.079 13.9345 437.149 13.9581 438.176 14.0644ZM427.204 101.051C434.421 101.299 438.659 101.76 443.863 102.822C451.684 104.439 458.206 106.894 464.115 110.447C465.242 111.119 467.245 112.311 468.574 113.079C472.238 115.203 473.365 116.017 474.512 117.398C476.244 119.476 476.183 120.963 474.19 125.011C473.294 126.841 473.013 127.537 472.67 128.8C471.362 133.604 470.567 139.989 470.345 147.413C470.305 148.924 470.245 150.187 470.214 150.222C470.184 150.258 469.51 149.904 468.725 149.443C460.471 144.592 450.033 140.721 439.987 138.773C428.11 136.472 416.555 136.684 407.123 139.399L406.368 139.611L406.328 139.364C406.278 138.974 406.509 137.133 406.841 135.398C407.214 133.474 407.757 131.432 408.955 127.608C410.847 121.565 411.27 119.96 411.774 116.867C411.935 115.84 411.985 114.837 412.055 111.143C412.146 106.327 412.186 105.95 412.73 104.64C413.374 103.082 415.156 101.866 417.561 101.335C419.454 100.922 421.648 100.863 427.204 101.051ZM431.331 140.957C443.692 141.748 454.613 144.935 464.135 150.517C466.329 151.804 467.648 152.795 468.362 153.692C469.319 154.884 468.876 155.522 466.259 156.737C457.733 160.68 447.325 160.432 434.945 156.006C432.901 155.274 426.882 152.913 425.141 152.158C421.567 150.612 419.222 148.77 418.477 146.906C418.195 146.197 418.175 146.044 418.215 145.218C418.326 142.987 419.605 141.736 422.453 141.063C423.892 140.721 427.113 140.685 431.331 140.957Z" fill="white" stroke="white" stroke-width="8" />
                                    </svg>
                                </> :
                                <>
                                    <svg xmlns="http://www.w3.org/2000/svg" className='title-logo' viewBox="0 0 593 415" fill="none">
                                        <path d="M126.705 222.807C134.265 218.847 142.305 216.867 150.825 216.867C159.345 216.867 166.185 218.367 171.345 221.367C176.625 224.247 179.265 228.387 179.265 233.787C179.265 236.787 178.665 239.607 177.465 242.247C176.385 244.767 175.365 246.567 174.405 247.647C173.445 248.727 172.005 250.107 170.085 251.787C167.085 244.947 163.365 239.727 158.925 236.127C154.605 232.527 149.145 230.727 142.545 230.727C135.945 230.727 130.125 232.707 125.085 236.667C120.165 240.627 116.265 245.547 113.385 251.427C110.625 257.307 108.285 263.907 106.365 271.227C103.125 283.587 101.505 295.767 101.505 307.767C101.505 327.087 104.625 341.907 110.865 352.227C117.105 362.547 126.405 367.707 138.765 367.707C145.485 367.707 151.425 365.607 156.585 361.407C161.865 357.207 165.885 351.087 168.645 343.047C171.645 346.407 173.145 350.547 173.145 355.467C173.145 361.707 169.065 367.407 160.905 372.567C152.865 377.727 143.805 380.307 133.725 380.307C116.325 380.307 103.365 374.367 94.8449 362.487C86.3249 350.607 82.0649 335.127 82.0649 316.047C82.0649 296.607 85.7849 278.487 93.2249 261.687C101.385 243.207 112.545 230.247 126.705 222.807ZM235.081 266.907C229.441 266.907 224.521 269.067 220.321 273.387C216.241 277.587 213.181 282.927 211.141 289.407C207.301 301.407 205.381 313.587 205.381 325.947C205.381 338.187 207.901 347.967 212.941 355.287C217.981 362.607 225.001 366.267 234.001 366.267C239.761 366.267 244.741 364.167 248.941 359.967C253.141 355.647 256.261 350.247 258.301 343.767C262.141 331.407 264.061 319.167 264.061 307.047C264.061 294.807 261.481 285.087 256.321 277.887C251.281 270.567 244.201 266.907 235.081 266.907ZM225.181 379.587C212.701 379.587 203.041 374.907 196.201 365.547C189.361 356.187 185.941 344.307 185.941 329.907C185.941 321.147 187.321 312.327 190.081 303.447C192.841 294.447 196.621 286.227 201.421 278.787C206.221 271.227 212.401 265.107 219.961 260.427C227.521 255.747 235.681 253.407 244.441 253.407C256.921 253.407 266.521 258.087 273.241 267.447C280.081 276.807 283.501 288.687 283.501 303.087C283.501 317.847 280.141 331.827 273.421 345.027C266.101 359.307 256.681 369.327 245.161 375.087C238.921 378.087 232.261 379.587 225.181 379.587ZM356.753 266.907C351.113 266.907 346.193 269.067 341.993 273.387C337.913 277.587 334.853 282.927 332.813 289.407C328.973 301.407 327.053 313.587 327.053 325.947C327.053 338.187 329.573 347.967 334.613 355.287C339.653 362.607 346.673 366.267 355.673 366.267C361.433 366.267 366.413 364.167 370.613 359.967C374.813 355.647 377.933 350.247 379.973 343.767C383.813 331.407 385.733 319.167 385.733 307.047C385.733 294.807 383.153 285.087 377.993 277.887C372.953 270.567 365.873 266.907 356.753 266.907ZM346.853 379.587C334.373 379.587 324.713 374.907 317.873 365.547C311.033 356.187 307.613 344.307 307.613 329.907C307.613 321.147 308.993 312.327 311.753 303.447C314.513 294.447 318.293 286.227 323.093 278.787C327.893 271.227 334.073 265.107 341.633 260.427C349.193 255.747 357.353 253.407 366.113 253.407C378.593 253.407 388.193 258.087 394.913 267.447C401.753 276.807 405.173 288.687 405.173 303.087C405.173 317.847 401.813 331.827 395.093 345.027C387.773 359.307 378.353 369.327 366.833 375.087C360.593 378.087 353.933 379.587 346.853 379.587ZM453.405 346.647C453.405 357.927 455.685 366.147 460.245 371.307C456.525 375.627 452.385 377.787 447.825 377.787C438.465 377.787 433.785 369.867 433.785 354.027C433.785 348.147 435.945 330.627 440.265 301.467C444.585 272.307 446.745 251.367 446.745 238.647C446.745 225.807 445.485 216.867 442.965 211.827C445.845 209.187 449.565 207.867 454.125 207.867C458.805 207.867 462.165 209.307 464.205 212.187C466.245 215.067 467.265 219.387 467.265 225.147C467.265 230.787 466.665 238.047 465.465 246.927C464.265 255.807 462.645 266.667 460.605 279.507C458.685 292.347 457.245 302.727 456.285 310.647C467.805 299.607 477.765 288.927 486.165 278.607C494.565 268.167 499.305 260.727 500.385 256.287C505.305 256.287 509.205 257.067 512.085 258.627C515.085 260.187 516.585 262.167 516.585 264.567C516.585 268.527 502.845 283.287 475.365 308.847C487.005 328.527 495.405 341.487 500.565 347.727C507.765 356.487 515.025 361.407 522.345 362.487C522.225 368.367 520.665 372.507 517.665 374.907C514.785 377.187 511.905 378.327 509.025 378.327C501.585 378.327 493.365 371.367 484.365 357.447C480.165 350.847 475.905 343.827 471.585 336.387C467.265 328.947 464.205 323.727 462.405 320.727L454.305 327.927C453.705 335.487 453.405 341.727 453.405 346.647Z" fill="#111111" />
                                        <path d="M244.964 163.911C243.044 168.231 239.204 170.391 233.444 170.391C227.684 170.391 223.064 168.891 219.584 165.891C216.224 162.891 213.464 157.911 211.304 150.951C209.264 143.991 207.524 134.751 206.084 123.231H153.344C147.224 137.031 144.164 147.711 144.164 155.271C144.164 158.751 144.884 161.631 146.324 163.911C143.444 168.231 139.304 170.391 133.904 170.391C128.504 170.391 125.804 167.391 125.804 161.391C125.804 158.031 126.824 153.111 128.864 146.631C131.024 140.031 138.764 122.931 152.084 95.331C165.404 67.611 173.684 48.831 176.924 38.991C180.284 29.031 181.964 22.611 181.964 19.731C181.964 16.851 181.784 14.691 181.424 13.251C185.384 10.491 189.704 9.11097 194.384 9.11097C199.064 9.11097 202.784 10.311 205.544 12.711C208.424 14.991 210.884 19.491 212.924 26.211C215.084 32.931 217.484 50.751 220.124 79.671C222.884 108.591 226.004 129.051 229.484 141.051C232.004 149.931 237.164 157.551 244.964 163.911ZM194.384 36.471C191.624 42.951 185.924 54.951 177.284 72.471C168.644 89.991 162.464 102.831 158.744 110.991H204.824C204.224 103.431 203.204 93.591 201.764 81.471C200.444 69.231 199.544 61.491 199.064 58.251C197.624 49.731 196.064 42.471 194.384 36.471ZM294.005 19.011C294.005 25.611 291.665 44.271 286.985 74.991C282.425 105.711 280.145 127.011 280.145 138.891C280.145 150.651 282.425 158.991 286.985 163.911C283.265 168.231 279.125 170.391 274.565 170.391C265.205 170.391 260.525 162.471 260.525 146.631C260.525 140.751 262.625 123.231 266.825 94.071C271.145 64.911 273.305 43.971 273.305 31.251C273.305 18.411 272.045 9.47098 269.525 4.43098C270.845 3.35098 272.705 2.45097 275.105 1.73097C277.625 0.890973 279.785 0.470975 281.585 0.470975C285.785 0.470975 288.905 1.91097 290.945 4.79097C292.985 7.67097 294.005 12.411 294.005 19.011ZM353.45 19.011C353.45 25.611 351.11 44.271 346.43 74.991C341.87 105.711 339.59 127.011 339.59 138.891C339.59 150.651 341.87 158.991 346.43 163.911C342.71 168.231 338.57 170.391 334.01 170.391C324.65 170.391 319.97 162.471 319.97 146.631C319.97 140.751 322.07 123.231 326.27 94.071C330.59 64.911 332.75 43.971 332.75 31.251C332.75 18.411 331.49 9.47098 328.97 4.43098C330.29 3.35098 332.15 2.45097 334.55 1.73097C337.07 0.890973 339.23 0.470975 341.03 0.470975C345.23 0.470975 348.35 1.91097 350.39 4.79097C352.43 7.67097 353.45 12.411 353.45 19.011Z" fill="#111111" />
                                        <path d="M433.696 11.0782C425.1 11.7982 416.424 16.1535 411.039 22.4444C410.455 23.129 409.7 24.1086 409.348 24.6279C402.735 34.3889 400.309 51.3614 403.208 67.5313C403.771 70.6945 403.963 71.3318 406.258 78.0359C407.435 81.4469 407.949 83.654 408.623 88.0683C409.74 95.3743 410.304 104.462 410.062 111.261C409.911 115.77 409.67 116.844 407.254 124.185C404.738 131.81 404.124 134.229 403.912 137.31C403.711 140.213 404.174 142.609 405.332 144.569C406.227 146.103 408.16 148.098 410.093 149.479C412.237 151.001 419.081 154.719 422.433 156.171C429.861 159.393 437.199 161.128 446.58 161.848C449.157 162.049 455.287 162.049 456.696 161.86C462.303 161.093 466.983 159.487 469.661 157.422C471.442 156.053 471.946 154.813 472.147 151.332C472.298 148.782 472.419 147.271 472.751 143.424C473.365 136.259 473.737 133.757 474.623 130.5C475.126 128.67 475.831 127.006 477.401 123.949C480.743 117.434 484.357 111.143 491.775 98.986C496.113 91.857 498.046 88.6466 500.28 84.8225C501.378 82.9341 502.998 80.184 503.884 78.6968C508.182 71.4617 510.084 67.6494 511.353 63.66C513.255 57.6759 513.537 49.1425 512.057 42.2614C511.453 39.4523 510.557 36.9383 509.43 34.92C508.615 33.4565 506.954 31.4854 505.565 30.3287C503.371 28.4993 500.472 27.201 497.361 26.6344C495.932 26.3748 492.62 26.2803 490.97 26.4456C488.373 26.717 483.722 27.8383 483.722 28.1924C483.722 28.275 483.602 28.3694 483.451 28.4166C483.29 28.452 483.098 28.5111 483.018 28.5347C482.907 28.5583 482.786 28.3222 482.585 27.6849C482.213 26.5282 481.276 24.8994 480.471 24.0142C478.81 22.1965 476.677 21.1933 473.506 20.733C472.338 20.5559 471.312 20.5323 467.466 20.5441C461.397 20.5677 459.978 20.4143 457.502 19.4937C455.811 18.8563 454.643 18.2544 450.506 15.882C445.685 13.1201 444.497 12.5418 442.252 11.8808C439.766 11.1491 436.474 10.8422 433.696 11.0782ZM438.176 14.0644C441.497 14.4184 444.014 15.1738 447.033 16.72C447.758 17.0977 448.895 17.6524 449.58 17.9711C451.825 19.0216 453.113 19.8714 454.059 20.8864C454.522 21.4057 454.663 21.7362 454.411 21.7362C454.341 21.7362 453.848 21.9723 453.314 22.2437C446.802 25.6902 440.813 36.655 439.132 48.1864C438.79 50.5588 438.467 56.7435 438.558 59.3283C438.639 61.7479 438.981 63.0935 439.816 64.2383C440.118 64.6396 441.145 65.572 441.205 65.4894C441.215 65.4776 441.165 64.8285 441.085 64.0495C440.873 61.9958 440.793 55.9527 440.934 53.781C441.356 47.431 442.333 42.3322 444.014 37.7291C446.017 32.2408 449.036 27.9445 452.569 25.5485C453.365 25.0056 455.066 24.1322 456.042 23.7663C462.766 21.2405 470.677 21.4647 475.861 24.3446C480.099 26.6934 482.182 30.4231 482.937 36.9619C483.119 38.5317 483.088 42.9578 482.877 45.2239C482.555 48.6822 481.85 51.2906 480.381 54.4656C479.354 56.6727 478.78 57.6995 475.771 62.6331C473.596 66.1976 472.741 67.7556 471.815 69.8683C470.909 71.922 470.879 71.8512 472.278 71.1784C475.438 69.6558 479.193 64.3091 482.122 57.2038C483.008 55.0675 483.37 54.017 483.934 52.0696C485.041 48.2454 485.222 46.593 484.991 42.0844C484.699 36.4072 484.789 34.92 485.534 33.1024C486.42 30.9897 488.111 29.8212 491.473 28.995C493.023 28.6173 495.61 28.4757 496.918 28.6881C501.216 29.4081 504.538 32.2408 506.843 37.139C508.111 39.83 508.967 42.9578 509.48 46.7701C509.933 50.1103 510.024 54.017 509.702 56.0235C508.876 61.087 506.833 67.5077 504.629 71.9574C504.045 73.1377 498.318 83.9373 496.929 86.4749C493.285 93.1435 490.577 97.5342 487.245 102.232C486.36 103.459 485.293 105.017 484.86 105.69C481.951 110.21 480.26 112.335 478.508 113.692C476.807 115.014 475.408 115.014 474.221 113.704C473.264 112.642 473.224 111.485 474.059 109.538C474.563 108.381 476.566 104.616 479.092 100.107C480.34 97.8647 481.74 95.3743 482.182 94.5599C483.028 93.0255 485.132 88.9417 485.132 88.8355C485.132 88.7411 483.924 89.4847 483.431 89.8741C482.333 90.7594 481.055 92.3527 479.978 94.2058C479.616 94.8195 478.579 96.8142 477.683 98.6319C475.338 103.377 474.533 104.734 473.013 106.516C472.127 107.543 471.01 108.464 470.164 108.853C469.339 109.231 467.628 109.243 466.41 108.865C464.145 108.157 462.061 106.41 461.186 104.474C460.783 103.577 460.662 102.881 460.662 101.347C460.652 98.3486 461.477 95.15 463.4 90.6767C464.296 88.5994 464.376 88.3752 464.215 88.2335C464.074 88.1155 463.994 88.1509 463.692 88.4224C462.253 89.7561 461.337 91.6564 460.219 95.6221C459.464 98.3132 459.142 99.2692 458.639 100.261C458.136 101.276 457.149 102.456 456.525 102.798C455.378 103.424 453.727 103.353 451.009 102.586C450.093 102.326 448.513 101.913 447.486 101.653C444.769 100.969 443.53 100.414 442.655 99.4463C441.739 98.443 441.537 97.3336 441.618 93.7691C441.719 89.6617 441.356 85.6015 440.521 81.3053C440.229 79.8299 440.179 79.6765 439.997 79.7119C439.796 79.7473 439.786 79.7945 439.836 81.3407C439.937 84.4684 439.887 90.5823 439.756 91.9633C439.464 94.9848 438.84 97.1801 438.055 97.9827C437.612 98.443 436.716 98.9387 435.81 99.222C434.794 99.5289 432.176 99.5997 430.878 99.34C429.61 99.0922 428.503 98.6791 427.697 98.1598C427.063 97.7467 426.409 96.9913 426.248 96.5192C426.198 96.3657 425.956 93.4032 425.694 89.945C425.443 86.4749 425.211 83.5242 425.181 83.3708C425.151 83.1937 425.06 83.1111 424.899 83.1111C424.637 83.1111 424.557 83.3472 424.295 84.8815C424.124 85.9202 424.064 86.7582 423.933 90.2518C423.762 94.5009 423.409 95.8936 422.141 97.2863C421.004 98.5493 419.474 99.3046 418.568 99.0568C417.591 98.7853 417.138 98.0063 416.726 95.8582C416.615 95.2917 416.555 93.8045 416.484 90.0748C416.373 83.6422 416.192 82.1787 414.672 75.2032C414.34 73.6806 413.948 71.8866 413.807 71.2138C413.555 70.0925 413.525 70.0099 413.324 70.0807C413.213 70.128 413.102 70.1634 413.092 70.1752C413.082 70.187 413.203 71.8158 413.364 73.7868C414.34 85.4835 414.642 91.9987 414.36 95.0084C414.24 96.3185 413.938 98.0417 413.706 98.6673C413.535 99.1512 413.193 99.6351 413.012 99.6351C412.518 99.6351 411.774 97.3926 411.25 94.3356C411.089 93.3914 410.797 91.1016 410.596 89.2486C409.972 83.4062 409.851 82.8869 406.781 72.4295C406.298 70.8007 405.714 68.5464 405.472 67.4133C402.815 54.9377 404.134 41.0339 408.985 30.5884C410.123 28.1216 411.361 26.1977 413.062 24.2148C414.411 22.645 415.468 21.6418 417.239 20.2609C421.819 16.7082 427.103 14.6427 433.143 14.0289C434.079 13.9345 437.149 13.9581 438.176 14.0644ZM427.204 101.051C434.421 101.299 438.659 101.76 443.863 102.822C451.684 104.439 458.206 106.894 464.115 110.447C465.242 111.119 467.245 112.311 468.574 113.079C472.238 115.203 473.365 116.017 474.512 117.398C476.244 119.476 476.183 120.963 474.19 125.011C473.294 126.841 473.013 127.537 472.67 128.8C471.362 133.604 470.567 139.989 470.345 147.413C470.305 148.924 470.245 150.187 470.214 150.222C470.184 150.258 469.51 149.904 468.725 149.443C460.471 144.592 450.033 140.721 439.987 138.773C428.11 136.472 416.555 136.684 407.123 139.399L406.368 139.611L406.328 139.364C406.278 138.974 406.509 137.133 406.841 135.398C407.214 133.474 407.757 131.432 408.955 127.608C410.847 121.565 411.27 119.96 411.774 116.867C411.935 115.84 411.985 114.837 412.055 111.143C412.146 106.327 412.186 105.95 412.73 104.64C413.374 103.082 415.156 101.866 417.561 101.335C419.454 100.922 421.648 100.863 427.204 101.051ZM431.331 140.957C443.692 141.748 454.613 144.935 464.135 150.517C466.329 151.804 467.648 152.795 468.362 153.692C469.319 154.884 468.876 155.522 466.259 156.737C457.733 160.68 447.325 160.432 434.945 156.006C432.901 155.274 426.882 152.913 425.141 152.158C421.567 150.612 419.222 148.77 418.477 146.906C418.195 146.197 418.175 146.044 418.215 145.218C418.326 142.987 419.605 141.736 422.453 141.063C423.892 140.721 427.113 140.685 431.331 140.957Z" fill="#111111" stroke="#111111" stroke-width="8" />
                                    </svg>
                                </>
                        }
                    </div>
                    {/* 검색창 및 로그인 네비게이션 바 */}
                    <div className='right-nav'>
                        <div className='input-container'>
                            {/* onKeyDown = 키가 눌렸을 때 발생 */}
                            <input
                                onKeyDown={pressSearch}
                                value={inputValue}
                                onChange={changeInput}
                                style={{ backgroundColor: inputBackgroundColor }}
                                className='search-input'
                                placeholder='메뉴, 재료로 검색' />
                            <svg className="img-search" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18" width="21" height="21">
                                <path fill="currentColor" d="M3.5 8a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM8 2a6 6 0 1 0 3.65 10.76l3.58 3.58 1.06-1.06-3.57-3.57A6 6 0 0 0 8 2Z"></path>
                            </svg>
                        </div>
                        <div className='user-container'>
                            <span className='user-img-span'>
                                <svg className="user-img" data-bbox="0 0 50 50" data-type="shape" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50">
                                    <path fill={svgFill} d="M25 48.077c-5.924 0-11.31-2.252-15.396-5.921 2.254-5.362 7.492-8.267 15.373-8.267 7.889 0 13.139 3.044 15.408 8.418-4.084 3.659-9.471 5.77-15.385 5.77m.278-35.3c4.927 0 8.611 3.812 8.611 8.878 0 5.21-3.875 9.456-8.611 9.456s-8.611-4.246-8.611-9.456c0-5.066 3.684-8.878 8.611-8.878M25 0C11.193 0 0 11.193 0 25c0 .915.056 1.816.152 2.705.032.295.091.581.133.873.085.589.173 1.176.298 1.751.073.338.169.665.256.997.135.515.273 1.027.439 1.529.114.342.243.675.37 1.01.18.476.369.945.577 1.406.149.331.308.657.472.98.225.446.463.883.714 1.313.182.312.365.619.56.922.272.423.56.832.856 1.237.207.284.41.568.629.841.325.408.671.796 1.02 1.182.22.244.432.494.662.728.405.415.833.801 1.265 1.186.173.154.329.325.507.475l.004-.011A24.886 24.886 0 0 0 25 50a24.881 24.881 0 0 0 16.069-5.861.126.126 0 0 1 .003.01c.172-.144.324-.309.49-.458.442-.392.88-.787 1.293-1.209.228-.232.437-.479.655-.72.352-.389.701-.78 1.028-1.191.218-.272.421-.556.627-.838.297-.405.587-.816.859-1.24a26.104 26.104 0 0 0 1.748-3.216c.208-.461.398-.93.579-1.406.127-.336.256-.669.369-1.012.167-.502.305-1.014.44-1.53.087-.332.183-.659.256-.996.126-.576.214-1.164.299-1.754.042-.292.101-.577.133-.872.095-.89.152-1.791.152-2.707C50 11.193 38.807 0 25 0"></path>
                                </svg>
                            </span>
                            <span className='logIn'>
                                로그인
                            </span>
                        </div>
                    </div>
                </div>
            </header>
            <style jsx>{`
                .header {
                    width: 100%;
                    height: auto;
                    padding-top: 20px;
                    padding-bottom: 10px;
                    top: 0;
                    border-bottom: 0.8px solid;
                    {/* z-index: 1000; */}
                }
                .header-div {
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    width: 100%;
                    justify-content: center;
                    {/* justify-content: space-between; */}
                }
                .left-nav {
                    display: flex;
                    flex-direction: row;
                    font-size: 17px;
                    font-weight: 300;
                    margin-top: -10px;
                    {/* padding-left: 10%; */}
                }
                .left-nav span {
                    margin-right: 22px;
                    cursor: pointer;
                }
                .left-nav span:nth-child(3) {
                    margin-right: 0px;
                }
                .title-logo-div {
                    margin-left: 435px;
                    margin-right: 297px;
                }
                .title-logo {
                    width: 85px;
                    cursor: pointer;
                }
                .right-nav {
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    margin-top: -6px;
                    {/* padding-right: 10%; */}
                }
                .input-container {
                    display: flex;
                    border: none;
                    margin-top: 6px;
                    margin-right: 25px;
                }
                .search-input {
                    outline: none;
                    width: 220px;
                    height: 30px;
                    font-size: 14px;
                    padding-left: 12px;
                    padding-top: 3px;
                    padding-bottom: 3px;
                    border-radius: 10px;
                    border: none;
                }
                .img-search {
                    position: absolute;
                    margin-top: 7px;
                    margin-left: 203px;
                    color: #111111;
                    cursor: pointer;
                } 
                .user-conatiner {
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                }
                .user-img-span {
                    position: absolute;
                }
                .user-img {
                    margin-right: 20px;
                    width: 24px;
                }
                .logIn {
                    font-size: 15.5px;
                    font-weight: 300;
                    margin-left: 32px;
                }
        `}</style>
        </>
    )
}