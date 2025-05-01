import { useSession } from "next-auth/react";

const UserStatus = () => {
  const { data: session } = useSession();

  if (!session || !session.user) {
    return null;
  }

  return (
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
  );
};

export default UserStatus;
