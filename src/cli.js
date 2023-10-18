import chalk from "chalk"
import cargarArchivo from "./index.js"
import fs from "fs"

const camino = process.argv

function mostrarDatos(datos, archivo) {
    console.log(
        chalk.green("Lista de enlaces: "),
        chalk.black.bgGreen(archivo),
        datos
    )
}

async function procesarTexto(argumentos) {

    const camino = argumentos[2]

    try {
        fs.lstatSync(camino)
    } catch (error) {
        if (error.code === "ENOENT") {
            console.log(chalk.red("El archivo o directorio no existen"))
            return
        }
    }


    if (fs.lstatSync(camino).isFile()) {
        const enlaces = await cargarArchivo(camino)
        mostrarDatos(enlaces, camino)
    } else if (fs.lstatSync(camino).isDirectory()) {
        const archivos = await fs.promises.readdir(camino)
        archivos.forEach(async (nombreArchivo) => {
            const enlaces = await cargarArchivo(`${camino}${nombreArchivo}`)
            mostrarDatos(enlaces, `${camino}${nombreArchivo}`)
        })
    }


}

procesarTexto(camino)
