import { Helmet } from 'react-helmet-async';

interface SEOHeadProps {
    title: string;
    description: string;
    image?: string;
    url?: string;
    type?: string;
}

export function SEOHead({ 
    title, 
    description, 
    image = 'https://eaoverseas.com/assets/logo.png', // Official Logo Fallback
    url = 'https://eaoverseas.com',
    type = 'website'
}: SEOHeadProps) {
    const siteTitle = title.includes('EAOverseas') ? title : `${title} | EAOverseas`;

    return (
        <Helmet>
            <title>{siteTitle}</title>
            <meta name="description" content={description} />
            <link rel="canonical" href={url} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={type} />
            <meta property="og:url" content={url} />
            <meta property="og:title" content={siteTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={image} />

            {/* Twitter */}
            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:url" content={url} />
            <meta property="twitter:title" content={siteTitle} />
            <meta property="twitter:description" content={description} />
            <meta property="twitter:image" content={image} />
        </Helmet>
    );
}
