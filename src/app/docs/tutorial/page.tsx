import Navbar from "@/components/Navbar";
import { Ubuntu } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import React from "react";
const Ubuntu400 = Ubuntu({ weight: "400", subsets: ["latin"] });

export default function Tutorial() {
  return (
    <>
      <Navbar />
      <main className={`min-h-screen px-12 pt-36 pb-12 ${Ubuntu400.className}`}>
        <ul className="px-[15vw]">
          <li className="text-center">
            <div className="text-xl">Preface:</div>
            <div className="">
              If you haven&apos;t already, creating and setting up an account
              takes only a few minutes and makes future uses of this app much
              smoother, however, it is not necessary
            </div>
          </li>
          <li className="py-2">
            <div className="text-xl">Step 1:</div>
            <div className="pl-8">
              Create an account with{" "}
              <a
                href="https://platform.openai.com/overview"
                className="text-blue-400 underline underline-offset-4"
              >
                OpenAI
              </a>
            </div>
            <div className="pl-8">
              Or log in to yours if you already have one
            </div>
          </li>
          <li className="py-2">
            <div className="text-xl">Step 2:</div>
            <div className="pl-8">
              Navigate to{" "}
              <a
                href="https://platform.openai.com/account/api-keys"
                className="text-blue-400 underline underline-offset-4"
              >
                your API keys
              </a>{" "}
              and create an API key
              <br /> (if you already have one, and don&apos;t have it saved you
              can simply create a new one)
            </div>
            <div className="flex justify-center pt-2">
              <Image
                src={"/tutorial-1.jpg"}
                alt={"creating API key"}
                height={500}
                width={800}
              />
            </div>
            <div className="py-2">
              Important: for security you will not be able to see the key again,
              make sure you copy it to your clipboard
            </div>
            <div className="flex justify-center pt-2">
              <Image
                src={"/tutorial-2.jpg"}
                alt={"copy API key"}
                height={250}
                width={400}
              />
            </div>
          </li>
          <li>
            <div className="text-xl">Step 3:</div>
            <div className="pl-8">
              Now that you have your API key, navigate to{" "}
              <Link
                href={"/account"}
                className="text-blue-400 underline underline-offset-4"
              >
                here
              </Link>{" "}
              and paste your API key into the API key field.{" "}
              <div className="flex justify-center pt-2">
                <Image
                  src={"/tutorial-3.jpg"}
                  alt={"set API key"}
                  height={300}
                  width={500}
                  className=""
                />
              </div>
              You will then be prompted to create a password. This will be used
              to encrypt your key.{" "}
              <div className="flex justify-center pt-2">
                <Image
                  src={"/tutorial-4.jpg"}
                  alt={"save password"}
                  height={250}
                  width={400}
                />
              </div>
              <span className="italic">
                There will be no way to recover this, so if you lose/forget it
                you will need to create a new API key with OpenAI
              </span>
            </div>
          </li>
          <li className="">
            <div className="pl-8 pt-4">
              **If you are choose not to create an account then make sure you
              save the key some place else. Please make sure you store it in a
              place that will not be exposed to the open internet. We recommend
              you make account as we encrypt the key and are unable to decrypt
              it ourselves.
            </div>
          </li>
        </ul>
      </main>
    </>
  );
}
