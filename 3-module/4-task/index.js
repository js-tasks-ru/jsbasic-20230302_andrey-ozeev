function showSalary(users, age) {
  return users.filter((element) => element.age <= age).map((item) => `${item.name}, ${item.balance}`).join("\n");
}
