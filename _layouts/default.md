---
---
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="">
    <meta name="author" content="Piotr Kosmowski">

    <title>Piotr Kosmowski page</title>
    <script>
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-84313741-1', 'auto');
  ga('send', 'pageview');

    </script>

    <!-- Fonts -->
    <link href="http://fonts.googleapis.com/css?family=Source+Sans+Pro%3A400%2C400italic%2C700" rel="stylesheet">
    <link href="http://fonts.googleapis.com/css?family=Varela+Round" rel="stylesheet">

    <!-- Bootstrap core CSS -->
    <link href="{{site.baseurl}}/css/bootstrap.min.css" rel="stylesheet">
    <link href="{{site.baseurl}}/css/font-awesome.min.css" rel="stylesheet">
    <link href="{{site.baseurl}}/css/bootstrap-social.css" rel="stylesheet">

    <!-- Styles -->
    <link href="{{site.baseurl}}/css/main.css" rel="stylesheet">

    <script src="{{site.baseurl}}/js/jquery-1.10.2.min.js"></script>
    <script src="{{site.baseurl}}/js/jquery.cookie.js"></script>
    <script src="{{site.baseurl}}/js/jquery.stoc.js"></script>
    <script src="{{site.baseurl}}/js/slideshow.js"></script>

    <!-- HTML5 shiv for IE8 support -->
    <!--[if lt IE 9]>
    <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
    <![endif]-->
</head>

<body>
<img id="toggle-sidebar-button" src="/img/toogle-sidebar.png" alt="toogle sidebar button"/>
<section id="sidebar" class="col-sm-3 sidebar" style="display: inline-block;">
    {% include sidebar.html %}
</section>

<section id="main" class="col-sm-9">
    <div id="main-container">
        {{ content }}
        {% include footer.html %}
    </div>
</section>
</body>
<script type="text/javascript">
    var layoutConfig = {
        'mainPaddingWithSidebar': $('#main').css('padding-right'),
        'mainPaddingWithoutSidebar': '0px',
        'fadeTime': 500,
        'cookieToogleSidebarName': 'sidebar-colapsed'
    };

    function saveSidebarCollapseState(isCollapsed) {
        if (isCollapsed) {
            $.cookie('sidebar-colapsed', true, {path: '/'});
        } else {
            $.removeCookie(layoutConfig.cookieToogleSidebarName, {path: '/'});
        }
    }
    ;

    function isSidebarPersistedAsCollapsed() {
        return $.cookie(layoutConfig.cookieToogleSidebarName);
    }
    ;

    function isSidebarCollapsed() {
        return $('#sidebar').is(':visible');
    }
    ;

    function toogleSidebarWithAnimation() {
        var isCollapsed = isSidebarCollapsed();
        if (isCollapsed) {
            $('#sidebar').fadeOut(layoutConfig.fadeTime, function () {
                $('#main').animate({'padding-right': layoutConfig.mainPaddingWithoutSidebar,}, 'slow');
            });
        } else {
            $('#main').animate({'padding-right': layoutConfig.mainPaddingWithSidebar}, 'slow', function () {
                $('#sidebar').fadeIn(layoutConfig.fadeTime);
            });

        }
        saveSidebarCollapseState(isCollapsed);
    }
    ;

    function setToggleButtonMinimizing() {

    }
    ;

    function setToggleButtonMaximizing() {

    }
    ;

    $('#toggle-sidebar-button').click(function () {
        toogleSidebarWithAnimation();
    });

    $().ready(function () {
        if (isSidebarPersistedAsCollapsed()) {
            $('#main').css('padding-right', layoutConfig.mainPaddingWithoutSidebar);
            $('#sidebar').hide();
        }
    });

</script>
</html>
