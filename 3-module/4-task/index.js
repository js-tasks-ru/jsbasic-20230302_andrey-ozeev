function showSalary(users, age) {
  let usersFilter = '';
  users.map((user) => user).filter((element) => element.age <= age ? usersFilter += `${element.name}, ${element.balance}\n` : false);
  return usersFilter.slice(0, -1);
}
