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
    <script src="/assets/js/pages/game.js"></script>

@endsection


@section('content')

    <div class="col-md-3">
        <div class="panel panel-success">
            <div class="panel-heading">
                Attack Categories
            </div>

            <div class="panel-body">
                <div class="radio">
                    <label>
                        <input type="radio" name="att" class="control-primary" checked="checked" value="port">
                        <span class="text-bold"> Port Scan Attack</span>
                    </label>
                </div>

                <div class="radio">
                    <label>
                        <input type="radio" name="att" class="control-danger" value="dos">
                        <span class="text-bold">DoS Attack</span>
                    </label>
                </div>

                <div class="radio">
                    <label>
                        <input type="radio" name="att" class="control-success" value="ssh">
                        <span class="text-bold">SSH Brute Force</span>
                    </label>
                </div>

                <div class="radio">
                    <label>
                        <input type="radio" name="att" class="control-warning" value="phishing">
                        <span class="text-bold">Phishing Attack</span>
                    </label>
                </div>
            </div>
        </div>
    </div>

    <div class="col-md-4">
        <div class="panel panel-success">
            <div class="panel-heading">
                Attack Cost
            </div>

            <div class="panel-body">
                <div id="chartGame" style="width: 100%; height: 400px;">
                    Waiting for data ......
                </div>
            </div>

            <div class="panel-body">
                <div class="progress">
                    <div id='gameProgressBar' class="progress-bar progress-bar-striped active" style="width: 0%">
                        <span class="sr-only">0% Complete</span>
                    </div>
                </div>
            </div>

            <div class="panel-footer">
                <button type="button" id="btnApplyGameEngine" class="btn bg-teal btn-ladda btn-ladda-progress btn-block"
                        data-style="expand-left"
                        data-spinner-size="20"
                        style="margin-bottom: 10px; margin-top: 10px;"><span class="ladda-label">Apply Game Engine</span></button>
            </div>
        </div>
    </div>

    <div class="col-md-5">
        <div class="panel panel-success">
            <div class="panel-heading">
                Defense Categories
            </div>

            <div class="panel-body">
                <div class="row">
                    <div class="col-md-6">
                        <div class="radio">
                            <label>
                                <input type="radio" name="honeyd" class="control-primary" value="hhoneyd">
                                <span class="text-bold"> Sensitive HondyD (High)</span>
                            </label>
                        </div>

                        <div class="radio">
                            <label>
                                <input type="radio" name="honeyd" class="control-danger" value="mhoneyd">
                                <span class="text-bold">Sensitive HondyD (Medium)</span>
                            </label>
                        </div>

                        <div class="radio">
                            <label>
                                <input type="radio" name="honeyd" class="control-success" value="lhoneyd">
                                <span class="text-bold">Sensitive HondyD (Low)</span>
                            </label>
                        </div>

                        <div class="radio">
                            <label>
                                <input type="radio" name="honeyd" class="control-warning" checked="checked" value="nhoneyd">
                                <span class="text-bold">Sensitive HondyD (None)</span>
                            </label>
                        </div>
                    </div>

                    <div class="col-md-6">
                        <div class="radio">
                            <label>
                                <input type="radio" name="snort" class="control-primary" value="hsnort">
                                <span class="text-bold"> Sensitive Snort (High)</span>
                            </label>
                        </div>

                        <div class="radio">
                            <label>
                                <input type="radio" name="snort" class="control-danger" value="msnort">
                                <span class="text-bold">Sensitive Snore (Medium)</span>
                            </label>
                        </div>

                        <div class="radio">
                            <label>
                                <input type="radio" name="snort" class="control-success" value="lsnort">
                                <span class="text-bold">Sensitive Snort (Low)</span>
                            </label>
                        </div>

                        <div class="radio">
                            <label>
                                <input type="radio" name="snort" class="control-warning" value="nsnort" checked="checked">
                                <span class="text-bold">Sensitive Snort (None)</span>
                            </label>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>

@endsection