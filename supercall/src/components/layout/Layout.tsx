import Navbar from "./Navbar";
import Footer from "./Footer";
import { JSX } from "solid-js";
import { Box, Container } from "@hope-ui/solid";

interface LayoutProps {
  children: JSX.Element;
}

export default function Layout(props: LayoutProps) {
  return (
    <Container centerContent>
      <Navbar />
      <Box class="py-4 px-6 w-full">
        <Box class="w-full">{props.children}</Box>
      </Box>
      <Footer />
    </Container>
  );
}
