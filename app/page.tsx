import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Specs from "@/components/Specs";
import Newsletter from "@/components/Newsletter";
import Chatbot from "@/components/Chatbot";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Features />
        <Specs />
        <Newsletter />
      </main>
      <footer className="border-t border-border-subtle bg-bg-primary px-6 py-8 text-center">
        <p className="text-sm text-text-muted">
          © 2026 HeliCorp. All rights reserved.
        </p>
      </footer>
      <Chatbot />
    </>
  );
}
