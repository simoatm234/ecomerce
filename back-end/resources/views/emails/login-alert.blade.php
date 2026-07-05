
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
</head>
<body style="font-family: Arial, sans-serif; color: #1D1B20;">
    <div style="max-width: 480px; margin: 0 auto; padding: 24px;">
        <h2 style="color: #14B8A6;">Hi {{ $name }},</h2>
        <p>We noticed a new login to your account on <strong>{{ $time }}</strong>.</p>
        <p>If this was you, no action is needed.</p>
        <p>If you don't recognize this activity, please secure your account immediately.</p>
        <hr style="border: none; border-top: 1px solid #CBC4D2; margin: 24px 0;">
        <p style="font-size: 12px; color: #494551;">© {{ date('Y') }} crown store</p>
    </div>
</body>
</html>