// In pages/pasiklydau.js - NOW WITH A LOADING COMPONENT

import Head from 'next/head';
import Link from 'next/link';
import dynamic from 'next/dynamic';

// A simple component to show while the main map component is loading
const LoadingComponent = () => (
  <div style={{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    fontSize: '2rem'
    }}>
    Loading Map...
  </div>
);

const PasiklydauView = dynamic(
  () => import('../components/PasiklydauView'),
  // Add the loading option here
  { 
    ssr: false,
    loading: () => <LoadingComponent /> 
  }
);

export default function PasiklydauPage() {
  return (
    <div style={{ position: 'relative', height: '100vh' }}>
      <Head>
        <title>Pasiklydau! - Taputapu</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div style={{
          position: 'absolute', top: '50%', left: '20px',
          transform: 'translateY(-50%)', zIndex: 1001
      }}>
        <Link href="/">
          <a style={{
            padding: '8px 15px', fontSize: '18px', fontWeight: 'bold',
            color: 'white', backgroundColor: 'rgba(220, 53, 69, 0.85)',
            borderRadius: '5px', textDecoration: 'none',
            border: '1px solid rgba(160, 40, 50, 0.9)'
          }}>
            Atgal
          </a>
        </Link>
      </div>

      <main>
        <PasiklydauView />
      </main>
    </div>
  );
}