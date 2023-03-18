"use client";

import SpinIcon from "@/icons/SpinIcon";
import SpinnerIcon from "@/icons/SpinnerIcon";
import { useCallback, useRef, useState } from "react";
import Dropzone from "./Dropzone";
import CopyIcon from "@/icons/CopyIcon";
import { Checkbox } from "@nextui-org/react";
import LongArrow from "@/icons/LongArrow";
import { api } from "@/utils/api";
import APIKeyModal from "@/components/APIKeyModal";

export default function FileSelect() {
  const [file, setFile] = useState<File | Blob | null>(null);
  const [fileRejected, setFileRejected] = useState<boolean>(false);
  const [fileUploading, setFileUploading] = useState<boolean>(false);
  const [uploadProgress, setUploadProgress] = useState<boolean>(false);
  const [output, setOutput] = useState<string>("");
  const dataArea = useRef<HTMLTextAreaElement | null>(null);
  const [fileProcessed, setFileProcessed] = useState<boolean>(false);
  const [fileData, setFileData] = useState<string | ArrayBuffer | null>(null);
  const [processReport, setProcessReport] = useState<string>("");
  const [requestingTranslate, setRequestingTranslate] =
    useState<boolean>(false);
  const [fullPath, setFullPath] = useState<string>("");
  const [apiKey, setAPIKey] = useState<string>("");
  const [apiKeyModal, setAPIKeyModal] = useState<boolean>(false);

  const fileUploadMutation = api.main.uploadFile.useMutation();

  const handleFileDrop = useCallback((acceptedFiles: File[]) => {
    acceptedFiles.forEach((file: File) => {
      const ext = file.type.split("/")[1];
      if (
        ext === "m4a" ||
        ext === "mp3" ||
        ext === "mp4" ||
        ext === "mpeg" ||
        ext === "mpga" ||
        ext === "wav" ||
        ext === "webm"
      ) {
        setFile(file);
        setFileRejected(false);
        const reader = new FileReader();
        reader.onload = () => {
          const str = reader.result;
          setFileData(str);
        };
        reader.readAsDataURL(file);
      } else {
        setFile(null);
        setFileRejected(true);
      }
    });
  }, []);

  const buttonState = () => {
    if (file !== null) {
      if (fileUploading) {
        return (
          <div className="flex justify-center pt-4">
            <button
              disabled
              className="flex rounded bg-blue-400 px-4 py-2 hover:bg-blue-500 active:bg-blue-600"
            >
              <div className="text-white">Loading...</div>
            </button>
          </div>
        );
      } else {
        return (
          <div className="flex justify-center pt-4">
            <button
              className="flex rounded bg-blue-400 px-4 py-2 hover:bg-blue-500 active:bg-blue-600"
              //  eslint-disable-next-line @typescript-eslint/no-misused-promises
              onClick={toggleAPIKeyModal}
            >
              <SpinIcon height={24} width={24} fill={"#fb923c"} />
              <div className="pl-2 text-white">
                {requestingTranslate ? "Translate!" : "Transcribe!"}
              </div>
            </button>
          </div>
        );
      }
    }
  };

  const requestRouter = async () => {
    if (requestingTranslate) {
      await requestTranslation();
    } else {
      await requestTranscription();
    }
  };
  const apiKeySetter = (apiKey: string) => {
    setAPIKey(apiKey);
    sendFileToServer();
  };
  const translationToggle = () => {
    setRequestingTranslate(!requestingTranslate);
  };

  const sendFileToServer = async () => {};

  const toggleAPIKeyModal = () => {
    setAPIKeyModal(!apiKeyModal);
  };

  const requestTranscription = async () => {
    if (file) {
      const formData = new FormData();
      formData.append("file", file.name);
      formData.append("model", "whisper-1");
      const res = await fetch(
        "https://api.openai.com/v1/audio/transcriptions",
        {
          method: "POST",
          headers: {
            Authorization: "Bearer TOKEN",
          },
          body: formData,
        }
      );
      console.log(res);
    }
  };
  const requestTranslation = async () => {
    if (file) {
      const formData = new FormData();
      formData.append("file", file.name);
      formData.append("model", "whisper-1");
      const res = await fetch("https://api.openai.com/v1/audio/translations", {
        method: "POST",
        headers: {
          Authorization: "Bearer TOKEN",
        },
        body: formData,
      });
      console.log(res);
    }
  };
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  const copyToClipboard = async () => {
    if (dataArea.current) {
      await navigator.clipboard.writeText(dataArea.current.value);
    }
  };
  const saveAsTextFile = () => {
    if (dataArea.current) {
      const toSave = dataArea.current.value;
      const blob = new Blob([toSave], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "my-transcript.txt";
      a.click();
    }
  };

  return (
    <>
      {apiKeyModal ? (
        <APIKeyModal
          apiKeySetter={apiKeySetter}
          toggleAPIKeyModal={toggleAPIKeyModal}
        />
      ) : null}
      <div className="flex justify-center rounded-full pt-4">
        <div className="">
          <Dropzone
            onDrop={handleFileDrop}
            acceptedFiles={
              "audio/m4a, audio/mp3, audio/mp4, audio/mpeg, audio/mpga, audio/wav, audio/webm"
            }
            preSet={null}
            file={file}
          />
        </div>
      </div>
      <div className="text-center">
        {fileRejected ? (
          "File type rejected"
        ) : file == null ? (
          "No file selected..."
        ) : (
          <div className="underline underline-offset-[6px]">{file.name}</div>
        )}
      </div>
      {/* <div className="flex flex-col items-center pt-6">
        <div className="">Non-english input? Select audio language</div>
        <div className="animate-up-down pt-2">
          <div className="rotate-90">
            <LongArrow
              height={24}
              width={24}
              stroke={"#18181b"}
              strokeWidth={1.5}
            />
          </div>
        </div>
      </div>
      <LanguageSelect data={languages} />
      <datalist id="input-options"></datalist>
      <div className="flex flex-col items-center pt-6">
        <div className="">Need Translation? Select Output language</div>
        <div className="animate-up-down pt-2">
          <div className="rotate-90">
            <LongArrow
              height={24}
              width={24}
              stroke={"#18181b"}
              strokeWidth={1.5}
            />
          </div>
        </div>
      </div>
      <LanguageSelect data={languages} /> */}
      {file ? (
        <div className="flex justify-center">
          <div className="flex flex-col items-center">
            <div className="pt-4">Need Translation? Check the box below</div>
            <div className="text-sm">
              ( Currently only audio to English translation is supported )
            </div>
            <div className="animate-up-down pt-2">
              <div className="rotate-90">
                <LongArrow
                  height={24}
                  width={24}
                  stroke={"#18181b"}
                  strokeWidth={1.5}
                />
              </div>
            </div>
            <div className="py-4">
              <Checkbox onChange={translationToggle} css={{ zIndex: 0 }} />
            </div>
          </div>
        </div>
      ) : null}
      {buttonState()}
      {fileUploading ? (
        <>
          <div className="my-4 flex justify-center">
            <div className="animate-spinner">
              <SpinnerIcon height={64} width={64} fill={"#60a5fa"} />
            </div>
          </div>
          {uploadProgress ? (
            <div className="text-center italic">{processReport}</div>
          ) : (
            <div className="text-center italic">File uploading...</div>
          )}
        </>
      ) : null}
      {uploadProgress || fileProcessed ? (
        <>
          <div className="flex justify-center pt-8">
            <textarea
              ref={dataArea}
              id="output"
              className="flex w-3/4 rounded-md py-4 pl-6 pr-12 shadow-lg lg:w-1/2"
              placeholder="output will appear here"
              rows={10}
              onChange={(e) => setOutput(e.target.value)}
              value={output}
            />
            <button
              className="absolute mt-2 ml-[55vw] lg:ml-[44vw]"
              // eslint-disable-next-line @typescript-eslint/no-misused-promises
              onClick={copyToClipboard}
            >
              <CopyIcon width={24} height={24} fill={"#60a5fa"} />
            </button>
          </div>
          <div className="rule-around my-4 mx-auto w-3/4 lg:w-1/2">Or</div>
          <div className="flex justify-center">
            <button
              className="rounded-lg bg-blue-400 px-6 py-4 text-xl text-white hover:bg-blue-500 active:bg-blue-600"
              onClick={saveAsTextFile}
            >
              Save as Text File
            </button>
          </div>
        </>
      ) : null}
    </>
  );
}
