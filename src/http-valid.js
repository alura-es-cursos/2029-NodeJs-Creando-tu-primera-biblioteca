import chalk from "chalk"

function obtenerEnlaces(links) {
    if (typeof links === 'object') {
        return links.map((objLink) => Object.values(objLink).join())
    } else {
        return links
    }
}

async function verificarStatus(enlaces) {
    const listaStatus = Promise.all(enlaces.map(async (enlace) => {
        try {
            const response = await fetch(enlace)
            return response.status
        } catch (error) {
            return manejarError(error)
        }

    }))
    return listaStatus
}

function manejarError(error) {
    if (error.cause.code === "ENOTFOUND") {
        return "No existe el enlace"
    } else {
        return "Ocurrio un error"
    }
}


export default async function ValidarEnlaces(listaEnlaces) {
    console.log("VALIDANDO...")
    const enlaces = obtenerEnlaces(listaEnlaces)
    const status = await verificarStatus(enlaces)
    return listaEnlaces.map((objeto, indice) => {
        return {
            ...objeto,
            status: status[indice]
        }
    })
}

//[Gato salchicha](http://gatosalchicha.com.mx/)