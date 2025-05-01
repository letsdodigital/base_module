import Link from "next/link";
import { useRouter } from "next/router";
import { Icon } from "semantic-ui-react";

const Home = () => {
  const router = useRouter();

  // Only show the home icon if the current page is not the home page
  if (router.pathname === "/") {
    return null;
  }

  return (
    <Link href="/">
      <Icon
        name="home"
        size="big" // Adjust size as needed
        style={{
          marginTop: "15px",
          marginLeft: "8px",
          color: "#003366",
          cursor: "pointer",
        }}
      />
    </Link>
  );
};

export default Home;
