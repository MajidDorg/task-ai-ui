import SectionFeatures from "./components/sections/SectionFeatures";
import SectionTryNow from "./components/sections/SectionTryNow";
import SectionFooterCta from "./components/sections/SectionFooterCta";
import Header from "./components/Header";
import Hero from "./components/Hero";

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      {/* New sections */}
      <SectionFeatures />
      <SectionTryNow />
      <SectionFooterCta />
    </main>
  );
}
