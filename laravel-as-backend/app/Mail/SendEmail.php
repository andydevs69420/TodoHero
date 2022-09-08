<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class SendEmail extends Mailable
{
    use Queueable, SerializesModels;

    public $user_todo_details;

    /**
     * Create a new message instance.
     * @return void
     **/
    public function __construct($user_todo)
    {
        //
        $this->user_todo_details = $user_todo;
    }

    /**
     * Build the message.
     * @return $this
     **/
    public function build()
    {
        return $this->view("mail.send-email");
    }
}
