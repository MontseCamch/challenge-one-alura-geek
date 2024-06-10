import { servicesProduct } from "./product-services.js";

const productContainer = document.querySelector("[data-product]");
const form = document.querySelector("[data-form]");


function createCard(name, price, image, id) {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
            <img class="card__image" src="${image}" alt="${name}">
            <div class="card-container__info">
                <h3 class="card__title">${name}</h3>
                <div class="card-container__value">
                    <p class="card__price">$${price}</p>
                    <button class="button__delete" data-id="${id}"> <img src="./assets/trashIcon.png"/></button>
                </div>
            </div>
    `;

            const deleteButton = card.querySelector(".button__delete");
            deleteButton.addEventListener("click", () => {
            servicesProduct.deleteProduct(id).then(() => {
                card.remove();
            }).catch((err) => console.log(err));
        }); 
        
        

    
    productContainer.appendChild(card);
    return card;
    
}

const render = async () => {
    try{
        const listProducts = await servicesProduct.productList();
        
        listProducts.forEach(product => {
            productContainer.appendChild(
                createCard(
                    product.name,
                    product.price,
                    product.image,
                    product.id
                )
            )
        });

    } catch (error){
        console.log(error);
    }
};

form.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = document.querySelector("[data-name]").value;
    const price = document.querySelector("[data-price]").value;
    const image = document.querySelector("[data-image]").value;

    servicesProduct.createProduct(name, price, image)
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
});




render();