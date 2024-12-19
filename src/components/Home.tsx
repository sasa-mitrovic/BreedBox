import { Button } from "@mantine/core";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/nestbox/1/2"); // Example BuildingNumber and NestBoxNumber
  };

  return (
    <>
      <h1>Home!</h1>
      <Button onClick={handleNavigate}>Go to Nestbox</Button>
    </>
  );
}
