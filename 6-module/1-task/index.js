/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      }
 *
 */
export default class UserTable {
  constructor(rows) {
    this.rows = rows;
    this.rendering();
  }
  rendering() {
    this.elem = document.createElement('table');
    this.elem.innerHTML = `<thead>
    <tr>
        <th>Имя</th>
        <th>Возраст</th>
        <th>Зарплата</th>
        <th>Город</th>
        <th></th>
    </tr>
    </thead>`;
     this.elem.insertAdjacentHTML('beforeend', this.rows.map(item => `
      <tr>
          <td>${item.name}</td>
          <td>${item.age}</td>
          <td>${item.salary}</td>
          <td>${item.city}</td>
          <td><button>X</button></td>
      </tr>`));

    this.elem.addEventListener('click', this.newTable)

    return this.elem;

  }
  newTable(event) {
    if(event.target.closest('button')) {
      event.target.closest('button').closest('tr').remove();
    }
  }
}
