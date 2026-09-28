export const initialCartState = { items: [], promoCode: '', discountPercent: 0, promoError: '' };
export const promoCodes = { WELCOME10: 10, FEAST20: 20 };
export function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM': {
      const found = state.items.find((item) => item.id === action.item.id);
      const items = found
        ? state.items.map((item) => item.id === action.item.id ? { ...item, quantity: item.quantity + 1 } : item)
        : [...state.items, { ...action.item, quantity: 1, note: '' }];
      return { ...state, items, promoError: '' };
    }
    case 'REMOVE_ITEM': return { ...state, items: state.items.filter((item) => item.id !== action.id) };
    case 'INCREMENT': return { ...state, items: state.items.map((item) => item.id === action.id ? { ...item, quantity: item.quantity + 1 } : item) };
    case 'DECREMENT': return { ...state, items: state.items.flatMap((item) => item.id !== action.id ? [item] : item.quantity <= 1 ? [] : [{ ...item, quantity: item.quantity - 1 }]) };
    case 'UPDATE_NOTE': return { ...state, items: state.items.map((item) => item.id === action.id ? { ...item, note: action.note } : item) };
    case 'CLEAR_CART': return { ...initialCartState };
    case 'APPLY_PROMO': {
      const code = String(action.code || '').trim().toUpperCase();
      return promoCodes[code]
        ? { ...state, promoCode: code, discountPercent: promoCodes[code], promoError: '' }
        : { ...state, promoError: 'That promo code is not valid. Try WELCOME10 or FEAST20.' };
    }
    case 'REMOVE_PROMO': return { ...state, promoCode: '', discountPercent: 0, promoError: '' };
    default: return state;
  }
}
export const cartCount = (items) => items.reduce((sum, item) => sum + item.quantity, 0);
