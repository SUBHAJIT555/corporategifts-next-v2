<?php

declare(strict_types=1);

header('Content-Type: application/xml; charset=UTF-8');

$defaultSiteUrl = 'https://corporategiftsdubaii.ae';
$siteUrl = rtrim(
    getenv('PUBLIC_SITE_URL') ?: getenv('NEXT_PUBLIC_SITE_URL') ?: $defaultSiteUrl,
    '/'
);
$wpOrigin = rtrim(
    getenv('WP_ORIGIN') ?: getenv('NEXT_PUBLIC_WP_ORIGIN') ?: ($siteUrl . '/blog'),
    '/'
);

function sanitizeSitemapPath(string $path): string
{
    $path = str_ireplace('m%c2%b2', 'm2', $path);
    $path = str_replace(['m²', 'm³', 'm¹'], ['m2', 'm3', 'm1'], $path);

    return str_replace(['²', '³', '¹'], ['2', '3', '1'], $path);
}

/**
 * @return array<int, array{path:string, changefreq:string, priority:string}>
 */
function getStaticUrls(string $siteUrl): array
{
    $sitemapXmlPath = __DIR__ . DIRECTORY_SEPARATOR . 'sitemap.xml';
    if (!is_file($sitemapXmlPath)) {
        return [];
    }

    libxml_use_internal_errors(true);
    $xml = simplexml_load_file($sitemapXmlPath);
    if ($xml === false) {
        return [];
    }

    $urls = [];
    foreach ($xml->url as $urlNode) {
        $loc = trim((string) $urlNode->loc);
        if ($loc === '') {
            continue;
        }

        $parsedPath = parse_url($loc, PHP_URL_PATH);
        if (!is_string($parsedPath) || $parsedPath === '') {
            continue;
        }

        if (preg_match('#^/blog(?:/|$)#', $parsedPath) === 1) {
            continue;
        }

        $normalizedPath = '/' . ltrim($parsedPath, '/');
        if ($normalizedPath !== '/' && substr($normalizedPath, -1) !== '/') {
            $normalizedPath .= '/';
        }

        $normalizedPath = sanitizeSitemapPath($normalizedPath);

        $urls[] = [
            'path' => $normalizedPath,
            'changefreq' => trim((string) $urlNode->changefreq) ?: 'weekly',
            'priority' => trim((string) $urlNode->priority) ?: '0.8',
        ];
    }

    return $urls;
}

/**
 * @return array<int, array{path:string, changefreq:string, priority:string}>
 */
function getBlogUrls(string $wpOrigin): array
{
    $results = [];
    $page = 1;
    $perPage = 100;
    $totalPages = 1;

    while ($page <= $totalPages) {
        $endpoint = sprintf(
            '%s/wp-json/wp/v2/posts?per_page=%d&page=%d&_fields=slug',
            $wpOrigin,
            $perPage,
            $page
        );

        $context = stream_context_create([
            'http' => [
                'method' => 'GET',
                'timeout' => 15,
                'ignore_errors' => true,
            ],
        ]);

        $response = @file_get_contents($endpoint, false, $context);
        if ($response === false) {
            break;
        }

        $status = $http_response_header[0] ?? '';
        if (!preg_match('#\s200\s#', $status)) {
            break;
        }

        foreach ($http_response_header as $headerLine) {
            if (stripos($headerLine, 'X-WP-TotalPages:') === 0) {
                $totalPages = max(1, (int) trim(substr($headerLine, 16)));
            }
        }

        $posts = json_decode($response, true);
        if (!is_array($posts)) {
            break;
        }

        foreach ($posts as $post) {
            if (!isset($post['slug']) || !is_string($post['slug']) || $post['slug'] === '') {
                continue;
            }

            // Keep this route shape explicit in sitemap.
            $path = '/blog/' . trim($post['slug'], '/') . '/';
            $results[] = [
                'path' => $path,
                'changefreq' => 'weekly',
                'priority' => '0.7',
            ];
        }

        $page++;
    }

    return $results;
}

$entries = [];
$seen = [];
$baseEntries = [
    [
        'path' => '/blog/',
        'changefreq' => 'weekly',
        'priority' => '0.8',
    ],
];

foreach (array_merge( getStaticUrls($siteUrl),$baseEntries, getBlogUrls($wpOrigin)) as $entry) {
    $path = $entry['path'];

    // Fix old path if it appears from any source.
    if ($path === '/unique-gifts-that-stand-out/') {
        $path = '/blog/unique-gifts-that-stand-out/';
    }

    if (isset($seen[$path])) {
        continue;
    }

    $seen[$path] = true;
    $entries[] = [
        'loc' => $siteUrl . $path,
        'changefreq' => $entry['changefreq'],
        'priority' => $entry['priority'],
    ];
}

echo "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n";
echo "<urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\">\n";
foreach ($entries as $entry) {
    echo "  <url>\n";
    echo '    <loc>' . htmlspecialchars($entry['loc'], ENT_QUOTES | ENT_XML1, 'UTF-8') . "</loc>\n";
    echo '    <changefreq>' . $entry['changefreq'] . "</changefreq>\n";
    echo '    <priority>' . $entry['priority'] . "</priority>\n";
    echo "  </url>\n";
}
echo "</urlset>\n";
