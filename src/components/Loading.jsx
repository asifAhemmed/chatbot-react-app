import LoadingSpinner from "../assets/loading-spinner.gif";

const Loading = () => {
    return (
        <div className="loading-container">
            <img src={LoadingSpinner} alt="LoadingSpinner" />
        </div>
    );
};

export default Loading;