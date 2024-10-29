<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Report;
use Inertia\Inertia;

class ReportController extends Controller
{
    public function index()
    {
        $reports = Report::all();
        return Inertia::render('Report/Index', ['reports' => $reports]);
    }

    public function store()
    {
        $data = request()->validate([
            'type' => 'required',
            'content' => 'required',
            'post_id' => 'nullable',
            'comment_id' => 'nullable',
        ]);

        $data['user_id'] = auth()->id();
        $data['status'] = 0;

        Report::create($data);

        return redirect()->back();
    }
}
