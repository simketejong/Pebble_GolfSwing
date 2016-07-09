/**
 * Welcome to Pebble.js!
 *
 * This is where you write your app.
 */

var UI = require('ui');
var Vibe = require('ui/vibe');
var Accel = require('ui/accel');
var ajax = require('ajax');

var DATADROPURL = 'http://192.168.1.4/GolfClub.php?data=';

/* Globals */
var myLat = 0;
var myLong = 0;
var myError = 0;
/*
var Xaverage = 0;
var Yaverage = 0;
var Zaverage = 0;
*/
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

Accel.config({rate:10, samples:1, subscribe:true});

Accel.init();
main.show(); 
main.on('accelTap', function(e) {
  while (myLong === 0) {
    Vibe.vibrate('double');
    main.title('Position');
    main.subtitle('GPS');
    main.body('lat= ' + myLat + '\nlon= ' + myLong + '\nError: ' + myError);  
  }
});
    
main.on('accelData', function(e) {
main.subtitle(parseInt(Math.pow((Math.pow(e.accel.x,2) + Math.pow(e.accel.y,2) + Math.pow(e.accel.z,2)),0.5))); 
main.body('x=' + e.accel.x + '\n' + 'y=' + e.accel.y + '\n' + 'z=' + e.accel.z + '\n' + 'vibe=' + e.accel.vibe + '\n' + 'time=' +   e.accel.time + '\n'); 
  ajax(
      {
        url: DATADROPURL +    
          '&x='+e.accel.x+
          '&y='+e.accel.y+
          '&z='+e.accel.z+
          '&vibe='+e.accel.vibe+
          '&time='+e.accel.time/*+
          '&Xaverage'+Xaverage+
          '&Yaverage'+Yaverage+
          '&Zaverage'+Zaverage*/,
          type:'json',
          async:'true'
      },
      function(data){
       console.log('Succeeded: ' + data);
      },
      function(error) {
        console.log('Download failed: ' + error);
      }
    );
/*  Xaverage=(Xaverage+e.accel.x)/2;
  Yaverage=(Yaverage+e.accel.y)/2;
  Zaverage=(Zaverage+e.accel.z)/2;*/
});





