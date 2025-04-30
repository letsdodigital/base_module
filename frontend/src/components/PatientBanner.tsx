import PatientDetail from "@/components/PatientDetail";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { FC } from "react";
import { Button, Dropdown, Grid, Input, Segment } from "semantic-ui-react";
interface PatientBannerProps {
  name?: string;
  dob?: string;
  age?: number | "";
  hospitalNumber?: string;
  sex?: "Male" | "Female";
}

const PatientBanner: FC<PatientBannerProps> = ({
  name = "",
  dob = "",
  age = "",
  hospitalNumber = "",
  sex = "",
}) => {
  const { data: session } = useSession();
  return (
    <Segment
      inverted
      color="blue"
      style={{
        padding: "20px",
        backgroundColor: "#d0e7ff",
        color: "#003366",
        borderRadius: "0px",
      }}
    >
      <Grid verticalAlign="top">
        <Grid.Column width={2}>
          <Dropdown
            pointing="top left"
            trigger={
              <Button
                style={{
                  backgroundColor: "#003366",
                  color: "#ffffff",
                  borderRadius: "5px",
                  padding: "12px",
                  boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.2)",
                  height: "50px",
                  width: "50px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {/* Custom Icon for Wider Bars */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "4px",
                  }}
                >
                  <div
                    style={{
                      width: "20px",
                      height: "3px",
                      backgroundColor: "#ffffff",
                      borderRadius: "2px",
                    }}
                  ></div>
                  <div
                    style={{
                      width: "20px",
                      height: "3px",
                      backgroundColor: "#ffffff",
                      borderRadius: "2px",
                    }}
                  ></div>
                  <div
                    style={{
                      width: "20px",
                      height: "3px",
                      backgroundColor: "#ffffff",
                      borderRadius: "2px",
                    }}
                  ></div>
                </div>
              </Button>
            }
            icon={null}
          >
            <Dropdown.Menu>
              <Dropdown.Item
                text={session ? `${session.user?.name}` : "Not signed in"}
                disabled
              />
              <Dropdown.Divider />
              <Dropdown.Item>
                <Dropdown.Item>
                  <Link
                    href="/"
                    style={{ color: "inherit", textDecoration: "none" }}
                  >
                    Home
                  </Link>
                </Dropdown.Item>
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item
                text={session ? "Sign Out" : "Sign In"}
                onClick={() => (session ? signOut() : signIn())}
              />
            </Dropdown.Menu>
          </Dropdown>
        </Grid.Column>

        <Grid.Column width={11} verticalAlign="middle">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0px 20px",
              flexWrap: "wrap",
            }}
          >
            <PatientDetail text={name} />
            <PatientDetail text={dob} />
            <PatientDetail text={age} />
            <PatientDetail text={sex} />
            <PatientDetail text={hospitalNumber} />
          </div>
        </Grid.Column>

        <Grid.Column width={3} textAlign="right">
          <Input
            icon="search"
            placeholder="Search..."
            style={{
              width: "100%",
            }}
          />
        </Grid.Column>
      </Grid>
    </Segment>
  );
};

export default PatientBanner;
