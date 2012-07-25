# Chute

Chute's Media Chooser widget allows you to easily collect pictures from users. User can upload file from his computer or choose one from Facebook, Picasa, Instagram or Flickr.

# Getting Started

Include **chute.min.js** into your page (*requires jQuery*):

```html
<script src="chute.min.js"></script>
```

Configure it:

```javascript
Chute.setApp('your application id');
Chute.setIdentifier('your chute identifier');
```

And when you need to collect pictures:

```javascript
Chute.choose(function(data){
	alert(data.assets[0].url); // alerting URL of first picked picture
});
```

# License

MIT.