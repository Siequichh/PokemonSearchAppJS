'use strict'

const url = 'https://pokeapi.co/api/v2/pokemon/';
const urlImg ="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/";
const msjError = `<div class="alert alert-danger" role="alert">`  
const table = document.getElementById('dinamicTable');


let nombre_or_id;

document.getElementById('formPoke').addEventListener("submit", async (ev)=>{
    ev.preventDefault();
    nombre_or_id = document.getElementById('text-poke').value;

    if(nombre_or_id.trim() === ""){
        showErrorMsj("No deje en vacio este campo");
        table.innerHTML="";
        return;
    }

    try {
        const data = await getPokemon(nombre_or_id);
        updateTable(data);

    } catch (error) {
        console.log("Error: ", error.message)
    }
    
});

async function getPokemon(nombre_or_id) {
    
    try {
        const response = await fetch(url+nombre_or_id);
        
        if(!response.ok){
            showErrorMsj("");
            throw new Error("Error en la solicitud: " + response.status);
            return;
        }
        
        return await response.json();
        
    } catch (error) {
        console.log("Error: ", error.message)
    }
    
}

const updateTable = (data) => {
    table.innerHTML = "";

    let row = table.insertRow();
    let id = row.insertCell(0);
    id.innerHTML = data.id;
    

    let name = row.insertCell(1);
    name.innerHTML = data.name.toUpperCase();

    let height = row.insertCell(2);
    height.innerHTML = data.height * 0.1 + " m";

    let weight = row.insertCell(3);
    weight.innerHTML = data.weight* 0.1 +" kg";

    let img = row.insertCell(4);
    img.innerHTML = ` <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${data.id}.png" class="img-fluid" />`;

}

const showErrorMsj = (msj)=> {

    const errorDiv= document.getElementById('errorAlert');

    errorDiv.innerHTML = msjError + `<p>Error al buscar: ${msj}</p></div> `
    setTimeout(() => {
        errorDiv.innerHTML = "";
    }, 3000);
}