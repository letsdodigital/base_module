import { Loader } from "semantic-ui-react";

const Spinner = ({ message = "Loading..." }: { message?: string }) => {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
      }}
    >
      <Loader active inline="centered" size="large">
        {message}
      </Loader>
    </div>
  );
};

export default Spinner;
