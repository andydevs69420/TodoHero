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

        .dataTables_length {
            text-align: left !important;
        }

        .dataTables_length > label > select {
            margin-left: 14px !important;
        }

        @media screen and (min-width: 768px) {
            .dataTables_length > label > select {
                margin-left: initial !important;
            }
        }

        .dataTables_filter {
            margin-top: .5em !important;
            width: 100% !important;
            text-align: left !important;
        }

        .dataTables_filter > label {
            width: 100% !important;
        }

        .dataTables_filter > label > input {
            width: calc(100% - 57.8px) !important;
        }

        @media screen and (min-width: 768px) {
            .dataTables_filter {
                margin: 0 !important;
                width: auto !important;
                text-align: right !important;
            }
            .dataTables_filter > label, .dataTables_filter input {
                width: auto !important;
            }
        }

    </style>
@endsection


@section("body")
    <x-navbar main="active" settings=""></x-navbar>

    <div id="main-panel" class="container-fluid pt-3 w-100 h-100">

        <table id="data-table" class="table table-striped w-100">
            <thead>
                <tr>
                    <th class="text-left" scope="col">{{ __("Name") }}</th>
                    <th class="text-left" scope="col">{{ __("Email") }}</th>
                    <th class="text-left" scope="col">{{ __("Plan") }}</th>
                    <th class="text-center" scope="col">{{ __("Action") }}</th>
                </tr>
            </thead>
            <tbody>

                @foreach($all as $user)
                    <tr>
                        <td style="vertical-align: middle !important;">{{$user->name}}</td>
                        <td style="vertical-align: middle !important;">{{ $user->email }}</td>
                        <td style="vertical-align: middle !important;">
                            <span class="badge rounded-pill bg-warning">
                                {{ $user->plan_name }}
                            </span>
                        </td>
                        <td class="text-center" style="vertical-align: middle !important;">
                            <span class="d-inline-block mx-auto">
                                <a class="btn btn-sm btn-danger" href="{{ url("/admin/user/delete/" . $user->user_id_fk) }}">DELETE</a>
                            </span>
                        </td>
                    </tr>
                @endforeach

            </tbody>
        </table>


    </div>
@endsection




@section("js")
    <script src="https://cdn.datatables.net/1.12.1/js/jquery.dataTables.min.js"></script>
    <script src="https://cdn.datatables.net/1.12.1/js/dataTables.bootstrap5.min.js"></script>
    <script>
        $("#data-table").DataTable({
            "pageLength": 50
        });
    </script>
@endsection
