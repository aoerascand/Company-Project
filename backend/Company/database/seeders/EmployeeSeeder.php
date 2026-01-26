<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Employee;

class EmployeeSeeder extends Seeder
{
    public function run(): void
    {
        Employee::create([
            'name' => 'Budi Santoso',
            'position' => 'Direktur Utama',
            'photo' => null,
            'description' => 'Memimpin dan mengelola arah perusahaan.',
        ]);

        Employee::create([
            'name' => 'Siti Aminah',
            'position' => 'Manajer Operasional',
            'photo' => null,
            'description' => 'Mengatur operasional dan kinerja tim.',
        ]);
    }
}
