export const metadata = {
  title: "Transcript",
  description: "Transcribe audio files ",
  icons: {
    icon: "/favicon-32x32.png",
    apple: "/apple-touch-icon.png",
  },
};
import "@/styles/globals.css";
import Providers from "./providers";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-orange-50">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
