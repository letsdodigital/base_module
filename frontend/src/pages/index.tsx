import PatientBanner from "@/components/PatientBanner";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { FC } from "react";
import { Table } from "semantic-ui-react";

const Home: FC = () => {
  const { data: session } = useSession();

  return (
    <>
      <PatientBanner name="" dob="" age="" hospitalNumber="" sex="" />
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
              <Table.HeaderCell>Blood Pressure</Table.HeaderCell>
              <Table.HeaderCell>Heart Rate</Table.HeaderCell>
              <Table.HeaderCell>Temperature</Table.HeaderCell>
              <Table.HeaderCell>Respiratory Rate</Table.HeaderCell>
              <Table.HeaderCell>Oxygen Saturation</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            <Table.Row>
              <Table.Cell>
                <Link href="/patient">John Doe</Link>
              </Table.Cell>
              <Table.Cell>45</Table.Cell>
              <Table.Cell>Male</Table.Cell>
              <Table.Cell>120/80</Table.Cell>
              <Table.Cell>72 bpm</Table.Cell>
              <Table.Cell>98.6°F</Table.Cell>
              <Table.Cell>16 breaths/min</Table.Cell>
              <Table.Cell>98%</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Jane Smith</Table.Cell>
              <Table.Cell>38</Table.Cell>
              <Table.Cell>Female</Table.Cell>
              <Table.Cell>110/70</Table.Cell>
              <Table.Cell>75 bpm</Table.Cell>
              <Table.Cell>98.4°F</Table.Cell>
              <Table.Cell>18 breaths/min</Table.Cell>
              <Table.Cell>97%</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Michael Brown</Table.Cell>
              <Table.Cell>50</Table.Cell>
              <Table.Cell>Male</Table.Cell>
              <Table.Cell>130/85</Table.Cell>
              <Table.Cell>80 bpm</Table.Cell>
              <Table.Cell>99.1°F</Table.Cell>
              <Table.Cell>15 breaths/min</Table.Cell>
              <Table.Cell>96%</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Emily Davis</Table.Cell>
              <Table.Cell>29</Table.Cell>
              <Table.Cell>Female</Table.Cell>
              <Table.Cell>115/75</Table.Cell>
              <Table.Cell>68 bpm</Table.Cell>
              <Table.Cell>98.2°F</Table.Cell>
              <Table.Cell>17 breaths/min</Table.Cell>
              <Table.Cell>99%</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Chris Wilson</Table.Cell>
              <Table.Cell>60</Table.Cell>
              <Table.Cell>Male</Table.Cell>
              <Table.Cell>125/80</Table.Cell>
              <Table.Cell>70 bpm</Table.Cell>
              <Table.Cell>98.7°F</Table.Cell>
              <Table.Cell>16 breaths/min</Table.Cell>
              <Table.Cell>95%</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </div>

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
