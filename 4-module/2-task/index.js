function makeDiagonalRed(table) {
  let tr = table.rows;
  for (let i = 0; i < tr.length; i++) {
    let row = table.rows[i];
    row.cells[i].style.backgroundColor = 'red';
  }
}
