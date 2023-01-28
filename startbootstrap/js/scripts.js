/*!
    * Start Bootstrap - SB Admin v7.0.5 (https://startbootstrap.com/template/sb-admin)
    * Copyright 2013-2022 Start Bootstrap
    * Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-sb-admin/blob/master/LICENSE)
    */
// 
// Scripts
// 

window.addEventListener('DOMContentLoaded', event => {

    // Toggle the side navigation
    const sidebarToggle = document.body.querySelector('#sidebarToggle');
    if (sidebarToggle) {
        // Uncomment Below to persist sidebar toggle between refreshes
        // if (localStorage.getItem('sb|sidebar-toggle') === 'true') {
        //     document.body.classList.toggle('sb-sidenav-toggled');
        // }
        sidebarToggle.addEventListener('click', event => {
            event.preventDefault();
            document.body.classList.toggle('sb-sidenav-toggled');
            localStorage.setItem('sb|sidebar-toggle', document.body.classList.contains('sb-sidenav-toggled'));
        });
    }

});
//variabili globali
    let searchBar = document.querySelector("#searchBar");
    let buttonSubmit = document.querySelector("#btnNavbarSearch");
    console.log(searchBar)
    console.log(buttonSubmit)
    let caroselloBox = document.querySelector(".caroselloBox");
  
    let listaHtml = "";
    let totaleCarrello = document.querySelector(".totale-carrello")
    let purchasedItems = document.querySelector(".valoreCarrello");
    buttonSubmit.addEventListener("click", getDataFromItunes);
    let listaPrezzi = [];
    
    
    
    //fine variabili globali
    
    //serchBar Itunes Api 
    
    function getDataFromItunes() {
        
        let searchBarText=[];
        searchBarText.push(searchBar.value);
        console.log(searchBarText)
        
        const urlSearch = "https://itunes.apple.com/search?term=" + searchBarText;
        fetch(urlSearch)
        .then((data) => data.json())
        .then(json => {
            console.log(json)
            
                //checkTab(json.resultCount)
                if(searchBarText != []){ // quindi abbiamo già cercato una volta
                    console.log("entrati nell'if ")
                    searchBarText.pop(searchBar.value);     
                    listaHtml=""
                //    aggiungiTable();
                };
                aggiungiTable();
                let risultatiRicerca = document.querySelector("thead")              
                //togliere l'if e sei al punto di prima                                                                    
                json.results.forEach(song => {
                    // !json.resultCount console.log(`${song.artistName} ,${song.trackCensoredName}, ${song.primaryGenreName} , `)  
                    
                    listaHtml += risultatiRicerca.insertAdjacentHTML('afterend',
                    
                        `                       
                                <tbody class="priva">
                                    <tr>
                                                            
                                        <td>${song.artistName}</td>
                                        <td>${song.trackName}</td>
                                        <td>${song.primaryGenreName}</td>
                                        <td> $ ${mostraPrezzoTrackTable(song.trackPrice)} <button class="shopping-btn"><i class="fa fa-cart-plus" aria-hidden="true"></i></button></td>
                                        <td>  </td>
                                        <td> ${song.collectionName}</td>
                                        <td> <img class="copertinaAlbum" src="${song.artworkUrl100} "></td>
                                    </tr>    
                                                                
                                    <hr>                                                                                                    
                                </tbody>   
                            `
                    );
                    let iconaCarrello = document.querySelector(".shopping-btn");
                    iconaCarrello.addEventListener('click', function () { aggiungiAcquisto(song.trackPrice) });      

                });//fine forEAch
                       
                    
                    //if
                
                
            })//fine then
            
            .catch(error => console.log(error));            
    }

    //serchBar Itunes Api
    
    //funzioni utili per SearchBar
/*     function checkTab(datiEsistenti){

        if(datiEsistenti){
            console.log("ciao")
                   
        }else{pulisciTab()} 
        
      } */
       function pulisciTab(){
        
          let tablellaVecchia = document.querySelector(".priva")
          console.log(tablellaVecchia.nextElementSibling)    
          tablellaVecchia.classList.add("hidden")        
         
      }
  
    function aggiungiTable() {
       

        listaHtml += caroselloBox.insertAdjacentHTML('beforebegin',

            `        
            
                <div class="card mb-4 sfondoTable">
                    <div class="card-header ">
                        <i class="fas fa-search"></i>
                            Ricerca per: ${capitalize()}
                            <hr>
                    </div>
                    <div class="card-body">
                    
                        <table class=""id="datatablesSimple">
                            <thead>
                                <tr>
                                    <th >Artist</th>
                                    <th >Title</th>
                                    <th >Genre</th>
                                    <th>Price USD</th>                                           
                                    <th > </th>                                           
                                    <th > Album </th>                                                                           
                                    
                                </tr>
                            </thead>                                                                        
                        </table>                                
                                    
                    </div>
                
                </div>
    `);
    };

    let capitalize = function () {
        let letteraMaiuscola = searchBar.value.toUpperCase().charAt(0);
        return letteraMaiuscola + searchBar.value.slice(1)
    };
    
    function aggiungiAcquisto(prezzotraccia) {
        purchasedItems.innerHTML++

        aggiungiPrezzo(prezzotraccia);
        prezzoTrack(prezzotraccia);

    }

    function mostraPrezzoTrackTable(prezzotraccia) {
        if (prezzotraccia < 0 || !prezzotraccia === undefined || !prezzotraccia) {
            return prezzotraccia = "Free"
        }
        else {

            return prezzotraccia
        }
    }
    function prezzoTrack(prezzotraccia) {
        if (prezzotraccia < 0 || !prezzotraccia === undefined || !prezzotraccia) {
            return prezzotraccia = 0;
        }
        else {
            //console.log(prezzotraccia)
            return prezzotraccia
        }
    }

    function aggiungiPrezzo(prezzotraccia) {

        totaleCarrello.innerHTML=[];
        listaPrezzi.push(prezzoTrack(prezzotraccia));
        //reduce
            const initialValue = 0;
            let sumPrice = listaPrezzi.reduce(sum, initialValue);

            function sum(total, prezzotraccia) {
                return total + prezzotraccia;
            }
        //reduce
    console.log(sumPrice)
        console.log(listaPrezzi)
        //console.log(sommaPrezzi)
        totaleCarrello.innerHTML += `$ ${sumPrice}`
    }

//funzioni utili per SearchBar

//Get Chart Api itunes
let generalChartEndpoint = "https://api.music.apple.com/v1/catalog/{storefront}/charts";
//let genereChart=["trance","techno","techouse","drum & bass"];
let genereChart= "trance"
let searchChart= document.querySelector('#searchBarChart')
console.log(searchChart.value)
let genereChartEndpoint = `https://api.music.apple.com/v1/catalog/us/charts`;
let buttonSearch = document.querySelector('#btnSearchChart')
console.log(buttonSearch)
buttonSearch.addEventListener('click',prendiChart)

//farlo con async await   
async function prendiChart(){
    
    let responseChart= await fetch(genereChartEndpoint)
    console.log(searchChart.value)
    console.log(responseChart)
}