"use client";
import { useDropzone } from "react-dropzone";

const Dropzone = ({ onDrop, accept, file }: any) => {
  // Initializing useDropzone hooks with options
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    onDrop,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    accept,
    maxFiles: 1,
  });
  return (
    <div
      className={`z-50 my-4 flex rounded-full border border-orange-300 bg-orange-100 shadow-xl hover:bg-orange-200 active:bg-orange-300`}
      {...getRootProps()}
    >
      <label
        htmlFor="upload"
        className=" flex h-48 w-48 cursor-pointer items-center justify-center"
      >
        <input className="dropzone-input" {...getInputProps()} />
        {file == null ? (
          isDragActive ? (
            <div className="-mt-12">Drop File!</div>
          ) : (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 640 512"
                height={36}
                width={36}
                fill="#60a5fa"
              >
                <path d="M383.875 512C383.813 512 383.734 512 383.656 512C375.719 511.906 369.063 505.969 368.016 498.125L320 137.281L271.984 498.125C270.938 505.969 264.281 511.906 256.344 512C256.266 512 256.188 512 256.125 512C248.281 512 241.578 506.312 240.328 498.531L192.906 202.75L159.844 434.25C158.734 441.969 152.234 447.781 144.438 448C136.562 448.156 129.844 442.75 128.313 435.125L92.125 254.219L79.172 293.062C77 299.594 70.891 304 64 304C64 304 64 304 63.984 304L15.984 303.969C7.156 303.969 0 296.781 0 287.969C0 279.125 7.172 271.969 16 271.969C16 271.969 16 271.969 16.016 271.969L52.469 272L80.828 186.938C83.109 180.062 89.453 175.344 97 176.031C104.234 176.469 110.266 181.75 111.688 188.875L141.375 337.281L176.156 93.75C177.281 85.906 183.953 80.062 191.859 80C199.781 81.125 206.547 85.656 207.797 93.469L254.656 385.75L304.141 13.875C305.203 5.938 311.984 0 320 0S334.797 5.938 335.859 13.875L385.344 385.75L432.203 93.469C433.469 85.656 441.688 80.562 448.141 80C456.047 80.062 462.719 85.906 463.844 93.75L498.625 337.281L528.313 188.875C529.734 181.75 535.766 176.469 543 176.031C550.469 175.344 556.875 180.063 559.172 186.938L587.531 272L623.984 271.969C624 271.969 624 271.969 624 271.969C632.828 271.969 640 279.125 640 287.969C640 296.781 632.844 303.969 624.016 303.969L576.016 304C576 304 576 304 576 304C569.109 304 563 299.594 560.828 293.062L547.875 254.219L511.687 435.125C510.156 442.75 503.266 448 495.562 448C487.766 447.781 481.266 441.969 480.156 434.25L447.094 202.75L399.672 498.531C398.422 506.312 391.719 512 383.875 512Z" />
              </svg>
              <span id="drop" className="text-md pl-2 text-black">
                Upload file
                <br />
                <span className="text-sm">Click or drag</span>
              </span>
            </>
          )
        ) : (
          <>
            <div>Looks Good!</div>
          </>
        )}
      </label>
    </div>
  );
};

export default Dropzone;
