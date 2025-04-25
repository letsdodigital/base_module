import PatientBanner from "@/components/PatientBanner";
import { useSession } from "next-auth/react";
import { FC } from "react";
import { Segment } from "semantic-ui-react";

const Home: FC = () => {
  const { data: session } = useSession();

  return (
    <>
      <PatientBanner
        name="John Doe"
        dob="1978-05-15"
        age={45}
        hospitalNumber="123456789"
        sex="Male"
      />

      <Segment style={{ margin: "20px", padding: "20px" }}>
        <h3>Clinic Letter</h3>
        <p>
          <strong>Date:</strong> 25 April 2025
        </p>
        <p>
          <strong>Patient Name:</strong> John Doe
        </p>
        <p>
          <strong>Hospital Number:</strong> 123456789
        </p>
        <p>
          <strong>Consultant:</strong> Dr. Jane Smith
        </p>
        <p>
          <strong>Clinic:</strong> General Medicine
        </p>

        <h4>Summary:</h4>
        <p>
          Mr. John Doe attended the General Medicine clinic today for a routine
          follow-up. His blood pressure was recorded as 120/80 mmHg, and his
          heart rate was 72 bpm. He reported no new symptoms and is tolerating
          his current medications well.
        </p>

        <h4>Plan:</h4>
        <ul>
          <li>Continue current medications.</li>
          <li>Arrange blood tests in 3 months.</li>
          <li>Follow up in 6 months.</li>
        </ul>

        <p>
          <strong>Signed:</strong> Dr. Jane Smith
        </p>
      </Segment>

      {session && session.user && (
        <div
          style={{
            position: "fixed",
            bottom: "10px",
            right: "10px",
            backgroundColor: "#003366",
            color: "#ffffff",
            padding: "10px 15px",
            borderRadius: "5px",
            boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.2)",
          }}
        >
          Logged in as: {session.user.name}
        </div>
      )}
    </>
  );
};

export default Home;
