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
Chute.MediaChooser.choose(function(urls, data){
	alert(urls[0]); // alerting URL of first picked picture
});
```

# Handling Media

Let's say user picked an image:

```javascript
Chute.MediaChooser.choose(function(urls, data){
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

# Customization

## Setting defaults

You can set default properties for each MediaChooser using **setDefaults** method:

```javascript
Chute.MediaChooser.setDefaults({
	mediaTypes: 'all'
});
```

## Limiting total files

```javascript
Chute.MediaChooser.choose({
	limit: 5 // allow 5 files maximum
}, function(urls, data){
	
});
```

## Limiting file types

```javascript
Chute.MediaChooser.choose({
	mediaTypes: 'images' // all|images
}, function(urls, data){
	
});
```

## Restricting by image dimensions

```javascript
Chute.MediaChooser.choose({
	constraints: {
		width: '> 200 && < 500' // images with width bigger than 200 and less than 500 are allowed
	}
}, function(urls, data){
	
});
```

## Changing style

You can customize widget's appearance by embedding own CSS:

```javascript
Chute.MediaChooser.choose({
	css: 'http://website.com/path/to/stylesheet.css'
}, function(urls, data){
	
});
```

# Reference

## Parameters

Here is the full list of parameters you can pass to **Chute.MediaChooser.choose** method:

| Key 			| Description 																					|
|:--------------|:----------------------------------------------------------------------------------------------|
| app			| application identifier, can be set per **choose** call or in global **Chute.setApp** method	|
| constraints	| collection of restrictions for assets 														|
| css			| path to CSS file, which will be loaded in a widget											|
| album			| identifier of an album in Chute																|
| limit			| limits the number of total files																|
| mediaTypes	| specifies type for selected files																|
| popup			| boolean, which enables to open widget in a separate window									|
| scripts		| comma-delimited paths to JS files, which will be loaded in a widget							|

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

## MediaChooser HTML

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

# License

&copy; Chute Corporation.