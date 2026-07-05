<?php

namespace App\Mail;

use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class LoginAlertMail extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(public User $user) {}

    public function build()
    {
        return $this->subject('New login to your account')
            ->view('emails.login-alert')
            ->with([
                'name' => $this->user->name,
                'time' => now()->format('F j, Y g:i A'),
            ]);
    }
}
