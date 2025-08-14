<?php
require_once __DIR__ . '/../config.php';

// Setup script for Arizona GLF Platform
echo "Setting up Arizona GLF Platform Database...\n";

try {
    // Connect to MySQL server (without database)
    $dsn = "mysql:host=" . DB_HOST . ";charset=utf8mb4";
    $pdo = new PDO($dsn, DB_USER, DB_PASS, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    ]);

    echo "Connected to MySQL server...\n";

    // Read and execute SQL file
    $sqlFile = __DIR__ . '/seed.sql';
    if (!file_exists($sqlFile)) {
        throw new Exception("SQL file not found: $sqlFile");
    }

    $sql = file_get_contents($sqlFile);
    
    // Split SQL into individual statements
    $statements = array_filter(
        array_map('trim', explode(';', $sql)),
        function($stmt) {
            return !empty($stmt) && !preg_match('/^\s*--/', $stmt);
        }
    );

    echo "Executing " . count($statements) . " SQL statements...\n";

    foreach ($statements as $statement) {
        if (trim($statement)) {
            try {
                $pdo->exec($statement);
                echo ".";
            } catch (PDOException $e) {
                echo "\nWarning: " . $e->getMessage() . "\n";
            }
        }
    }

    echo "\n\nDatabase setup completed!\n";

    // Test connection to the new database
    $testDsn = "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=utf8mb4";
    $testPdo = new PDO($testDsn, DB_USER, DB_PASS);
    
    // Check if tables were created
    $tables = $testPdo->query("SHOW TABLES")->fetchAll(PDO::FETCH_COLUMN);
    echo "Created tables: " . implode(', ', $tables) . "\n";

    // Check if demo users were created
    $userCount = $testPdo->query("SELECT COUNT(*) FROM users")->fetchColumn();
    echo "Demo users created: $userCount\n";

    echo "\nDemo login credentials:\n";
    echo "Admin: admin@demo.com / password\n";
    echo "Client: client@demo.com / password\n";
    echo "\nPlatform setup complete!\n";

} catch (Exception $e) {
    echo "Error: " . $e->getMessage() . "\n";
    exit(1);
}
?>
