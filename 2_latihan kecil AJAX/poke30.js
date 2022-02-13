const container = document.querySelector('.fetch-data'); //memilih class 'fetch-data', kemudian disimpan dalam variabel container
container.addEventListener('click', async function (){ //class 'fetch-data' yang berisi 'button', apabila diklik, akan menjalankan sebuah fungi asinkron
    const response = await fetch( "https://pokeapi.co/api/v2/pokemon?limit=30", { //req ke url API
        method: "GET" 
    }); //jika 'resolve', maka akan me-return data dalam bentuk 'promise'
    const jSON = await response.json(); //mengubah data 'promise' menjadi json

    for(let i = 0; i < jSON.results.length; i++){ //data json yang disimpan dalam jSON mengandung 'array', sehingga untuk mengakses 'results' diperlukan looping
        const link = jSON.results[i].url; //mendapatkan url untuk mengambil data pokemon
        const json = await fetch(link, { //request link API dari variabel 'url'
            method: "GET"
        });
        const daftarPokemon = await json.json(); //mengubah data 'promise' menjadi json

        const id = daftarPokemon.id; 
        const name = daftarPokemon.name; 
        const type = daftarPokemon.types[0].type.name; 
        const img = daftarPokemon.sprites.front_default; 

        const newContainer = document.querySelector('.container');
        const newDiv = document.createElement("div");
        const newID = document.createElement("p");
        const newType = document.createElement("p");
        const newIMG = document.createElement("img");

        let x = 0;
        
        //flowcontrol berikut untuk menentukan 'class' yang akan digunakan dalam proses coloring
        if(type == "grass"){
            x = 1;
        } else if(type == "fire"){
            x = 2;
        } else if(type == "water"){
            x = 3;
        } else if(type == "bug"){
            x = 4;
        } else if(type == "normal"){
            x = 5;
        } else if(type == "poison"){
            x = 6;
        } else if(type == "electric"){
            x = 7;
        } else{
            x = 8;
        }

        newIMG.setAttribute("src", img);
        newID.innerHTML = `${id}: ${name}`;
        newType.innerHTML = `type: ${type}`;

        newID.classList.add("id-name");
        newType.classList.add("type");

        newDiv.append(newID);
        newDiv.append(newIMG);
        newDiv.append(newType);

        //flowcontrol berikut untuk menentukan 'class' yang akan digunakan dalam proses coloring
        if(x == 1){
            newDiv.classList.add("grass");
        } else if(x == 2){
            newDiv.classList.add("fire");
        } else if(x == 3){
            newDiv.classList.add("water");
        } else if(x == 4){
            newDiv.classList.add("bug");
        } else if(x == 5){
            newDiv.classList.add("normal");
        } else if(x == 6){
            newDiv.classList.add("poison");
        } else if(x == 7){
            newDiv.classList.add("electric");
        } else if( x == 8){
            newDiv.classList.add("ground");
        } else{
            console.log("there are some errors...");
        }
    
        newContainer.append(newDiv) //tambahkan div pokemon ke container untuk ditampilkan di webpage
    } 
});