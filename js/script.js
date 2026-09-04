// Minimal JS placeholder for future interactions
// Currently left intentionally small — add interactivity as needed

document.addEventListener('DOMContentLoaded', function(){
  // Example: smooth scroll to contact on CTA click
  var cta = document.querySelector('.cta a');
  if(cta){
    cta.addEventListener('click', function(e){
      e.preventDefault();
      var target = document.querySelector('#contact');
      if(target){
        target.scrollIntoView({behavior:'smooth',block:'start'});
      }
    });
  }
});
