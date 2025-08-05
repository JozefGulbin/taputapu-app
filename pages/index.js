// In pages/index.js

import Head from 'next/head';
import Link from 'next/link';

// We don't need to import PasiklydauView here anymore
// import PasiklydauView from '../components/PasiklydauView';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Taputapu - Pagrindinis</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center min-h-screen bg-white space-y-8">
        
        {/* --- "Kur esu?" Button --- (This stays the same) */}
        <Link href="/map?mode=find">
          <a className="bg-blue-600 text-white font-bold text-3xl p-6 rounded-xl shadow-lg transition-transform transform hover:scale-105 hover:bg-blue-700">
            Kur esu?
          </a>
        </Link>

        {/* --- MODIFIED "Pasiklydau!" Button --- */}
        {/* We changed the href and the text */}
        <Link href="/pasiklydau">
          <a className="bg-green-600 text-white font-bold text-3xl p-6 rounded-xl shadow-lg transition-transform transform hover:scale-105 hover:bg-green-700">
            Pasiklydau!
          </a>
        </Link>
        
      </main>
    </div>
  );
}