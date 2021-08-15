const getCartPageItems = () => {
  db.collection('cart-items').onSnapshot((snapshot) => {
    let cartItems = [];
    snapshot.forEach((doc) => {
      cartItems.push({
        id: doc.id,
        ...doc.data(),
      });
    });
    generateCartPageItems(cartItems);
    getTotalCost(cartItems);
  });
};

const generateCartPageItems = (items) => {
  let itemsHTML = '';
  items.forEach((item) => {
    itemsHTML += `
    <div class="cart-item mt-5 flex items-center border-b border-gray-100">
        <div class="cart-item-image w-40 h-24 bg-white p-4 rounded-lg">
        <img
          class="w-full h-full object-contain"
          src=${item.image}
          alt="macbook"
        />
      </div>
      <div class="cart-item-details flex-grow">
        <div class="cart-item-title font-bold text-sm text-gray-600">
          ${item.name}
        </div>
        <div class="cart-item-brand text-sm text-gray-400">${item.make}</div>
      </div>
      <div class="cart-counters w-48 flex items-center">
        <div
          data-id=${item.id}
          class="
            cart-item-decrease
            cursor-pointer
            text-gray-400
            bg-gray-100
            h-6
            w-6
            flex
            justify-center
            items-center
            mr-2
            hover:bg-gray-200
          "
        >
          <i class="fas fa-chevron-left fa-xs"></i>
        </div>
        <h4 class="text-gray-400">x${item.quantity}</h4>
        <div
          data-id=${item.id}
          class="
            cart-item-increase
            cursor-pointer
            text-gray-400
            bg-gray-100
            h-6
            w-6
            flex
            justify-center
            items-center
            ml-2
            hover:bg-gray-200
          "
        >
          <i class="fas fa-chevron-right fa-xs"></i>
        </div>
      </div>
      <div class="cart-item-total-cost w-48 font-bold text-gray-400">
        ${numeral(item.price * item.quantity).format('$0,0.00')}
    </div>
      <div
        data-id=${item.id}
        class="
          cart-item-delete
          w-10
          font-bold
          text-gray-300
          cursor-pointer
          hover:text-gray-400
        "
      >
        <i class="fas fa-times"></i>
      </div>
      </div>
        `;
  });
  document.querySelector('.cart-items').innerHTML = itemsHTML;
  createEventListeners();
};

const createEventListeners = () => {
  let decreaseButton = document.querySelectorAll('.cart-item-decrease');
  let increaseButton = document.querySelectorAll('.cart-item-increase');
  let deleteButton = document.querySelectorAll('.cart-item-delete');

  decreaseButton.forEach((button) => {
    button.addEventListener('click', () => decreaseCount(button.dataset.id));
  });
  increaseButton.forEach((button) => {
    button.addEventListener('click', () => increaseCount(button.dataset.id));
  });
  deleteButton.forEach((button) => {
    button.addEventListener('click', () => deleteItem(button.dataset.id));
  });
};

const decreaseCount = (itemId) => {
  let cartItem = db.collection('cart-items').doc(itemId);
  cartItem.get().then((doc) => {
    if (doc.exists) {
      if (doc.data().quantity > 1) {
        cartItem.update({
          quantity: doc.data().quantity - 1,
        });
      }
    }
  });
};

const increaseCount = (itemId) => {
  let cartItem = db.collection('cart-items').doc(itemId);
  cartItem.get().then((doc) => {
    if (doc.exists) {
      if (doc.data().quantity >= 1) {
        cartItem.update({
          quantity: doc.data().quantity + 1,
        });
      }
    }
  });
};

const deleteItem = (itemId) => {
  db.collection('cart-items')
    .doc(itemId)
    .delete()
    .then(() => {
      //   console.log('Document successfully deleted!');
    })
    .catch((error) => {
      console.error('Error removing document: ', error);
    });
};

const getTotalCost = (items) => {
  let totalCost = 0;
  items.forEach((item) => {
    totalCost += item.price * item.quantity;
  });
  document.querySelector('.total-cost-number').innerText = numeral(totalCost).format('$0,0.00');
};

getCartPageItems();
