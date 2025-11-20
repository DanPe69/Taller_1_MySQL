const { db } = require("./firebaseService");

async function agregar(collection, data) {
    await db.collection(collection).add(data);
    console.log("Agregado a", collection);
}

async function obtenerOrdenado(collection, campo, limite) {
    const snapshot = await db.collection(collection)
        .orderBy(campo)
        .limit(limite)
        .get();

    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

async function llenarUsuarios() {
    const datos = [
        { nombre: "Juan", saldo: 20000 },
        { nombre: "Ana", saldo: 15000 },
        { nombre: "Luis", saldo: 50000 }
    ];

    for (const u of datos) {
        await agregar("usuarios", u);
    }
}

async function main() {
    await llenarUsuarios();

    const resultado = await obtenerOrdenado("usuarios", "saldo", 2);
    console.log("Usuarios ordenados:", resultado);
}

main();
