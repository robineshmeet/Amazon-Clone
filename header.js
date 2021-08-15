const getCartItems = () => {
  db.collection('cart-items').onSnapshot((snapshot) => {
    let totalCount = 0;
    snapshot.forEach((doc) => {
      totalCount += doc.data().quantity;
    });
    setCounter(totalCount);
  });
};

const setCounter = (totalCount) => {
  document.querySelector('.cart-item-number').innerText = totalCount;
};
getCartItems();
