<?php
$v = "?v=" . date('dmsi');
?>
<!DOCTYPE html>
<html>
    <head>
        <title>PROMART VUEJS</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <meta name="HandheldFriendly" content="true">
        <style>
            html {
                -webkit-text-size-adjust: none;
                touch-action: manipulation;
            }
        </style>

        <link href="bootstrap/css/bootstrap.min.css" rel="stylesheet" type="text/css"/>
        <!-- FONT AWESOME -->
        <link href="plugins/fontawesome/css/all.css" rel="stylesheet" type="text/css"/>
        <link href="plugins/fontawesome/css/fontawesome.css" rel="stylesheet" type="text/css"/>
        <link href="plugins/fontawesome/css/brands.css" rel="stylesheet" type="text/css"/>
        <link href="plugins/fontawesome/css/solid.css" rel="stylesheet" type="text/css"/>
        <!-- END FONT AWESOME -->

        <!-- SweetAlert2 -->
        <script src="plugins/sweetalert2/sweetalert2.all.min.js" type="text/javascript"></script>
        <link href="main.css" rel="stylesheet" type="text/css"/>
    </head>
    <body>
        <header>
            <h2 class="text-center text-dark">
                <span class="badge badge-warning"> PROMART 2.0</span>
            </h2>
            <h6 class="text-center text-dark">
                HOMECENTER
            </h6>
        </header>

        <div id="appClientes">
            <div class="container">
                <div class="row">
                    <div class="col">
                        <button @click="btnNuevo" class="btn btn-success" title="Nuevo">
                            <i class="fas fa-plus-circle"></i>
                        </button>
                    </div>
                    <div class="col text-right">
                        <h5>Cant. de Clientes: <span class="badge badge-success">{{ totalCliente }}</span></h5>
                        <h5>Prom. de Edades: <span class="badge badge-success">{{ promedioEdades }}</span></h5>
                        <h5>Desviación Estandar: <span class="badge badge-success">{{ desviacionEstandar }}</span></h5>
                    </div>
                </div>

                <div class="row mt-5">
                    <div class="col-lg-12">
                        <table class="table table-striped">
                            <thead>
                                <tr class="bg-primary text-light">
                                    <th>#</th>
                                    <th>NOMBRE</th>
                                    <th>APELLIDO</th>
                                    <th>EDAD</th>
                                    <th>FECHA DE NACIMIENTO</th>
                                    <th>FECHA PROBABLE DE MUERTE</th>
                                    <th>OPCIONES</th>
                                </tr>
                            </thead>
                            <tbody>

                                <!-- LISTA DE CLIENTES -->
                                <tr v-for="(cliente,indices) of clientes">
                                    <td>{{ indices + 1 }}</td>
                                    <td>{{ cliente.nombre }}</td>
                                    <td>{{ cliente.apellido }}</td>
                                    <td>{{ cliente.edad }}</td>
                                    <td>{{ cliente.fechanacimiento }}</td>
                                    <td>
                                        Hasta 
                                        {{
                                        parseInt(cliente.anio) + 73
                                        }}
                                        / Te quedan 
                                        {{ 
                                        parseInt(73) - parseInt(cliente.edad)
                                        }} Años
                                    </td>
                                    <td>
                                        <div class="btn-group" role="group">
                                            <button class="btn btn-secondary" title="Editar" 
                                                    @click="btnEditar(cliente.id,cliente.nombre,cliente.apellido,cliente.edad,cliente.fechanacimiento)">
                                                <i class="fas fa-pencil-alt"></i>
                                            </button>
                                            <button class="btn btn-danger" title="Eliminar" 
                                                    @click="btnBorrar(cliente.id)">
                                                <i class="fas fa-trash-alt"></i>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                                <!-- FIN LISTA DE CLIENTES -->

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>

        <script src="jquery/jquery-3.6.0.min.js" type="text/javascript"></script>
        <script src="popper/popper.min.js<?php echo $v; ?>" type="text/javascript"></script>

        <script src="bootstrap/js/bootstrap.min.js" type="text/javascript"></script>
        <!-- Vue JS -->
        <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js" type="text/javascript"></script>

        <!-- Axios -->
        <script src="https://unpkg.com/axios/dist/axios.min.js"></script>

        <!-- SweetAlert2 -->
        <link href="plugins/sweetalert2/sweetalert2.min.css" rel="stylesheet" type="text/css"/>

        <!-- Main JS -->
        <script src="main.js" type="text/javascript"></script>
    </body>
</html>