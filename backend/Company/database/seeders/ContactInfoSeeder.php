<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\ContactInfo;

class ContactInfoSeeder extends Seeder
{
    public function run(): void
    {
        ContactInfo::create([
            'address' => 'Jl. Danau No. 123, Jakarta',
            'phone' => '081234567890',
            'email' => 'info@contohcompany.com',
            'whatsapp' => '081234567890',
        ]);
    }
}
