// Restaurant landing page - menu tabs and reservation form validation (vanilla JS)
const MENU = {
 Starters: [['Gobi 65', 140, 'Crispy spiced cauliflower', 1], ['Chicken 65', 180, 'Spicy fried chicken bites', 0], ['Medu Vada', 80, 'Crisp lentil doughnuts with chutney', 1]],
 Mains: [['Chicken Biryani', 220, 'Seeraga samba rice with tender chicken', 0], ['Veg Meals', 150, 'Rice, sambar, rasam, curries and payasam', 1], ['Chettinad Fish Curry', 260, 'Tangy coconut and pepper gravy', 0]],
 Tiffin: [['Masala Dosa', 90, 'Crispy dosa with potato masala', 1], ['Ghee Podi Idli', 80, 'Soft idlis tossed in spice powder and ghee', 1], ['Egg Kothu Parotta', 130, 'Shredded parotta with egg and masala', 0]],
 Desserts: [['Payasam', 70, 'Warm vermicelli and milk dessert', 1], ['Gulab Jamun', 60, 'Two soft milk dumplings in syrup', 1], ['Filter Coffee', 40, 'Strong, frothy and fresh', 1]]};
const $ = id => document.getElementById(id), esc = s => String(s).replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
function show(cat) {
  [...$('tabs').children].forEach(b => b.setAttribute('aria-pressed', b.textContent === cat));
  $('items').innerHTML = MENU[cat].map(([n, p, d, v]) => `<article class="item"><h3><span><i class="veg ${v ? '' : 'nv'}" title="${v ? 'Vegetarian' : 'Non-vegetarian'}"></i>${esc(n)}</span><span>Rs. ${p}</span></h3><p>${esc(d)}</p></article>`).join('');
}
Object.keys(MENU).forEach(c => { const b = document.createElement('button'); b.type = 'button'; b.className = 'tab'; b.textContent = c; b.onclick = () => show(c); $('tabs').append(b); });
show('Starters');
$('date').min = new Date().toISOString().slice(0, 10);
$('rf').addEventListener('submit', e => {
  e.preventDefault(); const m = $('msg'), phone = $('phone').value.replace(/\D/g, ''), g = +$('guests').value;
  const bad = !$('name').value.trim() ? 'Please enter your name.' : phone.length < 10 ? 'Please enter a valid 10-digit phone number.' : !$('date').value ? 'Please choose a date.' : (g < 1 || g > 12) ? 'Guests must be between 1 and 12.' : '';
  m.className = bad ? 'err' : 'ok';
  m.textContent = bad || `Thank you, ${$('name').value.trim()}! Table for ${g} on ${$('date').value} at ${$('time').value} is requested. We will call to confirm.`;
  if (!bad) $('rf').reset(), $('guests').value = 2;
});
