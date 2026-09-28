export const mockTables = [
  { id:'T1', seats:2, label:'Window 1' }, { id:'T2', seats:2, label:'Window 2' },
  { id:'T3', seats:4, label:'Garden 1' }, { id:'T4', seats:4, label:'Garden 2' },
  { id:'T5', seats:6, label:'Family 1' }, { id:'T6', seats:8, label:'Private room' },
];
const demoBusyDate = new Date(Date.now() + 86400000).toISOString().slice(0,10);
export const mockReservations = [
  { id:'r-demo', name:'Demo booking', date:new Date().toISOString().slice(0,10), time:'19:00', partySize:4, tableId:'T3', phone:'0300-1234567', status:'confirmed' },
  ...mockTables.map((table) => ({ id:`r-busy-${table.id}`, name:'Seeded unavailable slot', date:demoBusyDate, time:'19:00', partySize:table.seats, tableId:table.id, phone:'0300-0000000', status:'confirmed' })),
];
