const db = require("./database");

// INSERTAR
async function insertarUsuario(nombre, correo, edad) {
  const [result] = await db.query(
    "INSERT INTO usuarios (nombre, correo, edad) VALUES (?, ?, ?)",
    [nombre, correo, edad]
  );
  console.log("Usuario insertado con ID:", result.insertId);
}

// LISTAR
async function listarUsuarios() {
  const [rows] = await db.query("SELECT * FROM usuarios");
  console.log("Usuarios:");
  console.table(rows);
}

// ACTUALIZAR
async function actualizarUsuario(id, nuevoNombre) {
  await db.query(
    "UPDATE usuarios SET nombre = ? WHERE id = ?",
    [nuevoNombre, id]
  );
  console.log("Usuario actualizado:", id);
}

// ELIMINAR
async function eliminarUsuario(id) {
  await db.query("DELETE FROM usuarios WHERE id = ?", [id]);
  console.log("Usuario eliminado:", id);
}

// LLAMAR LAS FUNCIONES
async function main() {
  await insertarUsuario("Daniel", "daniel@gmail.com", 22);
  await insertarUsuario("Laura", "laura@gmail.com", 25);

  await listarUsuarios();

  await actualizarUsuario(1, "Daniel Actualizado");

  await listarUsuarios();

  await eliminarUsuario(2);

  await listarUsuarios();
}

main();

// Prueba para subir a GitHub