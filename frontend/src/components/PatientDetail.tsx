import { FC } from "react";
import { Header } from "semantic-ui-react";

interface PatientDetailProps {
  text: string | number;
}

const PatientDetail: FC<PatientDetailProps> = ({ text }) => {
  return (
    <Header
      as="h4"
      style={{
        margin: 0,
        color: "#ffffff",
        fontSize: "20px", // Consistent font size
      }}
    >
      {text}
    </Header>
  );
};

export default PatientDetail;
