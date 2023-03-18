import Navbar from "@/components/Navbar";
import { Ubuntu } from "next/font/google";
import Image from "next/image";
const Ubuntu400 = Ubuntu({ weight: "400", subsets: ["latin"] });

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <>
      <Navbar />
      <main className={`min-h-screen px-12 pt-36 pb-12 ${Ubuntu400.className}`}>
        <Image
          src={"/apple-touch-icon.png"}
          alt="logo"
          height={120}
          width={120}
        />
      </main>
    </>
  );
}
