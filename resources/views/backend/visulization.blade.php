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

    <script src="/assets/ammap/ammap.js" type="text/javascript"></script>
    <!-- map file should be included after ammap.js -->
    <script src="/assets/ammap/maps/js/worldLow.js" type="text/javascript"></script>
    <script src="/assets/js/pages/visulization.js"></script>

@endsection


@section('content')

    {{-- Map --}}
    <div class="row">
        <div class="panel">
            <div class="panel-heading">

            </div>

            <div class="panel-body">
                <div class="tabbable">
                    <ul class="nav nav-tabs nav-tabs-highlight">
                        <li class="active"><a href="#tab1" data-toggle="tab"><i class="icon-lan3 position-left"></i>One to One Connection</a></li>
                        <li><a href="#tab2" data-toggle="tab"><i class="icon-feed position-left"></i>One to Many Connection</a></li>
                        <li><a href="#tab3" data-toggle="tab"><i class=" icon-grid52 position-left"></i>Many to Many Connection</a></li>
                    </ul>

                    <div class="tab-content">
                        <div class="tab-pane active" id="tab1">
                            <div id="map11" style="width: 100%; height: 600px;"></div>
                            <hr />
                            <button type="button" id="btn11" class="btn bg-teal btn-ladda btn-ladda-progress btn-block"
                                    data-style="expand-left"
                                    data-spinner-size="20"
                                    style="margin-bottom: 10px; margin-top: 10px;"><span class="ladda-label">Monitoring 1:1 Traffic</span></button>
                            <hr />
                            @include('component.tblattacksourcedestcity')
                        </div>

                        <div class="tab-pane" id="tab2">
                            <div id="map1m" style="width: 100%; height: 600px;"></div>
                            <hr />
                            <button type="button" id="btn1m" class="btn bg-teal btn-ladda btn-ladda-progress btn-block"
                                    data-style="expand-left"
                                    data-spinner-size="20"
                                    style="margin-bottom: 10px; margin-top: 10px;"><span class="ladda-label">Monitoring 1:M Traffic</span></button>
                            <hr />
                            @include('component.tblattacksourcedestcity')
                        </div>

                        <div class="tab-pane" id="tab3">
                            <div id="mapmm" style="width: 100%; height: 600px;"></div>
                            <hr />
                            <button type="button" id="btnmm" class="btn bg-teal btn-ladda btn-ladda-progress btn-block"
                                    data-style="expand-left"
                                    data-spinner-size="20"
                                    style="margin-bottom: 10px; margin-top: 10px;"><span class="ladda-label">Monitoring M:M Traffic</span></button>
                            <hr />
                            @include('component.tblattacksourcedestcity')
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    {{-- Table --}}
    <div class="row">

    </div>

@endsection