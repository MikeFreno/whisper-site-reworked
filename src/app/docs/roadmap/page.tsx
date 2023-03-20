import Navbar from "@/components/Navbar";
import { type NextPage } from "next";
import { Ubuntu } from "next/font/google";
import Link from "next/link";

const Ubuntu400 = Ubuntu({ weight: "400", subsets: ["latin"] });

const Roadmap: NextPage = () => {
  return (
    <>
      <Navbar />
      <main className={`min-h-screen px-12 pt-36 pb-12 ${Ubuntu400.className}`}>
        <div className="py-12 text-center text-xl">Roadmap</div>
        <div className="py-4 text-center">
          <div className="pb-2 text-lg">Current Features: </div>
          <div>
            Transcription of audio of nearly any language, full list{" "}
            <Link
              className="text-blue-400 underline underline-offset-4"
              href="https://platform.openai.com/docs/guides/speech-to-text/supported-languages"
            >
              here
            </Link>
          </div>
          <div>Translation of audio to English transcript</div>
          <div>File size max of 25mb</div>
          <div>Storage/encryption of users&apos; OpenAI&apos;s API keys.</div>
        </div>
        <ul className="py-4 pt-12">
          <ol className="px-12">
            <div className="text-lg">
              1. Processing of files larger than 25mb.
            </div>
            <p className="px-2">
              This is not supported by OpenAI and will require processing of the
              audio on our server, instead of being done entirely on client side
              and OpenAI&apos;s end. For this reason, it will not be free, but
              will be a nominal amount to reduce potential server strain.
              Likely, $0.02 / chunk (a chunk being 25mb)
            </p>
          </ol>
          <ol className="px-12 py-4">
            <div className="text-lg">2. Splitting audio by speaker.</div>
            <p className="px-2">
              As with the above, this will require processing on our servers,
              and therefore run a cost. A likely price point is not ready yet.
            </p>
          </ol>
          <ol className="px-12 py-4">
            <div className="text-lg">3. Hosted keys.</div>
            <p className="px-2">
              To simplify the use and billing of this site, we will make it so
              users do not need to supply API keys. This will be most useful for
              those already using other paid features. So that don&apos;t have
              to cover billing to OpenAI and us.
            </p>
          </ol>
          <ol className="px-12 py-4">
            <div className="text-lg">4. More translation output options.</div>
            <p className="px-2">
              Currently, OpenAI's API does not support translation outputs other
              than English. This may change soon and for that reason this is not
              a priority. When all other goals are achieved, and the option
              provided by OpenAI's API is still not launched, we will spin up a
              container to achieve this. As we do not have the scale of OpenAI
              or their relationship with Microsoft Azure, this will be expensive
              to use in relative terms, for this reason, this is not our
              preferred path. We do currently already have this capability, and
              it can be implemented immediately, however, payments are not yet
              live, and such this will not be implemented at earliest until
              then.
            </p>
          </ol>
          <ol className="px-12 py-4">
            <div className="text-lg">5. Better mobile support</div>
            <p className="px-2">
              Non-priority, but shouldn't take long, so may be done earlier than
              preceding goals.
            </p>
          </ol>
        </ul>
      </main>
    </>
  );
};
export default Roadmap;
