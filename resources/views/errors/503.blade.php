<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="theme-color" content="#021e40">
    <meta name="robots" content="noindex">
    <title>Temporarily Unavailable — Bangladesh Headache Society</title>
    <link rel="icon" type="image/svg+xml" href="/favicon.svg">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Manrope:wght@400;500;600&display=swap" rel="stylesheet">
    <style>
        *, *::before, *::after { box-sizing: border-box; }
        html, body { margin: 0; height: 100%; }
        body {
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 24px 16px;
            background: radial-gradient(ellipse at top, #0a3a6e 0%, #021e40 55%, #010f22 100%);
            color: #e8eef6;
            font-family: 'Manrope', system-ui, -apple-system, sans-serif;
            -webkit-font-smoothing: antialiased;
        }
        main { max-width: 560px; text-align: center; }
        .logo { width: 64px; height: 64px; margin: 0 auto 28px; display: block; }
        .badge {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            padding: 6px 14px;
            border: 1px solid rgba(255, 255, 255, 0.15);
            border-radius: 999px;
            font-size: 12px;
            font-weight: 600;
            letter-spacing: 0.12em;
            text-transform: uppercase;
            color: #9fb6d3;
        }
        .dot {
            width: 8px; height: 8px; border-radius: 50%;
            background: #f5b942;
            animation: pulse 1.8s ease-in-out infinite;
        }
        @keyframes pulse { 50% { opacity: 0.35; } }
        h1 {
            margin: 24px 0 16px;
            font-family: 'Instrument Serif', Georgia, serif;
            font-weight: 400;
            font-size: clamp(36px, 7vw, 56px);
            line-height: 1.05;
            color: #ffffff;
        }
        h1 em { color: #9fc7f5; }
        p { margin: 0 0 12px; font-size: 16px; line-height: 1.7; color: #b8c7da; }
        .muted { margin-top: 32px; font-size: 13px; color: #6f86a3; }
        a { color: #9fc7f5; }
    </style>
</head>
<body>
    <main>
        <img class="logo" src="/favicon.svg" alt="Bangladesh Headache Society">
        <span class="badge"><span class="dot"></span> Scheduled maintenance</span>
        <h1>We'll be back <em>shortly</em></h1>
        <p>The Bangladesh Headache Society website is temporarily unavailable while we carry out some improvements.</p>
        <p>Thank you for your patience — please check back soon.</p>
        <p class="muted">&copy; {{ date('Y') }} Bangladesh Headache Society</p>
    </main>
</body>
</html>
