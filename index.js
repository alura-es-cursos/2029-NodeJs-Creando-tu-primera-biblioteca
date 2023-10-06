import fs from "fs"
import chalk from 'chalk';


function obtenerEnlaces(texto) {
    const regex = /\[([^[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)/gm
    const enlaces = [...texto.matchAll(regex)]
    const resultados = enlaces.map(enlace => ({ [enlace[1]]: enlace[2] }))
    return resultados
}


function manejarError(error) {
    console.log(error)
    throw new Error(chalk.red(error))
}


async function cargarArchivo(rutaArchivo) {
    try {
        const encoding = "utf-8"
        const texto = await fs.promises.readFile(rutaArchivo, encoding)
        const resultados = obtenerEnlaces(texto)
        console.log(resultados)
    } catch (error) {
        manejarError(error)
    }
}

cargarArchivo("./archivos/texto.md")

