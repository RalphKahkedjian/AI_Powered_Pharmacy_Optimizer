<?php

// app/Http/Controllers/SupplierController.php
namespace App\Http\Controllers\Supplier;

use App\Models\Supplier;
use Illuminate\Http\Request;

class SupplierController
{
    public function index()
    {
        return response()->json(Supplier::all());
    }

    public function store(Request $request)
    {
        $supplier = Supplier::create($request->all());
        return response()->json(['message' => 'Supplier created successfully', 'supplier' => $supplier]);
    }

    public function show($id)
    {
        return response()->json(Supplier::findOrFail($id));
    }

    public function update(Request $request, $id)
    {
        $supplier = Supplier::findOrFail($id);
        $supplier->update($request->all());
        return response()->json(['message' => 'Supplier updated successfully']);
    }

    public function destroy($id)
    {
        Supplier::destroy($id);
        return response()->json(['message' => 'Supplier deleted']);
    }
}
