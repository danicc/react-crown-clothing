export function addItemToCart(cartItems, cartItemToAdd) {
  let isInNewCartItems = false;

  const newCartItems = cartItems.map((cartItem) => {
    if (cartItem.id !== cartItemToAdd.id) return cartItem;
    isInNewCartItems = true;
    return {
      ...cartItem,
      quantity: cartItem.quantity + 1,
    };
  });

  if (isInNewCartItems) {
    return newCartItems;
  }

  return [...cartItems, { ...cartItemToAdd, quantity: 1 }];
}

export function removeItemFromCart(cartItems, cartItemToRemove) {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === cartItemToRemove.id
  );

  if (existingCartItem.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id);
  }
  return cartItems.map((cartItem) =>
    cartItem.id === cartItemToRemove.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
}
