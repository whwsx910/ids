<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::controllers([
    'auth' => 'Auth\AuthController',
    'password' => 'Auth\PasswordController',
]);

Route::get('login', ['uses'=>'SessionController@login']);
Route::get('logout', ['uses'=>'SessionController@logout']);

Route::get('/', ['uses'=>'BackendController@dashboard']);


Route::group(['prefix'=>'ajax'], function(){

    Route::get('data/ipattacks', ['uses'=>'DataController@getIpAttackData']);
    Route::get('data/wavelet', ['uses'=>'DataController@getWaveletData']);
});

Route::group(['middleware'=>'auth', 'prefix'=>'backend'], function()
{
    Route::get('cusum', ['uses'=>'BackendController@cusum']);
    Route::get('3d', ['uses'=>'BackendController@visulization']);
    Route::get('game', ['uses'=>'BackendController@game']);
});
