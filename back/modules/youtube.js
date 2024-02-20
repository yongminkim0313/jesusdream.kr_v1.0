const GoogleApis = require('googleapis').GoogleApis;
const google = new GoogleApis();
var service = google.youtube('v3');

service.playlistItems.list({
  key: 'AIzaSyCwH_L35xEqEB0MqOPd6hrmlAkTNLVKueo',
  part: 'snippet',
  playlistId: 'PLZgf7s2LDEysMLmAVR_kMhyVtbfLEcnNx',
  maxResults: 20
},function(err, res){
console.log(res.data.items);
})
export const youtubeService = main;