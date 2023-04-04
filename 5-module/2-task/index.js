function toggleText() {
  let toggleButton = document.querySelector('.toggle-text-button');
  let textContaienr = document.querySelector('#text');
  toggleButton.addEventListener('click', function () {
    textContaienr.hidden = !textContaienr.hidden;
  });
}
