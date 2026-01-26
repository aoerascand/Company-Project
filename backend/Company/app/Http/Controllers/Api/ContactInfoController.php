<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ContactInfo;
use Illuminate\Http\Request;

class ContactInfoController extends Controller
{
    public function index()
    {
        return response()->json(
            ContactInfo::first()
        );
    }
    public function update(Request $request)
    {
        $data = $request->validate([
            'email' => 'required|email',
            'phone' => 'required',
            'address' => 'required',
        ]);

        $contact = ContactInfo::first();

        if (!$contact) {
            $contact = ContactInfo::create($data);
        } else {
            $contact->update($data);
        }

        return response()->json([
            'message' => 'Contact info updated',
            'data' => $contact
        ]);
    }
}
