import { UnauthorizedHeader } from "@/components/Headers";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-white">
      <UnauthorizedHeader />
      {children}
    </div>
  );
}
