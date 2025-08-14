
<?php
require_once __DIR__ . '/../vendor/autoload.php';
require_once __DIR__ . '/../config.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

class EmailHandler {
    private $mailer;

    public function __construct() {
        $this->mailer = new PHPMailer(true);
        $this->configure();
    }

    private function configure() {
        try {
            // Server settings
            $this->mailer->isSMTP();
            $this->mailer->Host = SMTP_HOST;
            $this->mailer->SMTPAuth = true;
            $this->mailer->Username = SMTP_USERNAME;
            $this->mailer->Password = SMTP_PASSWORD;
            $this->mailer->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
            $this->mailer->Port = SMTP_PORT;
            
            // Default sender
            $this->mailer->setFrom(SMTP_USERNAME, 'Arizona GLF');
        } catch (Exception $e) {
            error_log("Email configuration failed: " . $e->getMessage());
            throw new Exception("Email service unavailable");
        }
    }

    public function sendContactForm($name, $email, $subject, $message) {
        try {
            $this->mailer->clearAddresses();
            $this->mailer->addAddress(ADMIN_EMAIL);
            $this->mailer->addReplyTo($email, $name);

            $this->mailer->isHTML(true);
            $this->mailer->Subject = "Contact Form: " . $subject;
            
            $body = "
            <h3>New Contact Form Submission</h3>
            <p><strong>Name:</strong> {$name}</p>
            <p><strong>Email:</strong> {$email}</p>
            <p><strong>Subject:</strong> {$subject}</p>
            <p><strong>Message:</strong></p>
            <p>{$message}</p>
            ";
            
            $this->mailer->Body = $body;
            $this->mailer->AltBody = strip_tags($body);

            $this->mailer->send();
            return true;
        } catch (Exception $e) {
            error_log("Contact form email failed: " . $e->getMessage());
            return false;
        }
    }

    public function sendNotification($to, $subject, $message) {
        try {
            $this->mailer->clearAddresses();
            $this->mailer->addAddress($to);

            $this->mailer->isHTML(true);
            $this->mailer->Subject = $subject;
            $this->mailer->Body = $message;
            $this->mailer->AltBody = strip_tags($message);

            $this->mailer->send();
            return true;
        } catch (Exception $e) {
            error_log("Notification email failed: " . $e->getMessage());
            return false;
        }
    }
}
?>
