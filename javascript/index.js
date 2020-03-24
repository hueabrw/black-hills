// JavaScript Document

var i = 0;
var j = 0;
var range = ["l5","l3","l7","l6","l10","l2","l8","l4","l1","l9"];

function fadeTitle(){
	if(i < 1000){
		var elem = document.getElementById(range[j])
		elem.style.animation = "fadeInTitle 2s 0.5s";
		elem.style.animationFillMode = "forwards";
		i += 100;
		j ++;
		setTimeout(fadeTitle, 100);
	}
}

var container = document.getElementById("container");

function changeBackground(){
	container.style.backgroundImage = URL("../assets/images/background_1.jpeg");
}

function loadPage(url) {
  return fetch(url, {
    method: 'GET'
  }).then(function(response) {
    return response.text();
  });
}

var main = document.querySelector('main');

function changePage() {
  // Note, the URL has already been changed
  var url = window.location.href;

  loadPage(url).then(function(responseText) {
    var wrapper = document.createElement('div');
        wrapper.innerHTML = responseText;

    var oldContent = document.querySelector('.cc');
    var newContent = wrapper.querySelector('.cc');

    main.appendChild(newContent);
    animate(oldContent, newContent);
  });
}

function animate(oldContent, newContent) {
  oldContent.style.position = 'absolute';

  var fadeOut = oldContent.animate({
    opacity: [1, 0]
  }, 1000);

  var fadeIn = newContent.animate({
    opacity: [0, 1]
  }, 1000);

  fadeIn.onfinish = function() {
    oldContent.parentNode.removeChild(oldContent);
  };
}

window.addEventListener('popstate', changePage);

document.addEventListener('click', function(e) {
  var el = e.target;

  // Go up in the nodelist until we find a node with .href (HTMLAnchorElement)
  while (el && !el.href) {
    el = el.parentNode;
  }

  if (el) {
    e.preventDefault();
    history.pushState(null, null, el.href);
    changePage();

    return;
  }
});

