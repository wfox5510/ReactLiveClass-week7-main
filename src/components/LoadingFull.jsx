import ReactLoading from "react-loading";

const LoadingFull = () => {
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(255,255,255,0.3)",
        zIndex: 1000,
      }}
    >
      <ReactLoading
        type="spinningBubbles"
        color="black"
        height={"100px"}
        width={"100px"}
      />
    </div>
  );
};

export default LoadingFull;