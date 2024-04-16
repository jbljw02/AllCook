import { RootState } from "@/redux/store"
import { useSelector } from "react-redux"

export default function ProfileImgage() {
    const user = useSelector((state: RootState) => state.user);
    const userSubstring = (user.name).substring(0, 1);

    return (
        <>
            <div className="profile-img-container">
                <span>{userSubstring}</span>
            </div>
            <style jsx>{`
            .profile-img-container {
                display: flex;
                justify-content: center;
                align-items: center;
                font-size: 15px;
                width: 30px;
                height: 30px;
                border-radius: 50%;
                font-weight: 400;
                color: #ffffff;
                background-color: #002312;
            }
        `}</style>
        </>
    )
}