# Chute

Chute's Media Chooser widget allows you to easily collect pictures from users. User can upload file from his computer or choose one from Facebook, Picasa, Instagram or Flickr.

# Getting Started

Include **chute.min.js** into your page (*requires jQuery*):

```html
<script src="chute.min.js"></script>
```

Configure it:

```javascript
Chute.MediaChooser.setApp('your application id');
```

And when you need to collect pictures:

```javascript
Chute.MediaChooser.choose({ identifier: 12345 }, function(urls, data){
	alert(urls[0]); // alerting URL of first picked picture
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
Chute.MediaChooser.choose({
	identifier: 12345,
	allow: 'images' // allow selecting only images, can be 'all' or 'images'
}, function(urls, data){
	
});

Chute.MediaChooser.choose({
	identifier: 12345,
	allow: 'all',
	limit: 5 // allow 5 assets max.
}, function(urls, data){
	
});
```

## Constraints

You can also set additional limits for each chosen asset. For example, let's allow only images with width less than 500, but more than 300:

```javascript
Chute.MediaChooser.choose({
	identifier: 12345,
	allow: 'images',
	constraints: {
		width: '>= 300 && <= 500'
	}
}, function(urls, data){
	
});
```


## Processing

```javascript
Chute.MediaChooser.choose({ identifier: 12345 }, function(urls, data){
	// get first image's URL
	var url = urls[0];
	
	// resize to 500x300
	Chute.fill(500, 300, url);
	
	// should fit into 400x325
	Chute.fit(400, 325, url);
	
	// width should be 300
	Chute.width(300, url);
	
	// height should be 125
	Chute.height(125, url);
});
```

## Customizing

You can embed your own CSS into the widget by specifying **css** parameter:

```javascript
Chute.MediaChooser.choose({
	css: 'http://my.website.com/chute.css',
	identifier: 12345
}, function(urls, data){
	
});
```

# License

&copy; Chute Corporation.