import { Features } from "@/components/homepage/features";
import { Faq } from "@/components/homepage/faq";
import { Footer } from "@/components/homepage/footer";
import { Header } from "@/components/homepage/header";
import { Hero } from "@/components/homepage/hero";
import { HowItWorks } from "@/components/homepage/how-it-works";
import { CallToAction, SocialProof } from "@/components/homepage/social-proof";

export default function Home() {
  return (
    <>
      <Header />
      <main id="main-content" tabIndex={-1} className="flex-1 outline-none">
        <Hero />
        <Features />
        <HowItWorks />
        <SocialProof />
        <Faq />
        <CallToAction />
      </main>
      <Footer />
    </>
  );
}
