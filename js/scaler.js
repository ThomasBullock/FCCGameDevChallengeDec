var Platformer = Platformer || {};


// calculate the dimensions of the game so that 100% of the screen is occupied

Platformer.getGameLandscapeDimensions = function(max_w, max_h) {

  //get both w and h of the screen (they might exchange)
  var w = window.innerWidth * window.devicePixelRatio;  //gives you width of the window - sometimes window.inner gives wrong info on some versions of android
  var h = window.innerHeight * window.devicePixelRatio;  //gives you height of the window - sometimes window.inner gives wrong info on some versions of android
  console.log(w, h)   
  // get the actual w and h 
  var landW = Math.max(w, h);
  var landH = Math.min(w, h);

  console.log(landW, landH)
  
  // do we need to scale to fit in width?
  if(landW > max_w) {
    var ratioW = max_w / landW;
    landW *= ratioW;
    landH *= ratioW;
  }

  console.log(landW, landH)
  
  // do we need to scale to fit in height?
  if(landH > max_h) {
    var ratioH = max_h / landH;
    landW *= ratioH;
    landH *= ratioH;
  }
  
  return {
    w: landW,
    h: landH
  }
}
