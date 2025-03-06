<template>
  <div class="p-5">
    <h3 class="text-2xl font-bold text-blue-600 mb-4">Listado de Préstamos</h3>

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
          <td>
            <span v-if="prestamo.id !== prestamoEditando.id">{{ prestamo.nombreUsuario }}</span>
            <input v-else v-model="prestamoEditando.idUsuario" type="number" class="input-field" />
          </td>
          <td>
            <span v-if="prestamo.id !== prestamoEditando.id">{{ prestamo.tipoMaterial }}</span>
            <input v-else v-model="prestamoEditando.idMaterial" type="number" class="input-field" />
          </td>
          <td>
            <span v-if="prestamo.id !== prestamoEditando.id">{{ prestamo.fechaPrestamo }}</span>
            <input v-else v-model="prestamoEditando.fechaPrestamo" type="date" class="input-field" />
          </td>
          <td>
            <span v-if="prestamo.id !== prestamoEditando.id">{{ prestamo.fechaDevolucion }}</span>
            <input v-else v-model="prestamoEditando.fechaDevolucion" type="date" class="input-field" />
          </td>
          <td>
            <span v-if="prestamo.id !== prestamoEditando.id">{{ prestamo.estadoPrestamo }}</span>
            <select v-else v-model="prestamoEditando.estadoPrestamo" class="input-field">
              <option value="Activo">Activo</option>
              <option value="Devuelto">Devuelto</option>
              <option value="Vencido">Vencido</option>
            </select>
          </td>
          <td>
            <button class="btn-edit" @click="editarPrestamo(prestamo)" v-if="prestamo.id !== prestamoEditando.id">
              <font-awesome-icon icon="edit" />
            </button>
            <button class="btn-delete" @click="eliminarPrestamo(prestamo.id)" v-if="prestamo.id !== prestamoEditando.id">
              <font-awesome-icon icon="trash" />
            </button>
            <button class="btn-add" @click="mostrarFormularioCrear" v-if="prestamo.id !== prestamoEditando.id">
              <font-awesome-icon icon="plus" />
            </button>
            <button class="btn-save" @click="guardarPrestamo(prestamo.id)" v-if="prestamo.id === prestamoEditando.id">
              <font-awesome-icon icon="save" />
            </button>
          </td>
        </tr>
        <tr v-if="mostrarFormulario">
          <td></td>
          <td><input v-model="nuevoPrestamo.idUsuario" type="number" placeholder="ID Usuario" class="input-field" /></td>
          <td><input v-model="nuevoPrestamo.idMaterial" type="number" placeholder="ID Material" class="input-field" /></td>
          <td><input v-model="nuevoPrestamo.fechaPrestamo" type="date" placeholder="Fecha Préstamo" class="input-field" /></td>
          <td><input v-model="nuevoPrestamo.fechaDevolucion" type="date" placeholder="Fecha Devolución" class="input-field" /></td>
          <td>
            <select v-model="nuevoPrestamo.estadoPrestamo" class="input-field">
              <option value="Activo">Activo</option>
              <option value="Devuelto">Devuelto</option>
              <option value="Vencido">Vencido</option>
            </select>
          </td>
          <td>
            <button class="btn-save" @click="crearPrestamo">
              <font-awesome-icon icon="save" />
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { library } from "@fortawesome/fontawesome-svg-core";
import { faUser, faEdit, faTrash, faPlus, faSave } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { getLoans, deleteLoan, createLoan, updateLoan } from '@/services/Api';
import Swal from 'sweetalert2';

library.add(faUser, faEdit, faTrash, faPlus, faSave);

export default {
  components: {
    FontAwesomeIcon
  },
  data() {
    return {
      prestamos: [],
      mostrarFormulario: false,
      nuevoPrestamo: {
        idUsuario: null,
        idMaterial: null,
        fechaPrestamo: '',
        fechaDevolucion: '',
        estadoPrestamo: 'Activo'
      },
      prestamoEditando: {}
    };
  },
  methods: {
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
    async eliminarPrestamo(prestamoId) {
      const result = await Swal.fire({
        title: '¿Estás seguro?',
        text: "¡No podrás revertir esto!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminarlo'
      });

      if (result.isConfirmed) {
        try {
          const token = localStorage.getItem('token');
          if (!token) {
            throw new Error('Token no encontrado');
          }
          await deleteLoan(prestamoId, token);
          this.prestamos = this.prestamos.filter(prestamo => prestamo.id !== prestamoId);
          Swal.fire(
            '¡Eliminado!',
            'El préstamo ha sido eliminado.',
            'success'
          );
        } catch (error) {
          console.error(error.message);
          Swal.fire(
            'Error',
            'Hubo un problema al eliminar el préstamo.',
            'error'
          );
        }
      }
    },
    mostrarFormularioCrear() {
      this.mostrarFormulario = true;
    },
    async crearPrestamo() {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('Token no encontrado');
        }
        const prestamo = await createLoan(this.nuevoPrestamo, token);
        this.prestamos.push(prestamo);
        this.mostrarFormulario = false;
        Swal.fire(
          '¡Creado!',
          'El préstamo ha sido creado con éxito.',
          'success'
        );
      } catch (error) {
        console.error(error.message);
        Swal.fire(
          'Error',
          'Hubo un problema al crear el préstamo.',
          'error'
        );
      }
    },
    editarPrestamo(prestamo) {
      this.prestamoEditando = { ...prestamo };
    },
    async guardarPrestamo(prestamoId) {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('Token no encontrado');
        }
        const prestamoActualizado = await updateLoan(prestamoId, this.prestamoEditando, token);
        const index = this.prestamos.findIndex(prestamo => prestamo.id === prestamoId);
        this.prestamos[index] = prestamoActualizado;
        this.prestamoEditando = {};
        Swal.fire(
          '¡Actualizado!',
          'El préstamo ha sido actualizado con éxito.',
          'success'
        );
      } catch (error) {
        console.error(error.message);
        Swal.fire(
          'Error',
          'Hubo un problema al actualizar el préstamo.',
          'error'
        );
      }
    }
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

.btn-edit, .btn-delete, .btn-add, .btn-save {
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

.btn-save {
  color: orange;
}

.input-field {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
  border: 1px solid #dddddd;
  border-radius: 4px;
  font-size: 1em;
}
</style>
