// Triggering a new build for Vercel
import Link from 'next/link';

function HomePage() {
  return (
    // This outer div will center everything vertically and horizontally
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      fontFamily: 'sans-serif',
      background: '#f0f0f0'
    }}>
      {/* This is our clickable link that looks like a button */}
      <Link href="/map">
        <a style={{
          padding: '20px 40px',
          fontSize: '24px',
          fontWeight: 'bold',
          color: 'white',
          background: '#0070f3',
          borderRadius: '10px',
          textDecoration: 'none',
          cursor: 'pointer'
        }}>
          WHERE AM I?
        </a>
      </Link>
    </div>
  );
}

export default HomePage;