import React, { useContext } from "react";
import GitHub from "@/icons/GitHub";
import LinkedIn from "@/icons/LinkedIn";
import Envelope from "@/icons/Envelope";

const Footer = () => {
  const currentYear = new Date().getFullYear().toString();

  let copyright_tag = "2023";
  if (currentYear != "2023") {
    copyright_tag += ` - ${currentYear}`;
  }

  return (
    <div className="mx-auto h-2/5 w-screen pt-12 text-center text-zinc-800 dark:text-zinc-300">
      <ul className="icons pt-6">
        <li>
          <a
            href="https://github.com/MikeFreno/"
            target="_blank"
            rel="noreferrer"
            className="hvr-grow-rotate-left rounded-full border-zinc-800 dark:border-zinc-300"
          >
            <span className="m-auto">
              <GitHub
                height={16}
                width={16}
                stroke={undefined}
                fill={"#93c5fd"}
              />
            </span>
          </a>
        </li>
        <li>
          <a
            href="mailto:michael@freno.me"
            className="hvr-grow rounded-full border-zinc-800 dark:border-zinc-300"
          >
            <span className="m-auto">
              <Envelope height={16} width={16} />
            </span>
          </a>
        </li>
        <li>
          <a
            href="https://www.linkedin.com/in/michael-freno-176001256/"
            target="_blank"
            rel="noreferrer"
            className="hvr-grow-rotate rounded-full border-zinc-800 dark:border-zinc-300"
          >
            <span className="m-auto">
              <LinkedIn height={16} width={16} stroke={undefined} />
            </span>
          </a>
        </li>
      </ul>
      <div className="mr-6 -mt-6 flex flex-col items-end pb-12 md:mr-24 md:pb-4">
        <span className="flex text-blue-300">©{copyright_tag}</span>
        <span className="flex text-blue-300">Michael Freno</span>
      </div>
    </div>
  );
};

export default Footer;
