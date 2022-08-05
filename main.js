var url = "database/crud.php";
var exports = {};



// FUNCIONES
// # EJM: https://es.acervolima.com/como-obtener-la-desviacion-estandar-de-una-matriz-de-numeros-usando-javascript/
function desviacionEstandar(arr) {
    // Creating the mean with Array.reduce
    let mean = arr.reduce((acc, curr) => {
        return acc + curr
    }, 0) / arr.length;

    // Assigning (value - mean) ^ 2 to every array item
    arr = arr.map((k) => {
        return (k - mean) ** 2
    });

    // Calculating the sum of updated array
    let sum = arr.reduce((acc, curr) => acc + curr, 0);

    // Calculating the variance
    let variance = sum / arr.length;

    // Returning the Standered deviation
    return Math.sqrt(sum / arr.length);
}

var appClientes = new Vue({
    el: "#appClientes",
    data: {
        clientes: [],
        nombre: "",
        apellido: "",
        edad: 1,
        fechanacimiento: "",
        total: 0,
        promedad: 0,
        contar: 0,
        desvestandar: 0,
        arrdesvedades: [],
        arrdesvedadesprom: [],
        vartemp: ""
    },
    methods: {
        btnNuevo: async function () {
            const {value: formValues} = await Swal.fire({
                title: 'NUEVO CLIENTE',
                html:
                        '<div class="row" style="text-align: left;">' +
                        '<label class="col-sm-12 col-form-label">NOMBRE:</label><br><div class="col-sm-12"><input type="text" id="nombre" class="form-control"></div>' +
                        '<label class="col-sm-12 col-form-label">APELLIDO:</label><br><div class="col-sm-12"><input type="text" id="apellido" class="form-control"></div>' +
                        '<label class="col-sm-12 col-form-label">EDAD:</label><br><div class="col-sm-12"><input type="number" step="1" pattern="\d+" id="edad" class="form-control"></div>' +
                        '<label class="col-sm-12 col-form-label">FEC. NACIMIENTO:</label><br><div class="col-sm-12"><input type="date" id="fechanacimiento" class="form-control"></div>' +
                        '<br>' + '<br>' +
                        '</div>',
                focusConfirm: false,
                showCancelButton: "true",
                confirmButtonText: "Guardar",
                confirmButtonColor: "#1cc88a",
                cancelButtonColor: "#3085d6",
                preConfirm: () => {
                    return [
                        this.nombre = document.getElementById('nombre').value,
                        this.apellido = document.getElementById('apellido').value,
                        this.edad = document.getElementById('edad').value,
                        this.fechanacimiento = document.getElementById('fechanacimiento').value
                    ];
                }
            });
            if (this.nombre == "" || this.apellido == "" || this.edad == "" || this.fechanacimiento == "") {
                Swal.fire(
                        'info',
                        'Datos Incompletos'
                        );
            } else {
                this.registrarClientes();
                const Toast = Swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timmer: 3000
                });
                Toast.fire({
                    type: 'success',
                    title: '!Cliente Registrado¡'
                });
            }
        },
        btnEditar: async function (id, nombre, apellido, edad, fechanacimiento) {
            await Swal.fire({
                title: 'EDITAR CLIENTE',
                html:
                        '<div class="row" style="text-align: left;">' +
                        '<label class="col-sm-12 col-form-label">NOMBRE:</label><br><div class="col-sm-12"><input type="text" id="nombre" class="form-control" value="' + nombre + '"></div>' +
                        '<label class="col-sm-12 col-form-label">APELLIDO:</label><br><div class="col-sm-12"><input type="text" id="apellido" class="form-control" value="' + apellido + '"></div>' +
                        '<label class="col-sm-12 col-form-label">EDAD:</label><br><div class="col-sm-12"><input type="text" id="edad" class="form-control" value="' + edad + '"></div>' +
                        '<label class="col-sm-12 col-form-label">FEC. NACIMIENTO:</label><br><div class="col-sm-12"><input type="date" id="fechanacimiento" class="form-control" value="' + fechanacimiento + '"></div>' +
                        '<br>' + '<br>' +
                        '</div>',
                focusConfirm: false,
                showCancelButton: "true",
                confirmButtonText: "Guardar",
            }).then((result) => {
                if (result.value) {
                    nombre = document.getElementById('nombre').value;
                    apellido = document.getElementById('apellido').value;
                    edad = document.getElementById('edad').value;
                    fechanacimiento = document.getElementById('fechanacimiento').value;
                    this.editarClientes(id, nombre, apellido, edad, fechanacimiento);
                    Swal.fire(
                            'success',
                            'El registro ha sido actualizado',
                            '!Actualizado¡'
                            );
                }
            });
            if (this.nombre == "" || this.apellido == "" || this.edad == "" || this.fechanacimiento == "") {
                Swal.fire({
                    type: 'info',
                    title: 'Datos Incompletos'
                });
            } else {
                this.RegistrarCliente();
                const Toast = Swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timmer: 3000
                });
                Toast.fire({
                    type: 'success',
                    title: '!Cliente Registrado¡'
                });
            }
        },
        btnBorrar: function (id) {
            Swal.fire({
                title: '¿Estás seguro?',
                icon: 'warning',
                showCancelButton: true,
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si',
                cancelButtonText: 'Cancelar',
                caonfirmButtonText: 'Borrar'
            }).then((result) => {
                if (result.isConfirmed) {
                    this.borrarClientes(id);
                    Swal.fire(
                            'success',
                            'El registro ha sido eliminado',
                            '!Eliminado¡'
                            );
                }
            });
        },
        // PROCEDIMIENTOS CRUD
        // LISTAR
        listarClientes: function () {
            axios.post(url, {opcion: 4}).then(response => {
                this.clientes = response.data;
            });
        },
        // CREAR
        registrarClientes: function () {
            axios.post(url, {opcion: 1, nombre: this.nombre, apellido: this.apellido, edad: this.edad, fechanacimiento: this.fechanacimiento}).then(response => {
                this.listarClientes();
            });

            this.nombre = "";
            this.apellido = "";
            this.edad = "";
            this.fechanacimiento = "";
        },

        // EDITAR
        editarClientes: function (id, nombre, apellido, edad, fechanacimiento) {
            axios.post(url, {opcion: 2, id: id, nombre: nombre, apellido: apellido, edad: edad, fechanacimiento: fechanacimiento}).then(response => {
                this.listarClientes();
            });
        },

        // ELIMINAR
        borrarClientes: function (id) {
            axios.post(url, {opcion: 3, id: id}).then(response => {
                this.listarClientes();
            });
        },
        // FIN PROCEDIMIENTOS CRUD
    },
    created: function () {
        this.listarClientes();
    },
    computed: {
        totalCliente() {
            this.total = 0;
            for (cliente of this.clientes) {
                this.total = this.total + 1;
            }
            return this.total;
        },
        promedioEdades() {
            this.promedad = 0;
            this.contar = 0;
            for (cliente of this.clientes) {
                this.contar = this.contar + 1;
                this.promedad = parseInt(this.promedad) + parseInt(cliente.edad);
            }
            this.promedad = parseInt(this.promedad) / parseInt(this.contar);
            return parseInt(this.promedad);
        },
        desviacionEstandar() {
            // EJM: https://www.google.com/search?q=Desviaci%C3%B3n+est%C3%A1ndar+entre+las+edades&sxsrf=ALiCzsaSI8IKWAp_9kbiI01JhOnY_eV_lw%3A1659562517686&ei=FerqYpTGKaqG5OUP5s-CgAI&ved=0ahUKEwjUpOWS0Kv5AhUqA7kGHeanACAQ4dUDCA4&uact=5&oq=Desviaci%C3%B3n+est%C3%A1ndar+entre+las+edades&gs_lcp=Cgdnd3Mtd2l6EAMyBAgjECcyBggAEB4QFjoHCAAQRxCwA0oECEEYAEoECEYYAFCaBljQB2DWCWgBcAF4AIABe4gB0gGSAQMxLjGYAQCgAQHIAQjAAQE&sclient=gws-wiz
            // LLENAMOS LAS EDADES EN UN ARREGLO
            this.arrdesvedades = [];
            for (cliente of this.clientes) {
                if (this.arrdesvedades.indexOf(parseInt(cliente.edad)) === -1) {
                    this.arrdesvedades.push(parseInt(cliente.edad));
                }
            }
            this.arrdesvedades.sort(); // ORDENO EL ARREGLO
            // OBTENER DEVIACION ESTANDAR
            return desviacionEstandar(this.arrdesvedades);
        },
    }
});