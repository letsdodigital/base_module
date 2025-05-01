import PatientBanner from "@/components/PatientBanner";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { FC } from "react";

interface Patient {
  id: number;
  first_name: string;
  last_name: string;
  date_of_birth: string;
  sex: string;
  address: string;
  phone_number: string;
}

interface PatientProps {
  patient: Patient | null;
}

const PatientPage: FC<PatientProps> = ({ patient }) => {
  const router = useRouter();

  if (!patient) {
    return <div>Patient not found</div>;
  }

  return (
    <>
      <PatientBanner
        name={`${patient.first_name} ${patient.last_name}`}
        dob={new Date(patient.date_of_birth).toLocaleDateString("en-GB")}
        sex={patient.sex === "M" ? "Male" : "Female"}
      />
      <div style={{ margin: "20px" }}>
        <p>
          <strong>Address:</strong> {patient.address}
        </p>
        <p>
          <strong>Phone Number:</strong> {patient.phone_number}
        </p>
        <button onClick={() => router.push("/")}>Back to Patients List</button>
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params!;

  try {
    const authHeader = `Basic ${Buffer.from(
      `${process.env.NEXT_USERNAME}:${process.env.NEXT_PASSWORD}`
    ).toString("base64")}`;

    const response = await fetch(
      `http://backend-database:8000/api/patients/${id}/`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: authHeader,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch patient");
    }

    const patient = await response.json();

    return {
      props: {
        patient,
      },
    };
  } catch (error) {
    console.error("Error fetching patient:", error);
    return {
      props: {
        patient: null,
      },
    };
  }
};

export default PatientPage;
