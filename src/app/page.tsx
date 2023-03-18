import { type NextPage } from "next";
import FileSelect from "@/components/FileSelect";
import Navbar from "@/components/Navbar";
import { Ubuntu } from "next/font/google";
import Footer from "@/components/Footer";
const Ubuntu400 = Ubuntu({ weight: "400", subsets: ["latin"] });

const Home: NextPage = () => {
  return (
    <>
      <Navbar />
      <main className={`min-h-screen px-12 pt-36 pb-12 ${Ubuntu400.className}`}>
        <div>
          <h1 className="text-center text-2xl">Transcribe your audio</h1>
        </div>
        <div>
          <p className="pt-2 text-center">
            Capable of handling the following file types:
            <br /> M4A, MP3, MP4, MPEG, MPGA, WAV and WEBM
          </p>
        </div>
        <FileSelect />
      </main>
      <Footer />
    </>
  );
};

export default Home;
