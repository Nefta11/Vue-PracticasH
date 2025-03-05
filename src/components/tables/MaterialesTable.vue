<template>
  <div class="p-5">
    <h2 class="text-2xl font-bold text-blue-600 mb-4">Listado de Materiales</h2>

    <table class="custom-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Tipo</th>
          <th>Marca</th>
          <th>Modelo</th>
          <th>Usuario</th>
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
          <td>{{ material.idUsuario }}</td>
          <td>{{ material.estado }}</td>
          <td>
            <button class="btn-edit"><i class="fas fa-edit"></i></button>
            <button class="btn-delete"><i class="fas fa-trash"></i></button>
          </td>
        </tr>
      </tbody>
    </table>

    <button
      @click="agregarMaterial"
      class="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
    >
      Agregar Material
    </button>
  </div>
</template>

<script>
import { library } from "@fortawesome/fontawesome-svg-core";
import { faUser, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { getMaterials } from '@/services/Api';

library.add(faUser, faEdit, faTrash);

export default {
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
}

.custom-table th, .custom-table td {
  border: 1px solid #ddd;
  padding: 8px;
}

.custom-table th {
  background-color: #f2f2f2;
  text-align: left;
}

.btn-edit {
  background: green;
  color: white;
  padding: 5px;
  border-radius: 5px;
  margin-right: 5px;
}
.btn-delete {
  background: red;
  color: white;
  padding: 5px;
  border-radius: 5px;
}
</style>
