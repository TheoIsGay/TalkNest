<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Post;
use Inertia\Inertia;
use Inertia\Response;

class PostController extends Controller
{
    public function index()
    {
        $posts = Post::with('userRate')
            ->orderBy('created_at', 'desc')
            ->get()->map(function($post) {
            $post->user_rate = $post->userRate ? (bool) $post->userRate->type : null;
            return $post->makeHidden('userRate');
        });

        return Inertia::render('Post/Index', ["posts" => $posts]);
    }

    public function myPosts(Request $request)
    {
        $user = $request->user();
        $posts = Post::where('user_id', $user->id)
            ->with('userRate')
            ->orderBy('created_at', 'desc')
            ->get()->map(function($post) {
                $post->user_rate = $post->userRate ? (bool) $post->userRate->type : null;
                return $post->makeHidden('userRate');
            });

        return Inertia::render('Post/MyPosts', ["posts" => $posts]);
    }

    public function show($id)
    {
        $post = Post::findOrFail($id);
        return Inertia::render('Post/Show', compact('post'));
    }

    public function create(): Response
    {
        return Inertia::render('Post/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
        ]);

        $validated['user_id'] = $request->user()->id;

        Post::create($validated);

        return redirect()->route('posts.index')->with('success', 'Post created successfully.');
    }

    public function edit($id)
    {
        $post = Post::findOrFail($id);
        return Inertia::render('Post/Edit', compact('post'));
    }

    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
        ]);

        $post = Post::findOrFail($id);
        $post->update($validated);

        return redirect()->route('posts.index')->with('success', 'Post updated successfully.');
    }

    public function destroy($id)
    {
        $post = Post::findOrFail($id);
        $post->delete();

        return redirect()->route('posts.index')->with('success', 'Post deleted successfully.');
    }
}
