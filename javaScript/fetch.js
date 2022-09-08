async function FetchSalon() {

    //const resp = await fetch('/datoSalon.json');
    const resp = await fetch('https://run.mocky.io/v3/a270a255-1a5d-43f1-be8d-045471bb5a9d');
    const data = await resp.json();
    return data;
}

async function FetchPrecios() {
    //const resp = await fetch('/listaPrecio.json');
    const resp = await fetch('https://run.mocky.io/v3/6d14c4ad-e19d-47da-a62d-c4912906a60f');
    const data = await resp.json();
    return data;
}

