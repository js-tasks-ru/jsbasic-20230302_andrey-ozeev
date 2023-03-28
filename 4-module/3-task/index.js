function highlight(table) {

  let rows = table.rows;

  for (let i = 1; i < rows.length; i++) {
    let cells = rows[i].cells;

    if (+cells[1].textContent < 18) {
      rows[i].style.textDecoration = 'line-through';
    }

    if (cells[2].textContent === 'm') {
      rows[i].classList.add('male');
    }
    else if (cells[2].textContent === 'f') {
      rows[i].classList.add("female");
    }

    if (!cells[3].hasAttribute("data-available")) {
      rows[i].setAttribute("hidden", '');
    }
    else {
      if (cells[3].dataset.available === 'true') {
        rows[i].classList.add("available");
      } else {
        rows[i].classList.add("unavailable");
      }
    }
  }
}
