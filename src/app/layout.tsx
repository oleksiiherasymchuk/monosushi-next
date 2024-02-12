import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import Head from "next/head";
import HeaderLogo from "../../public/images/headerLogo.svg";
import styles from "./Home.module.scss";

const inter = Roboto({ weight: ["400", "500", "700"], subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Замовити суші у Львові з безкоштовною доставкою | Monosushi",
  description: "Created by Oleksii Herasymchuk",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <link rel="icon" href={HeaderLogo} />
      </Head>
      <body className={inter.className}>
        <div className={styles.container}>
          <Header />
          <main className={styles.content}>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
