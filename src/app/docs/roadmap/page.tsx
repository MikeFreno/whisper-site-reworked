import Navbar from "@/components/Navbar";
import { type NextPage } from "next";
import { Ubuntu } from "next/font/google";

const Ubuntu400 = Ubuntu({ weight: "400", subsets: ["latin"] });

const Roadmap: NextPage = () => {
  return (
    <>
      <Navbar />
      <main
        className={`min-h-screen px-12 pt-36 pb-12 ${Ubuntu400.className}`}
      ></main>
    </>
  );
};
export default Roadmap;
