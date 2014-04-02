var musicApp = angular.module('musicApp', []);
musicApp.controller('musicController', ['$scope', 'getData', function($scope, getData) {
  getData.get('https://gdata.youtube.com/feeds/api/videos?q=phantogram&orderby=relevance&start-index=1&max-results=1&v=2&prettyprint=true&fields=entry(media:group(yt:videoid))', function(data) {
      var xmlDoc = $.parseXML(data);
      $xml = $( xmlDoc ),
      $video = $xml.find( 'videoid' );
      videoId = $video[0].innerHTML
  });
}])

musicApp.controller('getArtist', ['$scope', 'getData', function($scope, getData) {
    $scope.artist = {};
      $scope.artist.name;
      $scope.playList = [];
      $scope.getVideo = function(name) {
          getData.get('https://gdata.youtube.com/feeds/api/videos?q=' + $scope.artist.name + '&orderby=relevance&start-index=1&max-results=1&v=2&prettyprint=true&fields=entry(media:group(yt:videoid))', function(data) {
              var xmlDoc = $.parseXML(data);
              $xml = $(xmlDoc),
              $video = $xml.find('videoid');
              videoId = $video[0].innerHTML
              console.log(videoId);
              $scope.playList.push(videoId);
              console.log($scope.playList);
          });
      }
      $scope.text =  $scope.artist.name;
  }])

musicApp.controller('getLyrics', ['$scope', 'getData', function($scope, getData) {
  $scope.song = {};
  getData.get('track.search?q_track=back%20to%20december&q_artist=taylor%20swift&f_has_lyrics=1', function(data) {
})
}])

musicApp.factory('getData', ['$http', function($http) {
  return{
    get: function(url, cb) {
      var results = $http.get(url);
        results.success(function(data){cb(data)});
    }
  };
}]);
