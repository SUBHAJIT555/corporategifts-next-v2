<?php

declare(strict_types=1);

use Google\Client;
use Google\Service\Sheets;

ini_set('display_errors', '0');

require __DIR__ . '/../../vendor/autoload.php';

$allowedOrigins = [
    'https://corporategiftsdubaii.ae',
    'https://www.corporategiftsdubaii.ae',
    'https://exhibitionstandsuae.ae',
    'https://www.exhibitionstandsuae.ae',
];

/**
 * Send a JSON response and exit.
 */
function jsonResponse(int $statusCode, array $payload): void
{
    http_response_code($statusCode);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($payload, JSON_UNESCAPED_UNICODE);
    exit;
}

/**
 * Apply CORS headers when the request Origin is allowed.
 */
function applyCorsHeaders(array $allowedOrigins): void
{
    $origin = $_SERVER['HTTP_ORIGIN'] ?? '';

    if ($origin !== '' && in_array($origin, $allowedOrigins, true)) {
        header('Access-Control-Allow-Origin: ' . $origin);
        header('Vary: Origin');
    }

    header('Access-Control-Allow-Methods: POST, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Accept');
}

/**
 * Trim string values in an associative array.
 */
function trimStringInputs(array $input): array
{
    foreach ($input as $key => $value) {
        if (is_string($value)) {
            $input[$key] = trim($value);
        }
    }

    return $input;
}

/**
 * Resolve phone from either phone or contact_number.
 */
function resolvePhone(array $input): string
{
    $phone = $input['phone'] ?? null;
    if (is_string($phone) && $phone !== '') {
        return $phone;
    }

    $contactNumber = $input['contact_number'] ?? null;
    if (is_string($contactNumber) && $contactNumber !== '') {
        return $contactNumber;
    }

    return '';
}

/**
 * Safely read a string field from input.
 */
function inputString(array $input, string $key): string
{
    $value = $input[$key] ?? '';
    return is_string($value) ? $value : '';
}

/**
 * Reject submissions with no meaningful field content.
 */
function isCompletelyEmpty(array $input): bool
{
    $keys = [
        'name',
        'email',
        'phone',
        'contact_number',
        'message',
        'company_name',
        'contact_person',
        'enquiry_for',
        'call_time',
        'note',
        'requirements',
        'budget_range',
    ];

    foreach ($keys as $key) {
        if (inputString($input, $key) !== '') {
            return false;
        }
    }

    return true;
}

applyCorsHeaders($allowedOrigins);

$method = strtoupper($_SERVER['REQUEST_METHOD'] ?? 'GET');

if ($method === 'OPTIONS') {
    http_response_code(204);
    exit;
}

if ($method !== 'POST') {
    jsonResponse(405, [
        'success' => false,
        'error' => 'Method not allowed.',
    ]);
}

$rawBody = file_get_contents('php://input');
$input = json_decode($rawBody !== false ? $rawBody : '', true);

if (!is_array($input)) {
    jsonResponse(422, [
        'success' => false,
        'error' => 'Invalid form submission.',
    ]);
}

$input = trimStringInputs($input);

$formType = strtolower(inputString($input, 'formType'));
$allowedFormTypes = ['contact', 'quote', 'callback', 'order', 'marketing-modal'];

if ($formType === '' || !in_array($formType, $allowedFormTypes, true)) {
    jsonResponse(422, [
        'success' => false,
        'error' => 'Invalid form submission.',
    ]);
}

if (isCompletelyEmpty($input)) {
    jsonResponse(422, [
        'success' => false,
        'error' => 'Invalid form submission.',
    ]);
}

$email = inputString($input, 'email');
if ($email !== '' && filter_var($email, FILTER_VALIDATE_EMAIL) === false) {
    jsonResponse(422, [
        'success' => false,
        'error' => 'Invalid form submission.',
    ]);
}

try {
    date_default_timezone_set('Asia/Kolkata');

    $credentialsPath = realpath(__DIR__ . '/../../../credentials.json');

    if (!$credentialsPath || !is_readable($credentialsPath)) {
        throw new RuntimeException('Google credentials file not found or not readable.');
    }

    $client = new Client();
    $client->setApplicationName('Google Sheets API');
    $client->setScopes([Sheets::SPREADSHEETS]);
    $client->setAuthConfig($credentialsPath);
    $client->setAccessType('offline');

    $sheets = new Sheets($client);

    $spreadsheetId = '1TWDGSSG4UPTmdWeTj0WGvlV6NiZCDXa8D9QTX899lvw';
    $sheetName = 'New Landing Page';
    $serverIp = $_SERVER['HTTP_X_FORWARDED_FOR']
        ?? ($_SERVER['HTTP_CLIENT_IP'] ?? ($_SERVER['REMOTE_ADDR'] ?? 'unknown'));
    $columnsRange = "'{$sheetName}'!A:Q";
    $utm_source = inputString($input, 'utm_source');
    $utm_medium = inputString($input, 'utm_medium');
    $utm_campaign = inputString($input, 'utm_campaign');
    $utm_term = inputString($input, 'utm_term');
    $utm_content = inputString($input, 'utm_content');
    $phone = resolvePhone($input);

    $existingRows = $sheets->spreadsheets_values->get($spreadsheetId, $columnsRange)->getValues() ?? [];

    $targetRow = count($existingRows) + 1;
    for ($i = 1; $i < count($existingRows); $i++) {
        $rowData = array_pad($existingRows[$i], 17, '');
        $isEmpty = count(array_filter($rowData, static fn($c) => trim((string) $c) !== '')) === 0;
        if ($isEmpty) {
            $targetRow = $i + 1;
            break;
        }
    }

    $srNo = $targetRow - 1;

    // A:Sr No | B:Date | C:Company | D:Name | E:Email | F:Phone | G:Message
    // H:Form Type | I:Requirements | J:Budget | K:Call time | L:Server IP | M–Q: UTM
    $row = [
        $srNo,
        date('Y-m-d H:i:s'),
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        $serverIp,
        $utm_source,
        $utm_medium,
        $utm_campaign,
        $utm_term,
        $utm_content,
    ];

    switch ($formType) {
        case 'quote':
            $row[2] = inputString($input, 'company_name');
            $row[3] = inputString($input, 'contact_person');
            $row[4] = $email;
            $row[5] = $phone;
            $row[7] = 'Quote';
            break;

        case 'callback':
            $row[3] = inputString($input, 'name');
            $row[5] = $phone;
            $row[6] = inputString($input, 'enquiry_for');
            $row[7] = 'Callback';
            $row[10] = inputString($input, 'call_time');
            break;

        case 'order':
            $row[3] = inputString($input, 'name');
            $row[4] = $email;
            $row[5] = $phone;
            $row[6] = inputString($input, 'note');
            $row[7] = 'Order';
            break;

        case 'marketing-modal':
            $row[3] = inputString($input, 'name');
            $row[4] = $email;
            $row[5] = $phone;
            $message = inputString($input, 'message');
            if ($message !== '') {
                $row[6] = $message;
            }
            $row[7] = 'Marketing Modal';
            break;

        case 'contact':
            $row[3] = inputString($input, 'name');
            $row[4] = $email;
            $row[5] = $phone;
            $row[6] = inputString($input, 'message');
            $row[7] = 'Contact';
            $row[8] = inputString($input, 'requirements');
            $row[9] = inputString($input, 'budget_range');
            break;
    }

    $body = new Sheets\ValueRange(['values' => [$row]]);
    $params = ['valueInputOption' => 'USER_ENTERED'];
    $rangeToWrite = "'{$sheetName}'!A{$targetRow}:Q{$targetRow}";
    $result = $sheets->spreadsheets_values->update($spreadsheetId, $rangeToWrite, $body, $params);

    jsonResponse(200, [
        'success' => true,
        'updatedRange' => $result->getUpdatedRange() ?? null,
        'updatedRows' => $result->getUpdatedRows() ?? null,
    ]);
} catch (Throwable $e) {
    error_log('Google Sheets sync failed: ' . $e->getMessage());
    jsonResponse(500, [
        'success' => false,
        'error' => 'Unable to save form submission.',
    ]);
}
