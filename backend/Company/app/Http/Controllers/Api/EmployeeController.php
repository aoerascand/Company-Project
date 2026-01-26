<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Employee;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class EmployeeController extends Controller
{
    // Public endpoint untuk semua user
    public function index()
    {
        $employees = Employee::latest()->get();

        return response()->json(
            $employees->map(function ($emp) {
                return [
                    'id' => $emp->id,
                    'name' => $emp->name,
                    'position' => $emp->position,
                    'description' => $emp->description,
                    'photo_url' => $emp->photo
                        ? url('storage/' . $emp->photo)
                        : null,
                ];
            })
        );
    }

    // Protected CRUD
    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string',
            'position' => 'required|string',
            'description' => 'nullable|string',
            'photo' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
        ]);

        if ($request->hasFile('photo')) {
            $data['photo'] = $request->file('photo')->store('employees', 'public');
        }

        $employee = Employee::create($data);

        return response()->json($employee, 201);
    }

    public function show($id)
    {
        $employee = Employee::findOrFail($id);

        if ($employee->photo) {
            $employee->photo_url = url('storage/' . $employee->photo);
        }

        return response()->json($employee);
    }

    public function update(Request $request, Employee $employee)
    {
        $data = $request->validate([
            'name' => 'required|string',
            'position' => 'required|string',
            'description' => 'nullable|string',
            'photo' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
        ]);

        if ($request->hasFile('photo')) {
            if ($employee->photo) {
                Storage::disk('public')->delete($employee->photo);
            }
            $data['photo'] = $request->file('photo')->store('employees', 'public');
        }

        $employee->update($data);

        if ($employee->photo) {
            $employee->photo_url = url('storage/' . $employee->photo);
        }

        return response()->json($employee);
    }

    public function destroy($id)
    {
        $employee = Employee::findOrFail($id);

        if ($employee->photo) {
            Storage::disk('public')->delete($employee->photo);
        }

        $employee->delete();

        return response()->json(['message' => 'Employee deleted']);
    }
}
