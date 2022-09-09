
@extends('admin.master')



@section("title", "admin | login")


@section("body")
    <div class="container-lg py-4">
        <div class="row">
            <div class="col-12 col-md-6 offset-md-3 col-lg-4 offset-lg-4">
                <div class="card border-0 rounded-0 bg-white shadow">
                    <div class="card-body">
                        <form action="{{ url("/admin/signup/attempt") }}" method="POST">
                            @csrf
                            <div class="container-fluid px-0">
                                <div class="row gy-2">
                                    <div class="col-12">
                                        @if (Session::has("error"))
                                            <span class="d-block alert alert-danger my-2" role="alert">
                                                {{ Session::get("error") }}
                                            </span>
                                        @endif
                                    </div>
                                    {{-- email --}}
                                    <div class="col-12">
                                        <small class="text-muted">email</small>
                                        <div class="input-group">
                                            <span class="input-group-text">
                                                <i class="bi bi-envelope-fill text-muted"></i>
                                            </span>
                                            <input class="form-control" type="email" name="email" placeholder="email">
                                        </div>
                                        @error("email")
                                            <small class="text-danger">{{ $message }}</small>
                                        @enderror
                                    </div>
                                    {{-- password --}}
                                    <div class="col-12">
                                        <small class="text-muted">password</small>
                                        <div class="input-group">
                                            <span class="input-group-text">
                                                <i class="bi bi-lock-fill m-0 p-0 text-muted"></i>
                                            </span>
                                            <input class="form-control" type="password" name="password" placeholder="password">
                                        </div>
                                        @error("password")
                                            <small class="text-danger">{{ $message }}</small>
                                        @enderror
                                    </div>
                                    {{-- submit --}}
                                    <div class="col-12">
                                        <span class="d-inline-block w-100 rounded shadow-sm mt-2">
                                            <button class="btn btn-primary w-100" type="submit">LOGIN</button>
                                        </span>
                                    </div>
                                    <div class="col-12">
                                        <span class="float-end">
                                            <a class="text-decoration-none" href="{{ url("/admin/signup") }}">signup</a>
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
@endsection



@section("js")
@endsection
