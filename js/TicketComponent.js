class TicketComponent extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });

        this.totalPrice = 0;
        this.orders = [];

        const container = document.createElement('div');
        container.classList.add('ticket-container', 'p-3', 'bg-light');

        //Como se mostraran las card con el valor final
        this.orderList = document.createElement('ul');
        this.orderList.classList.add('list-group', 'mb-3', 'mr-2', 'd-flex', 'flex-wrap');
        this.orderList.style.display = "flex"; //Uno al lado del otro
    
        //Titulo de Ticket final
        const orderTitle = document.createElement('h2');
        orderTitle.classList.add('h4', 'mb-4');
        orderTitle.textContent = 'Ticket Final';
        container.appendChild(orderTitle);

        container.appendChild(this.orderList);

        const totalContainer = document.createElement('div');
        totalContainer.classList.add('total-container');

        // Crear el contenedor para el precio total
        const priceContainer = document.createElement('div');
        priceContainer.style.cssText = "background-color: white; border: 2px solid #33FF8F; border-radius: 10px; padding: 10px;";

        // Precio Final
        const preufinaltotal = document.createElement('p');
        preufinaltotal.classList.add('h6', 'mb-0');
        preufinaltotal.textContent = 'Precio total:';
        preufinaltotal.style.cssText = "font-size: 20px; color: #16E07D; font-weight: bold; margin-bottom: 10px;";
        priceContainer.appendChild(preufinaltotal);

        this.priceSpan = document.createElement('span');
        this.priceSpan.classList.add('price', 'h5', 'fw-bold');
        this.priceSpan.textContent = '0.00 €';
        this.priceSpan.style.cssText = "background-color: white;color: #16E07D; margin-bottom: 10px; border-radius: 20px;";
        priceContainer.appendChild(this.priceSpan);

        totalContainer.appendChild(priceContainer);
        

        container.appendChild(totalContainer);

        //Boton para finalizar pedido
        const clearButton = document.createElement('button');
        clearButton.classList.add('btn', 'btn-danger');
        clearButton.textContent = 'Finalizar pedido';
        clearButton.style.cssText = "background-color: #16E07D; color: white; border: none; padding: 10px 20px; text-align: center; text-decoration: none; display: inline-block; font-size: 16px; margin: 4px 2px; cursor: pointer; border-radius: 12px; transition: background-color 0.3s ease;";
        clearButton.onmouseover = function() { this.style.backgroundColor = "#16C16D"; }
        clearButton.onmouseout = function() { this.style.backgroundColor = "#16E07D"; }
        
        //Alert que aparece después de clicar a finalizar pedido
        clearButton.addEventListener('click', () => {
            const confirmation = confirm('Pedido realizado. ¡Gracias por confiar en nosotros!');
            if (confirmation) {
                this.clearOrderList();
            }
        });

        container.appendChild(clearButton);

        shadow.appendChild(container);
    }
    // Afegir elements
    addOrder({ name, price, category }) {
        const orderItem = document.createElement('li');
        orderItem.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center', 'mb-2', 'mr-2');
        orderItem.style.cssText = "list-style-type: none; background-color: #17C6EA; color: white; font-size: 18px; padding: 15px 20px; border-radius: 10px; margin-bottom: 10px; transition: background-color 0.3s ease;";
        orderItem.onmouseover = function() { this.style.backgroundColor = "#1DAAC7"; }
        orderItem.onmouseout = function() { this.style.backgroundColor = "#17C6EA"; }
        orderItem.style.width = '250px';
        orderItem.style.marginRight = '10px';
        
        //Nombre de Plato
        const nameDiv = document.createElement('div');
        nameDiv.textContent = `Nombre: ${name}`;
        orderItem.appendChild(nameDiv);

        //Categoria de Plato
        const categoryDiv = document.createElement('div');
        categoryDiv.textContent = `Categoria: ${category}`;
        orderItem.appendChild(categoryDiv);

        //Precio de Plato
        const priceDiv = document.createElement('div');
        priceDiv.classList.add('d-flex', 'align-items-center');
        const priceLabel = document.createElement('span');
        priceLabel.textContent = 'Precio: ';
        priceDiv.appendChild(priceLabel);
        const priceSpan = document.createElement('span');
        priceSpan.classList.add('badge', 'bg-primary', 'rounded-pill', 'me-2');
        priceSpan.textContent = `${price.toFixed(2)} €`;
        priceDiv.appendChild(priceSpan);
        orderItem.appendChild(priceDiv);

        //Boton de Eliminar
        const deleteButton = document.createElement('button');
        deleteButton.classList.add('btn', 'btn-sm', 'btn-danger');
        deleteButton.textContent = 'Eliminar';
        deleteButton.style.cssText = "background-color: #ff4d4d; color: white; border: none; padding: 10px 20px; text-align: center; text-decoration: none; display: inline-block; font-size: 16px; margin: 4px 2px; cursor: pointer; border-radius: 12px; transition: background-color 0.3s ease;";
        deleteButton.onmouseover = function() { this.style.backgroundColor = "#cc0000"; }
        deleteButton.onmouseout = function() { this.style.backgroundColor = "#ff4d4d"; }        
        orderItem.appendChild(deleteButton);

        this.orderList.appendChild(orderItem);

        const handleDeleteClick = () => {
            this.removeOrder(orderItem, price);
        };

        deleteButton.addEventListener('click', handleDeleteClick);

        this.totalPrice += price;
        this.priceSpan.textContent = `${this.totalPrice.toFixed(2)} €`;

        //alert(`Producto seleccionado: ${name}`);
    }
    //Eliminar items
    removeOrder(orderItem, price) {
        this.orderList.removeChild(orderItem);
        this.totalPrice -= price;
        this.priceSpan.textContent = `${this.totalPrice.toFixed(2)} €`;
    }

    //Limpiamos los elementos del ticket final
    clearOrderList() {
        while (this.orderList.firstChild) {
            this.orderList.removeChild(this.orderList.firstChild);
        }
        this.totalPrice = 0;
        this.priceSpan.textContent = '0.00 €';
    }
}

//Creamos la etiqueta del Componente
customElements.define('ticket-component', TicketComponent);