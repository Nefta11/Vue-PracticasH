<template>
  <div class="p-5">
    <h2 class="text-2xl font-bold text-blue-600 mb-4">Listado de Materiales</h2>

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
          <td>{{ material.tipoMaterial }}</td>
          <td>{{ material.marca }}</td>
          <td>{{ material.modelo }}</td>
          <td>{{ material.usuario }}</td>
          <td>{{ material.estado }}</td>
          <td>
            <button class="btn-edit">
              <font-awesome-icon icon="edit" />
            </button>
            <button class="btn-delete">
              <font-awesome-icon icon="trash" />
            </button>
            <button class="btn-add" @click="agregarMaterial">
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
import { getMaterials } from '@/services/Api';

library.add(faUser, faEdit, faTrash, faPlus);

export default {
  components: {
    FontAwesomeIcon
  },
  data() {
    return {
      columns: [
        { title: "ID", data: "id" },
        { title: "Tipo", data: "tipoMaterial" },
        { title: "Marca", data: "marca" },
        { title: "Modelo", data: "modelo" },
        { title: "Usuario", data: "idUsuario" },
        { title: "Estado", data: "estado" },
        {
          title: "Acción",
          data: null,
          render: () => `
            <button class="btn-edit"><i class="fas fa-edit"></i></button>
            <button class="btn-delete"><i class="fas fa-trash"></i></button>
            <button class="btn-add"><i class="fas fa-plus"></i></button>
          `,
        },
      ],
      materials: [],
    };
  },
  methods: {
    agregarMaterial() {
      alert("Función para agregar nuevo material");
    },
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
