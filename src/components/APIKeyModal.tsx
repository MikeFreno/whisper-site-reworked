"use client";
import React, { useRef, useState } from "react";
import { Input, Button, Loading } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { api } from "@/utils/api";

export default function APIKeyModal(props: {
  requestRouter: (apiKey: string) => void;
  toggleAPIKeyModal: () => void;
  apiKeyExists: "api key exists" | "api key not found" | undefined;
}) {
  const { data: session, status } = useSession();
  const passwordKeyRef = useRef<HTMLInputElement>(null);
  const apiKeyRef = useRef<HTMLInputElement>(null);
  const [loadingIndicator, setLoadingIndicator] = useState<boolean>(false);
  const apiKeyMutation = api.main.getApiKey.useMutation();
  const [error, setError] = useState<string>("");
  const { requestRouter, toggleAPIKeyModal, apiKeyExists } = props;

  const submitState = () => {
    if (loadingIndicator) {
      return (
        <Button auto color={"primary"} type="submit">
          <Loading type="points" />
        </Button>
      );
    } else {
      return (
        <Button auto color={"primary"} type="submit">
          Submit
        </Button>
      );
    }
  };
  const getAPIKey = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (passwordKeyRef.current) {
      try {
        const apiKey = await apiKeyMutation.mutateAsync(
          passwordKeyRef.current.value
        );
        console.log(apiKey);
        requestRouter(apiKey);
        toggleAPIKeyModal();
      } catch {
        setError("bad decrypt - invalid password");
      }
    }
  };

  const submitWithAPIKey = () => {
    if (apiKeyRef.current?.value && apiKeyRef.current.value.length >= 35) {
      requestRouter(apiKeyRef.current?.value);
      toggleAPIKeyModal();
    } else {
      setError("Invalid API Key");
    }
  };

  if (apiKeyExists === "api key exists") {
    return (
      <>
        <div className="absolute z-50 h-screen w-screen backdrop-blur-sm">
          <div className="flex justify-center pt-36">
            <div className="rounded-xl bg-white px-8 py-6 shadow-lg">
              <div className="py-4">Enter your password to unlock API key</div>
              {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
              <form onSubmit={getAPIKey}>
                <Input.Password
                  underlined
                  placeholder="8 characters minimum"
                  size="lg"
                  required
                  ref={passwordKeyRef}
                />
                <div className="py-2">{submitState()}</div>
                {error !== "" ? (
                  <div className="py-2 text-center italic text-red-500">
                    {error}
                  </div>
                ) : null}
              </form>
            </div>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className="absolute z-50 h-screen w-screen backdrop-blur-sm">
          <div className="flex justify-center pt-36">
            <div className="rounded-xl bg-white px-8 py-6 shadow-lg">
              <div className="py-4">
                <div>Enter your API key</div>
                <div className="py-4">
                  <form onSubmit={submitWithAPIKey}>
                    <Input
                      underlined
                      placeholder="OpenAI API key"
                      required
                      ref={apiKeyRef}
                    />
                    <div className="py-2">{submitState()}</div>
                    {error !== "" ? (
                      <div className="py-2 text-center italic text-red-500">
                        {error}
                      </div>
                    ) : null}
                  </form>
                </div>
                <div>
                  Confused? Click here to{" "}
                  <Link
                    href={"/docs/tutorial"}
                    className="text-blue-400 underline underline-offset-4"
                  >
                    get started
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
