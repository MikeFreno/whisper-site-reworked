"use client";

import React, { useRef } from "react";
import { api } from "@/utils/api";

const PasswordModal = (props: { apiKey: string }) => {
  const setApiKey = api.main.apiKeyStore.useMutation({});
  const passwordKeyRef = useRef<HTMLInputElement>(null);

  const apiStore = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setApiKey.mutateAsync({
      apiKey: props.apiKey,
      password: "",
    });
  };

  return <div className="">PasswordModal</div>;
};

export default PasswordModal;
