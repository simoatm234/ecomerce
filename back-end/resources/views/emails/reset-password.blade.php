<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
</head>
<body style="font-family: Arial, sans-serif; color: #1D1B20;">
    <div style="max-width: 480px; margin: 0 auto; padding: 24px;">
        <h2 style="color: #14B8A6;">Hi {{ $name }},</h2>
        <p>We received a request to reset your password. Click the button below to choose a new one.</p>
        <p style="text-align: center; margin: 32px 0;">
            <a href="{{ $resetUrl }}" style="background-color: #14B8A6; color: #ffffff; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: bold;">
                Reset Password
            </a>
        </p>
        <p>This link will expire in 60 minutes. If you didn't request this, you can safely ignore this email.</p>
        <hr style="border: none; border-top: 1px solid #CBC4D2; margin: 24px 0;">
        <p style="font-size: 12px; color: #494551;">© {{ date('Y') }} E-Commerce Pro</p>
    </div>
</body>
</html>