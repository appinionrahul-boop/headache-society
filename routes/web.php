<?php

use Illuminate\Support\Facades\Route;

// Single-page app shell: every non-API route is handled by React Router.
Route::view('/{any?}', 'app')->where('any', '^(?!api|storage|build).*$');
