
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>IDS - Network Sensor-Based Defense Testbed</title>

    <!-- Global stylesheets -->
    <link href="https://fonts.googleapis.com/css?family=Roboto:400,300,100,500,700,900" rel="stylesheet" type="text/css">
    <link href="/assets/css/icons/icomoon/styles.css" rel="stylesheet" type="text/css">
    <link href="/assets/css/bootstrap.min.css" rel="stylesheet" type="text/css">
    <link href="/assets/css/core.min.css" rel="stylesheet" type="text/css">
    <link href="/assets/css/components.min.css" rel="stylesheet" type="text/css">
    <link href="/assets/css/colors.min.css" rel="stylesheet" type="text/css">

    <!-- /global stylesheets -->

    <!-- Core JS files -->
    <script type="text/javascript" src="/assets/js/plugins/loaders/pace.min.js"></script>
    <script type="text/javascript" src="/assets/js/core/libraries/jquery.min.js"></script>
    <script type="text/javascript" src="/assets/js/core/libraries/bootstrap.min.js"></script>
    <script type="text/javascript" src="/assets/js/plugins/loaders/blockui.min.js"></script>
    <!-- /core JS files -->

    <!-- Theme JS files -->
    <script type="text/javascript" src="/assets/js/core/libraries/jquery_ui/datepicker.min.js"></script>
    <script type="text/javascript" src="/assets/js/core/libraries/jquery_ui/effects.min.js"></script>
    <script type="text/javascript" src="/assets/js/plugins/notifications/jgrowl.min.js"></script>
    <script type="text/javascript" src="/assets/js/plugins/ui/moment/moment.min.js"></script>
    <script type="text/javascript" src="/assets/js/plugins/pickers/daterangepicker.js"></script>
    <script type="text/javascript" src="/assets/js/plugins/pickers/anytime.min.js"></script>
    <script type="text/javascript" src="/assets/js/plugins/tables/datatables/datatables.min.js"></script>
    <script type="text/javascript" src="/assets/js/plugins/tables/datatables/extensions/natural_sort.js"></script>
    <script type="text/javascript" src="/assets/js/plugins/forms/selects/select2.min.js"></script>
    <script type="text/javascript" src="/assets/js/plugins/notifications/sweet_alert.min.js"></script>
    <script type="text/javascript" src="/assets/js/plugins/forms/styling/uniform.min.js"></script>
    <!-- /theme JS files -->

    <script type="text/javascript" src="/assets/js/core/app.js"></script>

    @yield('customjs')

    <script>
        var csrf = '<?php echo csrf_token(); ?>';
    </script>

</head>

<body>

<!-- Main navbar -->
<div class="navbar navbar-inverse">
    <div class="navbar-header">
        <a class="navbar-brand" href="/">Network Sensor-Based Defense Testbed</a>

        <ul class="nav navbar-nav pull-right visible-xs-block">
            <li><a data-toggle="collapse" data-target="#navbar-mobile"><i class="icon-tree5"></i></a></li>
            <li><a class="sidebar-mobile-main-toggle"><i class="icon-paragraph-justify3"></i></a></li>
        </ul>
    </div>

    <div class="navbar-collapse collapse" id="navbar-mobile">


        <ul class="nav navbar-nav navbar-right">

            <li class="dropdown dropdown-user">
                <a class="dropdown-toggle" data-toggle="dropdown">
                    <span>{!! Auth::user()->email!!}</span>
                    <i class="caret"></i>
                </a>

                <ul class="dropdown-menu dropdown-menu-right">
                    <li><a href="/logout"><i class="icon-switch2"></i> Logout</a></li>
                </ul>
            </li>
        </ul>
    </div>
</div>
<!-- /main navbar -->


<!-- Page header -->
<div class="page-header">
    @yield('pageHeader')
    <div class="breadcrumb-line breadcrumb-line-wide">
        <ul class="breadcrumb">
            <li><a href="/"><i class="icon-home2 position-left"></i> Home</a></li>
        </ul>

        <ul class="breadcrumb-elements">
            <li><a href="#"><i class="icon-comment-discussion position-left"></i> Support</a></li>
            <li class="dropdown">
                <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                    <i class="icon-gear position-left"></i>
                    Settings
                    <span class="caret"></span>
                </a>

                <ul class="dropdown-menu dropdown-menu-right">
                    <li><a href="#"><i class="icon-user-lock"></i> Account security</a></li>
                    <li><a href="#"><i class="icon-statistics"></i> System sensitivity</a></li>
                    <li class="divider"></li>
                    <li><a href="#"><i class="icon-gear"></i> All settings</a></li>
                </ul>
            </li>
        </ul>
    </div>
</div>
<!-- /page header -->


<!-- Page container -->
<div class="page-container">

    <!-- Page content -->
    <div class="page-content">

        <!-- Main sidebar -->
        <div class="sidebar sidebar-main sidebar-default">
            <div class="sidebar-content">

                <!-- Main navigation -->
                <div class="sidebar-category sidebar-category-visible">
                    <div class="category-title h6">
                        <span>Control Panel</span>
                        <ul class="icons-list">
                            <li><a href="#" data-action="collapse"></a></li>
                        </ul>
                    </div>

                    <div class="category-content sidebar-user">
                        <div class="media">
                            <div class="media-body">
                                <span class="media-heading text-semibold">{!! Auth::user()->email !!}</span>
                            </div>

                        </div>
                    </div>

                    <div class="category-content no-padding">
                        <ul class="navigation navigation-main navigation-accordion">

                            @if(Auth::user()->role == 'administrator')
                            <!-- Favorites -->
                            <li class="navigation-header"><span>Main Menu</span> <i class="icon-menu" title="Favorites"></i></li>
                            <li id="menu_dashboard"><a href="/"><i class=" icon-home4"></i> <span>Attack Analysis Charts</span></a></li>
                            <li id="menu_3d"><a href="/backend/3d"><i class="icon-map5"></i> <span>Attacks Visulization</span></a></li>
                            <li id="menu_cusum"><a href="/backend/cusum"><i class="icon-brain"></i> <span>CUSUM Detection Algorithm</span></a></li>
                            <li id="menu_game"><a href="/backend/game"><i class=" icon-grid52"></i> <span>Game Theoretic Analysis</span></a></li>
                            @endif

                            @if(Auth::user()->role == 'commander')
                                    <!-- Favorites -->
                            <li class="navigation-header"><span>Main Menu</span> <i class="icon-menu" title="Favorites"></i></li>
                            <li id="menu_dashboard"><a href="#"><i class=" icon-home4"></i> <span class="text-muted">Attack Analysis Charts</span></a></li>
                            <li id="menu_3d"><a href="/backend/3d"><i class="icon-map5"></i> <span>Attacks Visulization</span></a></li>
                            <li id="menu_cusum"><a href="#"><i class="icon-brain"></i> <span class="text-muted">CUSUM Detection Algorithm</span></a></li>
                            <li id="menu_game_theoretic"><a href="#"><i class=" icon-grid52"></i> <span class="text-muted">Game Theoretic Analysis</span></a></li>
                            @endif

                        </ul>
                    </div>
                </div>
                <!-- /main navigation -->

            </div>
        </div>
        <!-- /main sidebar -->

        <!-- Main content -->
        <div class="content-wrapper">
            @yield('content')
        </div>
        <!-- /main content -->

    </div>
    <!-- /page content -->

</div>
<!-- /page container -->

</body>
</html>
