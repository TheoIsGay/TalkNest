<?php

namespace Database\Seeders;

use App\Models\Post;
use App\Models\Rate;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
            'password' => bcrypt('password'),
        ]);

        Post::factory()->create([
            'title' => 'My name is Jeff',
            'content' => '## Yes it is, and here\'s why
1. Jeff is a *cool* name
2. It\'s **easy** to pronounce!

![Jeff](https://uploads.dailydot.com/2024/08/my-name-is-jeff-meme.jpg?q=65&auto=format&w=1600&ar=2:1&fit=crop)

> Thanks for reading, Habibi!',
            'user_id' => 1
        ]);

        User::factory()->create([
            'name' => 'Admin',
            'email' => 'admin@example.com',
            'password' => bcrypt('root'),
            'role' => 'admin',
        ]);

        User::factory(20)->create();
        Post::factory(10)->create();
        Rate::factory(200)->create();
    }
}
