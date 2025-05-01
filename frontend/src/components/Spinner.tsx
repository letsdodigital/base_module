import { Loader } from "semantic-ui-react";

const Spinner = ({ message = "Loading..." }: { message?: string }) => {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw", // Ensure it covers the full viewport width
        height: "100vh", // Ensure it covers the full viewport height
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
        margin: 0, // Remove any margin
        padding: 0, // Remove any padding
      }}
    >
      <Loader active inline="centered" size="large">
        {message}
      </Loader>
    </div>
  );
};

export default Spinner;
