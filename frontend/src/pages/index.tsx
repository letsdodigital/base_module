import PatientBanner from "@/components/PatientBanner";
import UserStatus from "@/components/UserStatus";
import Link from "next/link";
import { FC } from "react";
import { Table } from "semantic-ui-react";

interface Patient {
  id: number;
  first_name: string;
  last_name: string;
  date_of_birth: string;
  sex: string;
}

interface HomeProps {
  patients: Patient[];
}

const Home: FC<HomeProps> = ({ patients }) => {
  return (
    <>
      <PatientBanner />
      <div
        style={{
          marginLeft: "20px",
          marginRight: "20px",
        }}
      >
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Patient Name</Table.HeaderCell>
              <Table.HeaderCell>Age</Table.HeaderCell>
              <Table.HeaderCell>Sex</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {patients.map((patient) => (
              <Table.Row key={patient.id}>
                <Table.Cell>
                  <Link href={`/patient/${patient.id}`}>
                    {patient.first_name} {patient.last_name}
                  </Link>
                </Table.Cell>
                <Table.Cell>
                  {new Date(patient.date_of_birth).toLocaleDateString(
                    "en-GB"
                  ) || "N/A"}
                </Table.Cell>
                <Table.Cell>
                  {patient.sex === "M"
                    ? "Male"
                    : patient.sex === "F"
                    ? "Female"
                    : "N/A"}
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>

      <UserStatus />
    </>
  );
};

export const getServerSideProps = async () => {
  try {
    const authHeader = `Basic ${Buffer.from(
      `${process.env.NEXT_USERNAME}:${process.env.NEXT_PASSWORD}`
    ).toString("base64")}`;

    const response = await fetch("http://nginx/api/patients/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: authHeader, // Add the Authorization header
      },
    });

    const patients = await response.json();

    return {
      props: {
        patients,
      },
    };
  } catch (error) {
    console.error("Error fetching patients:", error);
    return {
      props: {
        patients: [],
      },
    };
  }
};

export default Home;
