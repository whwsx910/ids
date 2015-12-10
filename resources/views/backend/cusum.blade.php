@extends('layouts.admin')

@section('header')
    <h2><strong>Dashboard</strong> your statistics</h2>
@endsection

@section('pageHeader')
    <div class="page-header-content">
        <div class="page-title">
            <img src="/assets/images/logo.jpg" width="60px;">
        </div>
    </div>
@endsection

@section('customjs')
    <script type="text/javascript" src="/assets/js/jquery.timer.js"></script>
    <script src="/assets/amcharts/amcharts.js" type="text/javascript"></script>
    <script src="/assets/amcharts/serial.js" type="text/javascript"></script>
    <script src="/assets/amcharts/themes/light.js"></script>
    <script type="text/javascript" src="/assets/js/plugins/buttons/spin.min.js"></script>
    <script type="text/javascript" src="/assets/js/plugins/buttons/ladda.min.js"></script>
    <script src="/assets/js/pages/cusum.js"></script>

@endsection


@section('content')

    <div class="col-md-2">
        <div class="panel panel-primary">
            <div class="panel-heading">
                <h6 class="panel-title">Attack Strength</h6>
            </div>
            <div class="panel-body">
                <p>Choose differnt attack strength then apply CUSUM algorithm to see result.</p>
                <hr />
                <div class="radio">
                    <label>
                        <input type="radio" name="radioCusum" class="control-primary" checked="checked" value="70">
                        <span class="text-bold"> Attack Strength 70%</span>
                    </label>
                </div>

                <div class="radio">
                    <label>
                        <input type="radio" name="radioCusum" class="control-danger" value="50">
                        <span class="text-bold">Attack Strength 50%</span>
                    </label>
                </div>

                <div class="radio">
                    <label>
                        <input type="radio" name="radioCusum" class="control-success" value="30">
                        <span class="text-bold">Attack Strength 30%</span>
                    </label>
                </div>

            </div>

            <div class="panel-footer">
                <div class="row text-center">
                    <button type="button" class="btn bg-teal btn-ladda btn-ladda-progress btn-block"
                            data-style="expand-left"
                            data-spinner-size="20"
                            style="margin-bottom: 10px; margin-top: 10px;"><span class="ladda-label">Apply CUSUM Algorithm</span></button>
                </div>
            </div>
        </div>
    </div>

    <div class="col-md-7">
        <div id="panelCusum" class="panel panel-primary">
            <div class="panel-heading">
                <h6 class="panel-title">CUSUM Detection Algorithm</h6>
            </div>

            <div class="panel-body">
                <div class="row text-center">
                    <div id="chartCusum" style="width: 100%; height: 300px;">
                        <span class="text-bold">Display Result Here</span>
                    </div>
                </div>
            </div>

            <div class="panel-footer" style="padding-top: 10px; padding-bottom: 10px;">
                <span class="statusBar text-warning text-bold"> Idle</span>
            </div>
        </div>
    </div>
@endsection