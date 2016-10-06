// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)

// the 2nd parameter is an array of 'requires'

var db=null;

  
var scanApp=angular.module('starter', ['ionic','ngCordova','firebase','ui.router']);


scanApp.run(function($ionicPlatform,$cordovaSQLite) {
  
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
     //  cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }



      db =window.sqlitePlugin.openDatabase({name: 'Eventsdemo.db', location: 'default'});
       $cordovaSQLite.execute(db,"CREATE TABLE IF NOT EXISTS vin_events(id integer primary key,shortvin text,barformat text,event text)");
         $cordovaSQLite.execute(db,"CREATE TABLE IF NOT EXISTS location_events(id integer primary key,shortvin text,location text,event text)");
         $cordovaSQLite.execute(db,"CREATE TABLE IF NOT EXISTS locations(id integer primary key,loc_id text,description text)");
       
});
})



/*scanApp.factory("Auth", ["$firebaseAuth",
  function($firebaseAuth) {
    var ref = new Firebase("https://digiteyes-a337e.firebaseio.com");
    return $firebaseAuth(ref);
  }
]);*/


scanApp.config(function($stateProvider,$urlRouterProvider,$ionicConfigProvider){

   $ionicConfigProvider.tabs.position('bottom'); //bottom

$stateProvider
.state('welcome',{
  url:'/welcome',
  templateUrl:'templates/welcome.html',
  controller:'LoginCtrl'
})
.state('login',{
  url:'/login',
  templateUrl:'templates/login.html',
  controller:'LoginCtrl'
})
.state('CreateABS',{
  url:'/CreateABS',
  templateUrl:'templates/CreateABS.html',
  controller:'LoginCtrl'
})

.state('/VehicleIntoComp',{
  url:'/VehicleIntoComp',
  templateUrl:'templates/VehicleIntoComp.html',
  controller:'LoginCtrl'
})
.state('map', {
    url: '/map',
    templateUrl: 'templates/map.html',
    controller: 'LoginCtrl'
  })


.state('dashboard',{
  url:'/dashboard',
  //abstract:true,
  templateUrl:'templates/dashboard.html',
  controller:'LoginCtrl'
  
})
.state('viewVehicle',{
  url:'/viewVehicle',
  templateUrl:'templates/viewVehicle.html',
  controller:'LoginCtrl'
})

$urlRouterProvider.otherwise('/welcome')  
})



