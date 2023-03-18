"use client";
import React, { useRef, useState } from "react";
import { api } from "@/utils/api";
import { Input, Button, Loading } from "@nextui-org/react";
import Link from "next/link";

const PasswordModal = (props: { apiKey: string }) => {
  const setApiKey = api.main.apiKeyStore.useMutation({});
  const passwordKeyRef = useRef<HTMLInputElement>(null);
  const [passwordError, setPasswordError] = useState<string>("");
  const [loadingIndicator, setLoadingIndicator] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  const apiStore = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoadingIndicator(true);
    if (passwordKeyRef.current && passwordKeyRef.current.value.length >= 8) {
      await setApiKey.mutateAsync({
        apiKey: props.apiKey,
        password: passwordKeyRef.current?.value,
      });
      setSuccess(true);
    } else {
      setPasswordError("Password too short");
    }
    setLoadingIndicator(false);
  };
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
          Set
        </Button>
      );
    }
  };
  return (
    <div className="absolute z-50 h-screen w-screen backdrop-blur-sm">
      <div className="flex justify-center pt-36">
        <div className="rounded-xl bg-white px-8 py-6 shadow-lg">
          {!success ? (
            <>
              <div className="py-4">
                Enter a password to encrypt you're API key
              </div>
              <form onSubmit={apiStore}>
                <Input.Password
                  underlined
                  placeholder="8 characters minimum"
                  size="lg"
                  required
                  ref={passwordKeyRef}
                />
                <div className="py-2">
                  {submitState()}
                  {passwordError !== "" ? (
                    <div className="italic text-red-500">{passwordError}</div>
                  ) : null}
                  <div className="pt-2 text-center text-sm italic">
                    This will unlock you API key on future use
                    <br />
                    It is not recoverable if lost
                  </div>
                </div>
              </form>
            </>
          ) : (
            <>
              <div className="text-lg">Success!</div>
              <div>
                Click{" "}
                <Link
                  href={"/"}
                  className="text-blue-400 underline underline-offset-4"
                >
                  Here
                </Link>{" "}
                to start transcribing!
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PasswordModal;
