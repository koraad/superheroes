// preview container tabs

const buttons = document.querySelectorAll('.btn-container .btn')
const contents = document.querySelectorAll('content-container .content-results')

buttons.forEach(btn => {
    
    btn.onclick = (e)=> {
        let buttonsContaniner = document.querySelector('.btn-container')
        buttonsContaniner.querySelectorAll('.btn').forEach(item => {
            item.classList.remove('active')
        })
        let contentContaniner = document.querySelector('.content-container')
        contentContaniner.querySelectorAll('.content').forEach(content => {
            content.classList.remove('active')
        })

        let clicked = e.target

        const index = Array.from(buttons).indexOf(clicked);

        clicked.classList.add('active')
        contentContaniner.querySelectorAll('.content')[index].classList.add('active')
    }
})


// preview close

const prevCloseBtn = document.getElementById('prev-close')
const preview = document.getElementById('preview-container')

prevCloseBtn.onclick = ()=> {
    preview.style.top = '-100%';
    preview.style.opacity = '0';
}

function openPreview() {
    

    preview.style.top = '0';
    preview.style.opacity = '1';
}


// search mechanism

// https://superheroapi.com/api.php/1405963789906787/

const searchBox = document.getElementById('search-name');
const searchButton = document.querySelector('.btn-search');
const results = document.querySelector('.search-list')

searchButton.onclick = ()=> {

    let title = searchBox.value.trim()

    
    if (title !== '') {
        // console.log(title)

        fetchHeros(title);

    }

    searchBox.value = ''
    
}

// close search list

const searchResults = document.querySelector('.search-container .search-list')

document.querySelector('.hero').onclick = ()=> {
    

    searchResults.style.display = 'none';
    searchBox.value = '';
}

searchBox.onkeyup =()=> {


    searchResults.style.display = 'block';
    
    if(searchBox.value.length>1) {

        fetchHeros(searchBox.value);
    } else {
        searchBox.innerHTML = ''
    }
}


function fetchHeros(input) {


    fetch(`https://www.superheroapi.com/api.php/1405963789906787/search/${input}`)
        .then(response => response.json())
        .then(data => {
            // console.log(data)

            if(data.response == 'success') {

                results.innerHTML = ''
                data.results.forEach(result => {

                    showList(result);

                })
                
            } else {
                results.innerHTML = 'We cannot find such thing'
            }
        }).catch((error) => {
            console.log(error)
          });
}



function showList(result) {

    console.log(result)

    let power = result.powerstats.power;

    if (result.powerstats.power == 'null') {
        power = '0';
    }

    let html = `<div class="list-item" id="${result.id}">
                    <img src="${result.image.url}" onerror="this.src='./Images/default.jpg'" alt="">
                    <div class="title"> 
                        <h4>${result.name}</h4>
                        <div class="power"> 
                            <p>Power: </p><span>${power}</span>
                        </div>
                    </div>   

                </div>`

    results.innerHTML += html
    let items = document.querySelectorAll('.search-list .list-item')

    items.forEach(item => {
        item.onclick = ()=> {

            showFullDetails(item.id);
        }
    })
}

function showFullDetails(id) {

    searchResults.style.display = 'none';
    searchBox.value = '';

    fetch(`https://www.superheroapi.com/api.php/1405963789906787/${id}`)
        .then(response => response.json())
        .then(data => {

            console.log(data);

            displayPowerstats(data.powerstats);
            displayBiography(data.biography);
            displayAppearance(data.appearance);
            displayWork(data.work);
            displayConnection(data.connections);
            displayImage(data.image.url);
            displayName(data.name);

            
        }).catch((error) => {
            console.log(error)
          });

    searchBox.value = '';
    results.innerHTML = '';

    openPreview();

}

function displayPowerstats(category) {
    let stats = document.querySelectorAll('#powerstats .stat-container .rigth');

    stats[0].innerText = category.intelligence
    stats[1].innerText = category.strength
    stats[2].innerText = category.speed
    stats[3].innerText = category.durability
    stats[4].innerText = category.power
    stats[5].innerText = category.combat
}
function displayAppearance(category) {
    
    let appearances = document.querySelectorAll('#appearance .stat-container .rigth');

    appearances[0].innerText = category.gender
    appearances[1].innerText = category.race
    appearances[2].innerText = category.height[0]
    appearances[3].innerText = category.weight[0]
    appearances[4].innerText = category['eye-color']
    appearances[5].innerText = category['hair-color']
    
   
}
function displayConnection(category) {
    let connections = document.querySelectorAll('#connections .container p');

   
    connections[0].innerText = category['group-affiliation']
    connections[1].innerText = category['relatives']
    
    
}
function displayBiography(category) {
    let bios = document.querySelectorAll('#biography p');

    bios[0].innerHTML = `<span>Full Name</span> ${category['full-name']}`
    bios[1].innerHTML = `<span>Alert-Egos</span> ${category['alter-egos']}`
    bios[2].innerHTML = `<span>Aliases</span> ${category['aliases']}`
    bios[3].innerHTML = `<span>Place-of-birth</span> ${category['place-of-birth']}`
    bios[4].innerHTML = `<span>First-appearance</span> ${category['first-appearance']}`
    bios[5].innerHTML = `<span>Publisher</span> ${category['publisher']}`
}
function displayWork(category) {
    let works = document.querySelectorAll('#work p');

    works[0].innerHTML = `<span>Base:</span> ${category.base}`
    works[1].innerHTML = `<span>Occupation:</span> ${category.occupation}`
   
}
function displayImage(url) {
    let image = document.getElementById('hero-img');

        
    image.src = url
}

function displayName(name) {
    let heroName = document.getElementById('hero-name');

        
    heroName.innerText = name;
    
}


// All heroes list printing

const nextBtn = document.getElementById('next-btn')
const previousBtn = document.getElementById('prev-btn')
const firstBtn = document.getElementById('first-btn')
const lastBtn = document.getElementById('last-btn')
const btnContainer = document.getElementById('btn-container');
const heroList = document.getElementById('hero-list');
const marvelList = document.getElementById('marvels-hero-list');
const dcList = document.getElementById('dc-hero-list');
const avengersList = document.getElementById('avengers-hero-list');

let add = 0;

printItems(add)

previousBtn.style.display = 'none'
btnContainer.style.justifyContent = 'flex-end'

nextBtn.onclick = ()=> {
    buttonAction(add + 12)

  
}
previousBtn.onclick = ()=> {
    buttonAction(add - 12)
    
}
firstBtn.onclick = ()=> {
    buttonAction(0)
    
}
lastBtn.onclick = ()=> {
    
    buttonAction(719)
}

function buttonAction(newAdd) {
    add = newAdd;
    clearContent();
    printItems(add)
    hideButton()
}

function hideButton() {
    if( add <= 0) {
        previousBtn.style.display = 'none'
 
        firstBtn.style.display = 'none'
        
        
    } else {
        nextBtn.style.display = 'inline-block'
        previousBtn.style.display = 'inline-block'
    
        firstBtn.style.display = 'inline-block'
    }

    if( add >= 719) {
        nextBtn.style.display = 'none'
    
        previousBtn.style.display = 'block'
        lastBtn.style.display = 'none'
        
    } else {
        lastBtn.style.display = 'inline-block'
        nextBtn.style.display = 'inline-block'
        
    }
}


function clearContent() {
    heroList.innerHTML = ''
}

function printItems(add) {

    hideButton()

    for(let id=1+add; id<13+add;id++) {
        

        fetch(`https://www.superheroapi.com/api.php/1405963789906787/${id}`)
        .then(res => res.json())
        .then(data => {

            // console.log(data)           

            heroPrint(data, id, heroList);

            
        }).catch((error) => {
            console.log(error)
          });
   
    }
    
}

// printing heroes

function heroPrint(data, id, list) {

    let power = data.powerstats.power;

    if( power == 'null') {
        power = '0';
    }


    let html = 
    `
    <div class="hero-card" id="${id}">

        <img src="${data.image.url}" onerror="this.src='./Images/default.jpg'" alt="">

        <div class="card-content">
            <h3>${data.name}</h3>
            <div class="power"> 
                <p>Power: </p><span>${power}</span>
            </div>
            
        </div>

        <button class="view-btn btn">View</button>

    </div>
    `
    list.innerHTML += html;
}

// hero view button 

viewFullDetails(heroList)



function viewFullDetails(list) {
    list.onclick = (e)=> {
        let clicked = e.target
        let id = clicked.parentElement.id
    
        if(clicked.classList.contains('view-btn')) {
            const previewContainer = document.querySelector('.preview-container')
    
            previewContainer.style.display = 'flex'
    
            showFullDetails(id)
        }
    } 
}



// // general printing 

// marvel heroes printing
const marvelArray = ['659', '332', '106', '346', '157','226']

generalPrinting(marvelArray, marvelList)
// marvel heroes printing
const avengersArray = ['659', '332', '106', '346', '149', '620', '107', '157','226', '280', '313', '697', '579', '487', 251, 536, 703, 566]

generalPrinting(avengersArray, avengersList)

// DC heroes printing
const dcArray = ['69', '644', '38', '720', '263', '216']

generalPrinting(dcArray, dcList)


function generalPrinting(array, list) {
    for(let index=0; index<array.length;index++) {

        fetch(`https://www.superheroapi.com/api.php/1405963789906787/${array[index]}`)
            .then(res => res.json())
            .then(data => {
    
                console.log(data)
    
                // printing marvel heroes
                printHeroes(data, list, array[index])
                viewFullDetails(list)
                
                
            }).catch((error) => {
                console.log(error)
              });
    
    } 
}



function printHeroes(data, list, id) {

    let power = data.powerstats.power;

    if( power == 'null') {
        power = '0';
    }

    let html = 
    `
    <div class="hero-card" id="${id}">

        <img src="${data.image.url}" onerror="this.src='./Images/default.jpg'" alt="">

        <div class="card-content">
            <h3>${data.name}</h3>
            <div class="power"> 
                <p>Power: </p><span>${power}</span>
            </div>
            
        </div>

        <button class="view-btn btn">View</button>

    </div>
    `
    list.innerHTML += html;
}



            



