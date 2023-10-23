import chalk from "chalk"
import cargarArchivo from "./index.js"
import fs from "fs"
import ValidarEnlaces from "./http-valid.js"

const camino = process.argv

async function mostrarDatos(validar, datos, archivo) {
    if (validar) {
        console.log(
            chalk.green("Validacion de enlaces: "),
            chalk.black.bgGreen(archivo),
            await ValidarEnlaces(datos)
        )
    } else {
        console.log(
            chalk.green("Lista de enlaces: "),
            chalk.black.bgGreen(archivo),
            datos
        )
    }
}

async function procesarTexto(argumentos) {

    const camino = argumentos[2]
    const validate = argumentos[3] === "--validate"

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
        mostrarDatos(validate, enlaces, camino)
    } else if (fs.lstatSync(camino).isDirectory()) {
        const archivos = await fs.promises.readdir(camino)
        archivos.forEach(async (nombreArchivo) => {
            const enlaces = await cargarArchivo(`${camino}${nombreArchivo}`)
            mostrarDatos(validate, enlaces, `${camino}${nombreArchivo}`)
        })
    }


}

procesarTexto(camino)
