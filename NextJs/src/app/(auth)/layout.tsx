import Link from "next/link";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <header className="absolute inset-x-0 top-0 z-50">
        <nav
          className="flex items-center justify-between p-6 lg:px-8"
          aria-label="Global"
        >
          <div className="hidden lg:flex lg:flex-1 lg:justify-start">
            <Link
              href="/"
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              <span aria-hidden="true">&larr; </span> Home
            </Link>
          </div>
        </nav>
      </header>
      {children}
    </>
  );
}
