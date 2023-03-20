"use client";

import SpinIcon from "@/icons/SpinIcon";
import SpinnerIcon from "@/icons/SpinnerIcon";
import { useCallback, useRef, useState } from "react";
import Dropzone from "./Dropzone";
import CopyIcon from "@/icons/CopyIcon";
import { Checkbox } from "@nextui-org/react";
import LongArrow from "@/icons/LongArrow";
import APIKeyModal from "@/components/APIKeyModal";

export default function FileSelect() {
  const [file, setFile] = useState<File | Blob | null>(null);
  const [fileRejected, setFileRejected] = useState<boolean>(false);
  const [output, setOutput] = useState<string>("");
  const dataArea = useRef<HTMLTextAreaElement | null>(null);
  const [requestingTranslate, setRequestingTranslate] =
    useState<boolean>(false);
  const [apiKeyModal, setAPIKeyModal] = useState<boolean>(false);
  const [fileProcessing, setFileProcessing] = useState<boolean>(false);
  const [complete, setComplete] = useState<boolean>(false);
  const [fileTooLarge, setFileTooLarge] = useState<boolean>(false);
  const [fileSize, setFileSize] = useState<number | null>(null);

  const handleFileDrop = useCallback((acceptedFiles: File[]) => {
    acceptedFiles.forEach((file: File) => {
      const ext = file.type.split("/")[1];
      if (
        ext === "x-m4a" ||
        ext === "x-wav" ||
        ext === "m4a" ||
        ext === "mp3" ||
        ext === "mp4" ||
        ext === "mpeg" ||
        ext === "mpga" ||
        ext === "wav" ||
        ext === "webm"
      ) {
        const thisFileSize = file.size / 1000000;
        setFileSize(thisFileSize);
        console.log(fileSize);
        if (thisFileSize <= 25) {
          setFile(file);
          setFileRejected(false);
          setFileTooLarge(false);
        } else {
          setFile(null);
          setFileTooLarge(true);
        }
      } else {
        setFile(null);
        setFileRejected(true);
      }
    });
  }, []);

  const buttonState = () => {
    if (file !== null) {
      if (fileProcessing) {
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

  const toggleAPIKeyModal = () => {
    setAPIKeyModal(!apiKeyModal);
  };

  // const sendFileToServer = async () => {
  //   setFileUploading(true);
  //   const uuidString = uuidv4();
  //   setUuid(uuidString);
  //   if (file) {
  //     const res = await fetch(`/api/upload?name=${uuidString}-${file.name}`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         base64: fileData,
  //       }),
  //     });
  //     console.log(res);
  //     if (res.status === 200) {
  //       setUploadProgress(true);
  //       setProcessReport("File uploaded, processing...");
  //       await requestRouter();
  //     }
  //     // if(res == "file upload successful"){

  //     // }
  //     // requestRouter();
  //   }
  // };

  const requestRouter = async (apiKey: string) => {
    console.log(apiKey);
    if (requestingTranslate) {
      setFileProcessing(true);
      await requestTranslation(apiKey);
    } else {
      setFileProcessing(true);
      await requestTranscription(apiKey);
    }
  };

  const translationToggle = () => {
    setRequestingTranslate(!requestingTranslate);
  };

  const requestTranscription = async (apiKey: string) => {
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("model", "whisper-1");
      formData.append("response_format", "text");
      const res = await fetch(
        "https://api.openai.com/v1/audio/transcriptions",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${apiKey}`,
          },
          body: formData,
        }
      );
      if (res.body) {
        const reader = res.body.getReader();

        const decoder = new TextDecoder();
        let data = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          data += decoder.decode(value);
        }
        setOutput(data);
      } else {
        alert("Error processing!");
      }
      setComplete(true);
      console.log(res);
      setFileProcessing(false);
    }
  };
  const requestTranslation = async (apiKey: string) => {
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("model", "whisper-1");
      formData.append("response_format", "text");
      const res = await fetch("https://api.openai.com/v1/audio/translations", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
        body: formData,
      });
      if (res.body) {
        const reader = res.body.getReader();

        const decoder = new TextDecoder();
        let data = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          data += decoder.decode(value);
        }
        setOutput(data);
      } else {
        alert("Error processing!");
      }
      setComplete(true);
      console.log(res);
      setFileProcessing(false);
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
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          requestRouter={requestRouter}
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
        {file === null ? (
          fileRejected ? (
            "File type rejected"
          ) : fileTooLarge && fileSize ? (
            `File size too large! File size: ${fileSize}mb, Current max: 25mb`
          ) : (
            "No file selected..."
          )
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
            <div className="pb-1 text-sm">
              ( Currently only audio to English translation is supported )
            </div>
            <div className="animate-up-down py-1">
              <div className="rotate-90">
                <LongArrow
                  height={24}
                  width={24}
                  stroke={"#18181b"}
                  strokeWidth={1.5}
                />
              </div>
            </div>
            <div className="pb-4">
              <Checkbox onChange={translationToggle} css={{ zIndex: 0 }} />
            </div>
          </div>
        </div>
      ) : null}
      {buttonState()}
      {fileProcessing || complete ? (
        <>
          {fileProcessing ? (
            <>
              <div className="my-4 flex justify-center">
                <div className="animate-spinner">
                  <SpinnerIcon height={64} width={64} fill={"#60a5fa"} />
                </div>
              </div>
              <div className="text-center italic">File processing...</div>
            </>
          ) : null}
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
