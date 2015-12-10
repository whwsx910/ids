<?php

namespace App\Http\Controllers;

use App\Model\Sqatc1;
use App\Model\Sqatc2;
use App\Model\Sqatc3;
use App\Model\Sqatc4;
use App\Model\Sqatc5;
use App\Model\Sqatc6;
use App\Model\Sqatc7;
use App\Model\Sqatc8;
use App\Model\Sqatc9;
use App\Model\Sqatcnormal;
use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class BackendController extends Controller
{

    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Dashboard page
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function dashboard(){
        if(Auth::user()->role == 'commander'){
            return view('backend.visulization');
        }
        return view('backend.dashboard');
    }

    /**
     * Cusum page
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function cusum(){
        $sqatcnormal = Sqatcnormal::all()->lists('value');
        $sqatc1 = Sqatc1::all()->lists('value');
        $sqatc2 = Sqatc2::all()->lists('value');
        $sqatc3 = Sqatc3::all()->lists('value');
        $sqatc4 = Sqatc4::all()->lists('value');
        $sqatc5 = Sqatc5::all()->lists('value');
        $sqatc6 = Sqatc6::all()->lists('value');
        $sqatc7 = Sqatc7::all()->lists('value');
        $sqatc8 = Sqatc8::all()->lists('value');
        $sqatc9 = Sqatc9::all()->lists('value');
        return view('backend.cusum', ['sqatc1'=>$sqatc1, 'sqatc2'=>$sqatc2,
                                        'sqatc3'=>$sqatc3, 'sqatc4'=>$sqatc4,
                                        'sqatc5'=>$sqatc5, 'sqatc6'=>$sqatc6,
                                        'sqatc7'=>$sqatc7, 'sqatc8'=>$sqatc8, 'sqatc9'=>$sqatc9, 'sqnormal'=>$sqatcnormal]);
    }


    /**
     * 3D Map display
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function visulization(){

        return view('backend.visulization');
    }

    /**
     * Game strategy
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function game(){

        return view('backend.game');
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
