"use client";

import { Ubuntu } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { Loading } from "@nextui-org/react";
import { useRef, useState } from "react";
import useOnClickOutside from "@/components/ClickOutsideHook";

const Ubuntu300 = Ubuntu({ weight: "300", subsets: ["latin"] });

export default function Navbar() {
  const path = usePathname();
  const { data: session, status } = useSession();
  const [showingDropdown, setShowingDropdown] = useState<boolean>();
  const dropDownRef = useRef<HTMLDivElement>(null);
  const dropDownButtonRef = useRef<HTMLButtonElement>(null);

  const triggerDropdown = () => {
    setShowingDropdown(!showingDropdown);
  };

  useOnClickOutside([dropDownRef, dropDownButtonRef], () => {
    setShowingDropdown(false);
  });

  const showDropdown = () => {
    return (
      <div className="fixed ">
        <div
          ref={dropDownRef}
          className="rounded-lg border bg-orange-50 py-6 px-4 shadow-lg"
        >
          <div className="flex flex-col">
            <Link href={"/docs/roadmap"}>
              <button className="min-w-36 w-fit rounded-lg py-2 pl-4 pr-6 hover:bg-orange-200">
                <div className="text-left text-black">Roadmap</div>
                <div className="text-sm italic text-black">
                  What&apos;s coming next
                </div>
              </button>
            </Link>
            <Link href={"/docs/terms-of-service"}>
              <button className="min-w-36 w-fit rounded-lg py-2 pl-4 pr-6 hover:bg-orange-200">
                <div className="text-left text-black">Terms of Service</div>
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div
      className={`fixed top-0 z-50 pt-8 backdrop-blur ${Ubuntu300.className}`}
    >
      <div className="flex w-screen flex-row">
        <div className="absolute flex pl-4">
          <Image
            src="/apple-touch-icon.png"
            height={40}
            width={40}
            className="rounded-full"
            alt={"Logo"}
          />
          <div className="my-auto pl-4 text-2xl">Transcribe</div>
        </div>
        <div className="my-auto flex w-screen justify-center">
          <ul className="flex">
            <li>
              {path == "/" ? (
                <button className="rounded-lg px-4 py-2 underline underline-offset-4 hover:bg-orange-100">
                  Home
                </button>
              ) : (
                <Link href={"/"}>
                  <button className="rounded-lg px-4 py-2 text-black underline-offset-4 hover:bg-orange-100 hover:underline">
                    Home
                  </button>
                </Link>
              )}
            </li>
            <li>
              {path === "/docs/tutorial" ? (
                <button className="rounded-lg px-4 py-2 underline underline-offset-4 hover:bg-orange-100">
                  Getting Started
                </button>
              ) : (
                <Link href={"/docs/tutorial"}>
                  <button className="rounded-lg px-4 py-2 text-black underline-offset-4 hover:bg-orange-100 hover:underline">
                    Getting Started
                  </button>
                </Link>
              )}
            </li>
            <li>
              {path === "/docs/roadmap" || path === "/docs/terms-of-service" ? (
                <button
                  ref={dropDownButtonRef}
                  onClick={triggerDropdown}
                  className="rounded-lg px-4 py-2 underline underline-offset-4 hover:bg-orange-100"
                >
                  Docs
                </button>
              ) : (
                <button
                  ref={dropDownButtonRef}
                  onClick={triggerDropdown}
                  className="rounded-lg px-4 py-2 underline-offset-4 hover:bg-orange-100 hover:underline"
                >
                  Docs
                </button>
              )}
              {showingDropdown ? showDropdown() : null}
            </li>
            <li>
              {status === "authenticated" ? (
                <>
                  <Link href={"/account"}>
                    <button className="rounded-lg px-4 py-2 text-black underline-offset-4 hover:bg-orange-100 hover:underline">
                      Account
                    </button>
                  </Link>

                  <button
                    // eslint-disable-next-line @typescript-eslint/no-misused-promises
                    onClick={() => signOut()}
                    className="rounded-lg px-4 py-2 text-black underline-offset-4 hover:bg-orange-100 hover:underline"
                  >
                    Sign Out
                  </button>
                </>
              ) : status === "loading" ? (
                <div className="my-auto flex px-2">
                  <Loading size="md" />
                  <div className="absolute mt-1 ml-1">
                    <Image
                      src={"/apple-touch-icon.png"}
                      alt={"logo"}
                      width={24}
                      height={24}
                      className="rounded-full"
                    />
                  </div>
                </div>
              ) : (
                <Link href={"/account/login"}>
                  <button className="rounded-lg px-4 py-2 text-black underline-offset-4 hover:bg-orange-100 hover:underline">
                    Login
                  </button>
                </Link>
              )}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
