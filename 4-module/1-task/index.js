function makeFriendsList(friends) {
  let ul = document.createElement("ul");
  friends.forEach(element => {
    ul.insertAdjacentHTML('beforeend', `<li>${element.firstName} ${element.lastName}</li>`);
  });
  return ul;
}
