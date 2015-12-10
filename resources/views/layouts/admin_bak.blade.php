<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
    <meta name="description" content="admin-themes-lab">
    <meta name="author" content="themes-lab">
    <link rel="shortcut icon" href="/assets/images/favicon.png" type="image/png">
    @yield('title')
    <link href="/assets/css/style.css" rel="stylesheet">
    <link href="/assets/css/theme.css" rel="stylesheet">
    <link href="/assets/css/ui.css" rel="stylesheet">
    <link href="/alertify/css/alertify.min.css" rel="stylesheet">
    <link href="/alertify/css/themes/default.min.css" rel="stylesheet">
    {{--<link href="/layout2/css/layout.css" rel="stylesheet">--}}
    <link href="/md-layout3/material-design/css/material.css" rel="stylesheet">
    <link href="/md-layout3/css/layout.css" rel="stylesheet">
    <script src="/assets/plugins/modernizr/modernizr-2.6.2-respond-1.1.0.min.js"></script>
    @yield('pagecss')
</head>
<!-- LAYOUT: Apply "submenu-hover" class to body element to have sidebar submenu show on mouse hover -->
<!-- LAYOUT: Apply "sidebar-collapsed" class to body element to have collapsed sidebar -->
<!-- LAYOUT: Apply "sidebar-top" class to body element to have sidebar on top of the page -->
<!-- LAYOUT: Apply "sidebar-hover" class to body element to show sidebar only when your mouse is on left / right corner -->
<!-- LAYOUT: Apply "submenu-hover" class to body element to show sidebar submenu on mouse hover -->
<!-- LAYOUT: Apply "fixed-sidebar" class to body to have fixed sidebar -->
<!-- LAYOUT: Apply "fixed-topbar" class to body to have fixed topbar -->
<!-- LAYOUT: Apply "rtl" class to body to put the sidebar on the right side -->
<!-- LAYOUT: Apply "boxed" class to body to have your page with 1200px max width -->

<!-- THEME STYLE: Apply "theme-sdtl" for Sidebar Dark / Topbar Light -->
<!-- THEME STYLE: Apply  "theme sdtd" for Sidebar Dark / Topbar Dark -->
<!-- THEME STYLE: Apply "theme sltd" for Sidebar Light / Topbar Dark -->
<!-- THEME STYLE: Apply "theme sltl" for Sidebar Light / Topbar Light -->

<!-- THEME COLOR: Apply "color-default" for dark color: #2B2E33 -->
<!-- THEME COLOR: Apply "color-primary" for primary color: #319DB5 -->
<!-- THEME COLOR: Apply "color-red" for red color: #C9625F -->
<!-- THEME COLOR: Apply "color-green" for green color: #18A689 -->
<!-- THEME COLOR: Apply "color-orange" for orange color: #B66D39 -->
<!-- THEME COLOR: Apply "color-purple" for purple color: #6E62B5 -->
<!-- THEME COLOR: Apply "color-blue" for blue color: #4A89DC -->
<!-- BEGIN BODY -->
<body class="sidebar-light fixed-topbar color-orange theme-sltl bg-light-default">
<!--[if lt IE 7]>
<p class="browsehappy">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</p>
<![endif]-->
<section>
    <!-- BEGIN SIDEBAR -->
    <div class="sidebar">
        <div class="logopanel">
            <h1>
                <a href="dashboard.html"></a>
            </h1>
        </div>
        <div class="sidebar-inner">
            <div class="sidebar-top">
                <form action="search-result.html" method="post" class="searchform" id="search-results">
                    <input type="text" class="form-control" name="keyword" placeholder="Search...">
                </form>
                <div class="userlogged clearfix">
                    <i class="icon icons-faces-users-01"></i>
                    <div class="user-details">
                        <h4>{{ ucwords(strtolower(Auth::user()->firstname)) }}</h4>
                        <div class="dropdown user-login">
                            <button class="btn btn-xs dropdown-toggle btn-rounded" type="button" data-toggle="dropdown" data-hover="dropdown" data-close-others="true" data-delay="300">
                                <i class="online"></i><span>Available</span><i class="fa fa-angle-down"></i>
                            </button>
                            <ul class="dropdown-menu">
                                <li><a href="#"><i class="busy"></i><span>Busy</span></a></li>
                                <li><a  href="#"><i class="turquoise"></i><span>Invisible</span></a></li>
                                <li><a href="#"><i class="away"></i><span>Away</span></a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div class="menu-title">
                Navigation
                <div class="pull-right menu-settings">
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown" data-hover="dropdown" data-close-others="true" data-delay="300">
                        <i class="icon-settings"></i>
                    </a>
                    <ul class="dropdown-menu">
                        <li><a href="#" id="reorder-menu" class="reorder-menu">Reorder menu</a></li>
                        <li><a href="#" id="remove-menu" class="remove-menu">Remove elements</a></li>
                        <li><a href="#" id="hide-top-sidebar" class="hide-top-sidebar">Hide user &amp; search</a></li>
                    </ul>
                </div>
            </div>
            <ul class="nav nav-sidebar">
                <li id="menu-dashboard"><a href="/admin/dashboard"><i class="icon-home"></i><span data-translate="dashboard">Dashboard</span></a></li>
                <li id="menu-sendmessage"><a href="/admin/message/send"><i class="icon-envelope-letter"></i><span data-translate="sendmessage">Send Message</span></a></li>
                <li id="menu-business"><a href="/admin/business"><i class="icon-pie-chart"></i><span data-translate="business">My Business</span></a></li>
                <li id="menu-group"><a href="/admin/group"><i class="icon-users"></i><span data-translate="business">My Groups</span></a></li>
                <li id="menu-subscription"><a href="/admin/subscription"><i class="icon-users"></i><span data-translate="profit">Subscriptions</span> </a></li>
                <li class="nav-parent">
                    <a href="#"><i class="icon-settings"></i><span>Settings</span> <span class="fa arrow"></span> </a>
                    <ul class="children collapse">
                        <li id="menu-settings-business"><a href="/admin/business">Business</a> </li>
                        <li><a href="">Groups</a> </li>
                        <li><a href="">Advertisings</a></li>
                        <li><a href="/admin/contact">Contacts</a></li>
                    </ul>
                </li>

                <li id="menu-profile"><a href="/admin/profile"><i class="icon-user"></i><span data-translate="profit">My Profile</span> </a></li>

                <li class="nav-parent">
                    <a href=""><i class="icon-cup"></i><span>Tools </span><span class="fa arrow"></span></a>
                    <ul class="children collapse">
                        <li><a href="extra-widgets.html"> Widgets</a></li>
                        <li><a href="page-coming-soon.html"> Coming Soon</a></li>
                        <li><a href="extra-sliders.html"> Sliders</a></li>
                        <li><a href="maps-google.html"> Google Maps</a></li>
                        <li><a href="maps-vector.html"> Vector Maps</a></li>
                    </ul>
                </li>
            </ul>
            <div class="sidebar-footer clearfix">
                <a class="pull-left footer-settings" href="#" data-rel="tooltip" data-placement="top" data-original-title="Settings">
                    <i class="icon-settings"></i></a>
                <a class="pull-left toggle_fullscreen" href="#" data-rel="tooltip" data-placement="top" data-original-title="Fullscreen">
                    <i class="icon-size-fullscreen"></i></a>
                <a class="pull-left" href="#" data-rel="tooltip" data-placement="top" data-original-title="Lockscreen">
                    <i class="icon-lock"></i></a>
                <a class="pull-left btn-effect" href="/auth/logout" data-modal="modal-1" data-rel="tooltip" data-placement="top" data-original-title="Logout">
                    <i class="icon-power"></i></a>
            </div>
        </div>
    </div>
    <!-- END SIDEBAR -->
    <div class="main-content">
        <!-- BEGIN TOPBAR -->
        <div class="topbar">
            <div class="header-left">
                <div class="topnav">
                    <a class="menutoggle" href="#" data-toggle="sidebar-collapsed"><span class="menu__handle"><span>Menu</span></span></a>
                    <ul class="nav nav-icons">
                        <li><a href="#" class="toggle-sidebar-top"><span class="icon-user-following"></span></a></li>
                        <li><a href="mailbox.html"><span class="octicon octicon-mail-read"></span></a></li>
                        <li><a href="#"><span class="octicon octicon-flame"></span></a></li>
                        <li><a href="builder-page.html"><span class="octicon octicon-rocket"></span></a></li>
                    </ul>
                </div>
            </div>
            <div class="header-right">
                <ul class="header-menu nav navbar-nav">
                    <!-- BEGIN USER DROPDOWN -->
                    <li class="dropdown" id="language-header">
                        <a href="#" data-toggle="dropdown" data-hover="dropdown" data-close-others="true">
                            <i class="icon-globe"></i>
                            <span>Language</span>
                        </a>
                        <ul class="dropdown-menu">
                            <li>
                                <a href="#" data-lang="en"><img src="/assets/images/flags/usa.png" alt="flag-english"> <span>English</span></a>
                            </li>
                            <li>
                                <a href="#" data-lang="es"><img src="/assets/images/flags/spanish.png" alt="flag-english"> <span>Español</span></a>
                            </li>
                            <li>
                                <a href="#" data-lang="fr"><img src="/assets/images/flags/french.png" alt="flag-english"> <span>Français</span></a>
                            </li>
                        </ul>
                    </li>
                    <!-- END USER DROPDOWN -->
                    <!-- BEGIN NOTIFICATION DROPDOWN -->
                    <li class="dropdown" id="notifications-header">
                        <a href="#" data-toggle="dropdown" data-hover="dropdown" data-close-others="true">
                            <i class="icon-bell"></i>
                            <span class="badge badge-danger badge-header">6</span>
                        </a>
                        <ul class="dropdown-menu">
                            <li class="dropdown-header clearfix">
                                <p class="pull-left">12 Pending Notifications</p>
                            </li>
                            <li>
                                <ul class="dropdown-menu-list withScroll" data-height="220">
                                    <li>
                                        <a href="#">
                                            <i class="fa fa-star p-r-10 f-18 c-orange"></i>
                                            Steve have rated your photo
                                            <span class="dropdown-time">Just now</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#">
                                            <i class="fa fa-heart p-r-10 f-18 c-red"></i>
                                            John added you to his favs
                                            <span class="dropdown-time">15 mins</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#">
                                            <i class="fa fa-file-text p-r-10 f-18"></i>
                                            New document available
                                            <span class="dropdown-time">22 mins</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#">
                                            <i class="fa fa-picture-o p-r-10 f-18 c-blue"></i>
                                            New picture added
                                            <span class="dropdown-time">40 mins</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#">
                                            <i class="fa fa-bell p-r-10 f-18 c-orange"></i>
                                            Meeting in 1 hour
                                            <span class="dropdown-time">1 hour</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#">
                                            <i class="fa fa-bell p-r-10 f-18"></i>
                                            Server 5 overloaded
                                            <span class="dropdown-time">2 hours</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#">
                                            <i class="fa fa-comment p-r-10 f-18 c-gray"></i>
                                            Bill comment your post
                                            <span class="dropdown-time">3 hours</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#">
                                            <i class="fa fa-picture-o p-r-10 f-18 c-blue"></i>
                                            New picture added
                                            <span class="dropdown-time">2 days</span>
                                        </a>
                                    </li>
                                </ul>
                            </li>
                            <li class="dropdown-footer clearfix">
                                <a href="#" class="pull-left">See all notifications</a>

                            </li>
                        </ul>
                    </li>
                    <!-- END NOTIFICATION DROPDOWN -->

                    <!-- BEGIN USER DROPDOWN -->
                    <li class="dropdown" id="user-header">
                        <a href="#" data-toggle="dropdown" data-hover="dropdown" data-close-others="true">
                            <?php $hash = md5(strtolower(trim(Auth::user()->email))); ?>
                            <img src="{!! env('GRAVATAR_URL').$hash !!}" alt="user profit image">
                            <span class="username">Hi, {{ ucwords(strtolower(Auth::user()->firstname)) }}</span>
                        </a>
                        <ul class="dropdown-menu">
                            <li>
                                <a href="/admin/profile"><i class="icon-user"></i><span>My Profile</span></a>
                            </li>
                            <li>
                                <a href="#"><i class="icon-calendar"></i><span>My Calendar</span></a>
                            </li>
                            <li>
                                <a href="#"><i class="icon-settings"></i><span>Account Settings</span></a>
                            </li>
                            <li>
                                <a href="#"><i class="icon icons-seo-icons-38"></i><span>Balance: {!! money_format('%(n', Auth::user()->credit) !!}</span></a>
                            </li>
                            <li>
                                <a href="/admin/buycredit"><i class="icon icons-office-42"></i><span>Deposit</span></a>
                            </li>
                            <li>
                                <a href="/auth/logout"><i class="icon-logout"></i><span>Logout</span></a>
                            </li>
                        </ul>
                    </li>
                    <!-- END USER DROPDOWN -->
                    <!-- CHAT BAR ICON -->
                    <li id="quickview-toggle"><a href="#"><i class="icon-bubbles"></i></a></li>
                </ul>
            </div>
            <!-- header-right -->
        </div>
        <!-- END TOPBAR -->
        <!-- BEGIN PAGE CONTENT -->
        <div class="page-content">
            <div class="header">
                @yield('header', '<h2><strong>Dashboard</strong> overview</h2>')

                <div class="breadcrumb-wrapper">
                    @section('breadcrumb')
                        <ol class="breadcrumb">
                            <li><a href="/admin">Reminder</a>
                            </li>
                            <li><a href="#">Pages</a>
                            </li>
                            <li class="active">Dashboard</li>
                        </ol>
                    @show
                </div>
            </div>
            {{--BEGIN PAGE MENU--}}
            <div class="row">
                @yield('page_menu')
            </div>
            {{--END PAGE MENU--}}

            {{--BEGIN NOTICE--}}
            <div class="row">
                @yield('notice')
            </div>
            {{--END NOTICE--}}

            {{--BEGIN CONTENT--}}
            <div class="row">
                @yield('content')
            </div>
            {{--END CONTENT--}}

            <div class="footer">
                <div class="copyright">
                    <p class="pull-left sm-pull-reset">
                        <span>Copyright <span class="copyright">©</span> 2015 </span>
                        <span>CHENS CORP</span>.
                        <span>All rights reserved. </span>
                    </p>
                    <p class="pull-right sm-pull-reset">
                        <span><a href="#" class="m-r-10">Support</a> | <a href="#" class="m-l-10 m-r-10">Terms of use</a> | <a href="#" class="m-l-10">Privacy Policy</a></span>
                    </p>
                </div>
            </div>
        </div>
        <!-- END PAGE CONTENT -->
    </div>
    <!-- END MAIN CONTENT -->
</section>
<!-- BEGIN QUICKVIEW SIDEBAR -->
<div id="quickview-sidebar">
    <div class="quickview-header">
        <ul class="nav nav-tabs">
            <li class="active"><a href="#chat" data-toggle="tab">Chat</a></li>
            <li><a href="#notes" data-toggle="tab">Notes</a></li>
            <li><a href="#settings" data-toggle="tab" class="settings-tab">Settings</a></li>
        </ul>
    </div>
    <div class="quickview">
        <div class="tab-content">
            <div class="tab-pane fade active in" id="chat">
                <div class="chat-body current">
                    <div class="chat-search">
                        <form class="form-inverse" action="#" role="search">
                            <div class="append-icon">
                                <input type="text" class="form-control" placeholder="Search contact...">
                                <i class="icon-magnifier"></i>
                            </div>
                        </form>
                    </div>
                    <div class="chat-groups">
                        <div class="title">GROUP CHATS</div>
                        <ul>
                            <li><i class="turquoise"></i> Favorites</li>
                            <li><i class="turquoise"></i> Office Work</li>
                            <li><i class="turquoise"></i> Friends</li>
                        </ul>
                    </div>
                    <div class="chat-list">
                        <div class="title">FAVORITES</div>
                        <ul>
                            <li class="clearfix">
                                <div class="user-img">
                                    <img src="/assets/images/avatars/avatar13.png" alt="avatar" />
                                </div>
                                <div class="user-details">
                                    <div class="user-name">Bobby Brown</div>
                                    <div class="user-txt">On the road again...</div>
                                </div>
                                <div class="user-status">
                                    <i class="online"></i>
                                </div>
                            </li>
                            <li class="clearfix">
                                <div class="user-img">
                                    <img src="/assets/images/avatars/avatar5.png" alt="avatar" />
                                    <div class="pull-right badge badge-danger">3</div>
                                </div>
                                <div class="user-details">
                                    <div class="user-name">Alexa Johnson</div>
                                    <div class="user-txt">Still at the beach</div>
                                </div>
                                <div class="user-status">
                                    <i class="away"></i>
                                </div>
                            </li>
                            <li class="clearfix">
                                <div class="user-img">
                                    <img src="/assets/images/avatars/avatar10.png" alt="avatar" />
                                </div>
                                <div class="user-details">
                                    <div class="user-name">Bobby Brown</div>
                                    <div class="user-txt">On stage...</div>
                                </div>
                                <div class="user-status">
                                    <i class="busy"></i>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div class="chat-list">
                        <div class="title">FRIENDS</div>
                        <ul>
                            <li class="clearfix">
                                <div class="user-img">
                                    <img src="/assets/images/avatars/avatar7.png" alt="avatar" />
                                    <div class="pull-right badge badge-danger">3</div>
                                </div>
                                <div class="user-details">
                                    <div class="user-name">James Miller</div>
                                    <div class="user-txt">At work...</div>
                                </div>
                                <div class="user-status">
                                    <i class="online"></i>
                                </div>
                            </li>
                            <li class="clearfix">
                                <div class="user-img">
                                    <img src="/assets/images/avatars/avatar11.png" alt="avatar" />
                                </div>
                                <div class="user-details">
                                    <div class="user-name">Fred Smith</div>
                                    <div class="user-txt">Waiting for tonight</div>
                                </div>
                                <div class="user-status">
                                    <i class="offline"></i>
                                </div>
                            </li>
                            <li class="clearfix">
                                <div class="user-img">
                                    <img src="/assets/images/avatars/avatar8.png" alt="avatar" />
                                </div>
                                <div class="user-details">
                                    <div class="user-name">Ben Addams</div>
                                    <div class="user-txt">On my way to NYC</div>
                                </div>
                                <div class="user-status">
                                    <i class="offline"></i>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="chat-conversation">
                    <div class="conversation-header">
                        <div class="user clearfix">
                            <div class="chat-back">
                                <i class="icon-action-undo"></i>
                            </div>
                            <div class="user-details">
                                <div class="user-name">James Miller</div>
                                <div class="user-txt">On the road again...</div>
                            </div>
                        </div>
                    </div>
                    <div class="conversation-body">
                        <ul>
                            <li class="img">
                                <div class="chat-detail">
                                    <span class="chat-date">today, 10:38pm</span>
                                    <div class="conversation-img">
                                        <img src="/assets/images/avatars/avatar4.png" alt="avatar 4"/>
                                    </div>
                                    <div class="chat-bubble">
                                        <span>Hi you!</span>
                                    </div>
                                </div>
                            </li>
                            <li class="img">
                                <div class="chat-detail">
                                    <span class="chat-date">today, 10:45pm</span>
                                    <div class="conversation-img">
                                        <img src="/assets/images/avatars/avatar4.png" alt="avatar 4"/>
                                    </div>
                                    <div class="chat-bubble">
                                        <span>Are you there?</span>
                                    </div>
                                </div>
                            </li>
                            <li class="img">
                                <div class="chat-detail">
                                    <span class="chat-date">today, 10:51pm</span>
                                    <div class="conversation-img">
                                        <img src="/assets/images/avatars/avatar4.png" alt="avatar 4"/>
                                    </div>
                                    <div class="chat-bubble">
                                        <span>Send me a message when you come back.</span>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div class="conversation-message">
                        <input type="text" placeholder="Your message..." class="form-control form-white send-message" />
                        <div class="item-footer clearfix">
                            <div class="footer-actions">
                                <i class="icon-rounded-marker"></i>
                                <i class="icon-rounded-camera"></i>
                                <i class="icon-rounded-paperclip-oblique"></i>
                                <i class="icon-rounded-alarm-clock"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="tab-pane fade" id="notes">
                <div class="list-notes current withScroll">
                    <div class="notes ">
                        <div class="row">
                            <div class="col-md-12">
                                <div id="add-note">
                                    <i class="fa fa-plus"></i>ADD A NEW NOTE
                                </div>
                            </div>
                        </div>
                        <div id="notes-list">
                            <div class="note-item media current fade in">
                                <button class="close">×</button>
                                <div>
                                    <div>
                                        <p class="note-name">Reset my account password</p>
                                    </div>
                                    <p class="note-desc hidden">Break security reasons.</p>
                                    <p><small>Tuesday 6 May, 3:52 pm</small></p>
                                </div>
                            </div>
                            <div class="note-item media fade in">
                                <button class="close">×</button>
                                <div>
                                    <div>
                                        <p class="note-name">Call John</p>
                                    </div>
                                    <p class="note-desc hidden">He have my laptop!</p>
                                    <p><small>Thursday 8 May, 2:28 pm</small></p>
                                </div>
                            </div>
                            <div class="note-item media fade in">
                                <button class="close">×</button>
                                <div>
                                    <div>
                                        <p class="note-name">Buy a car</p>
                                    </div>
                                    <p class="note-desc hidden">I'm done with the bus</p>
                                    <p><small>Monday 12 May, 3:43 am</small></p>
                                </div>
                            </div>
                            <div class="note-item media fade in">
                                <button class="close">×</button>
                                <div>
                                    <div>
                                        <p class="note-name">Don't forget my notes</p>
                                    </div>
                                    <p class="note-desc hidden">I have to read them...</p>
                                    <p><small>Wednesday 5 May, 6:15 pm</small></p>
                                </div>
                            </div>
                            <div class="note-item media current fade in">
                                <button class="close">×</button>
                                <div>
                                    <div>
                                        <p class="note-name">Reset my account password</p>
                                    </div>
                                    <p class="note-desc hidden">Break security reasons.</p>
                                    <p><small>Tuesday 6 May, 3:52 pm</small></p>
                                </div>
                            </div>
                            <div class="note-item media fade in">
                                <button class="close">×</button>
                                <div>
                                    <div>
                                        <p class="note-name">Call John</p>
                                    </div>
                                    <p class="note-desc hidden">He have my laptop!</p>
                                    <p><small>Thursday 8 May, 2:28 pm</small></p>
                                </div>
                            </div>
                            <div class="note-item media fade in">
                                <button class="close">×</button>
                                <div>
                                    <div>
                                        <p class="note-name">Buy a car</p>
                                    </div>
                                    <p class="note-desc hidden">I'm done with the bus</p>
                                    <p><small>Monday 12 May, 3:43 am</small></p>
                                </div>
                            </div>
                            <div class="note-item media fade in">
                                <button class="close">×</button>
                                <div>
                                    <div>
                                        <p class="note-name">Don't forget my notes</p>
                                    </div>
                                    <p class="note-desc hidden">I have to read them...</p>
                                    <p><small>Wednesday 5 May, 6:15 pm</small></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="detail-note note-hidden-sm">
                    <div class="note-header clearfix">
                        <div class="note-back">
                            <i class="icon-action-undo"></i>
                        </div>
                        <div class="note-edit">Edit Note</div>
                        <div class="note-subtitle">title on first line</div>
                    </div>
                    <div id="note-detail">
                        <div class="note-write">
                            <textarea class="form-control" placeholder="Type your note here"></textarea>
                        </div>
                    </div>
                </div>
            </div>
            <div class="tab-pane fade" id="settings">
                <div class="settings">
                    <div class="title">ACCOUNT SETTINGS</div>
                    <div class="setting">
                        <span> Show Personal Statut</span>
                        <label class="switch pull-right">
                            <input type="checkbox" class="switch-input" checked>
                            <span class="switch-label" data-on="On" data-off="Off"></span>
                            <span class="switch-handle"></span>
                        </label>
                        <p class="setting-info">Lorem ipsum dolor sit amet consectetuer.</p>
                    </div>
                    <div class="setting">
                        <span> Show my Picture</span>
                        <label class="switch pull-right">
                            <input type="checkbox" class="switch-input" checked>
                            <span class="switch-label" data-on="On" data-off="Off"></span>
                            <span class="switch-handle"></span>
                        </label>
                        <p class="setting-info">Lorem ipsum dolor sit amet consectetuer.</p>
                    </div>
                    <div class="setting">
                        <span> Show my Location</span>
                        <label class="switch pull-right">
                            <input type="checkbox" class="switch-input">
                            <span class="switch-label" data-on="On" data-off="Off"></span>
                            <span class="switch-handle"></span>
                        </label>
                        <p class="setting-info">Lorem ipsum dolor sit amet consectetuer.</p>
                    </div>
                    <div class="title">CHAT</div>
                    <div class="setting">
                        <span> Show User Image</span>
                        <label class="switch pull-right">
                            <input type="checkbox" class="switch-input" checked>
                            <span class="switch-label" data-on="On" data-off="Off"></span>
                            <span class="switch-handle"></span>
                        </label>
                    </div>
                    <div class="setting">
                        <span> Show Fullname</span>
                        <label class="switch pull-right">
                            <input type="checkbox" class="switch-input" checked>
                            <span class="switch-label" data-on="On" data-off="Off"></span>
                            <span class="switch-handle"></span>
                        </label>
                    </div>
                    <div class="setting">
                        <span> Show Location</span>
                        <label class="switch pull-right">
                            <input type="checkbox" class="switch-input">
                            <span class="switch-label" data-on="On" data-off="Off"></span>
                            <span class="switch-handle"></span>
                        </label>
                    </div>
                    <div class="setting">
                        <span> Show Unread Count</span>
                        <label class="switch pull-right">
                            <input type="checkbox" class="switch-input" checked>
                            <span class="switch-label" data-on="On" data-off="Off"></span>
                            <span class="switch-handle"></span>
                        </label>
                    </div>
                    <div class="title">STATISTICS</div>
                    <div class="settings-chart">
                        <div class="clearfix">
                            <div class="chart-title">Stat 1</div>
                            <div class="chart-number">82%</div>
                        </div>
                        <div class="progress">
                            <div class="progress-bar progress-bar-primary setting1" data-transitiongoal="82"></div>
                        </div>
                    </div>
                    <div class="settings-chart">
                        <div class="clearfix">
                            <div class="chart-title">Stat 2</div>
                            <div class="chart-number">43%</div>
                        </div>
                        <div class="progress">
                            <div class="progress-bar progress-bar-primary setting2" data-transitiongoal="43"></div>
                        </div>
                    </div>
                    <div class="m-t-30" style="width:100%">
                        <canvas id="setting-chart" height="300"></canvas>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<!-- END QUICKVIEW SIDEBAR -->
<!-- BEGIN SEARCH -->
<div id="morphsearch" class="morphsearch">
    <form class="morphsearch-form">
        <input class="morphsearch-input" type="search" placeholder="Search..."/>
        <button class="morphsearch-submit" type="submit">Search</button>
    </form>
    <div class="morphsearch-content withScroll">
        <div class="dummy-column user-column">
            <h2>Users</h2>
            <a class="dummy-media-object" href="#">
                <img src="/assets/images/avatars/avatar1_big.png" alt="Avatar 1"/>
                <h3>John Smith</h3>
            </a>
            <a class="dummy-media-object" href="#">
                <img src="/assets/images/avatars/avatar2_big.png" alt="Avatar 2"/>
                <h3>Bod Dylan</h3>
            </a>
            <a class="dummy-media-object" href="#">
                <img src="/assets/images/avatars/avatar3_big.png" alt="Avatar 3"/>
                <h3>Jenny Finlan</h3>
            </a>
            <a class="dummy-media-object" href="#">
                <img src="/assets/images/avatars/avatar4_big.png" alt="Avatar 4"/>
                <h3>Harold Fox</h3>
            </a>
            <a class="dummy-media-object" href="#">
                <img src="/assets/images/avatars/avatar5_big.png" alt="Avatar 5"/>
                <h3>Martin Hendrix</h3>
            </a>
            <a class="dummy-media-object" href="#">
                <img src="/assets/images/avatars/avatar6_big.png" alt="Avatar 6"/>
                <h3>Paul Ferguson</h3>
            </a>
        </div>
        <div class="dummy-column">
            <h2>Articles</h2>
            <a class="dummy-media-object" href="#">
                <img src="/assets/images/gallery/1.jpg" alt="1"/>
                <h3>How to change webdesign?</h3>
            </a>
            <a class="dummy-media-object" href="#">
                <img src="/assets/images/gallery/2.jpg" alt="2"/>
                <h3>News From the sky</h3>
            </a>
            <a class="dummy-media-object" href="#">
                <img src="/assets/images/gallery/3.jpg" alt="3"/>
                <h3>Where is the cat?</h3>
            </a>
            <a class="dummy-media-object" href="#">
                <img src="/assets/images/gallery/4.jpg" alt="4"/>
                <h3>Just another funny story</h3>
            </a>
            <a class="dummy-media-object" href="#">
                <img src="/assets/images/gallery/5.jpg" alt="5"/>
                <h3>How many water we drink every day?</h3>
            </a>
            <a class="dummy-media-object" href="#">
                <img src="/assets/images/gallery/6.jpg" alt="6"/>
                <h3>Drag and drop tutorials</h3>
            </a>
        </div>
        <div class="dummy-column">
            <h2>Recent</h2>
            <a class="dummy-media-object" href="#">
                <img src="/assets/images/gallery/7.jpg" alt="7"/>
                <h3>Design Inspiration</h3>
            </a>
            <a class="dummy-media-object" href="#">
                <img src="/assets/images/gallery/8.jpg" alt="8"/>
                <h3>Animals drawing</h3>
            </a>
            <a class="dummy-media-object" href="#">
                <img src="/assets/images/gallery/9.jpg" alt="9"/>
                <h3>Cup of tea please</h3>
            </a>
            <a class="dummy-media-object" href="#">
                <img src="/assets/images/gallery/10.jpg" alt="10"/>
                <h3>New application arrive</h3>
            </a>
            <a class="dummy-media-object" href="#">
                <img src="/assets/images/gallery/11.jpg" alt="11"/>
                <h3>Notification prettify</h3>
            </a>
            <a class="dummy-media-object" href="#">
                <img src="/assets/images/gallery/12.jpg" alt="12"/>
                <h3>My article is the last recent</h3>
            </a>
        </div>
    </div>
    <!-- /morphsearch-content -->
    <span class="morphsearch-close"></span>
</div>
<!-- END QUICKVIEW SIDEBAR -->
<!-- BEGIN PRELOADER -->
<div class="loader-overlay">
    <div class="spinner">
        <div class="bounce1"></div>
        <div class="bounce2"></div>
        <div class="bounce3"></div>
    </div>
</div>
<!-- END PRELOADER -->
<a href="#" class="scrollup"><i class="fa fa-angle-up"></i></a>
<script src="/assets/plugins/jquery/jquery-1.11.1.min.js"></script>
<script src="/assets/plugins/jquery/jquery-migrate-1.2.1.min.js"></script>
<script src="/assets/plugins/jquery-ui/jquery-ui-1.11.2.min.js"></script>
<script src="/assets/plugins/gsap/main-gsap.min.js"></script>
<script src="/assets/plugins/bootstrap/js/bootstrap.min.js"></script>
<script src="/assets/plugins/jquery-cookies/jquery.cookies.min.js"></script> <!-- Jquery Cookies, for theme -->
<script src="/assets/plugins/jquery-block-ui/jquery.blockUI.min.js"></script> <!-- simulate synchronous behavior when using AJAX -->
<script src="/assets/plugins/bootbox/bootbox.min.js"></script> <!-- Modal with Validation -->
<script src="/assets/plugins/mcustom-scrollbar/jquery.mCustomScrollbar.concat.min.js"></script> <!-- Custom Scrollbar sidebar -->
<script src="/assets/plugins/bootstrap-dropdown/bootstrap-hover-dropdown.min.js"></script> <!-- Show Dropdown on Mouseover -->
<script src="/assets/plugins/charts-sparkline/sparkline.min.js"></script> <!-- Charts Sparkline -->
<script src="/assets/plugins/retina/retina.min.js"></script> <!-- Retina Display -->
<script src="/assets/plugins/select2/select2.min.js"></script> <!-- Select Inputs -->
<script src="/assets/plugins/icheck/icheck.min.js"></script> <!-- Checkbox & Radio Inputs -->
<script src="/assets/plugins/backstretch/backstretch.min.js"></script> <!-- Background Image -->
<script src="/assets/plugins/bootstrap-progressbar/bootstrap-progressbar.min.js"></script> <!-- Animated Progress Bar -->
<script src="/assets/plugins/charts-chartjs/Chart.min.js"></script>
<script src="/assets/js/builder.js"></script> <!-- Theme Builder -->
<script src="/assets/js/sidebar_hover.js"></script> <!-- Sidebar on Hover -->
<script src="/assets/js/widgets/notes.js"></script> <!-- Notes Widget -->
<script src="/assets/js/quickview.js"></script> <!-- Chat Script -->
<script src="/assets/js/pages/search.js"></script> <!-- Search Script -->
<script src="/alertify/alertify.min.js"></script>
<script src="/assets/js/plugins.js"></script> <!-- Main Plugin Initialization Script -->
<script src="/assets/js/application.js"></script> <!-- Main Application Script -->

@yield('pagejs')


<script src="/layout3/js/layout.js"></script>
<script src="/md-layout3/material-design/js/material.js"></script>

<script>
    $.material.init();
</script> <!-- Main Application Script -->
</body>
</html>