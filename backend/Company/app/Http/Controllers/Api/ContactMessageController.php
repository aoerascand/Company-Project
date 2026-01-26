<?php
namespace App\Http\Controllers\Api;
use App\Models\ContactMessage;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class ContactMessageController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name'    => 'required|string|max:255',
            'email'   => 'required|email|max:255',
            'message' => 'required|string',
        ]);

        ContactMessage::create($validated);

        return response()->json([
            'success' => true,
            'message' => 'Pesan berhasil dikirim'
        ], 201);
    }

    public function index()
    {
        return response()->json(
            ContactMessage::latest()->get()
        );
    }

    // Detail pesan
    public function show($id)
    {
        return response()->json(
            ContactMessage::findOrFail($id)
        );
    }

    // Hapus pesan (opsional)
    public function destroy($id)
    {
        ContactMessage::findOrFail($id)->delete();

        return response()->json([
            'success' => true,
            'message' => 'Pesan berhasil dihapus'
        ]);
    }
}
