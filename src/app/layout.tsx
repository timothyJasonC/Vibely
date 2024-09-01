import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});
export const metadata: Metadata = {
  title: "Vibely",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <main className="bg-primary-50 w-full h-screen relative  items-center flex">
          <section className=" w-[537px] mx-auto  border-2 border-main h-[955px] rounded-3xl bg-white overflow-hidden">
            {children}
          </section>
        </main>
      </body>
    </html>
  );
}
