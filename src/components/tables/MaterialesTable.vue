<template>
  <div class="p-5">
    <h3 class="text-2xl font-bold text-blue-600 mb-4">Listado de Materiales</h3>

    <table class="custom-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Tipo Material</th>
          <th>Marca</th>
          <th>Modelo</th>
          <th>UsuarioID</th>
          <th>Estado</th>
          <th>Acción</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="material in materials" :key="material.id">
          <td>{{ material.id }}</td>
          <td>
            <span v-if="material.id !== materialEditando.id">{{ material.tipoMaterial }}</span>
            <input v-else v-model="materialEditando.tipoMaterial" type="text" class="input-field" />
          </td>
          <td>
            <span v-if="material.id !== materialEditando.id">{{ material.marca }}</span>
            <input v-else v-model="materialEditando.marca" type="text" class="input-field" />
          </td>
          <td>
            <span v-if="material.id !== materialEditando.id">{{ material.modelo }}</span>
            <input v-else v-model="materialEditando.modelo" type="text" class="input-field" />
          </td>
          <td>
            <span v-if="material.id !== materialEditando.id">{{ material.usuario }}</span>
            <input v-else v-model="materialEditando.usuario" type="text" class="input-field" />
          </td>
          <td>
            <span v-if="material.id !== materialEditando.id">{{ material.estado }}</span>
            <select v-else v-model="materialEditando.estado" class="input-field">
              <option value="Disponible">Disponible</option>
              <option value="Prestado">Prestado</option>
              <option value="En Mantenimiento">En Mantenimiento</option>
            </select>
          </td>
          <td>
            <button class="btn-edit" @click="editarMaterial(material)" v-if="material.id !== materialEditando.id">
              <font-awesome-icon icon="edit" />
            </button>
            <button class="btn-delete" @click="eliminarMaterial(material.id)" v-if="material.id !== materialEditando.id">
              <font-awesome-icon icon="trash" />
            </button>
            <button class="btn-add" @click="mostrarFormularioCrear" v-if="material.id !== materialEditando.id">
              <font-awesome-icon icon="plus" />
            </button>
            <button class="btn-save" @click="guardarMaterial(material.id)" v-if="material.id === materialEditando.id">
              <font-awesome-icon icon="save" />
            </button>
          </td>
        </tr>
        <tr v-if="mostrarFormulario">
          <td></td>
          <td><input v-model="nuevoMaterial.tipoMaterial" type="text" placeholder="Tipo Material" class="input-field" /></td>
          <td><input v-model="nuevoMaterial.marca" type="text" placeholder="Marca" class="input-field" /></td>
          <td><input v-model="nuevoMaterial.modelo" type="text" placeholder="Modelo" class="input-field" /></td>
          <td><input v-model="nuevoMaterial.usuario" type="text" placeholder="Usuario" class="input-field" /></td>
          <td>
            <select v-model="nuevoMaterial.estado" class="input-field">
              <option value="Disponible">Disponible</option>
              <option value="Prestado">Prestado</option>
              <option value="En Mantenimiento">En Mantenimiento</option>
            </select>
          </td>
          <td>
            <button class="btn-save" @click="crearMaterial">
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
import { getMaterials, deleteMaterial, createMaterial, updateMaterial } from '@/services/Api';
import Swal from 'sweetalert2';

library.add(faUser, faEdit, faTrash, faPlus, faSave);

export default {
  components: {
    FontAwesomeIcon
  },
  data() {
    return {
      materials: [],
      mostrarFormulario: false,
      nuevoMaterial: {
        tipoMaterial: '',
        marca: '',
        modelo: '',
        usuario: '',
        estado: 'Disponible'
      },
      materialEditando: {}
    };
  },
  methods: {
    async fetchMaterials() {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('Token no encontrado');
        }
        const materials = await getMaterials(token);
        this.materials = materials;
      } catch (error) {
        console.error(error.message);
      }
    },
    async eliminarMaterial(materialId) {
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
          await deleteMaterial(materialId, token);
          this.materials = this.materials.filter(material => material.id !== materialId);
          Swal.fire(
            '¡Eliminado!',
            'El material ha sido eliminado.',
            'success'
          );
        } catch (error) {
          console.error(error.message);
          Swal.fire(
            'Error',
            'Hubo un problema al eliminar el material.',
            'error'
          );
        }
      }
    },
    mostrarFormularioCrear() {
      this.mostrarFormulario = true;
    },
    async crearMaterial() {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('Token no encontrado');
        }
        const material = await createMaterial(this.nuevoMaterial, token);
        this.materials.push(material);
        this.mostrarFormulario = false;
        Swal.fire(
          '¡Creado!',
          'El material ha sido creado con éxito.',
          'success'
        );
      } catch (error) {
        console.error(error.message);
        Swal.fire(
          'Error',
          'Hubo un problema al crear el material.',
          'error'
        );
      }
    },
    editarMaterial(material) {
      this.materialEditando = { ...material };
    },
    async guardarMaterial(materialId) {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('Token no encontrado');
        }
        const materialActualizado = await updateMaterial(materialId, this.materialEditando, token);
        const index = this.materials.findIndex(material => material.id === materialId);
        this.materials[index] = materialActualizado;
        this.materialEditando = {};
        Swal.fire(
          '¡Actualizado!',
          'El material ha sido actualizado con éxito.',
          'success'
        );
      } catch (error) {
        console.error(error.message);
        Swal.fire(
          'Error',
          'Hubo un problema al actualizar el material.',
          'error'
        );
      }
    }
  },
  created() {
    this.fetchMaterials();
  },
};
</script>

<style>
.custom-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 1.2em;
  margin: 20px 0;
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
