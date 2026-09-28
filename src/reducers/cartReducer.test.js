import { cartReducer, initialCartState } from './cartReducer';
const item={id:'m1',name:'Soup',price:500};
describe('cartReducer',()=>{
  test('adds new item and increments duplicate item',()=>{const one=cartReducer(initialCartState,{type:'ADD_ITEM',item});const two=cartReducer(one,{type:'ADD_ITEM',item});expect(two.items).toHaveLength(1);expect(two.items[0].quantity).toBe(2);});
  test('decrementing quantity one removes the item',()=>{const one=cartReducer(initialCartState,{type:'ADD_ITEM',item});expect(cartReducer(one,{type:'DECREMENT',id:'m1'}).items).toEqual([]);});
  test('updates special instruction immutably',()=>{const one=cartReducer(initialCartState,{type:'ADD_ITEM',item});const next=cartReducer(one,{type:'UPDATE_NOTE',id:'m1',note:'no onions'});expect(next.items[0].note).toBe('no onions');expect(one.items[0].note).toBe('');});
  test('applies known promo and rejects unknown promo',()=>{const good=cartReducer(initialCartState,{type:'APPLY_PROMO',code:'welcome10'});expect(good.discountPercent).toBe(10);const bad=cartReducer(good,{type:'APPLY_PROMO',code:'NOPE'});expect(bad.discountPercent).toBe(10);expect(bad.promoError).toMatch(/not valid/i);});
  test('clear cart resets items and promo',()=>{const state={items:[{...item,quantity:2}],promoCode:'FEAST20',discountPercent:20};expect(cartReducer(state,{type:'CLEAR_CART'})).toEqual(initialCartState);});
});
