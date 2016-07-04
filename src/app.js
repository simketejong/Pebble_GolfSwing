/**
 * Welcome to Pebble.js!
 *
 * This is where you write your app.
 */

var UI = require('ui');
/*var Vector2 = require('vector2');*/
var Vibe = require('ui/vibe');
var Accel = require('ui/accel');
var myLat = 0;
var myLong = 0;
var myError = 0;

var main = new UI.Card({
  title: 'GolfSwing',
  subtitle: 'GolfSwing!',
  body: 'Shake to activate',
});

/* GPS stuf */
var locationOptions = {
  enableHighAccuracy: true, 
  maximumAge: 10, 
  timeout: 10000
};

// Get the location
function locationSuccess(pos) {
  console.log('\n****** START ******\nhere I am:\nlat= ' + pos.coords.latitude + ' lon= ' + pos.coords.longitude + '\n'); // Just to se that it works fine*/
  myLat = pos.coords.latitude;
  myLong = pos.coords.longitude;
  console.log('My location\n' + myLat + ' and ' + myLong + '\n****** THE END  02 ******\n'); // This does also work fine */
}

function locationError(err) {
    myError = err.code + ' ' + err.message;
  console.log('location error (' + err.code + '): ' + err.message);
}

// Make an asynchronous request
navigator.geolocation.getCurrentPosition(locationSuccess, locationError, locationOptions);
Accel.init();
main.on('accelTap', function(e) {
Vibe.vibrate('double');
while (myLat === 0){
  main.title('Position');
  main.subtitle('GPS');
  main.body('lat= ' + myLat + '\nlon= ' + myLong + '\nError: ' + myError);
  main.show();
}
main.title('Poep');
});

