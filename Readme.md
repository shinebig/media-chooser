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
Chute.setChuteIdentifier('your chute identifier');
```

And when you need to collect pictures:

```javascript
Chute.choose(function(data){
	alert(data.assets[0].url); // alerting URL of first picked picture
});
```

### What data gets returned

Assuming we're using our last snippet code for choosing pictures, **data** variable in a callback will be an object with something like this:

```javascript
{
	"moderated": false,
	"time": 1343204804.7934966,
	"assets": [{
		"id": 14006623,
		"shortcut": "WLLhdwzi",
		"status": "complete",
		"url": "http://media.getchute.com/media/WLLhdwzi",
		"thumb_url": "http://photos-e.ak.fbcdn.net/hphotos-ak-ash4/320430_3084192643214_466525836_s.jpg",
		"is_portrait": true,
		"name": null,
		"created_at": "2012-07-25T08:07:14Z",
		"updated_at": "2012-07-25T08:07:14Z",
		"height": 604,
		"width": 397,
		"md5": null,
		"is_published": true,
		"type": "image",
		"source": "0",
		"source_id": "3084192643214",
		"source_url": "http://sphotos-a.xx.fbcdn.net/hphotos-ash4/320430_3084192643214_466525836_n.jpg",
		"service": null,
		"import_id": null,
		"import_url": null,
		"original_url": "http://sphotos-a.xx.fbcdn.net/hphotos-ash4/320430_3084192643214_466525836_n.jpg",
		"user": {
			"id": 402971,
			"name": "vdemedes",
			"username": "vdemedes",
			"avatar": "http://graph.facebook.com/1815826041/picture?type=square",
			"profile": {
				"FirstName": "",
				"LastName": ""
			},
			"raw_profile": {
				"First Name": "",
				"Last Name": ""
			}
		}
	}]
}
```

# Usage

## Limits

```javascript
Chute.choose({
	allow: 'videos' // allow selecting only videos, can be 'all', 'videos', 'images'
}, function(data){
	
});

Chute.choose({
	allow: 'all',
	limit: 5 // allow 5 assets max.
}, function(data){
	
});
```

## Processing

```javascript
Chute.choose(function(data){
	// get first image's URL
	var url = data.assets[0].url;
	
	// resize to 500x300
	url.fill(500, 300);
	
	// should fit into 400x325
	url.fit(400, 325);
	
	// width should be 300
	url.width(300);
	
	// height should be 125
	url.height(125);
});
```

# License

&copy; Chute Corporation.