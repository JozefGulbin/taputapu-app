// pages/add-spot.js

import dynamic from 'next/dynamic';
import Head from 'next/head';
import { useMemo } from 'react'; // Import useMemo

export default function AddSpotPage() {
    // We wrap the dynamic import in useMemo to prevent it from being re-declared on every render
    const PinMap = useMemo(() => dynamic(
        () => import('../components/PinMap.jsx'), 
        { 
            loading: () => <p>Kraunamas žemėlapis...</p>, // Optional loading message
            ssr: false // This is crucial
        }
    ), []);

    return (
        <div>
            <Head>
                <title>Pridėti naują tašką</title>
            </Head>
            <main>
                <PinMap />
            </main>
        </div>
    );
}