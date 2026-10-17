import { lazy, Suspense, type ComponentType } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { PublicLayout } from '@/components/layout/PublicLayout';
import { LogoMark } from '@/components/brand/Logo';

function Loader() {
    return (
        <div className="grid min-h-screen place-items-center">
            <LogoMark className="h-14 w-14 animate-pulse" />
        </div>
    );
}

const page = (factory: () => Promise<{ default: ComponentType }>) => {
    const Component = lazy(factory);
    return (
        <Suspense fallback={<Loader />}>
            <Component />
        </Suspense>
    );
};

export const router = createBrowserRouter([
    {
        element: <PublicLayout />,
        children: [
            { path: '/', element: page(() => import('@/pages/public/Home')) },
            { path: '/about', element: page(() => import('@/pages/public/About')) },
            { path: '/committee', element: page(() => import('@/pages/public/Committee')) },
            { path: '/events', element: page(() => import('@/pages/public/Events')) },
            { path: '/events/:slug', element: page(() => import('@/pages/public/EventDetail')) },
            { path: '/doctors', element: page(() => import('@/pages/public/Doctors')) },
            { path: '/doctors/:slug', element: page(() => import('@/pages/public/DoctorProfile')) },
            { path: '/membership', element: page(() => import('@/pages/public/Membership')) },
            { path: '/membership/apply', element: page(() => import('@/pages/public/Apply')) },
            { path: '/gallery', element: page(() => import('@/pages/public/Gallery')) },
            { path: '/news', element: page(() => import('@/pages/public/News')) },
            { path: '/contact', element: page(() => import('@/pages/public/Contact')) },
            { path: '*', element: page(() => import('@/pages/public/NotFound')) },
        ],
    },
    // Admin panel (and, later, the member portal) live under the same domain.
    { path: '/admin/login', element: page(() => import('@/pages/admin/Login')) },
]);
