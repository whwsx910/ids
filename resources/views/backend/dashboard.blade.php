@extends('layouts.admin')

@section('header')
    <h2><strong>Dashboard</strong> your statistics</h2>
@endsection

@section('pageHeader')
    <div class="page-header-content">
        <div class="page-title">
            <img src="/assets/images/logo.jpg" width="60px;">
        </div>

        {{--<div class="heading-elements">--}}
        {{--<div class="heading-btn-group">--}}
        {{--<a id="aNewGrp" href="#" class="btn btn-link btn-float has-text"><i--}}
        {{--class="icon-theater text-success"></i><span>New Group</span></a>--}}
        {{--<a id="aNewAnn" href="#" class="btn btn-link btn-float has-text"><i--}}
        {{--class="icon-megaphone text-success"></i> <span>New Announcement</span></a>--}}
        {{--</div>--}}
        {{--</div>--}}
    </div>
@endsection

@section('customjs')
    <script type="text/javascript" src="/assets/js/jquery.timer.js"></script>
    <script src="/assets/amcharts/amcharts.js" type="text/javascript"></script>
    <script src="/assets/amcharts/serial.js" type="text/javascript"></script>
    <script src="/assets/amcharts/xy.js"></script>
    <script src="/assets/amcharts/pie.js"></script>
    <script src="/assets/amcharts/themes/light.js"></script>
    <script src="/assets/js/pages/dashboard.js"></script>
@endsection


@section('content')
    <div class="row">
        <div class="col-md-6">
            <div id="panelChartPipe" class="panel panel-info">
                <div class="panel-heading">
                    <h6 class="panel-title">Acquisition</h6>

                    <div class="heading-elements">
                        <ul class="icons-list">
                            <li><a id="btnStartAttackPercent"><i class="icon-play3"></i></a></li>
                            <li><a id="btnStopAttackPercent"><i class="icon-stop"></i></a></li>
                        </ul>
                    </div>
                </div>

                <div class="panel-body">
                    <div id="chartPercent" style="width: 100%; height: 300px;"></div>

                </div>

                <div class="panel-footer" style="padding-top: 10px; padding-bottom: 10px;">
                    <span class="statusBar text-warning text-bold"> Tracking ......</span>
                </div>
            </div>
        </div>
        <div class="col-md-6">
            <div id="panelWavelet" class="panel panel-info">
                <div class="panel-heading">
                    <h6 class="panel-title">Wavelet Plot</h6>

                    <div class="heading-elements">
                        <ul class="icons-list">
                            <li><a id="btnStartWavelet"><i class="icon-play3"></i></a></li>
                            <li><a id="btnStopWavelet"><i class="icon-stop"></i></a></li>
                        </ul>
                    </div>
                </div>

                <div class="panel-body">
                    <div id="chartWavelet" style="width: 100%; height: 300px;"></div>
                </div>

                <div class="panel-footer" style="padding-top: 10px; padding-bottom: 10px;">
                    <span class="statusBar text-warning text-bold"> Idel </span>
                </div>
            </div>
        </div>
    </div>

    <div class="row">
        <div class="col-md-5">
            <div id="panelChartAttack" class="panel panel-info">
                <div class="panel-heading">
                    <h6 class="panel-title">Image Analysis (Snort)</h6>

                    <div class="heading-elements">
                        <ul class="icons-list">
                            <li><a id="btnStartAttackTrace"><i class="icon-play3"></i></a></li>
                            <li><a id="btnStopAttackTrace"><i class="icon-stop"></i></a></li>
                        </ul>
                    </div>
                </div>

                <div class="panel-body">
                    <div id="chartIpAttack" style="width: 100%; height: 300px;"></div>
                </div>

                <div class="panel-footer" style="padding-top: 10px; padding-bottom: 10px;">
                    <span class="statusBar text-warning text-bold"> Idle</span>
                </div>
            </div>
        </div>
        <div class="col-md-7">
            <div id="panelChartAttack" class="panel panel-info">
                <div class="panel-heading">
                    <h6 class="panel-title">Attacks List (HoneyD)</h6>

                </div>

                <div class="panel-body">
                    @include('component.tblattacksourcedest')
                </div>
            </div>
        </div>
    </div>

@endsection