/*async function FetchSalon() {
    //const resp = await fetch('/datoSalon.json');
    const resp = await fetch('https://run.mocky.io/v3/a270a255-1a5d-43f1-be8d-045471bb5a9d');
    const data = await resp.json();
    return data;
}
*/
const DateTime = luxon.DateTime;

const SolicitarCantidadDeButacas = () => {
//function SolicitarCantidadDeButacas(){
    return new Promise((resolve, reject) => {
        let cantidadButacas=0;
        FetchSalon()
            .then(response => {
                response.forEach((element) => {
                    cantidadButacas = cantidadButacas + element.canitidadButacas;
                })
                //resolve("te devuelvo las butacas: "+cantidadButacas);
                resolve (cantidadButacas);
            })
            .catch(error => reject("Se produjo un error: "+error))

    })
}
/*
SolicitarCantidadDeButacas()
    .then((res) => {
        console.log(res);

    })
    .catch((err) => {
        console.log(0);
    })
    .finally(() => {
        //console.log("ejecucion finally")
    })
*/

