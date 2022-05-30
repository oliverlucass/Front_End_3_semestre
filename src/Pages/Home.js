import { Fragment } from "react"

const Home = () => {
    return (
        <Fragment>
            <div className="mt-100px" id="home"></div>
            <h1 className="display-3 text-center text-info">Saúde UNASP</h1>
            <img src="Assets/Images/banner.jpeg" className="img-fluid" alt="Banner Saúde UNASP" />
        </Fragment>
    )
}

export default Home