<?php

namespace App\Http\Controllers;

use App\Model\Rawdata;
use App\Model\WaveletData;
use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;

class DataController extends Controller
{

    /**
     * Get IP attack data.
     * @return \Illuminate\Http\JsonResponse
     */
    public function getIpAttackData(){

        $attackdata = Rawdata::orderBy('created_at', 'ASC')->get();
        return response()->json($attackdata->toArray());
    }

    /**
     * Get wavelet data
     * @return \Illuminate\Http\JsonResponse
     */
    public function getWaveletData(){

        $waveletdata = WaveletData::all();
        return response()->json($waveletdata->toArray());
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
