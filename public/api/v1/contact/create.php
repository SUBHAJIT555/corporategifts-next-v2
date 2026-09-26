<?php

declare(strict_types=1);

header('Content-Type: application/json; charset=UTF-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode([
        'status' => false,
        'message' => 'Method not allowed.',
    ]);
    exit;
}

$raw = file_get_contents('php://input') ?: '';
$data = json_decode($raw, true);
if (!is_array($data)) {
    $data = $_POST;
}

$email = trim((string) ($data['email'] ?? ''));
$formType = trim((string) ($data['formType'] ?? 'CONTACT'));
$name = trim((string) ($data['name'] ?? $data['firstName'] ?? ''));
$messageBody = trim((string) ($data['message'] ?? ''));

if ($email === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(422);
    echo json_encode([
        'status' => false,
        'message' => 'Please enter a valid email address.',
    ]);
    exit;
}

$to = 'info@baharnani.com';
$safeType = preg_replace('/[^A-Za-z0-9 _-]/', '', $formType) ?: 'CONTACT';
$subject = $safeType === 'NEWSLETTER'
    ? 'New newsletter subscription'
    : 'New website enquiry';

$lines = [
    'Form: ' . $safeType,
    'Email: ' . $email,
];
if ($name !== '') {
    $lines[] = 'Name: ' . $name;
}
if ($messageBody !== '') {
    $lines[] = '';
    $lines[] = $messageBody;
}

$host = $_SERVER['HTTP_HOST'] ?? 'corporategiftsdubaii.ae';
$from = 'noreply@' . preg_replace('/^www\./', '', $host);
$headers = implode("\r\n", [
    'From: Baharnani Advertising <' . $from . '>',
    'Reply-To: ' . $email,
    'Content-Type: text/plain; charset=UTF-8',
]);

$sent = @mail($to, $subject, implode("\n", $lines), $headers);

if (!$sent) {
    http_response_code(500);
    echo json_encode([
        'status' => false,
        'message' => 'Could not send your request. Please email info@baharnani.com.',
    ]);
    exit;
}

echo json_encode([
    'status' => true,
    'message' => $safeType === 'NEWSLETTER'
        ? 'You are subscribed.'
        : 'Message sent.',
]);
