<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\CompanyProfile;

class CompanyProfileSeeder extends Seeder
{
    public function run(): void
    {
        CompanyProfile::create([
            'company_name' => 'PT IMADI',
            'about' => 'Kami adalah perusahaan yang bergerak di bidang teknologi dan layanan digital.',
            'vision' => 'Menjadi perusahaan teknologi terpercaya.',
            'mission' => 'Memberikan solusi digital berkualitas tinggi.',
        ]);
    }
}
