<!DOCTYPE HTML>
<html lang="en-US">
<head>
    <title>Make Frontend Website</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="shortcut icon" href="/assets/front/images/favicon.png" type="image/png">
    <link rel="stylesheet" href="/assets/front/css/bootstrap.min.css" />
    <link rel="stylesheet" href="/assets/front/css/font-awesome.min.css"/>
    <link rel="stylesheet" href="/assets/front/css/fancy-buttons.min.css" />
    <!-- Google Fonts -->
    <link href='http://fonts.googleapis.com/css?family=Raleway:300,400,600,800' rel='stylesheet' type='text/css'>
    <link href='http://fonts.googleapis.com/css?family=Open+Sans:100,300,400,600,700' rel='stylesheet' type='text/css'>
    <!-- Other CSS files -->
    <link rel="stylesheet" href="/assets/front/css/animate.min.css" />
    <link rel="stylesheet" href="/assets/front/js/magnific/magnific-popup.min.css">
    <!-- Main Stylesheets -->
    <link rel="stylesheet" href="/assets/front/css/style.min.css" />
    <link rel="stylesheet" href="/assets/front/css/ui.min.css" />
    <!-- Color Scheme, 5 colors are available: default, blue, red, orange and green  -->
    <link rel="stylesheet" id="theme-color" href="/assets/front/css/themes/default.css" />
    <!-- [if lt IE 9]>
    <script src="http://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
    <script src="http://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
    <![endif] -->
</head>
<body>
<!-- BEGIN PRELOADER -->
<div class="loader-overlay">
    <div class="spinner">
        <div class="bounce1"></div>
        <div class="bounce2"></div>
        <div class="bounce3"></div>
    </div>
</div>
<!-- END PRELOADER -->
<!--  Begin Topbar simple -->
<div class="topnav fixed-topnav topnav-top">
    <div class="section">
        <div id="topbar-hold" class="nav-hold container">
            <nav class="navbar" role="navigation">
                <div class="navbar-header">
                    <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target=".navbar-responsive-collapse">
                        <span class="sr-only">Toggle navigation</span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>
                    <!-- Site Name -->
                    <a class="site-name navbar-brand" href="#"></a>
                </div>
                <!-- Main Navigation menu Starts -->
                <div class="collapse navbar-collapse navbar-responsive-collapse">
                    <ul class="nav navbar-nav navbar-right">
                        <li class="current"><a href="#header">Home</a></li>
                        <li><a href="#section-services">Services</a></li>
                        <li><a href="#section-join">Join</a></li>
                        <li><a href="#section-works">Projects</a></li>
                        <li><a href="#section-team">Team</a></li>
                        <li><a href="#features">Features</a></li>
                        <li><a href="#section-pricing">Pricing</a></li>
                        <li><a href="#section-contact">Contact</a></li>
                    </ul>
                </div>
                <!-- Main Navigation menu ends-->
            </nav>
        </div>
    </div>
</div>

@yield('email_confirmed_section')

<!-- BEGIN FOOTER -->
<!-- Begin Footer 3 columns Dark -->
<div class="section-footer footer-wrap bg-primary">
    <div class="container footer center">
        <div class="row">
            <div class="col-sm-4">
                <h4>Company Info</h4>
                <p>Web agency created in 2014</p>
                <p>Specialized in theme design template</p>
                <p>Contact us for custom project</p>
                <p>Make your own template with us</p>
            </div>
            <div class="col-sm-4">
                <h4>Contact Info</h4>
                <p><i class="line-icon-map"></i>44 Main Street, New York, NY 25442</p>
                <p><i class="line-icon-screen-smartphone"></i>+2-777-555-332 / -2-666-442-887</p>
                <p><i class="line-icon-envelope-open"></i>support@themes-lab.com</p>
                <p><i class="line-icon-calendar"></i>24 hrs/day 7 days/week</p>
            </div>
            <div class="col-sm-4">
                <h4>Get In Touch</h4>
                <div class="social-icons social-square">
                    <ul class="text-left">
                        <li class="animated" data-animation="fadeIn" data-animation-delay="400"><a href="#"><i class="fa fa-facebook"></i></a></li>
                        <li class="animated" data-animation="fadeIn" data-animation-delay="600"><a href="#"><i class="fa fa-twitter"></i></a></li>
                        <li class="animated" data-animation="fadeIn" data-animation-delay="800"><a href="#"><i class="fa fa-google-plus"></i></a></li>
                        <li class="animated" data-animation="fadeIn" data-animation-delay="1000"><a href="#"><i class="fa fa-pinterest"></i></a></li>
                        <li class="animated" data-animation="fadeIn" data-animation-delay="1200"><a href="#"><i class="fa fa-flickr"></i></a></li>
                        <li class="animated" data-animation="fadeIn" data-animation-delay="1400"><a href="#"><i class="fa fa-linkedin"></i></a></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</div>
<!-- Begin Footer Copyright -->
<div class="container footer center">
    <div class="copyright">
        <p class=" center">Themes Lab All rights reserved &copy; 2015</p>
    </div>
</div>
<!-- End Footer Copyright -->
<!-- End Footer 3 columns Dark -->
<!-- END FOOTER -->


<!-- Js files -->
<!-- Essential files -->
<script src="/assets/front/js/jquery-1.11.1.min.js"></script>
<script src="/assets/front/js/jquery.easing.1.3.js"></script>
<script src="/assets/front/js/bootstrap.min.js"></script>
<script src="/assets/front/js/modernizr.js"></script>
<script src="/assets/front/js/magnific/jquery.magnific-popup.min.js"></script>
<script src="/assets/front/js/backstretch/backstretch.min.js"></script>
<!-- Scroll and navigation plugins -->
<script src="/assets/front/js/jquery.nicescroll.min.js"></script>
<script src="/assets/front/js/jquery.nav.js"></script>
<script src="/assets/front/js/jquery.appear.js"></script>
<!-- Google Maps -->
<script src="//maps.google.com/maps/api/js?sensor=true"></script>
<script src="/assets/front/js/google-maps/gmaps.min.js"></script>
<script src="https://google-maps-utility-library-v3.googlecode.com/svn-history/r391/trunk/markerwithlabel/src/markerwithlabel.js"></script>
<script type="text/javascript" src="js/map.js"></script>
<!-- Gallery Sortable -->
<script src="/assets/front/js/jquery.mixitup.min.js"></script>
<!-- Custom Script files -->
<script src="/assets/front/js/custom.js"></script>
</body>
</html>