@extends("admin.master")


@section("title", "admin | main")

@section("css")
    <link rel="stylesheet" href="https://cdn.datatables.net/1.12.1/css/dataTables.bootstrap5.min.css">
    <style>
        body {
            width: 100vw;
            height: calc(100vh - 56px);

            min-width: 280px;
            min-height: 576px;
            overflow: hidden;
        }
        #main-panel {
            overflow: auto hidden;
        }

    </style>
@endsection


@section("body")
    <x-navbar main="" settings="active"></x-navbar>

    <div id="main-panel" class="container-fluid pt-3 w-100 h-100">
        <div class="container-lg py-4">
            <div class="row">
                <div class="col-12 col-md-6 offset-md-3 col-lg-4 offset-lg-4">
                    <div class="card border-0 rounded-0 bg-white shadow">
                        <div class="card-body">
                            <form action="{{ url("/admin/changepass") }}" method="POST">
                                @csrf
                                <div class="container-fluid px-0">
                                    <div class="row gy-2">
                                        {{-- old --}}
                                        <div class="col-12">
                                            <small class="text-muted">old password</small>
                                            <div class="input-group">
                                                <span class="input-group-text">
                                                    <i class="bi bi-lock-fill text-muted"></i>
                                                </span>
                                                <input class="form-control" type="password" name="old_password" placeholder="old password" required>
                                            </div>
                                            @if (Session::has("old_password"))
                                                <small class="text-danger">{{ Session::get("old_password") }}</small>
                                            @endif
                                        </div>
                                        {{-- password --}}
                                        <div class="col-12">
                                            <small class="text-muted">password</small>
                                            <div class="input-group">
                                                <span class="input-group-text">
                                                    <i class="bi bi-lock-fill m-0 p-0 text-muted"></i>
                                                </span>
                                                <input class="form-control" type="password" name="password" placeholder="password" required>
                                            </div>
                                        </div>
                                        {{-- confirm password --}}
                                        <div class="col-12">
                                            <small class="text-muted">confirm password</small>
                                            <div class="input-group">
                                                <span class="input-group-text">
                                                    <i class="bi bi-check-circle-fill m-0 p-0 text-muted"></i>
                                                </span>
                                                <input class="form-control" type="password" name="password_confirmation" placeholder="confirm password" required>
                                            </div>
                                            @error("password")
                                                <small class="text-danger">{{ $message }}</small>
                                            @enderror
                                        </div>
                                        {{-- submit --}}
                                        <div class="col-12">
                                            <span class="d-inline-block w-100 rounded shadow-sm mt-2">
                                                <button class="btn btn-primary w-100" type="submit">CHANGE PASSWORD</button>
                                            </span>
                                        </div>
                                        <div class="col-12">
                                            <span class="float-end">
                                                <a class="text-decoration-none" href="{{ url("/admin/login") }}">login</a>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection




@section("js")
@endsection
