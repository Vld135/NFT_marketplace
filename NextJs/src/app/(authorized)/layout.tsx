import { AuthorizedHeader } from "@/components/Headers";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <AuthorizedHeader />
      {children}
    </>
  );
}
