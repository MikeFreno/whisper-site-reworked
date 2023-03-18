import Navbar from "@/components/Navbar";
import { type NextPage } from "next";
import { Ubuntu } from "next/font/google";

const Ubuntu400 = Ubuntu({ weight: "400", subsets: ["latin"] });

const ToS: NextPage = () => {
  return (
    <>
      <Navbar />
      <main className={`min-h-screen px-12 pt-36 pb-12 ${Ubuntu400.className}`}>
        <h1 className="text-xl">Terms of Service</h1>{" "}
        <p>Last Updated: March 18, 2023</p>
        <p className="py-4 pl-4">
          Welcome. This website provides a graphical user interface for
          OpenAI&apos;s Whisper API and allows users to securely store API keys
          and sign in with email or through third-party OAuth providers
          (collectively, the &quot;Services&quot;). Additionally, it adds
          additional functionality on top of OpenAI&apos;s Whisper API By using
          our Services, you agree to be bound by these Terms of Service
          (&quot;Terms&quot;), our Privacy Policy, and any additional terms
          applicable to certain features or content. If you do not agree to
          these Terms, you must not use our Services.{" "}
        </p>
        <ul className="p-4">
          <li className="pl-4">
            <div className="-ml-4 py-2 text-lg">Eligibility</div> By using the
            Services, you represent and warrant that you are at least 18 years
            old and have the legal capacity to enter into these Terms. If you
            are under the age of 18, you must obtain the consent of your parent
            or legal guardian before using the Services.
          </li>
          <li className="pl-4">
            <div className="-ml-4 py-2 text-lg">Account Registration</div>To
            access and use the Services, you must create an account. You may
            create an account using your email address or through a third-party
            OAuth provider, such as GitHub or Google. When registering, you
            agree to provide accurate, current, and complete information about
            yourself. You are responsible for maintaining the confidentiality of
            your account credentials and for any activities that occur under
            your account.
          </li>{" "}
          <li className="pl-4">
            <div className="-ml-4 py-2 text-lg">User Content</div>You are solely
            responsible for the data, information, and content you submit, post,
            or transmit through the Services, including any API keys you store
            on our Website (&quot;User Content&quot;). By using the Services,
            you grant us a non-exclusive, worldwide, royalty-free,
            sublicensable, and transferable license to use, reproduce, display,
            and transmit your User Content solely for the purpose of providing
            the Services to you. Acceptable Use You agree not to use the
            Services for any unlawful or prohibited purpose, including, but not
            limited to: Violating any applicable laws or regulations; Infringing
            upon the intellectual property rights of others; Transmitting or
            uploading malicious code or harmful content; Interfering with the
            security or integrity of the Services; Attempting to gain
            unauthorized access to the Services or another user&apos;s account;
            Engaging in any activity that disrupts or interferes with the normal
            functioning of the Services.
          </li>
          <li className="pl-4">
            <div className="-ml-4 py-2 text-lg">Privacy</div> Your privacy is
            important to us. Please read our Privacy Policy, which explains how
            we collect, use, and protect your personal information when you use
            the Services. Third-Party Services Our Services may contain links to
            third-party websites, services, or applications, such as OAuth
            providers. We are not responsible for the content, privacy policies,
            or practices of any third-party services. You acknowledge and agree
            that we will not be liable for any loss or damage resulting from
            your use of or reliance on any third-party services. Modifications
            to the Services We reserve the right to modify or discontinue,
            temporarily or permanently, the Services (or any part thereof) with
            or without notice. You agree that we will not be liable to you or
            any third party for any modification, suspension, or discontinuance
            of the Services.{" "}
          </li>
          <li className="pl-4">
            <div className="-ml-4 py-2 text-lg">Termination</div> We may
            terminate or suspend your access to the Services without prior
            notice or liability, for any reason, including without limitation if
            you breach these Terms. Upon termination, your right to use the
            Services will immediately cease. Limitation of Liability In no event
            shall we, our affiliates, employees, or agents be liable for any
            indirect, incidental, special, consequential, or punitive damages,
            including without limitation loss of profits, data, use, or
            goodwill, arising out of or in connection with your use of or
            inability to use the Services, even if we have been advised of the
            possibility of such damages.{" "}
          </li>
          <li className="pl-4">
            <div className="-ml-4 py-2 text-lg">
              Governing Law and Jurisdiction
            </div>{" "}
            These Terms and your use of the Services shall be governed by and
            construed in accordance with the laws of the United States, without
            regard to its conflict of law provisions. You agree to submit to the
            personal and exclusive jurisdiction of the courts located within
            United States for the resolution of any disputes arising out of or
            relating to these Terms or your use of the Services.
          </li>{" "}
          <li className="pl-4">
            {" "}
            <div className="-ml-4 py-2 text-lg">Changes to the Terms</div> We
            reserve the right, at our sole discretion, to modify or replace
            these Terms at any time. If a revision is material, we will provide
            at least 30 days&apos; notice prior to any new terms taking effect.
            By continuing to access or use our Services after those revisions
            become effective, you agree to be bound by the revised Terms.
          </li>{" "}
          <li className="pl-4">
            <div className="-ml-4 py-2 text-lg">Waiver and Severability</div>{" "}
            Our failure to enforce any right or provision of these Terms will
            not be considered a waiver of those rights. If any provision of
            these Terms is held to be invalid or unenforceable by a court, the
            remaining provisions of these Terms will remain in effect.
          </li>{" "}
          <li className="pl-4">
            Contact Information If you have any questions or concerns regarding
            these Terms, please contact us at michael@freno.me.
          </li>{" "}
          <li className="pl-4">
            <div className="-ml-4 py-2 text-lg">Entire Agreement</div> These
            Terms, along with our Privacy Policy, constitute the entire
            agreement between you and https://transcript-it.vercel.app with
            respect to the Services and supersede any prior agreements or
            understandings, whether written or oral.
          </li>
        </ul>
      </main>
    </>
  );
};
export default ToS;
