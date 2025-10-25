import Head from "next/head";


export default function Layout({ title = "Fleehy", children }) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="min-h-screen bg-gray-50">
        <main className="max-w-6xl mx-auto px-4 py-8">
          {children}
        </main>
      </div>
    </>
  );
}
