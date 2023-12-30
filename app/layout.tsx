import "./globals.css";
import { BasicLayout } from "~/layouts/basic";

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <BasicLayout>
          <p>Hello</p>
        </BasicLayout>
      </body>
    </html>
  );
}