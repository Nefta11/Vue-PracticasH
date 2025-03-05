<template>
  <div class="p-5">
    <h2 class="text-2xl font-bold text-blue-600 mb-4">Listado de Préstamos</h2>

    <table class="custom-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>ID Usuario</th>
          <th>ID Material</th>
          <th>Fecha Préstamo</th>
          <th>Fecha Devolución</th>
          <th>Estado Préstamo</th>
          <th>Acción</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="prestamo in prestamos" :key="prestamo.id">
          <td>{{ prestamo.id }}</td>
          <td>{{ prestamo.nombreUsuario }}</td>
          <td>{{ prestamo.tipoMaterial }}</td>
          <td>{{ prestamo.fechaPrestamo }}</td>
          <td>{{ prestamo.fechaDevolucion }}</td>
          <td>{{ prestamo.estadoPrestamo }}</td>
          <td>
            <button class="btn-edit">
              <font-awesome-icon icon="edit" />
            </button>
            <button class="btn-delete">
              <font-awesome-icon icon="trash" />
            </button>
            <button class="btn-add" @click="agregarPrestamo">
              <font-awesome-icon icon="plus" />
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { library } from "@fortawesome/fontawesome-svg-core";
import { faUser, faEdit, faTrash, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { getLoans } from '@/services/Api';

library.add(faUser, faEdit, faTrash, faPlus);

export default {
  components: {
    FontAwesomeIcon
  },
  data() {
    return {
      prestamos: [],
    };
  },
  methods: {
    agregarPrestamo() {
      alert("Función para agregar nuevo préstamo");
    },
    async fetchPrestamos() {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('Token no encontrado');
        }
        const prestamos = await getLoans(token);
        this.prestamos = prestamos;
      } catch (error) {
        console.error(error.message);
      }
    },
  },
  created() {
    this.fetchPrestamos();
  },
};
</script>

<style>
.custom-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 1.2em;
  margin: 30px 0;
  border-radius: 5px 5px 0 0;
  overflow: hidden;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
}

.custom-table th, .custom-table td {
  padding: 12px 15px;
  text-align: center;
}

.custom-table th {
  background-color: #0b1522;
  color: #ffffff;
  text-align: center;
  font-weight: bold;
}

.custom-table tr {
  border-bottom: 1px solid #dddddd;
}

.custom-table tr:nth-of-type(even) {
  background-color: #f3f3f3;
}

.custom-table tr:last-of-type {
  border-bottom: 2px solid #0b1522;
}

.custom-table tr.active-row {
  font-weight: bold;
  color: #0b1522;
}

.btn-edit, .btn-delete, .btn-add {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.2em;
}

.btn-edit {
  color: green;
}

.btn-delete {
  color: red;
}

.btn-add {
  color: blue;
}
</style>
