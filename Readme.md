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

# Customization

## Selection limits

You can allow certain types of files, limit their number and set dimensions, which fit you. Let's see how to do all that in one call:

```javascript
Chute.MediaChooser.choose({
	identifier: 12345, // chute id, where uploaded files will go
	limit: 5, // accept 5 files maximum
	mediaTypes: 'images', // allow only images
	constraints: {
		width: '> 200 && < 500' // images with width bigger than 200 and less than 500 are allowed
	}
}, function(urls, data){
	// that's it
});
```

Those parameters don't have to be in the same call, you can mix and move them the way you want.

## Appearance

You can customize widget's appearance by embedding own CSS:

```javascript
Chute.MediaChooser.choose({
	identifier: 12345,
	css: 'http://website.com/path/to/stylesheet.css'
}, function(urls, data){
	
});
```

Here is the sample HTML of widget's body, so that you know where to apply your CSS rules:

```html
<div class="chooser-container">
	<!-- header of the widget -->
	<div class="chooser-header"><div class="inner">
		Photo Chooser
		<a href="http://getchute.com/" target="_blank">Powered by Chute</a>
	</div></div>
	
	<!-- Main area -->
	<div class="chooser-main"><div class="inner">
		<!-- Navigation -->
		<div class="nav"><ul>
			<li class="content"><a href="#">Upload</a></li>
			<li class="facebook"><a href="#">Facebook</a></li>
			<!-- Other services -->
		</ul></div>
		
		<!-- Body -->
		<div class="stage split-h">
			<div class="content"></div>
			<div class="facebook content"></div>
			<!-- Other services -->
		</div>
		
		<!-- Sidebar -->
		<div class="meta">
			<div class="meta-controls"></div>
			<div class="meta-listing"></div>
			<div class="status"></div>
		</div>
	</div></div>
</div>
```

## Processing images

Let's say user picked an image:

```javascript
Chute.MediaChooser.choose({ identifier: 12345 }, function(urls, data){
	// urls is an array of URLs of picked items
});
```

Chute gives you ability to manipulate those images easily, using provided methods:

```javascript
var url = urls[0]; // got first selected image
				   // http://media.getchute.com/media/5aAxfa, for example

Chute.fill(500, 300, url); // => http://media.getchute.com/media/5aAxfa/500x300
						   // will fill a 500x300 rectangle

Chute.fit(500, 300, url); // => http://media.getchute.com/media/5aAxfa/fit/500x300
						  // should fit into 500x300 rectangle

Chute.width(500, url); // => http://media.getchute.com/media/5aAxfa/w/500
					   // width of an image should be exactly 500px

Chute.height(300, url); // => http://media.getchute.com/media/5aAxfa/h/300
						// height of an image should equal 300px
```

# Reference

## Asset Data

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

Where assets is an array of selected items.

## Events

You can also attach listeners to different events, that get emitted.

*Available events*:

- templateLoaded - template loaded
- dependenciesLoaded - dependencies loaded
- assetsLoading - assets started loading
- assetsRendered - assets rendered
- assetsReRendered - assets rendered again
- drop - assets drag & dropped
- albumList - listing of albums loaded
- albumLoad - external album loaded
- add - asset got selected
- remove - asset got removed from selection
- selection - selection completed
- profileComplete - profile completed

You can specify listeners by filling **on** object:

```javascript
Chute.MediaChooser.choose({
	identifier: 123455,
	on: {
		complete: function() {
			
		},
		drop: function() {
			
		}
		// etc
	}
})
```

# License

&copy; Chute Corporation.