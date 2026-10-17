import { Helmet } from 'react-helmet-async';
import { site } from '@/data/site';

export function Seo({ title, description }: { title?: string; description?: string }) {
    return (
        <Helmet>
            <title>{title ? `${title} · ${site.name}` : `${site.name} — ${site.tagline}`}</title>
            {description && <meta name="description" content={description} />}
        </Helmet>
    );
}
