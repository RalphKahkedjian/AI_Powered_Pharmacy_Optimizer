<?php

// app/Http/Controllers/MedicineController.php
namespace App\Http\Controllers\Medicine;

use App\Models\Medicine;
use Illuminate\Http\Request;

class MedicineController
{
    public function index()
    {
        $medicines = Medicine::with('supplier')->get();
        return response()->json($medicines);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string',
            'batch' => 'nullable|string',
            'quantity' => 'required|integer|min:0',
            'expiry_date' => 'nullable|date',
            'supplier_id' => 'required|exists:suppliers,id',
            'image_url' => 'nullable|string',
        ]);

        $medicine = Medicine::create($validated);
        return response()->json(['message' => 'Medicine added successfully', 'medicine' => $medicine]);
    }

    public function update(Request $request, $id)
    {
        $medicine = Medicine::findOrFail($id);
        $medicine->update($request->all());
        return response()->json(['message' => 'Medicine updated successfully']);
    }

    public function destroy($id)
    {
        Medicine::destroy($id);
        return response()->json(['message' => 'Medicine deleted']);
    }
}

