customElements.define("search-bar", class extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div id="search-wrapper">
        <!-- ajouter la classe "active" à #search-input pour l'afficher-->
        <input id="search-input" type="search" spellcheck="false" autocapitalize="false" autofocus />

        <button id="search-trigger" class="icon-button" type="button">
          <span class="material-icons">search</span>
        </button>
      </div>
     `

    const searchInput = this.querySelector('#search-input')

    this.querySelector('#search-trigger').addEventListener('click', () => {
      searchInput.classList.toggle('active')
    })

    searchInput.addEventListener('change', () => {
      window.location.hash = `#search/${searchInput.value}`
    })
  }
})
