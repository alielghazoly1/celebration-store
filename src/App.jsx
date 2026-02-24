import "./index.css";
import Petals   from "./components/Petals";
import Navbar   from "./components/Navbar";
import Hero     from "./components/Hero";
import Countdown from "./components/Countdown";
import Details  from "./components/Details";
import LoveStory from "./components/LoveStory";
import Location from "./components/Location";
import RSVP     from "./components/RSVP";
import Footer   from "./components/Footer";
import Divider  from "./components/Divider";

export default function App() {
  return (
    <div dir="rtl">
      {/* Global ambient elements */}
      <Petals />
      <Navbar />

      <main>
        <Hero />
        <Divider icon="⏳" />
        <Countdown />
        <Divider icon="🌸" />
        <Details />
        <Divider icon="🌹" />
        <LoveStory />
        <Divider icon="📍" />
        <Location />
        <Divider icon="🎊" />
        <RSVP />
      </main>

      <Footer />
    </div>
  );
}