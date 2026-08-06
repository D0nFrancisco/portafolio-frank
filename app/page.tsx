import { Hero } from "@/components/home/Hero";
import { About } from "@/components/home/About";
import { FeaturedWork } from "@/components/home/FeaturedWork";
import { ContactCta } from "@/components/home/ContactCta";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <FeaturedWork />
      <ContactCta />
    </>
  );
}
