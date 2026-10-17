import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Work from "@/components/Work";
import Lab from "@/components/Lab";
import Stack from "@/components/Stack";
import Research from "@/components/Research";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <>
      <Nav />
      <main id="main-content" tabIndex={-1}>
        <Hero />
        <Research />
        <Work />
        <Stack />
        <Lab />
      </main>
      <Contact />
    </>
  );
}
