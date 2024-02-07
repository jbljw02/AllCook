import Header from "../components/Header"
import Footer from "../components/Footer"

export default function Recipe() {

    return (
        <div className="container">
            <Header
                backgroundColor="#ffffff"
                color="#111111"
                borderColor="#e8e8e8"
                svgFill="#000000"
                lightLogo={false}
                inputBackgroundColor="#f2f2f2"
            />
            <Footer />
        </div>
    )
}