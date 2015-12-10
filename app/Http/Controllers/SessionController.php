<?php
/**
 * Created by PhpStorm.
 * User: chen3
 * Date: 3/9/15
 * Time: 4:24 PM
 */

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;

class SessionController extends Controller {


    /**
     * User login function
     * @return \Illuminate\View\View
     */
    public function login(){
        return view('login');
    }

    public function logout(){
        Auth::logout();
        return redirect('/');
    }

}