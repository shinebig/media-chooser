# Chute

Chute's Media Chooser component allows you to easily collect media from your users. Your user can directly upload photos from their hard drive or choose from an existing album on Facebook, Flickr, Picasa, or Instagram.

# Getting Started

Go to [Media Chooser's homepage](http://chute.github.com/media-chooser) and sign up using a simple one-field form.

Include **mediachooser.min.js** into your page (*requires jQuery*):

```html
<script src="mediachooser.min.js"></script>
```

Set your App ID:

```javascript
Chute.MediaChooser.setApp('your application id');
```

To launch the Media Chooser:

```javascript
Chute.MediaChooser.choose(function(urls, data){
	alert(urls); // urls is an array of URL
	alert(data); // data is an array of metadata about the media item
});
```

# Resizing Media

Chute gives you the ability to resize images easily.  We offer several convenience methods:

```javascript
var url = 'http://media.getchute.com/media/5aAxfa' // sample url returned from the Media Chooser

// Fill a 500x300 rectangle
Chute.fill(500, 300, url); // => http://media.getchute.com/media/5aAxfa/500x300

// Fit into 500x300 rectangle
Chute.fit(500, 300, url); // => http://media.getchute.com/media/5aAxfa/fit/500x300

// Max width of 500px
Chute.width(500, url); // => http://media.getchute.com/media/5aAxfa/w/500

// Max height of 300px
Chute.height(300, url); // => http://media.getchute.com/media/5aAxfa/h/300
```

# Customization

## Setting defaults

You can set default properties for the Media Chooser using the **setDefaults** method:

```javascript
Chute.MediaChooser.setDefaults({
	mediaTypes: 'all'
});
```

## Limit total files

```javascript
Chute.MediaChooser.choose({
	limit: 5 // allow 5 files maximum
}, function(urls, data){
	
});
```

## Limit by file types

```javascript
Chute.MediaChooser.choose({
	mediaTypes: 'images' // all | images (video coming soon!)
}, function(urls, data){
	
});
```

## Restrict by image dimensions

```javascript
Chute.MediaChooser.choose({
	constraints: {
		width: '> 200 && < 500' // images with width bigger than 200 and less than 500 are allowed
	}
}, function(urls, data){
	
});
```

## Customize style

You can customize the Media Chooser's appearance by passing in your own CSS (see below for reference):

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
| app			| application identifier, can be set with **choose** call or globally with **Chute.setApp()**	|
| constraints	| collection of restrictions for assets 														|
| css			| path to CSS file, which will be loaded in a widget											|
| album			| identifier of an album in Chute																|
| limit			| limits the number of total files																|
| mediaTypes	| specifies type for selected files																|
| popup			| boolean, which enables to open widget in a separate window									|
| scripts		| comma-delimited paths to JS files, which will be loaded in a widget							|

## Asset Data

After the Media Chooser closes, it returns both an array of urls and the data for those urls. Each Asset Object contains the following data:

```javascript
{
	"moderated": false,
	"time": 1343204804.7934966,
	"assets": [{ // Array of data on selected assets
		"id": 14006623,
		"shortcut": "WLLhdwzi",
		"status": "complete",
		"url": "http://media.getchute.com/media/WLLhdwzi",
		"thumb_url": "http://photos-e.ak.fbcdn.net/hphotos-ak-ash4/320430_3084192643214_466525836_s.jpg",
		"is_portrait": true,
		"name": null, // Caption (if provided)
		"created_at": "2012-07-25T08:07:14Z",
		"updated_at": "2012-07-25T08:07:14Z",
		"height": 604,
		"width": 397,
		"md5": null,
		"is_published": true,
		"type": "image",
		"source": "0", // 0 indicates upload
		"source_id": "3084192643214", // id of the asset on original service
		"source_url": "http://sphotos-a.xx.fbcdn.net/hphotos-ash4/320430_3084192643214_466525836_n.jpg",
		"service": null, // contains service imported from
		"import_id": null,
		"import_url": null,
		"original_url": "http://sphotos-a.xx.fbcdn.net/hphotos-ash4/320430_3084192643214_466525836_n.jpg",
		"user": {
			"id": 402971,
			"name": "vdemedes",
			"username": "vdemedes",
			"avatar": "http://graph.facebook.com/1815826041/picture?type=square"
		}
	}]
}
```

## Media Chooser HTML

This is the basic HTML skeleton for the media chooser.  Feel free to apply your own CSS rules.

```html
<div class="chooser-container">
	<!-- header of the widget -->
	<div class="chooser-header"><div class="inner">
		Media Chooser
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

## Browser compatability

- Safari 4+
- Mozilla Firefox 3.5+
- Opera 9+
- Google Chrome
- IE 8+

# License

&copy; Chute Corporation.