import React, { useState, useEffect } from "react";
import "./CrudUsuarios.css";
import { db } from "../../Firebase/FirebaseConfig"; // Asegúrate de tener db exportado en FirebaseConfig.js
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import CrearPDF from "../crearPDF/crearPDF";
import Swal from "sweetalert2";

const CrudUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [primerNombre, setPrimerNombre] = useState("");
  const [segundoNombre, setSegundoNombre] = useState("");
  const [primerApellido, setPrimerApellido] = useState("");
  const [segundoApellido, setSegundoApellido] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rol, setRol] = useState("");

  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);
  const [usuarioDesseleccionado, setDesSeleccionado] = useState(null);

  const usuariosCollectionRef = collection(db, "Usuarios");

  // Función para cargar usuarios
  const cargarUsuarios = async () => {
    const data = await getDocs(usuariosCollectionRef);
    setUsuarios(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  // Llama a cargarUsuarios cuando el componente se monta
  useEffect(() => {
    cargarUsuarios();
  }, []);

  // Función para crear un usuario
  const agregarUsuario = async () => {
    if (!primerNombre || !primerApellido || !email || !password || !rol) {
      Swal.fire("Error", "Por favor, completa todos los campos", "error");
      return;
    }
    const usuario = {
      primerNombre,
      segundoNombre,
      primerApellido,
      segundoApellido,
      email,
      password,
      rol,
      createdAt: new Date(),
    };
    await addDoc(usuariosCollectionRef, usuario);
    setPrimerNombre("");
    setSegundoNombre("");
    setPrimerApellido("");
    setSegundoApellido("");
    setEmail("");
    setPassword("");
    setRol("");
    cargarUsuarios(); // Actualiza la lista de usuarios
    Swal.fire("Éxito", "Usuario agregado correctamente", "success");
  };

  // Función para actualizar un usuario
  const actualizarUsuario = async () => {
    if (!primerNombre || !primerApellido || !email || !password || !rol) {
      Swal.fire("Error", "Por favor, completa todos los campos", "error");
      return;
    }
    const usuarioDoc = doc(db, "Usuarios", usuarioSeleccionado.id);
    await updateDoc(usuarioDoc, {
      primerNombre,
      segundoNombre,
      primerApellido,
      segundoApellido,
      email,
      password,
      rol,
    });
    setUsuarioSeleccionado(null); // Resetear el usuario seleccionado
    setPrimerNombre("");
    setSegundoNombre("");
    setPrimerApellido("");
    setSegundoApellido("");
    setEmail("");
    setPassword("");
    setRol("");
    cargarUsuarios(); // Actualiza la lista de usuarios
    Swal.fire("Éxito", "Usuario actualizado correctamente", "success");
  };

  // Función para eliminar un usuario
  const eliminarUsuario = async (id, email) => {
    try {
      const result = await Swal.fire({
        title: "¿Estás seguro?",
        text: `¿Quieres eliminar el usuario con el correo: ${email}?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí, eliminar cuenta",
        cancelButtonText: "No, cancelar",
        reverseButtons: true,
      });

      if (result.isConfirmed) {
        const usuarioDoc = doc(db, "Usuarios", id);
        await deleteDoc(usuarioDoc);
        cargarUsuarios(); // Llamar a la función para recargar la lista de usuarios

        Swal.fire("Eliminado", "Usuario eliminado correctamente", "success");
      } else {
        Swal.fire(
          "Cancelado",
          "La eliminación del usuario ha sido cancelada",
          "info"
        );
      }
    } catch (error) {
      console.error("Error al eliminar el usuario:", error);
      Swal.fire("Error", "Hubo un problema al eliminar el usuario", "error");
    }
  };

  // Función para seleccionar un usuario y cargar sus datos en el formulario
  const seleccionarUsuario = (usuario) => {
    setUsuarioSeleccionado(usuario);
    setPrimerNombre(usuario.primerNombre);
    setSegundoNombre(usuario.segundoNombre);
    setPrimerApellido(usuario.primerApellido);
    setSegundoApellido(usuario.segundoApellido);
    setEmail(usuario.email);
    setPassword(usuario.password);
    setRol(usuario.rol);
  };

  const desseleccionarUsuario = (usuario) => {
    setDesSeleccionado(usuario);
    setUsuarioSeleccionado(null); // Resetear el usuario seleccionado
    setPrimerNombre("");
    setSegundoNombre("");
    setPrimerApellido("");
    setSegundoApellido("");
    setEmail("");
    setPassword("");
    setRol("");
    cargarUsuarios(); // Actualiza la lista de usuarios
    Swal.fire("Éxito", "Operación cancelada correctamente", "success");
  };

  return (
    <div className="body_usuario">
      <div className="container_usuarios">
        <h2 className="h2_usuarios">CRUD de Usuarios</h2>
        <CrearPDF/>

        {/* Formulario para agregar o editar usuario */}
        <input
          type="text"
          value={primerNombre}
          onChange={(e) => setPrimerNombre(e.target.value)}
          placeholder="Primer Nombre"
          className="input_usuarios"
        />
        <input
          type="text"
          value={segundoNombre}
          onChange={(e) => setSegundoNombre(e.target.value)}
          placeholder="Segundo Nombre"
          className="input_usuarios"
        />
        <input
          type="text"
          value={primerApellido}
          onChange={(e) => setPrimerApellido(e.target.value)}
          placeholder="Primer Apellido"
          className="input_usuarios"
        />
        <input
          type="text"
          value={segundoApellido}
          onChange={(e) => setSegundoApellido(e.target.value)}
          placeholder="Segundo Apellido"
          className="input_usuarios"
        />

        <input
          type="text"
          list="misOpciones"
          placeholder="Seleccione una opción"
          value={rol}
          onChange={(e) => setRol(e.target.value)} // Evento onChange en el input
          className="input_usuarios"
        />
        <datalist id="misOpciones">
          <option value="Administrador">Administrador</option>
          <option value="Investigador">Investigador</option>
          <option value="Colaborador">Colaborador</option>
          <option value="Otro">Colaborador</option>
        </datalist>

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Correo Electrónico"
          className="input_usuarios"
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Contraseña"
          className="input_usuarios"
        />

        {/* Botón de agregar o editar */}
        <button
          className="button_usuario"
          onClick={usuarioSeleccionado ? actualizarUsuario : agregarUsuario}
        >
          {usuarioSeleccionado ? "Actualizar Usuario" : "Agregar Usuario"}
        </button>
        <button className="button_usuario" onClick={desseleccionarUsuario}>
          Cancelar
        </button>

        {/* Tabla de usuarios */}
        <table>
          <thead>
            <tr>
              <th>Primer Nombre</th>
              <th>Segundo Nombre</th>
              <th>Primer Apellido</th>
              <th>Segundo Apellido</th>
              <th>Rol</th>
              <th>Email</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((usuario) => (
              <tr key={usuario.id}>
                <td>{usuario.primerNombre}</td>
                <td>{usuario.segundoNombre}</td>
                <td>{usuario.primerApellido}</td>
                <td>{usuario.segundoApellido}</td>
                <td>{usuario.rol}</td>
                <td>{usuario.email}</td>
                <td>
                  <div className="botones_editar_eliminar_usuario">
                  <button
                    className="editar_usuario"
                    onClick={() => seleccionarUsuario(usuario)}
                  >
                    Editar
                  </button>
                  <button
                    className="eliminar_usuario"
                    onClick={() => eliminarUsuario(usuario.id)}
                  >
                    Eliminar
                  </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CrudUsuarios;
