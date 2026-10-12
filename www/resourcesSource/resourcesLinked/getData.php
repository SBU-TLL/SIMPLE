<?php
// Enable temporary error reporting for debugging
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Use a deterministic directory path instead of string exploding SCRIPT_FILENAME
// Adjust __DIR__ . '/../grades.csv' to match your target location relative to this file
$fileName = implode("/",explode("/",$_SERVER["SCRIPT_FILENAME"],-3))."/grades.csv";

$dataString = '';

// Check if file needs CSV headers
if (!file_exists($fileName)) {    
    $dataString = "SIMPLE, GAME, SCORE, USER\n";
}

// Safely retrieve parameters with null coalescing
$simpleName  = $_REQUEST["SimpleName"] ?? 'Unknown';
$currentGame = $_REQUEST["currentGame"] ?? 'Unknown';
$score       = $_REQUEST["score"] ?? '0';
$user        = $_SERVER['cn'] ?? 'GuestUser';

$dataString .= "{$simpleName},{$currentGame},{$score},{$user}\n";

// Attempt to write and return diagnostic output to AJAX
$bytesWritten = @file_put_contents($fileName, $dataString, FILE_APPEND);

if ($bytesWritten === false) {
    http_response_code(500);
    echo "Failed to write to path: " . $fileName . ". Check directory write permissions.";
} else {
    echo "Success: Wrote {$bytesWritten} bytes to " . $fileName;
}
?>