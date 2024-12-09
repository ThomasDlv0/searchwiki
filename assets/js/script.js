
// API ENDPOINT : `https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&origin=*&srlimit=20&srsearch=${searchInput}`

const form = document.querySelector("form");
const input = document.querySelector(".search-input");
const errorMsg = document.querySelector(".error-msg");
const resultsDisplay = document.querySelector(".results-display");
const loader = document.querySelector(".loader");

form.addEventListener("submit", handleSubmit)

function handleSubmit(event) {
    event.preventDefault()
    if (input.value === "") {
        errorMsg.textContent = "Wops, veuillez remplir le champ";
        return;
    } else {
        errorMsg.textContent = "";
        loader.style.display = "flex";
        resultsDisplay.textContent = "";
        wikiApiCall(input.value)
    }
}

async function wikiApiCall(searchInput) {
    
    try {
        const response = await fetch(`https://fr.wikipedia.org/w/api.php?action=query&list=search&format=json&origin=*&srlimit=20&srsearch=${searchInput}`);
        if (!response.ok) {
            throw new Error(`${response.status}`)
        }
        const data = await response.json()
        
        createCards(data.query.search)
    } catch (error) {
        errorMsg.textContent = `${error}`
        loader.style.display = "none";
    }
}


function createCards(data) {
    if (!data.length){
        errorMsg.textContent = "Wops, aucun résultat";
        loader.style.display = "none";
        return;
    } else {
        data.forEach(e => {
            const url = `https://fr.wikipedia.org/?curid=${e.pageid}`
            const card = document.createElement("div");
            card.className = "result-item";
            card.innerHTML = `<h3 class="result-title"><a href="${url}" target="_blank">${e.title}</a></h3>
                              <a href="${url}" class="result-link" target="_blank">${url}</a>
                              <span class="result-snippet">${e.snippet}</span>`

            resultsDisplay.appendChild(card)
        })
    }
    loader.style.display = "none";
}