import fs from "fs"
import chalk from 'chalk';


function manejarError(error) {
    console.log(error)
    throw new Error(chalk.red(error))
}


async function cargarArchivo(rutaArchivo) {
    try {
        const encoding = "utf-8"
        const texto = await fs.promises.readFile(rutaArchivo, encoding)
        console.log(chalk.green(texto))
    } catch (error) {
        manejarError(error)
    }
}


// function cargarArchivo(rutaArchivo) {
//     const encoding = "utf-8"
//     fs.promises.readFile(rutaArchivo, encoding)
//         .then((texto) => console.log(chalk.green(texto)))
//         .catch((error) => manejarError(error))
// }

//camino path
// function cargarArchivo(rutaArchivo) {
//     const encoding = "utf-8"
//     fs.readFile(rutaArchivo, encoding, (error, texto) => {
//         //stacktrace
//         if (error) {
//             manejarError(error)
//         }
//         console.log(chalk.green(texto))
//     })
// }

cargarArchivo("./archivos/texto.m")