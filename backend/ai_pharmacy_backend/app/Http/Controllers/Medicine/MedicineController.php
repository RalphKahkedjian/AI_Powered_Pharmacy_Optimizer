<?php

// app/Http/Controllers/MedicineController.php
namespace App\Http\Controllers\Medicine;

use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\File;

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
        'price' => 'required|numeric|min:0',
        'expiry_date' => 'nullable|date',
        'supplier_id' => 'required|exists:suppliers,id',
        'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
    ]);

    if ($request->hasFile('image')) {
        $path = $request->file('image')->store('medicines', 'public');
        $validated['image_url'] = $path;
    }

    $medicine = Medicine::create($validated);

    $csvPath = base_path('../../AIPython/data/medicines.csv');

    if (!File::exists(dirname($csvPath))) {
            File::makeDirectory(dirname($csvPath), 0755, true);
    }


    if (!File::exists($csvPath) || filesize($csvPath) === 0) {
        $headers = [
            'id',
            'name',
            'batch',
            'price',
            'quantity',
            'expiry_date',
            'image_url',
            'supplier_id',
            'created_at'
        ];
        $file = fopen($csvPath, 'w');
        fputcsv($file, $headers);
        fclose($file);
    }


    $file = fopen($csvPath, 'a');
    fputcsv($file, [
        $medicine->id,
        $medicine->name,
        $medicine->batch,
        $medicine->price,
        $medicine->quantity,
        $medicine->expiry_date,
        $medicine->image_url,
        $medicine->supplier_id,
        $medicine->created_at,
    ]);
    fclose($file);

    \Log::info('Debugging file write test if reached', ['path' => $csvPath]);


    return response()->json([
        'message' => 'Medicine added successfully',
        'medicine' => $medicine,
    ]);
}



public function update(Request $request, $id)
{
    $medicine = Medicine::findOrFail($id);

    $validated = $request->validate([
        'name' => 'sometimes|required|string',
        'batch' => 'nullable|string',
        'quantity' => 'sometimes|required|integer|min:0',
        'expiry_date' => 'nullable|date',
        'supplier_id' => 'sometimes|required|exists:suppliers,id',
        'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
    ]);

    if ($request->hasFile('image')) {
        $path = $request->file('image')->store('medicines', 'public');
        $validated['image_url'] = $path;
    }

    $medicine->update($validated);

    return response()->json(['message' => 'Medicine updated successfully']);
}

    public function destroy($id)
    {
        Medicine::destroy($id);
        return response()->json(['message' => 'Medicine deleted']);
    }
}

