<?php
// Database configuration
$host = 'localhost';
$dbname = 'portfolio';
$username = 'your_username';
$password = 'your_password';

try {
    $conn = new mysqli($host, $username, $password, $dbname);
    if ($conn->connect_error) {
        throw new Exception('Database connection failed: ' . $conn->connect_error);
    }

    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        // Sanitize inputs
        $name = filter_var(trim($_POST['name'] ?? ''), FILTER_SANITIZE_STRING);
        $email = filter_var(trim($_POST['email'] ?? ''), FILTER_SANITIZE_EMAIL);
        $subject = filter_var(trim($_POST['subject'] ?? ''), FILTER_SANITIZE_STRING);
        $message = filter_var(trim($_POST['message'] ?? ''), FILTER_SANITIZE_STRING);

        // Validate inputs
        if (empty($name) || empty($email) || empty($subject) || empty($message)) {
            http_response_code(400);
            echo json_encode(['error' => 'All fields are required.']);
            exit;
        }

        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            http_response_code(400);
            echo json_encode(['error' => 'Invalid email address.']);
            exit;
        }

        // Prepare and execute query
        $stmt = $conn->prepare('INSERT INTO contacts (name, email, subject, message, created_at) VALUES (?, ?, ?, ?, NOW())');
        if (!$stmt) {
            throw new Exception('Prepare failed: ' . $conn->error);
        }

        $stmt->bind_param('ssss', $name, $email, $subject, $message);
        if ($stmt->execute()) {
            http_response_code(200);
            echo json_encode(['message' => 'Message sent successfully']);
        } else {
            throw new Exception('Execute failed: ' . $stmt->error);
        }

        $stmt->close();
    } else {
        http_response_code(405);
        echo json_encode(['error' => 'Method not allowed.']);
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Server error: ' . $e->getMessage()]);
} finally {
    if (isset($conn) && $conn) {
        $conn->close();
    }
}
?>