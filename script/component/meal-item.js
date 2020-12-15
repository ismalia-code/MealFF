class MealItem extends HTMLElement {
    constructor() {
        super();
        this.render();
    }

    render() {
        this.innerHTML += `
            <a class="meal-link" href="#" class="meal">
                <img class="meal-img" src="/img/placeholder.jpg" alt="">
                <span class="meal-name"></span>
            </a>
        `;
    }
};

customElements.define("meal-item", MealItem);