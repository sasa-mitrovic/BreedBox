import "@mantine/core/styles.css";
import { Button, Container, MantineProvider } from "@mantine/core";
import { theme } from "./theme";
import { useDisclosure } from "@mantine/hooks";
import AddEntryModal from "./AddEntryModal";
import { Route, Routes, useNavigate } from "react-router-dom";
import Nestbox from "./Nestbox";

export default function App() {
  const [addEntryModalOpen, addEntryModal] = useDisclosure();
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate('/nestbox/1/2'); // Example BuildingNumber and NestBoxNumber
  };
  return ( 
    <MantineProvider theme={theme}>
      <Container>
          <Routes>
            <Route path="/" element={<div>Home</div>} />
            <Route path="/nestbox/:BuildingNumber/:NestBoxNumber" element={<Nestbox />} />
          </Routes>
          <Button onClick={handleNavigate}>Go to Nestbox</Button>
          <Button onClick={addEntryModal.open}>Add Entry</Button>
          <AddEntryModal opened={addEntryModalOpen} onClose={addEntryModal.close} />
        </Container>
    </MantineProvider>
  )
}
