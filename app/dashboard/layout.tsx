import type { Metadata } from "next";
import SessionWrapper from "@/components/SessionWrapper";

export const metadata: Metadata = {
  title: "ToDo App",
  description: "my first next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <SessionWrapper>{children}</SessionWrapper>;
    </div>
  );
}
