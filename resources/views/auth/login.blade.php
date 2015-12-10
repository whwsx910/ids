
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
    <script type="text/javascript" src="/assets/js/plugins/forms/styling/uniform.min.js"></script>

    <script type="text/javascript" src="/assets/js/core/app.js"></script>
    <script type="text/javascript" src="/assets/js/pages/login.js"></script>
    <!-- /theme JS files -->

</head>

<body>

<!-- Main navbar -->
<div class="navbar navbar-inverse text-center">
    <span style="padding-top: 20px;">Network Sensor-Based Defense Testbed</span>
</div>
<!-- /main navbar -->


<!-- Page container -->
<div class="page-container login-container">

    <!-- Page content -->
    <div class="page-content">

        <!-- Main content -->
        <div class="content-wrapper">

            <!-- Advanced login -->
            <form action="/auth/login" method="POST">
                <input type="hidden" name="_token" value="{{ csrf_token() }}">
                <div class="panel panel-body login-form">
                    <div class="text-center">
                        <div class="icon-object border-slate-300 text-slate-300"><img src="/assets/images/logo.jpg" style="width: 60px;"> </div>
                        <h5 class="content-group">Login to your account <small class="display-block">to access system</small></h5>
                    </div>

                    <div class="form-group has-feedback has-feedback-left">
                        <input type="text" name="email" class="form-control" placeholder="Username">
                        <div class="form-control-feedback">
                            <i class="icon-user text-muted"></i>
                        </div>
                    </div>

                    <div class="form-group has-feedback has-feedback-left">
                        <input type="password" name="password" class="form-control" placeholder="Password">
                        <div class="form-control-feedback">
                            <i class="icon-lock2 text-muted"></i>
                        </div>
                    </div>


                    <div class="form-group">
                        <button type="submit" class="btn bg-blue btn-block">Login <i class="icon-arrow-right14 position-right"></i></button>
                    </div>


                    <span class="help-block text-center no-margin">By continuing, you're confirming that you've read our <a href="#">Terms &amp; Conditions</a> </span>
                </div>
            </form>
            <!-- /advanced login -->

        </div>
        <!-- /main content -->

    </div>
    <!-- /page content -->


    <!-- Footer -->
    <div class="footer text-muted">
        &copy; 2015. <a href="#">Network Sensor-Based Defense Testbed</a>
    </div>
    <!-- /footer -->

</div>
<!-- /page container -->

</body>
</html>

