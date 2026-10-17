# Headache Society Web Portal — Project Plan

Reference site: https://worldheadachesociety.com/

## 1. Deployment model — single source, single server

One Laravel application serves everything:

```
https://<domain>/                → React public website (SPA)
https://<domain>/admin/login     → Admin panel login (React, same bundle / lazy-loaded chunk)
https://<domain>/admin/*         → Admin panel (CMS), role-protected
https://<domain>/member/login    → (future) Member portal login
https://<domain>/api/v1/*        → Laravel JSON API (public + authenticated endpoints)
https://<domain>/storage/*       → Uploaded media (photos, CVs, documents)
```

- **Backend:** Laravel 13 (PHP 8.3) — API, auth, CMS logic, file storage.
- **Frontend:** React 19 + TypeScript, built by Vite (`laravel-vite-plugin`) into `public/build`.
- `routes/web.php` has a catch-all route that returns one Blade shell (`resources/views/app.blade.php`) which mounts React; React Router handles client routes.
- **Auth:** Laravel Sanctum *SPA cookie auth* (same domain → session cookie + CSRF, no tokens in localStorage).
- One deploy = `composer install --no-dev && npm ci && npm run build && php artisan migrate --force`.
- **DB:** MySQL/MariaDB — local: XAMPP MariaDB 10.4, database `headache-society` (root, no password).

## 2. Users & roles (spatie/laravel-permission)

Single `users` table, role-based:

| Role | Access |
|---|---|
| `super-admin` | Everything, manage admins & roles |
| `content-admin` (e.g. Scientific Committee lead) | CMS modules assigned via permissions |
| `member` *(future)* | Member portal: own profile, membership status, renewals |

Admin routes guarded by `auth:sanctum` + `role:super-admin|content-admin`. Member portal reuses the same auth stack with a `member` role — no rework needed later.

## 3. Public website — pages

| Page | Content |
|---|---|
| Home | Hero/cover slider (photos/video), highlights, upcoming events, latest news, CTA to membership |
| About | Mission & Vision, core principles, history |
| Governance (About page) | Summary drawn from the Constitution — the Constitution itself is confidential and NOT published |
| Executive Committee | EC 2024–25 members (grouped by position), filter by term; past committees archive |
| Events & Activities | Tabs: CME programs, Public Awareness, Regional (outside Dhaka), Special Days |
| Event Calendar | Interactive annual calendar (FullCalendar), list view |
| Event detail | Description, venue, date, gallery, resources |
| News | List + detail |
| Media Gallery | Albums (photos), videos (YouTube embeds) with lightbox |
| Doctor Directory | Searchable/filterable profiles: photo, designation, institution, bio, CV download |
| Membership | Eligibility, categories (General, Life), process — no fees shown |
| Membership Application | Form: personal info, BMDC reg no., designation, institution, bio, CV upload, photo, category |
| Contact | Address, map, contact form |

## 4. Admin panel (CMS) — modules

- Dashboard (counts, pending applications, upcoming events)
- Pages / site settings (About, Mission, Vision, Governance, contact info, social links, hero slides)
- Events (type: CME / Awareness / Regional / Special Day; date range, venue, cover, gallery, publish status)
- News
- Media Gallery (albums, photos bulk upload, videos)
- Executive Committee (terms, positions, members, ordering)
- Doctor Profiles (CRUD, CV upload, publish toggle)
- Membership Applications (review → approve/reject → converts into doctor profile / member)
- Membership categories
- Admin users & roles (super-admin only)
- Activity log (later)

## 5. Draft data model

`users`, `roles/permissions` (spatie), `media` (spatie medialibrary), `settings` (key/value),
`pages` (slug, title, body, meta), `hero_slides`,
`events` (title, slug, type, starts_at, ends_at, venue, location_city, is_outside_dhaka, summary, body, status),
`news` (title, slug, body, published_at, status),
`albums`, `videos`,
`committee_terms` (label e.g. "2024–25", is_current), `committee_members` (term_id, doctor_id, position, sort_order),
`doctors` (name, slug, designation, institution, specialty, bmdc_no, bio, email, phone, user_id nullable, is_published),
`membership_categories` (name, description),
`membership_applications` (applicant fields, category_id, status, reviewed_by, reviewed_at, notes),
`contact_messages`.

Images/CVs/PDFs attach via medialibrary (auto thumbnails/conversions).

## 6. Code layout (planned)

```
app/
  Http/Controllers/Api/V1/Public/*   # read-only public endpoints
  Http/Controllers/Api/V1/Admin/*    # CMS CRUD
  Http/Requests/, Http/Resources/, Models/, Policies/
resources/
  views/app.blade.php                # single SPA shell
  js/
    main.tsx                         # entry, router, providers
    lib/ (api client, helpers)
    components/ (ui/, layout/)
    pages/public/*                   # website pages
    pages/admin/*                    # CMS (lazy-loaded)
    pages/member/*                   # future
routes/web.php                       # catch-all → SPA
routes/api.php                       # /api/v1/...
```

## 7. Installed packages

**Composer:** laravel/sanctum (via `install:api`), spatie/laravel-permission, spatie/laravel-medialibrary,
spatie/laravel-sluggable, intervention/image-laravel; dev: laravel/pint, barryvdh/laravel-ide-helper.

**npm:** react, react-dom, react-router-dom, @tanstack/react-query, axios, react-hook-form, zod,
@hookform/resolvers, react-helmet-async (SEO meta), tailwindcss v4, lucide-react, clsx, tailwind-merge,
yet-another-react-lightbox (gallery), @fullcalendar/* (calendar), @tiptap/* (rich text editor in CMS),
dayjs, sonner (toasts); dev: @vitejs/plugin-react, typescript, @types/*, eslint, prettier.

## 8. Build phases

1. **Foundation** — SPA shell + catch-all route, layouts, Sanctum auth, admin login, roles seeder.
2. **CMS core** — settings/pages, events, news, gallery, EC, doctors.
3. **Public site** — all pages consuming the public API, SEO meta, responsive design.
4. **Membership** — application form, admin review workflow, email notifications.
5. **Polish & deploy** — MySQL, caching, image optimization, sitemap, backups, production deploy.
6. **Future** — member login portal, online fee payment (SSLCommerz/bKash), renewals, certificates.

## 9. Open questions

- Domain & hosting (shared cPanel vs VPS) — affects deploy script and queue worker setup.
- Bilingual (English/Bangla) needed?
- Online membership fee payment in phase 1 or later?
- Brand assets: logo, colours, existing photos/content.
