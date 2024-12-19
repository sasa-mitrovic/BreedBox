import "@mantine/core/styles.css";
import { Container, MantineProvider } from "@mantine/core";
import { theme } from "./theme";
import AppRoutes from "./routes";

export default function App() {
  return (
    <MantineProvider theme={theme}>
      <Container>
        {/* Main Layout Components Could Go Here */}
        {/* For example, a NavBar or a Header if needed */}

        <AppRoutes />
      </Container>
    </MantineProvider>
  );
}
