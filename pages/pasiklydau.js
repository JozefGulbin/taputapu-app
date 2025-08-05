// In pages/pasiklydau.js

import Head from 'next/head';
import Link from 'next/link';
import dynamic from 'next/dynamic';

const PasiklydauView = dynamic(
  () => import('../components/PasiklydauView'),
  { ssr: false }
);

export default function PasiklydauPage() {
  return (
    <div style={{ position: 'relative', height: '100vh' }}>
      <Head>
        <title>Pasiklydau! - Taputapu</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* The "Atgal" link, moved to the middle-left and recolored */}
      <div style={{
          position: 'absolute',
          top: '50%', // Move to the vertical middle
          left: '20px', // Keep it near the left edge
          transform: 'translateY(-50%)', // Adjust for perfect vertical centering
          zIndex: 1001
      }}>
        <Link href="/">
          <a style={{
            padding: '8px 15px',
            fontSize: '18px',
            fontWeight: 'bold',
            color: 'white', // White text
            backgroundColor: 'rgba(220, 53, 69, 0.85)', // Bright, semi-transparent red
            borderRadius: '5px',
            textDecoration: 'none',
            border: '1px solid rgba(160, 40, 50, 0.9)' // Darker red border
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