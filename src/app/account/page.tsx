"use client";
import Navbar from "@/components/Navbar";
import { NextPage } from "next";
import { useSession } from "next-auth/react";
import { Ubuntu } from "next/font/google";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { Button, Input, Link, Loading, Tooltip } from "@nextui-org/react";
import PasswordModal from "@/components/PasswordModal";
import { api } from "@/utils/api";

const Ubuntu400 = Ubuntu({ weight: "400", subsets: ["latin"] });

const AccountPage: NextPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const apiKeyRef = useRef<HTMLInputElement | null>(null);
  const [passwordModalShowing, setPasswordModalShowing] =
    useState<boolean>(false);
  const [apiKey, setApiKey] = useState<string>("");
  const [apiKeyPass, setApiKeyPass] = useState<boolean>(true);
  const apiKeyStored = api.main.checkIfApiKeyExists.useQuery().data;

  if (status === "unauthenticated") {
    router.push("/account/login");
  }

  const processKey = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (apiKeyRef.current && apiKeyRef.current.value.length >= 40) {
      setApiKey(apiKeyRef.current?.value);
      togglePasswordInputModal();
    } else {
      setApiKeyPass(false);
    }
  };
  const togglePasswordInputModal = () => {
    setPasswordModalShowing(!passwordModalShowing);
  };

  return (
    <>
      <Navbar />
      {passwordModalShowing ? <PasswordModal apiKey={apiKey} /> : null}
      <main className={`min-h-screen px-12 pt-36 pb-12 ${Ubuntu400.className}`}>
        <div className="flex justify-center">
          <div className="flex flex-col">
            <div className="pb-12">
              Logged in as:
              <br />
              <span className="italic underline underline-offset-4">
                {session?.user?.email}
              </span>
            </div>
            {apiKeyStored === "api key exists" ? (
              <div className="pb-12">
                You have a stored API key, you may overwrite it if needed.
                <br /> i.e. in case of lost password
              </div>
            ) : null}
            <form onSubmit={processKey}>
              <Input
                ref={apiKeyRef}
                labelPlaceholder="OpenAI API Key"
                required
                clearable
                underlined
                status={apiKeyPass ? "warning" : "error"}
                css={{ zIndex: 0 }}
              />
              <div className="py-2">
                <Button
                  shadow
                  color="warning"
                  auto
                  type="submit"
                  css={{ zIndex: 0 }}
                >
                  Set Key
                </Button>
              </div>
            </form>
            <div className="py-4">
              Currently only one stored api key is supported
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default AccountPage;
