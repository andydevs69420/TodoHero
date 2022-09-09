<nav class="navbar navbar-expand-sm bg-white shadow-sm">
    <div class="container-fluid">
        <a class="navbar-brand" href="#">TodoHero</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item">
                    <a class="nav-link {{$main}}" href="{{ url("/admin/main") }}">Main</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link {{$settings}}" href="{{ url("/admin/settings") }}">Settings</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="{{ url("/admin/logout") }}">Logout</a>
                </li>
            </ul>
        </div>
    </div>
</nav>
