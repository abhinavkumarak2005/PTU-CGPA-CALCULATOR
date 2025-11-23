import React, { useEffect } from 'react';

const AdComponent = ({ dataAdSlot }) => {
    useEffect(() => {
        try {
            (window.adsbygoogle = window.adsbygoogle || []).push({});
        } catch (e) {
            console.error("AdSense error", e);
        }
    }, []);

    return (
        <div style={{ overflow: 'hidden', minHeight: '100px' }}>
            <ins className="adsbygoogle"
                style={{ display: 'block' }}
                data-ad-client="ca-pub-3585259073773975"  // REPLACE THIS WITH YOUR ID
                data-ad-slot={dataAdSlot}
                data-ad-format="auto"
                data-full-width-responsive="true">
            </ins>
        </div>
    );
};

export default AdComponent;