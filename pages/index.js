// pages/index.js
import Head from 'next/head';
import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Taputapu - Pagrindinis</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center min-h-screen bg-white space-y-8">
        
        {/* --- "Kur esu?" Button --- */}
        <Link href="/map?mode=find">
          {/* We added classes here for styling */}
          <a className="bg-blue-600 text-white font-bold text-3xl p-6 rounded-xl shadow-lg transition-transform transform hover:scale-105 hover:bg-blue-700">
            Kur esu?
          </a>
        </Link>

        {/* --- "Sek mane!" Button --- */}
        <Link href="/map?mode=follow">
          {/* We added the same classes here for styling */}
          <a className="bg-blue-600 text-white font-bold text-3xl p-6 rounded-xl shadow-lg transition-transform transform hover:scale-105 hover:bg-blue-700">
            Sek mane!
          </a>
        </Link>
        
      </main>
    </div>
  );
}