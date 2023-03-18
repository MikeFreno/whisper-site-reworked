"use client";
import Navbar from "@/components/Navbar";
import GitHub from "@/icons/GitHub";
import GoogleLogo from "@/icons/GoogleLogo";
import InfoIcon from "@/icons/InfoIcon";
import { Button, Input, Link, Loading, Tooltip } from "@nextui-org/react";
import { NextPage } from "next";
import { signIn, useSession } from "next-auth/react";
import { Ubuntu } from "next/font/google";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";

const Ubuntu400 = Ubuntu({ weight: "300", subsets: ["latin"] });

const LoginPage: NextPage = () => {
  const [loginButtonLoading, setLoginButtonLoading] = useState(false);
  const [focusedElement, setFocusedElement] = useState<HTMLElement | null>(
    null
  );
  const emailLoginInputRef = useRef<HTMLInputElement | null>(null);
  const path = usePathname();
  const { data: session, status } = useSession();
  const router = useRouter();

  async function emailLogin(event: React.FormEvent<HTMLFormElement>) {
    loginButtonLoadingToggle();
    event.preventDefault();
    if (emailLoginInputRef.current) {
      const email = emailLoginInputRef.current.value;
      await signIn("email", { email });
    }
    loginButtonLoadingToggle();
  }
  async function googleLogin() {
    await signIn("google", { callbackUrl: "/" }).catch(console.log);
  }
  const githubLogin = async () => {
    await signIn("github", { callbackUrl: "/" }).catch(console.log);
  };
  const loginButtonLoadingToggle = () => {
    setLoginButtonLoading(!loginButtonLoading);
  };
  function loginSubmitButton() {
    if (loginButtonLoading) {
      return (
        <Button disabled auto bordered color="warning" css={{ px: "$13" }}>
          <Loading type="points" size="sm" />
        </Button>
      );
    } else {
      return (
        <Button shadow color="warning" auto type="submit">
          Get Link
        </Button>
      );
    }
  }

  if (status === "authenticated") {
    router.push("/account");
  }

  return (
    <div className="">
      <Navbar />
      <div className="flex h-screen justify-center pt-48">
        <div className="">
          {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
          <form onSubmit={emailLogin} className="flex flex-col px-2">
            <div className="flex flex-col py-4">
              <Input
                id="emailInput"
                ref={emailLoginInputRef}
                labelPlaceholder="Email"
                required
                clearable
                underlined
                color="warning"
                css={{ zIndex: 0 }}
              />
            </div>
            <div className="w-min">{loginSubmitButton()}</div>
            <div className="absolute ml-[100px] mt-[70px]">
              <Tooltip
                css={{ width: "180px", textAlign: "center" }}
                content={
                  "We use a password-less login system, to login/register you will receive a link in your email"
                }
              >
                <InfoIcon height={16} width={16} fill={"#000000"} />
              </Tooltip>
            </div>
          </form>
          <div className="my-2">
            <div className="rule-around mb-4 text-center">Or</div>
            <div className="-mx-2 mb-4 flex justify-around">
              <button
                className="flex flex-row rounded border border-zinc-600 bg-white px-4 py-2 hover:bg-zinc-100 active:bg-zinc-200"
                //eslint-disable-next-line @typescript-eslint/no-misused-promises
                onClick={googleLogin}
              >
                Sign in with Google
                <span className="my-auto ml-4 -mr-2">
                  <GoogleLogo height={24} width={24} />
                </span>
              </button>
              <div className="px-4"></div>

              <button
                className="flex flex-row rounded bg-zinc-900 px-4 py-2 text-white hover:bg-zinc-800 active:bg-zinc-700"
                // eslint-disable-next-line @typescript-eslint/no-misused-promises
                onClick={githubLogin}
              >
                Sign in with Github
                <span className="my-auto ml-4 -mr-2">
                  <GitHub height={24} width={24} fill={"#fff"} />
                </span>
              </button>
            </div>
          </div>
          <div className="text-center text-xs">
            By Creating an account, you agree with our{" "}
            <Link href={"/docs/terms-of-service"} className="hover:underline">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
