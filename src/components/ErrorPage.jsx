import { Link } from "react-router-dom";


const ErrorPage = () => {
    return (
        <div className="p-4 m-4">
            <h2>Oops!!! </h2>
           <Link to="/">Go back to home</Link>
        </div>
    );
};

export default ErrorPage;