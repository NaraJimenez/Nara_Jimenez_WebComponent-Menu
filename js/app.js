const pizza = { name: 'Pizza', price: 8.50, ingredients: 'Lechuga, tomate, cebolla, aceitunas, aderezo' };
const ramen = { name: 'Ramen', price: 8.00, ingredients: 'Noodles en sopa de pollo con huevo y verduras' };
const pasta = { name: 'Pasta a la Boloñesa', price: 8.00, ingredients: 'Macarrones, salsa de tomate con olivas negras' };

const alitas = { name: 'Alitas de Pollo Rebozadas', price: 11.00, ingredients: 'Alitas de pollo rebozadas' };
const patatas = { name: 'Patatas Fritas', price: 5.00, ingredients: 'Patatas fritas en sal y aceite' };
const ensalada = { name: 'Ensalada', price: 13.00, ingredients: 'Lechuga, tomate, cebolla, aceitunas y salsa' };

const pastel = { name: 'Pastel', price: 5.00, ingredients: 'Pastel de natas y fresa' };
const pancake = { name: 'Pancake', price: 7.00, ingredients: 'Pancake con fresas, arandanos y sirope de chocolate' };
const helado = { name: 'Helado', price: 13.00, ingredients: 'Helado de nata y fresa, con fruta variada y dulces con chocolate' };

const agua = { name: 'Agua', price: 2.50, ingredients: 'Agua Mineral Natural' };
const cocktail = { name: 'Cocktail', price: 5.50, ingredients: 'Malibu con licor azul' };
const zumo = { name: 'Zumo de Naranja', price: 2.00, ingredients: 'Zumo de Naranja recien exprimido' };

// Montamos las arrays para cada categoría
const primeros = [pizza, ramen, pasta];
const segundos = [alitas, patatas, ensalada];
const postres = [pastel, pancake, helado];
const bebidas = [agua, cocktail, zumo];

// Añadimos el ticket y los botones
const ticketComponent = document.querySelector('ticket-component');
const addButtons = document.querySelectorAll('.btn-add');
const infoButtons = document.querySelectorAll('.btn-info-toggle');
const infoContainers = document.querySelectorAll('.info-container');
const infoTexts = document.querySelectorAll('.info-text');

// Por cada botón de añadir, además asociamos la categoría de comida y calculamos el precio
addButtons.forEach((addButton, index) => {
  addButton.addEventListener('click', () => {
    let category, item;
    if (index < primeros.length) {
      category = 'Primero';
      item = primeros[index];
    } else if (index < primeros.length + segundos.length) {
      category = 'Snack';
      item = segundos[index - primeros.length];
    } else if (index < primeros.length + segundos.length + postres.length) {
      category = 'Postre';
      item = postres[index - primeros.length - segundos.length];
    } else {
      category = 'Bebida';
      item = bebidas[index - primeros.length - segundos.length - postres.length];
    }
    const quantity = 1;

    const totalPrice = item.price * quantity;
    addButton.setAttribute('data-ingredients', item.ingredients);
    ticketComponent.addOrder({ name: item.name, price: totalPrice, category });
  });
});

// Botón de Info
infoButtons.forEach((button, index) => {
  button.addEventListener('click', () => {
    const ingredients = button.getAttribute('data-ingredients');
    
    // Mostrar los ingredientes en un cuadro de diálogo de alerta
    alert(ingredients);
  });
});

