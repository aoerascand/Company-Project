<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\CompanyProfile;

class CompanyProfileController extends Controller
{
    public function index()
    {
        return CompanyProfile::first();
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required',
            'address' => 'required',
            'email' => 'required|email',
            'phone' => 'required'
        ]);

        $profile = CompanyProfile::first();

        if ($profile) {
            $profile->update($data);
        } else {
            $profile = CompanyProfile::create($data);
        }

        return response()->json($profile);
    }
}
