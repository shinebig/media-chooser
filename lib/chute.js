function chutelog(what) {
   try {
     console.log(what);
   }
   catch (e) {}
   finally {
     return;
   }
}

/*
 * jQuery SlideChute Plugin 1.0.0
 * www.slidechute.com
 * Copyright 2012, Chute Corporation
 * Free to use under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
*/

var currentWidget = null;
var $chuteWidget;

function chuteGetScript(url, success) {
  var script    = document.createElement('script');
  script.src    = url;
  var head      = document.getElementsByTagName('head')[0],
  done          = false;
  script.onload = script.onreadystatechange = function() {
    if (!done && (!this.readyState || this.readyState == 'loaded' || this.readyState == 'complete')) {
      done = true;
      success();
      script.onload = script.onreadystatechange = null;
      head.removeChild(script);
    }
  };
  head.appendChild(script);
}

var __chute = function(element, data){
  function _loader(element, data){
    __chuteFunctions()
    jQuery(element).chute(data);
  }

  if (typeof(jQuery) != 'undefined') {
    _loader(element, data);
  }

  var _readyCallback = function(){
    if (typeof(jQuery) == 'undefined'){
      chuteGetScript('//ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js', function(){
        setTimeout(function(){
          _loader(element, data);
        }, 10);
      });
    } else {
      _loader(element, data);
    }
  }

  var _loadCallback = function(){
    if (document.readyState == 'complete'){
      _readyCallback();
    }
  };

  if (typeof(jQuery) == 'undefined'){
    if (document.readyState == 'complete'){
      _readyCallback();
    } else if (document.addEventListener){
      document.addEventListener("readystatechange", _loadCallback);
    } else {
      document.attachEvent("onreadystatechange", _loadCallback);
    }
  }
}

var __chuteFunctions = function(){

(function($) {
  var CHUTE = {
    popupHtml: "<style type='text/css'>.chute-reveal-modal { visibility:hidden }</style><div class='chute-popup chute-reveal-modal'>\
        <iframe width='100%' height='100%' marginWidth='0' marginHeight='0' frameBorder='0' scrolling='no' title='' src='//s3.amazonaws.com/cdn.getchute.com/html/v1/loading.html'>IFrame not supported</iframe>\
        <a class='close-chute-reveal-modal'>&#215;</a>\
      </div>\
      <div class='chute-thanks chute-reveal-modal'>\
        <div class='chute-thanks-header'>SUCCESS_MESSAGE</div>\
        <div class='chute-thanks-footer'>\
          <a href='mailto:info@getchute.com'>info@getchute.com</a>\
        </div>\
        <a class='close-chute-reveal-modal'>&nbsp;</a>\
      </div>",

    defaultDisplayTemplateHtml: "<style type='text/css'>.chute-thumbnails a{margin: 5px}  .chute-thumbnails img{width:100px;height:100px;}  .chute-thumbnail-reveal-modal {visibility: hidden;top: 0;left: 50%;margin-left: -250px;width: 500px;max-height: 800px;position: fixed;z-index: 10001;background-color:#fff;-moz-box-shadow: 0 0 10px rgba(0,0,0,.4);-webkit-box-shadow: 0 0 10px rgba(0,0,0,.4);-box-shadow: 0 0 10px rgba(0,0,0,.4);overflow:hidden;}  .chute-thumbnail-reveal-modal img{width: 100%;float: left;}  .chute-thumbnail-reveal-modal .close-chute-thumbnail-reveal-modal {font-size: 22px;line-height: .5;position: absolute;top: 15px;right: 11px;color: #aaa;text-shadow: 0 -1px 1px rbga(0,0,0,.6);font-weight: bold;cursor: pointer;}  .chute-thumbnail-reveal-modal .chute-thumbnail-source{position:absolute;left: 0;bottom: 30px;background-color: #000;background-color: rgba(0,0,0, 0.6);color: #fff;padding: 5px;text-decoration: none;-moz-box-shadow: 0 0 5px #888;-webkit-box-shadow: 0 0 5px#888;box-shadow: 0 0 5px #888;}  .chute-reveal-modal-bg {position: fixed;height: 100%;width: 100%;background: #000;background: rgba(150,150,150,.8);z-index: 10000;display: none;top: 0;left: 0;}</style><div class='chute-thumbnails'>{{#images}}<a href='{{url}}' data-source-url='{{source_url}}' data-url='{{url}}'><img src='{{url}}/100x100'></a>{{/images}}</div>",

    defaultCollectTemplateHtml: "<a href='#' class='chute-browseButton'><img src='//s3.amazonaws.com/cdn.getchute.com/v1/images/add-photos.png' style='border:0'></a>",

    // Paths
    paths: {
      assets                  : '/assets/:id',                              // Path to assets data
      gallery                 : '/chutes/:id.js',                           // Path to gallery data
      collection              : '/collection/:id'                           // Path to collection data
    },

    // Defaults
    defaults: {
      uploadServer            : '//upload.getchute.com',                    // Path to Upload Server
      apiServer               : '//api.getchute.com',                       // Path to API
      cdnRoot                 : '//s3.amazonaws.com/cdn.getchute.com/v1',

      popup                   : false,

      app                     : null,                                       // ID of the app

      disable_auto_identifier : false,

      display_template_name   : null,                                       // required only with an external url based template
      display_template        : null,                                       // jQuery Object or HTML template

      collector_template_name : null,                                       // collector theme name
      collector_template      : null,                                       // collector theme path

      collector_width         : '635px',                                    // collector template width
      collector_height        : '435px',                                    // collector template height

      template_options        : {},

      // Data Sources
      assets                  : null,                                       // ID of Asset(s) to render as comma-delimited list
      gallery                 : null,                                       // ID of the Gallery to render
      collection              : null,                                       // ID of the Collection to render

      // Externals
      css                     : '',                                         // Comma-delimited list of css externals to load
      css_loaded              : false,                                      // Boolean indicating if all required css is loaded
      scripts                 : '',                                         // Comma-delimited list of js externals to load
      scripts_lodaed          : false,                                      // Boolean indicating if all required js is loaded,

      exclusions              : "",

      file_types               : 1,                                          // 0 = all, 1 = image, 2 = video
      file_limit               : 0,                                          // 0 = unlimited

      is_display              : true,
      success_message         : "<h3>Thanks!</h3><p>Your photos will be online as soon as they're approved</p>",

      // Plugin Events
      onComplete              : function() {},                              // Fired when the the plugin has completely initialized

      // Display Events
      onTemplateLoaded        : function() {},                              // Fired when template loaded
      onDependenciesLoaded    : function() {},                              // Fired when template dependencies loaded
      onAssetsLoading         : function() {},                              // Fired when assets are starting to load
      onAssetsLoaded          : function() {},                              // Fired when assets are loaded
      onAssetsRendered        : null,                                       // Fired when assets are rendered
      onAssetsReRendered      : function() {},                              // Fired when assets are re-rendered

      // Collection Events
      onDrop                  : function() {},                              // Fired when assets are dropped on the plugin
      onAlbumList             : function() {},                              // Fired when the listing of albums is loaded
      onAlbumLoad             : function() {},                              // Fired when an external album loads
      onAdd                   : function() {},                              // Fired when assets are selection for inclusion
      onRemove                : function() {},                              // Fired when assets are removed from inclusion
      onSelection             : function() {},                              // Fired when selection of photos has been completed
      onConfirmation          : function() {},                              // Fired when rights are confirmed
      onProfileComplete       : function() {},                              // Fired when custom profile is completed
      onSelectionComplete     : function() {}                               // Fired when widget has completed the process
    },

    // Initializer
    init: function(element, options) {
      // Save values
      this.$element = $(element);
      this.$element.addClass('chute-loaded');

      // pull in options specified by html5 tags
      var _htmlOptions  = {
        app                     : this.$element.attr('data-app-id'),

        identifier              : this.$element.attr('data-identifier') == undefined || this.$element.attr('data-identifier') == '' ? null : this.$element.attr('data-identifier'),
        disable_auto_identifier : this.$element.attr('data-disable-auto-identifier') == undefined ? this.defaults.disable_auto_identifier : true,
        id                      : this.$element.attr('data-id') == undefined ? null : this.$element.attr('data-id'),
        bundle_id               : this.$element.attr('data-bundle-id') == undefined ? '' : this.$element.attr('data-bundle-id'),
        custom_id               : this.$element.attr('data-custom_id') == undefined ? '' : this.$element.attr('data-custom_id'),

        assets                  : this.$element.attr('data-assets') == undefined ? this.defaults.assets : this.$element.attr('data-assets').split(','),

        name                    : this.$element.attr('data-name'),
        url                     : this.$element.attr('data-url') == undefined ? document.location.href : this.$element.attr('data-url'),
        tags                    : this.$element.attr('data-tags') == undefined ? '' : this.$element.attr('data-tags'),
        css                     : this.$element.attr('data-css') == undefined ? '' : this.$element.attr('data-css'),
        screens                 : this.$element.attr('data-screens') == undefined ? '' : this.$element.attr('data-screens'),

        display_template_name   : this.$element.attr('data-display-template-name') == undefined ? this.defaults.display_template_name : this.$element.attr('data-display-template-name'),
        display_template        : this.$element.attr('data-display-template') == undefined ? this.defaults.display_template : this.$element.attr('data-display-template'),

        collector_template_name : this.$element.attr('data-collector-template-name') == undefined ? this.defaults.collector_template_name : this.$element.attr('data-collector-template-name'),
        collector_template      : this.$element.attr('data-collector-template') == undefined ? this.defaults.collector_template : this.$element.attr('data-collector-template'),

        collector_width         : this.$element.attr('data-collector-width') == undefined ? this.defaults.collector_width : this.$element.attr('data-collector-width'),
        collector_height        : this.$element.attr('data-collector-height') == undefined ? this.defaults.collector_height : this.$element.attr('data-collector-height'),

        template_options        : this.$element.attr('data-template-options') == undefined ? this.defaults.template_options : $.parseJSON(this.$element.attr('data-template-options')),

        captions                : this.$element.attr('data-captions') == undefined ? 'hide' : this.$element.attr('data-captions'),
        exclusions              : this.$element.attr('data-services-exclude') == undefined ? this.defaults.exclusions : this.$element.attr('data-services-exclude'),
        inclusions              : this.$element.attr('data-services-include') == undefined ? '' : this.$element.attr('data-services-include'),
        dialogTitle             : this.$element.attr('data-chooser-button-text') == undefined ? 'Choose Photos' : this.$element.attr('data-chooser-button-text'),
        mode                    : this.$element.attr('data-mode') == undefined ? 'thumbnails' : this.$element.attr('data-mode'),

        uploadServer            : this.$element.attr('data-uploadServer') == undefined ? this.defaults.uploadServer : this.$element.attr('data-uploadServer'),
        apiServer               : this.$element.attr('data-apiServer') == undefined ? this.defaults.apiServer : this.$element.attr('data-apiServer'),
        cdnRoot                 : this.$element.attr('data-cdnRoot') == undefined ? this.defaults.cdnRoot : this.$element.attr('data-cdnRoot'),

        file_types              : this.$element.attr('data-file-types') == undefined ? this.defaults.file_types : this.$element.attr('data-file-types'),
        file_limit              : this.$element.attr('data-file-limit') == undefined ? this.defaults.file_limit : this.$element.attr('data-file-limit'),

        share_text              : this.$element.attr('data-share-text') == undefined ? '' : this.$element.attr('data-share-text'),
        awesm_key               : this.$element.attr('data-awesm-key') == undefined ? '' : this.$element.attr('data-awesm-key'),

        popup                   : this.$element.attr('data-popup') == 'popup',
        success_message         : this.$element.attr('data-success_message') == undefined ? this.defaults.success_message : this.$element.attr('data-success_message')
      }

      // Set the options
      this.options = $.extend({}, this.defaults, _htmlOptions);
      this.options = $.extend({}, this.options, options);

      this.options.is_display = !(this.options.mode == 'collector' || this.options.mode == 'chooser');
      this.popupHtml = this.popupHtml.replace('SUCCESS_MESSAGE', this.options.success_message);

      if (this.options.identifier == null && !this.options.disable_auto_identifier){
        this.options.identifier = '';
        this.options.id         = '';
      }

      // use popup window when in an iframe hosted by us, or on a mobile
      // browser, unless already specified
      if ((!this.options.popup && window!=window.top && (document.location.host.indexOf("chute.com") == 0 || document.location.host.indexOf("slidechute.com") == 0))
          || navigator.userAgent.match(/Android|webOS|iPhone|iPad|iPod|BlackBerry/i)) {
        this.options.popup = true;
      }

      var me = this;

      me.$element.addClass('chute-base-widget').css('position', 'relative');
      me.$element.data('options', this.options);
      me.$element.data('instanceReference', this);

      if (me.options.is_display){
        if (this.options.display_template == null && this.options.display_template_name != null){
          this.options.display_template = this.options.cdnRoot + "/templates/display/" + this.options.display_template_name + "/template.js";
        }
        if (me.options.display_template && me.options.display_template.indexOf('#') == 0){
          me.options.display_template = $(me.options.display_template).html();
          me.renderData();
        } else if (this.options.display_template != undefined && (this.options.display_template.indexOf('http') == 0 || this.options.display_template.indexOf('//') == 0)){
          $.getScript(me.options.display_template, function() {
            me.loadTemplateData(function(){
              me.options.onDependenciesLoaded(me.$element);
              me.renderData();
            });
          });
        } else if (this.options.display_template_name == undefined || this.options.display_template_name == 'default' || this.options.display_template_name == ''){
          this.options.display_template = this.defaultDisplayTemplateHtml;
          this.options.onAssetsRendered = this.assetsRendered;
          me.renderData();
        }
      }
      else {
        if (this.options.collector_template == null && this.options.collector_template_name == null){
          this.options.collector_template = this.defaultCollectTemplateHtml;
        }
        else if (this.options.collector_template == null){
          this.options.collector_template = this.options.cdnRoot + "/templates/collector/" + this.options.collector_template_name + "/template.js";
        }
        me.renderData();
      }
		me.options.onComplete();
      return me;
    },

    renderData: function(page_url){
      var me = this;

      me.resetTimestamp();

      if (me.options.is_display){
        if (me.options.id == null && me.options.identifier == null){
          me.$element.addClass('chute-disabled').css('opacity', '0.5');
          return;
        }

        me.options.onAssetsLoading(me.$element);

        var defaultUrl = me.options.imagesUrl;

        // if assets already given then get the ids
        if (me.options.assets){
          var staticAssets = "";
          if (typeof me.options.assets == 'string')
            me.options.assets = me.options.assets.split(',');

          if (me.options.assets[0].indexOf('http') == 0) {
            staticAssets = "assets=" + $.map(me.options.assets, function(asset_url){
              var match = asset_url.match("\/m\/([^\/]+)/");
              return match.pop();
            }).join(',');
          } else {
            staticAssets = "assets=" + me.options.assets.join(',');
          }
          defaultUrl +=  "&" + staticAssets;
        }

        if (this.options.template_options.per_page)
          defaultUrl += "&per_page=" + this.options.template_options.per_page;

        var loadState  = page_url == undefined ? -1 : (page_url == me.options.nextImagesUrl ? 0 : 1);
        var _url       = page_url ? page_url : defaultUrl;

        // if there is a hash in the document, then it could point to an asset
        // make sure its there in the page
        if (loadState == -1 && document.location.hash != "" && document.location.hash != "#"){
          var _extraAssetId = document.location.hash.replace('#', '');
          _url = _url + "&extra_assets=" + _extraAssetId;
        }

        me.loadPath(_url, function(data){
          // new data link
          // don't update when requesting next and previous pages
          if (data.data.next_url && loadState != 1){
            me.options.nextImagesUrl    = data.data.next_url;
          }
          // paginations link
          // don't update when requesting new data
          if (loadState != 0){
            me.options.nextPageUrl      = data.data.next_page_url;
            me.options.previousPageUrl  = data.data.previous_page_url;
          }

          if (data.data.assets.length > 0){
            if (me.options.onAssetsLoaded(me.$element, data) != false){
              // writeout template html in page
              me.displayRender(data, loadState);
            }
          }
        });
      } else {
        me.setupCollectorModal();

        me.collectorRender(function(){
          me.$element.find('.chute-popup').css({
            width: me.options.collector_width,
            height: me.options.collector_height,
            'margin-left' : '-' + parseInt(me.options.collector_width)/2 + 'px'
          });
          if (me.options.id == null && me.options.identifier == null){
            me.$element.addClass('chute-disabled').css('opacity', '0.5');
            return;
          }
          me.makeDroppable(me.$element.find('.chutedrop'));
        });
      }
    },

    hasNextPage: function(){
      return (this.options.nextPageUrl !=  undefined);
    },

    hasPreviousPage: function(){
      return (this.options.previousPageUrl !=  undefined);
    },

    hasNewPage: function(){
      return (this.options.nextImagesUrl !=  undefined);
    },

    renderNextPage: function(){
      if (this.hasNextPage()){
        this.renderData(this.options.nextPageUrl)
      }
    },

    renderPreviousPage: function(){
      if (this.hasPreviousPage())
        this.renderData(this.options.previousPageUrl)
    },

    renderNewData: function(){
      if (this.hasNewPage()){
        this.renderData(this.options.nextImagesUrl)
      }
    },

    //////////////////////////////////////////////////////////
    // Loaders
    //////////////////////////////////////////////////////////

    // Load CSS dependencies
    loadCSS: function(url) {
      if(!url) return;

      if (typeof(url) == 'string') {
        if (url.indexOf('http') != 0)
          url = document.location.protocol + url;
        $('head').append( '<link rel="stylesheet" type="text/css" href="' + url + '" />' );
      }
      else {
        $.each(url, function(i, _url){
          if (_url.indexOf('http') != 0)
            _url = document.location.protocol + _url;
          $('head').append( '<link rel="stylesheet" type="text/css" href="' + _url + '" />' );
        });
      }
    },

    // Load JS dependencies
    loadJS: function(url, callback) {
      if(!url) {
        callback();
        return;
      }

      if (typeof(url) == 'string') {
        $.getScript(url, callback);
      }
      else if (url.length == 0) {
        callback();
      }
      else if (url.length == 1) {
        $.getScript(url[0], callback);
      }
      else {
        // http://www.jquery4u.com/ajax/getscript-mutiple-scripts/
        var // reference declaration & localization
        length    = url.length,
        deferreds = [],
        counter   = 0,
        idx       = 0;

        var handler = function(){
          counter++;
          if (counter == length) {
            callback();
          }
        }

        for ( ; idx < length; idx++ ) {
          deferreds.push(
            $.getScript( url[ idx ], handler )
          );
        }
      }
    },

    // Load the data based on the passed data sources
    // Data order: Collection > Gallery > Asset
    loadData: function(callback) {
      var path = '';

      // Collection
      if (this.options.collection != null) {
        path = this.paths.collection.replace(':id',this.options.collection);

      // Gallery
      } else if (this.options.gallery != null) {
        path = this.paths.gallery.replace(':id',this.options.gallery);

      // Asset
      } else if (this.options.assets != null) {
        path = this.paths.asset.replace(':id',this.options.asset);
      }

      // If we have found a data call to make, complete it
      if (path.length) {
        var url = this.paths.api + path;

        /*this.loadJS(this.paths.api + path, function(data, status) {
          console.log(data)
          console.log(status)
        });*/
        //$.get(url, function(data, status) { console.log(data); console.log(status);}, "json");

        $.ajax({
          url       : this.paths.api + path,
          dataType  : 'jsonp',
          success   : function(data, textStatus, jqXHR) {
            // console.log(data);
          },
          error     : function(e) {
            // console.log(e);
          }
        });
      }
    },

    loadPath: function(path, callback){
      $.ajax({
        url       : path,
        dataType  : 'jsonp',
        success   : function(data, textStatus, jqXHR) {
          callback(data);
        },
        error     : function(e) {
          // console.log(e);
        }
      });
    },

    //////////////////////////////////////////////////////////
    // Load Template Data
    //////////////////////////////////////////////////////////
    loadTemplateData : function(callback){
      var me = this;
      if (this.options.is_display){
        this.options.display_template = eval(this.options.display_template_name + '_template_definition');

        if (typeof(this.options.display_template) != 'string'){
          this.options = $.extend({}, this.options, this.options.display_template.bindings);
          this.options.onTemplateLoaded(me.$element);
          me.loadCSS(this.options.display_template.requires.css);
          me.loadJS(this.options.display_template.requires.js, function(){
            callback();
          });
        } else {
          callback();
        }
      }
    },


    //////////////////////////////////////////////////////////
    // Collectors
    //////////////////////////////////////////////////////////

    // Load dependencies for collection mode
    setupCollectorModal: function() {
      if (!$('#chute-collector-modal').length) {
        // Load Reveal External
        this.loadCSS(this.options.cdnRoot + '/css/c.css');
      }
    },

    // Render Collector
    collectorRender: function(callback) {
      var me = this;

      if (me.options.collector_template.indexOf('http') == 0) {
        $.getScript(me.options.collector_template, function() {
          me.$element.html(me.popupHtml + eval(me.options.collector_template_name + '_template_html'));
          callback();
        });
      } else {
        me.$element.html(me.popupHtml + me.options.collector_template);
        callback();
      }
    },

    // Collector Modal
    collectorModal: function() {
      this.setupCollectorModal();

      // Attach the behavior
      this.$element.click(function(event) {
        event.preventDefault();
      })
    },

    makeDroppable: function(element) {
      var me = this;

      me.$element.find('.chute-browseButton, .chute-dropBox').click(function(event){
        event.preventDefault();
        me.openChuteBrowser();
      });

      me.openChuteBrowser = function(){
        if (me.options.popup){
          var width           = 700;
          var height          = 450
          var left            = parseInt((screen.availWidth/2) - (width/2));
          var top             = parseInt((screen.availHeight/2) - (height/2));
          var windowFeatures  = "width=" + width + ",height=" + height + ",status,resizable,scrollbars=0,left=" + left + ",top=" + top + "screenX=" + left + ",screenY=" + top;

          window.open(me.options.browsePath, "chute_browse_popup", windowFeatures);
        } else if (me.options.embed) {
			var element = jQuery(me.options.embed).append(me.$element.find('.chute-popup iframe').clone().attr('src', me.options.browsePath));
			element.css({
				width: 600,
				height: 400
			});
		} else {
          me.$element.find(".chute-popup iframe").attr('src', me.options.browsePath);
          me.$element.find(".chute-popup").chuteReveal();
        }
        this.resetTimestamp();

        currentWidget = me;
      }

      me.$element.find('.chute-popup .close-chute-reveal-modal').click(function(){
        me.resetIframe();
      });

      if(element.length == 0) return;

      var totalImagesCount        = 0;
      var uploadedImagesCount     = 0;
      var totalUploadPercentDone  = 0;

      var maxFileSize             = '';
      var extensions              = '';
      var browseTitle             = '';

      if (me.options.file_types == 0) {
        maxFileSize = '50MB';
        extensions  = 'jpg,gif,png,jpeg,mov,mp4,mpeg,mpeg,avi';
        browseTitle = 'Media Files';
      } else if (me.options.file_types == 1) {
        maxFileSize = '5MB';
        extensions  = 'jpg,gif,png,jpeg';
        browseTitle = 'Image Files';
      } else {
        maxFileSize = '50MB';
        extensions  = 'mov,mp4,mpeg,mpeg,avi';
        browseTitle = 'Video Files';
      }

      element.attr('id', me.options.timestamp);

      // upload code - start
      var ChuteUploader = new plupload.Uploader({
        runtimes            : 'html5,flash,silverlight',
        browse_button       : '',
        container           : me.options.timestamp,
        max_file_size       : maxFileSize,
        resize              : { quality : 90 },
        url                 : me.options.uploadPath,
        flash_swf_url       : '//s3.amazonaws.com/cdn.getchute.com/objects/v1/plupload.flash.swf',
        silverlight_xap_url : '//s3.amazonaws.com/cdn.getchute.com/objects/v1/plupload.silverlight.xap',
        filters             : [{
          title             : browseTitle,
          extensions        : extensions
        }],
        drop_element        : me.options.timestamp
      });

      ChuteUploader.bind('Init', function(up, params) {
        // ready
        setTimeout(function(){
          me.$element.find('.plupload.html5 input').attr('size', 300);
        }, 100);

        me.$element.find('.chute-select-button').click(function(event){
          event.preventDefault();
          me.openChuteBrowser();
        });
      });

      $('#uploadfiles').click(function(e) {
        ChuteUploader.start();
        e.preventDefault();
      });

      ChuteUploader.init();

      ChuteUploader.bind('FilesAdded', function(up, files) {
        me.options.onDrop(me.$element, files);

        me.setChuteFileProgress(0);

        $.each(files, function(i, file) {
          totalImagesCount++;
        });

        up.refresh(); // Reposition Flash/Silverlight

        // automatically start upload, no need to click a button
        ChuteUploader.start();
      });

      ChuteUploader.bind('UploadProgress', function(up, file) {
        totalUploadPercentDone = (file.percent + uploadedImagesCount*100)/totalImagesCount;
        me.setChuteFileProgress(totalUploadPercentDone);
      });

      ChuteUploader.bind('Error', function(up, err) {
        alert('Files cannot be larger than ' + maxFileSize);
        up.refresh(); // Reposition Flash/Silverlight
      });

      ChuteUploader.bind('FileUploaded', function(up, file) {
        uploadedImagesCount ++;
        totalUploadPercentDone = (uploadedImagesCount*100)/totalImagesCount;
        me.setChuteFileProgress(totalUploadPercentDone);
      });

      ChuteUploader.bind('UploadComplete', function(up, file) {
        totalUploadPercentDone = 100;
        me.setChuteFileProgress(totalUploadPercentDone);
        me.openChuteBrowser();
      });

      me.setChuteFileProgress = function(progress){
        if (progress < 100) {
          me.$element.find('.chute-collector').addClass('chute-uploading');
        } else {
          me.$element.find('.chute-collector').removeClass('chute-uploading');
        }

        me.$element.find('.chute-uploadProgress .chute-bar').css('width', progress + "%");
      }
      // upload code - end
    },

    resetTimestamp: function(){
      var d         = new Date();
      var timestamp =  ("" + (d.getTime()-d.getMilliseconds())/1000 + "-" + Math.random()).replace("0.", "");
      this.options.timestamp  = timestamp;

      var toURIParams = function(obj) {
        var val, params=[];

        for (var key in obj) {
          val = obj[key];
          if (val && typeof val != 'undefined' && (val.length > 0 || typeof val === 'number')) {
            params.push(key + "=" + encodeURIComponent(val));
          }
        }

        return params.join('&');
      };

      this.options.uploadPath = this.options.uploadServer + '/upload?' + toURIParams({
        timestamp  : this.options.timestamp,
        app_id     : this.options.app,
        id         : this.options.id,
        identifier : this.options.identifier,
        title      : this.options.name,
        url        : this.options.url,
        tags       : this.options.tags,
        screens    : this.options.screens,
        css        : this.options.css,
        captions   : this.options.captions,
        exclusions : this.options.exclusions,
        inclusions : this.options.inclusions
      });

      this.options.browsePath = this.options.uploadServer + '/payload/' + this.options.timestamp + "?" + toURIParams({
        app_id          : this.options.app,
        id              : this.options.id,
        identifier      : this.options.identifier,
        custom_id       : this.options.custom_id,
        title           : this.options.name,
        url             : this.options.url,
        tags            : this.options.tags,

        host            : document.location.host,
        page            : document.location.href,

        screens         : this.options.screens,
        css             : this.options.css,
        scripts         : this.options.scripts,
        iframe          : this.options.iframe,
        iframe_position : this.options.iframe_position,
        iframe_title    : this.options.iframe_title,

        captions        : this.options.captions,
        exclusions      : this.options.exclusions,
        inclusions      : this.options.inclusions,
        dialog_title    : this.options.dialogTitle,
        popup           : this.options.popup.toString(),
        picker_version  : this.options.picker_version,

        limit           : this.options.limit,
        config          : this.options.config
      });

      this.options.imagesUrl = this.options.apiServer + '/widget/data?' + toURIParams({
        app_id     : this.options.app,
        id         : this.options.id,
        identifier : this.options.identifier,
        origin     : document.location.host
      });
    },

    resetIframe: function(){
      this.$element.find(".chute-popup iframe").attr('src', "//s3.amazonaws.com/cdn.getchute.com/html/v1/loading.html");
    },

    uploadComplete: function(data){
      if (data.moderated && !this.options.popup){
        if (data.success_message && typeof data.success_message === 'string' && data.success_message.length > 0) {
          this.$element.find('.chute-thanks .chute-thanks-header').html(data.success_message);
        }
        this.$element.find('.chute-thanks').chuteReveal();
      }
      this.options.onSelectionComplete(this.$element, data);

      if (typeof(chuteSelectionComplete) == 'function'){
        chuteSelectionComplete(this.$element, data);
      }
    },

    //////////////////////////////////////////////////////////
    // Presenters
    //////////////////////////////////////////////////////////
    assetsRendered: function(element, data){
      var chuteThumbnailReveal = jQuery('#chute-thumbnail-reveal');
      if (chuteThumbnailReveal.length == 0){
        jQuery('body').append('<div class="chute-thumbnail-reveal-modal" id="chute-thumbnail-reveal"><img src=""><a class="chute-thumbnail-source" href="" target="_blank">source</a><a class="close-chute-thumbnail-reveal-modal">&#215;</a></div>');
        chuteThumbnailReveal = jQuery('#chute-thumbnail-reveal');
      }
      element.find('.chute-thumbnails a').live('click', function(event){
        event.preventDefault();
        chuteThumbnailReveal.find('img').attr('src', $(this).attr('data-url'));
        chuteThumbnailReveal.find('.chute-thumbnail-source').attr('href', $(this).attr('data-source-url'));
        chuteThumbnailReveal.chuteReveal({
           dismissmodalclass: 'close-chute-thumbnail-reveal-modal',
           top: "50px"
        });
      });
    },

    // Render Display Template
    displayRender: function(data, loadState) {
      var _templateDefinition = typeof(this.options.display_template) == 'string' ? this.options.display_template : this.options.display_template.template;
      var _templateContainer  = typeof(this.options.display_template) == 'string' ? null : this.options.display_template.templateContainer;

      for (var key in this.options.template_options){
        if (this.options.display_template.options[key]){
          this.options.display_template.options[key].value = this.options.template_options[key];
        }
      }

      if (typeof(this.options.display_template.options) != 'undefined') {
        this.options.display_template.options.share_text = this.options.share_text;
        this.options.display_template.options.awesm_key  = this.options.awesm_key;
        this.options.display_template.options.chute_id   = this.options.chute_id;
        this.options.display_template.options.widget_id  = this.options.widget_id;
      }

      for (var i in data.data.assets) {
        data.data.assets[i].serialized = encodeURIComponent($.serializeJSON(data.data.assets[i]).replace(/(\r\n|\n|\r|\t)/gm, ""));
      }

      var _html = ChuteMustache.to_html(_templateDefinition, { images: data.data.assets, options : this.options.display_template.options });

      if (_templateContainer){
        _html = _templateContainer.replace("{{yield}}", _html);
      }

      var appendContent = false;
      if (this.options.display_template.systemOptions && this.options.display_template.systemOptions.appendContent)
        appendContent = true;

      if (loadState > -1){
        if (_templateContainer){
          // new data
          if (loadState == 0)
            this.options.templateContainer.prepend(_html);
          // paginated data
          else if (appendContent)
            this.options.templateContainer.append(_html);
          else
            this.options.templateContainer.html(_html);
        } else {
          // new data
          if (loadState == 0)
            this.$element.prepend(_html);
          // paginted data
          else if (appendContent)
            this.$element.append(_html);
          else
            this.$element.html(_html);
        }
        this.options.onAssetsReRendered(this.$element, data, this.options.display_template.options, loadState);
      } else {
        this.options.templateContainer = this.$element.html(_html);
        if (typeof(this.options.onAssetsRendered) == 'function')
          this.options.onAssetsRendered(this.$element, data, this.options.display_template.options);
      }
    }
  };

  var methods = {
    init : function(options){
      if (options == undefined) options = {};

      return this.each(function () {
        var chute = $.extend({}, CHUTE);
        chute.init(this, options);
        chute.$element.data('callback', function(){
          if(chute.options.popup) {
            // do something
          } else {
            chute.$element.find(".close-chute-reveal-modal").click();
          }
        });
        if (options != undefined && typeof(options.success) == "function"){
          chute.$element.data('success-callback', options.success);
        }
      });
    },
    chooser : function(callback){
      var me = $(this);
      if (callback != undefined)
        me.data('success-callback', callback);
      me.find('.chute-browseButton').click();
      return me;
    },
    close : function(){
      var me = $(this);
      me.find('.close-chute-reveal-modal').click();
      return me;
    },
    success : function(files){
      var me = $(this);
      if (typeof(me.data('callback')) == 'function')
        me.data('callback')();
      if (typeof(me.data('success-callback')) == 'function')
        me.data('success-callback')(files);
      return me;
    },
    widget : function(){
      return $(this).find('.chute-popup iframe');
    }
  }

  $.fn.chute = function(method, callback){
    if (method ==  undefined || typeof(method) == 'object'){
      return methods.init.apply( this, arguments );
    } else if ( methods[method] ) {
      return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
    } else {
      $.error( 'Method ' +  method + ' does not exist on jQuery.chute' );
    }
  };

})(jQuery);


(function($) {
  if ($chuteWidget != undefined){
    // add listsners just once
    $('.chute-widget:not(.chute-loaded)').chute();
    return;
  }

  $chuteWidget = 'chute';

  if (document.addEventListener){
    window.addEventListener('message', receiveMessage, false);
  } else {
    window.attachEvent('onmessage', receiveMessage);
  }

  function receiveMessage(event){
    receiveData(event.data);
  }

  function parseJSON(data){
    if (typeof(JSON) !=  'undefined'){
      return JSON.parse(data);
    } else {
      return $.parseJSON(data);
    }
  }

  function receiveData(data){
    try {
      data = parseJSON(data);
    } catch(ex){
      data = data;
    }

    if (currentWidget && data.moderated != undefined){
      currentWidget.$element.chute('success', data);
      currentWidget.uploadComplete(data);
    }
  }

  chuteImageLoaded = function(image){
    $(image).chuteScaleImage({fade: Math.floor(Math.random()*1000)});
  }
})(jQuery);

/*********************************************
mustache
**********************************************/

/*
  mustache.js — Logic-less templates in JavaScript

  See http://mustache.github.com/ for more info.
*/

ChuteMustache = function() {
  var regexCache = {};
  var Renderer = function() {};

  Renderer.prototype = {
    otag: "{{",
    ctag: "}}",
    pragmas: {},
    buffer: [],
    pragmas_implemented: {
      "IMPLICIT-ITERATOR": true
    },
    context: {},

    render: function(template, context, partials, in_recursion) {
      // reset buffer & set context
      if(!in_recursion) {
        this.context = context;
        this.buffer = []; // TODO: make this non-lazy
      }

      // fail fast
      if(!this.includes("", template)) {
        if(in_recursion) {
          return template;
        } else {
          this.send(template);
          return;
        }
      }

      // get the pragmas together
      template = this.render_pragmas(template);

      // render the template
      var html = this.render_section(template, context, partials);

      // render_section did not find any sections, we still need to render the tags
      if (html === false) {
        html = this.render_tags(template, context, partials, in_recursion);
      }

      if (in_recursion) {
        return html;
      } else {
        this.sendLines(html);
      }
    },

    /*
      Sends parsed lines
    */
    send: function(line) {
      if(line !== "") {
        this.buffer.push(line);
      }
    },

    sendLines: function(text) {
      if (text) {
        var lines = text.split("\n");
        for (var i = 0; i < lines.length; i++) {
          this.send(lines[i]);
        }
      }
    },

    /*
      Looks for %PRAGMAS
    */
    render_pragmas: function(template) {
      // no pragmas
      if(!this.includes("%", template)) {
        return template;
      }

      var that = this;
      var regex = this.getCachedRegex("render_pragmas", function(otag, ctag) {
        return new RegExp(otag + "%([\\w-]+) ?([\\w]+=[\\w]+)?" + ctag, "g");
      });

      return template.replace(regex, function(match, pragma, options) {
        if(!that.pragmas_implemented[pragma]) {
          throw({message:
            "This implementation of mustache doesn't understand the '" +
            pragma + "' pragma"});
        }
        that.pragmas[pragma] = {};
        if(options) {
          var opts = options.split("=");
          that.pragmas[pragma][opts[0]] = opts[1];
        }
        return "";
        // ignore unknown pragmas silently
      });
    },

    /*
      Tries to find a partial in the curent scope and render it
    */
    render_partial: function(name, context, partials) {
      name = this.trim(name);
      if(!partials || partials[name] === undefined) {
        throw({message: "unknown_partial '" + name + "'"});
      }
      if(typeof(context[name]) != "object") {
        return this.render(partials[name], context, partials, true);
      }
      return this.render(partials[name], context[name], partials, true);
    },

    /*
      Renders inverted (^) and normal (#) sections
    */
    render_section: function(template, context, partials) {
      if(!this.includes("#", template) && !this.includes("^", template)) {
        // did not render anything, there were no sections
        return false;
      }

      var that = this;

      var regex = this.getCachedRegex("render_section", function(otag, ctag) {
        // This regex matches _the first_ section ({{#foo}}{{/foo}}), and captures the remainder
        return new RegExp(
          "^([\\s\\S]*?)" +         // all the crap at the beginning that is not {{*}} ($1)

          otag +                    // {{
          "(\\^|\\#)\\s*(.+)\\s*" + //  #foo (# == $2, foo == $3)
          ctag +                    // }}

          "\n*([\\s\\S]*?)" +       // between the tag ($2). leading newlines are dropped

          otag +                    // {{
          "\\/\\s*\\3\\s*" +        //  /foo (backreference to the opening tag).
          ctag +                    // }}

          "\\s*([\\s\\S]*)$",       // everything else in the string ($4). leading whitespace is dropped.

        "g");
      });


      // for each {{#foo}}{{/foo}} section do...
      return template.replace(regex, function(match, before, type, name, content, after) {
        // before contains only tags, no sections
        var renderedBefore = before ? that.render_tags(before, context, partials, true) : "",

        // after may contain both sections and tags, so use full rendering function
            renderedAfter = after ? that.render(after, context, partials, true) : "",

        // will be computed below
            renderedContent,

            value = that.find(name, context);

        if (type === "^") { // inverted section
          if (!value || that.is_array(value) && value.length === 0) {
            // false or empty list, render it
            renderedContent = that.render(content, context, partials, true);
          } else {
            renderedContent = "";
          }
        } else if (type === "#") { // normal section
          if (that.is_array(value)) { // Enumerable, Let's loop!
            renderedContent = that.map(value, function(row) {
              return that.render(content, that.create_context(row), partials, true);
            }).join("");
          } else if (that.is_object(value)) { // Object, Use it as subcontext!
            renderedContent = that.render(content, that.create_context(value),
              partials, true);
          } else if (typeof value === "function") {
            // higher order section
            renderedContent = value.call(context, content, function(text) {
              return that.render(text, context, partials, true);
            });
          } else if (value) { // boolean section
            renderedContent = that.render(content, context, partials, true);
          } else {
            renderedContent = "";
          }
        }

        return renderedBefore + renderedContent + renderedAfter;
      });
    },

    /*
      Replace {{foo}} and friends with values from our view
    */
    render_tags: function(template, context, partials, in_recursion) {
      // tit for tat
      var that = this;



      var new_regex = function() {
        return that.getCachedRegex("render_tags", function(otag, ctag) {
          return new RegExp(otag + "(=|!|>|\\{|%)?([^\\/#\\^]+?)\\1?" + ctag + "+", "g");
        });
      };

      var regex = new_regex();
      var tag_replace_callback = function(match, operator, name) {
        switch(operator) {
        case "!": // ignore comments
          return "";
        case "=": // set new delimiters, rebuild the replace regexp
          that.set_delimiters(name);
          regex = new_regex();
          return "";
        case ">": // render partial
          return that.render_partial(name, context, partials);
        case "{": // the triple mustache is unescaped
          return that.find(name, context);
        default: // escape the value
          return that.escape(that.find(name, context));
        }
      };
      var lines = template.split("\n");
      for(var i = 0; i < lines.length; i++) {
        lines[i] = lines[i].replace(regex, tag_replace_callback, this);
        if(!in_recursion) {
          this.send(lines[i]);
        }
      }

      if(in_recursion) {
        return lines.join("\n");
      }
    },

    set_delimiters: function(delimiters) {
      var dels = delimiters.split(" ");
      this.otag = this.escape_regex(dels[0]);
      this.ctag = this.escape_regex(dels[1]);
    },

    escape_regex: function(text) {
      // thank you Simon Willison
      if(!arguments.callee.sRE) {
        var specials = [
          '/', '.', '*', '+', '?', '|',
          '(', ')', '[', ']', '{', '}', '\\'
        ];
        arguments.callee.sRE = new RegExp(
          '(\\' + specials.join('|\\') + ')', 'g'
        );
      }
      return text.replace(arguments.callee.sRE, '\\$1');
    },

    /*
      find `name` in current `context`. That is find me a value
      from the view object
    */
    find: function(name, context) {
      name = this.trim(name);

      // Checks whether a value is thruthy or false or 0
      function is_kinda_truthy(bool) {
        return bool === false || bool === 0 || bool;
      }

      var value;

      // check for dot notation eg. foo.bar
      if(name.match(/([a-z_]+)\./ig)){
        var childValue = this.walk_context(name, context);
        if(is_kinda_truthy(childValue)) {
          value = childValue;
        }
      }
      else{
        if(is_kinda_truthy(context[name])) {
          value = context[name];
        } else if(is_kinda_truthy(this.context[name])) {
          value = this.context[name];
        }
      }

      if(typeof value === "function") {
        return value.apply(context);
      }
      if(value !== undefined) {
        return value;
      }
      // silently ignore unkown variables
      return "";
    },

    walk_context: function(name, context){
      var path = name.split('.');
      // if the var doesn't exist in current context, check the top level context
      var value_context = (context[path[0]] != undefined) ? context : this.context;
      var value = value_context[path.shift()];
      while(value != undefined && path.length > 0){
        value_context = value;
        value = value[path.shift()];
      }
      // if the value is a function, call it, binding the correct context
      if(typeof value === "function") {
        return value.apply(value_context);
      }
      return value;
    },

    // Utility methods

    /* includes tag */
    includes: function(needle, haystack) {
      return haystack.indexOf(this.otag + needle) != -1;
    },

    /*
      Does away with nasty characters
    */
    escape: function(s) {
      s = String(s === null ? "" : s);
      return s.replace(/&(?!\w+;)|["'<>\\]/g, function(s) {
        switch(s) {
        case "&": return "&amp;";
        case '"': return '&quot;';
        case "'": return '&#39;';
        case "<": return "&lt;";
        case ">": return "&gt;";
        default: return s;
        }
      });
    },

    // by @langalex, support for arrays of strings
    create_context: function(_context) {
      if(this.is_object(_context)) {
        return _context;
      } else {
        var iterator = ".";
        if(this.pragmas["IMPLICIT-ITERATOR"]) {
          iterator = this.pragmas["IMPLICIT-ITERATOR"].iterator;
        }
        var ctx = {};
        ctx[iterator] = _context;
        return ctx;
      }
    },

    is_object: function(a) {
      return a && typeof a == "object";
    },

    is_array: function(a) {
      return Object.prototype.toString.call(a) === '[object Array]';
    },

    /*
      Gets rid of leading and trailing whitespace
    */
    trim: function(s) {
      return s.replace(/^\s*|\s*$/g, "");
    },

    /*
      Why, why, why? Because IE. Cry, cry cry.
    */
    map: function(array, fn) {
      if (typeof array.map == "function") {
        return array.map(fn);
      } else {
        var r = [];
        var l = array.length;
        for(var i = 0; i < l; i++) {
          r.push(fn(array[i]));
        }
        return r;
      }
    },

    getCachedRegex: function(name, generator) {
      var byOtag = regexCache[this.otag];
      if (!byOtag) {
        byOtag = regexCache[this.otag] = {};
      }

      var byCtag = byOtag[this.ctag];
      if (!byCtag) {
        byCtag = byOtag[this.ctag] = {};
      }

      var regex = byCtag[name];
      if (!regex) {
        regex = byCtag[name] = generator(this.otag, this.ctag);
      }

      return regex;
    }
  };

  return({
    name: "mustache.js",
    version: "0.4.0-dev",

    /*
      Turns a template and view into HTML
    */
    to_html: function(template, view, partials, send_fun) {
      var renderer = new Renderer();
      if(send_fun) {
        renderer.send = send_fun;
      }
      renderer.render(template, view || {}, partials);
      if(!send_fun) {
        return renderer.buffer.join("\n");
      }
    }
  });
}();


/*********************************************
MyImgScale
**********************************************/
/*

/**
    MyImgScale v0.2

    MyImgScale is a jQuery plugin to scale images to fit or fill their parent container.
    Note: The parent container of the image must have a defined height and width in CSS.

    It is actually a merger/improvement from two existing plugins:
     1) Image Scale v1.0 by Kelly Meath (http://imgscale.kjmeath.com/), and
     2) CJ Object Scaler v3.0.0 by Doug Jones (http://www.cjboco.com/projects.cfm/project/cj-object-scaler/)

    The reasons for this merger are:
    . CJ Object Scaler has a conciser image resizing algorithm while Image Scale has a clearer layout.
    . CJ Object Scaler has an overflow issue, ie. the image scaled is not confined in parent container.
    . Both have the wrong calculation when parent container is invisible.

    If the parent container has padding, the scaled image might still cross boundary.
    One of the solutions is to insert a wrapper div with the same height and width as the parent container, eg:
    <div id="parent" style="height: 120px; width: 90px; padding: 10px">
      <div id="interimWrapper" style="height: 120px; width: 90px;">
        <img src="<Your img link here>" />
      </div>
    </div>
    I prefer to do this in application rather than in plugin as it is somewhat obtrusive.

    Web: https://bitbucket.org/marshalking/myimgscale
    Updated: Apr 15, 2011 by Marshal

    -----------------------------------------------------------------------
    MIT License

    Copyright (c) 2011 Doug Jones, Kelly Meath, Marshal

    Permission is hereby granted, free of charge, to any person obtaining
    a copy of this software and associated documentation files (the
    "Software"), to deal in the Software without restriction, including
    without limitation the rights to use, copy, modify, merge, publish,
    distribute, sublicense, and/or sell copies of the Software, and to
    permit persons to whom the Software is furnished to do so, subject to
    the following conditions:

    The above copyright notice and this permission notice shall be
    included in all copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
    EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
    MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
    NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
    LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
    OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
    WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

(function($) {
    $.fn.chuteScaleImage = function(options) {
        var opts = $.extend({parent: false, scale: 'fill', center: true, fade: 0}, options); // merge default options with user's

        return this.each(function() {
            var $img = $(this);
            var $parent = opts.parent ? $img.parents(opts.parent) : $img.parent(); // if not supplied, use default direct parent
            $parent.css({opacity: 0, overflow: 'hidden'}); // keep the img inside boundaries

            if ($parent.length > 0) {
                $img.removeAttr('height').removeAttr('width');
                if (this.complete) { // img already loaded/cached
                  scale($img, $parent);
                } else {
                    $img.load(function() {
                        scale($img, $parent);
                    });
                }
            }
        });

        function scale($img, $parent) {
            var imgSize = getOriginalImgSize($img),
                imgW    = imgSize.width,
                imgH    = imgSize.height,
                destW   = $parent.width(),
                destH   = $parent.height(),
                borderW = parseInt($img.css("borderLeftWidth"), 10) + parseInt($img.css("borderRightWidth"), 10),
                borderH = parseInt($img.css("borderTopWidth"), 10) + parseInt($img.css("borderBottomWidth"), 10),
                ratioX, ratioY, ratio, newWidth, newHeight;

            if (destH === 0 || destW === 0) { // parent is invisible, eg. display: none
                var parentSize = getHiddenElemSize($parent);
                destW = parentSize.width;
                destH = parentSize.height;
            }

            // check for valid border values. IE takes in account border size when calculating width/height so just set to 0
            borderW = isNaN(borderW) ? 0 : borderW;
            borderH = isNaN(borderH) ? 0 : borderH;

            // calculate scale ratios
            ratioX = destW / imgW;
            ratioY = destH / imgH;

            // Determine which algorithm to use
            if (opts.scale === "fit") {
                ratio = ratioX < ratioY ? ratioX : ratioY;
            } else if (opts.scale === "fill") {
                ratio = ratioX > ratioY ? ratioX : ratioY;
            }

            // calculate our new image dimensions
            newWidth = parseInt(imgW * ratio, 10) - borderW;
            newHeight = parseInt(imgH * ratio, 10) - borderH;

            // Set new dimensions to both css and img's attributes
            $img.css({
                "width": newWidth,
                "height": newHeight
            }).attr({
                "width": newWidth,
                "height": newHeight
            });

            if (opts.center) { // set offset if center is true
                $img.css("margin-left", Math.floor((destW - newWidth) / 2));
                $img.css("margin-top", Math.floor((destH - newHeight) / 2));
            }

            if (opts.fade > 0) { // fade-in effect
                $parent.animate({opacity: 1}, opts.fade);
            } else {
                $parent.css("opacity", 1);
            }
        }

        /**
         * To calculate the correct scale ratio, we need the image's original size rather than some preset values,
         * which were set either manually in code or automatically by browser.
         * Thanks FDisk for the solution:
         * http://stackoverflow.com/questions/318630/get-real-image-width-and-height-with-javascript-in-safari-chrome
         */
        function getOriginalImgSize($img) {
            var t = new Image();
            t.src = $img.attr("src");
            return {width: t.width, height: t.height};
        }

        /**
         * If the element is invisible, jQuery .height() and .width() return 0 in IE.
         * This function returns the hidden element's correct width and height.
         * Thanks elliotlarson for the solution:
         * http://stackoverflow.com/questions/2345784/jquery-get-height-of-hidden-element-in-jquery-1-4-2
         */
        function getHiddenElemSize(element) {
            var copy = element.clone().css({visibility: 'hidden', display: 'block', position: 'absolute'});
            copy.find('img').attr('onload', '');
            $("body").append(copy);
            var size = {width: copy.width(), height: copy.height()};
            copy.remove();
            return size;
        }
    };
})(jQuery);


jQuery.fn.hasChuteScrollBarH = function() {
  var me = jQuery(this);
  return (me.get(0).scrollHeight - me.innerHeight() > 2);
};

jQuery.fn.onScrollToBottom = function(callback) {
  var me            = jQuery(this);
  var scrollElement = (me.parent().hasChuteScrollBarH() && !me.parent().is('body')) ? me.parent() : jQuery(window);

  scrollElement.scroll(function(){
    var scrollHeight  = typeof(scrollElement.get(0).scrollHeight) == 'undefined' ? jQuery(document).height() : scrollElement.get(0).scrollHeight;

    if(scrollHeight - (scrollElement.scrollTop() + scrollElement.height()) < 100) {
      callback();
    }
  });
};


/*********************************************
jQuery Reveal
**********************************************/
/*
 * jQuery Reveal Plugin 1.0
 * www.ZURB.com
 * Copyright 2010, ZURB
 * Free to use under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
*/


(function($) {
  /*---------------------------
   Defaults for Reveal
  ----------------------------*/

  /*---------------------------
   Extend and Execute
  ----------------------------*/

  $.fn.chuteReveal = function(options) {
    var defaults = {
      animation: 'fadeAndPop', //fade, fadeAndPop, none
      animationspeed: 300, //how fast animtions are
      closeonbackgroundclick: false, //if you click background will modal close?
      dismissmodalclass: 'close-chute-reveal-modal', //the class of a button or element that will close an open modal
      top: "100px",
      backgroundOpacity: 0.5
    };

    //Extend dem' options
    var options = $.extend({}, defaults, options);

    return this.each(function() {

    /*---------------------------
     Global Variables
    ----------------------------*/
    var modal   = $(this),
    topMeasure  = parseInt(modal.css('top')),
    topOffset   = modal.height() + topMeasure,
    locked      = false,
    modalBG     =$('.chute-reveal-modal-bg');

    /*---------------------------
     Create Modal BG
    ----------------------------*/
    if(modalBG.length == 0) {
      modalBG = $('<div class="chute-reveal-modal-bg" />').insertAfter(modal);
    }

    /*---------------------------
     Open & Close Animations
    ----------------------------*/
    //Entrance Animations
    modal.bind('reveal:open', function () {
      modalBG.unbind('click.modalEvent');
      $('.' + options.dismissmodalclass).unbind('click.modalEvent');
      if(!locked) {
        lockModal();

        if(options.animation == "fadeAndPop") {
          modal.css({'top' : -modal.height(), 'opacity' : 1, 'visibility' : 'visible'});
          modalBG.css({'opacity' : 0, 'display' : 'block'});
          modalBG.animate({ opacity: options.backgroundOpacity }, options.animationspeed/2);
          setTimeout(function(){
            modal.animate({
              "top": options.top,
              "opacity" : 1
            }, options.animationspeed,unlockModal());
          }, options.animationspeed/2);
        }
        if(options.animation == "fade") {
          modal.css({'opacity' : 0, 'visibility' : 'visible', 'top': $(document).scrollTop()+topMeasure});
          modalBG.fadeIn(options.animationspeed/2);
          setTimeout(function(){
            modal.animate({
              "opacity" : 1
            }, options.animationspeed,unlockModal());
          }, options.animationspeed/2);
        }
        if(options.animation == "none") {
          modal.css({'visibility' : 'visible', 'top':$(document).scrollTop()+topMeasure});
          modalBG.css({"display":"block"});
          unlockModal()
        }
      }
      modal.unbind('reveal:open');
    });

    //Closing Animation
    modal.bind('reveal:close', function () {
      if(!locked) {
        lockModal();
        if(options.animation == "fadeAndPop") {
          modalBG.animate({ opacity: 0 }, options.animationspeed);
          setTimeout(function(){
            modalBG.css({'display' : 'none'});
          }, options.animationspeed);
          modal.animate({
            "top":  $(document).scrollTop()-topOffset + 'px',
            "opacity" : 0
          }, options.animationspeed/2, function() {
            modal.css({'top':topMeasure, 'opacity' : 1, 'visibility' : 'hidden'});
            unlockModal();
          });
        }
        if(options.animation == "fade") {
          setTimeout(function(){
            modalBG.fadeOut(options.animationspeed);
          }, options.animationspeed);
          modal.animate({
            "opacity" : 0
          }, options.animationspeed, function() {
            modal.css({'opacity' : 1, 'visibility' : 'hidden', 'top' : topMeasure});
            unlockModal();
          });
        }
        if(options.animation == "none") {
          modal.css({'visibility' : 'hidden', 'top' : topMeasure});
          modalBG.css({'display' : 'none'});
        }
      }
      modal.unbind('reveal:close');
    });

    /*---------------------------
     Open and add Closing Listeners
    ----------------------------*/
    //Open Modal Immediately
    modal.trigger('reveal:open')

    //Close Modal Listeners
    var closeButton = $('.' + options.dismissmodalclass).bind('click.modalEvent', function () {
      modal.trigger('reveal:close')
    });

    if(options.closeonbackgroundclick) {
      modalBG.css({"cursor":"pointer"})
      modalBG.bind('click.modalEvent', function () {
        modal.trigger('reveal:close')
      });
    }
    $('body').keyup(function(e) {
      if(e.which===27){ modal.trigger('reveal:close'); } // 27 is the keycode for the Escape key
    });

    /*---------------------------
     Animations Locks
    ----------------------------*/
    function unlockModal() {
      locked = false;
    }
    function lockModal() {
      locked = true;
    }

    });//each call
  }//orbit plugin call

  $.extend({
    serializeJSON: function(obj) {
      var t = typeof(obj);
      if(t != "object" || obj === null) {
        // simple data type
        if(t == "string") obj = '"' + obj + '"';
        return String(obj);
      } else {
        // array or object
        var json = [], arr = (obj && obj.constructor == Array);

        $.each(obj, function(k, v) {
          t = typeof(v);
          if(t == "string") v = '"' + v + '"';
          else if (t == "object" & v !== null) v = $.serializeJSON(v)
          json.push((arr ? "" : '"' + k + '":') + String(v));
        });

        return (arr ? "[" : "{") + String(json) + (arr ? "]" : "}");
      }
    }
  });

})(jQuery);



/*********************************************
PLUploader
**********************************************/

/*1.5.2*/
(function(){var f=0,l=[],n={},j={},a={"<":"lt",">":"gt","&":"amp",'"':"quot","'":"#39"},m=/[<>&\"\']/g,b,c=window.setTimeout,d={},e;function h(){this.returnValue=false}function k(){this.cancelBubble=true}(function(o){var p=o.split(/,/),q,s,r;for(q=0;q<p.length;q+=2){r=p[q+1].split(/ /);for(s=0;s<r.length;s++){j[r[s]]=p[q]}}})("application/msword,doc dot,application/pdf,pdf,application/pgp-signature,pgp,application/postscript,ps ai eps,application/rtf,rtf,application/vnd.ms-excel,xls xlb,application/vnd.ms-powerpoint,ppt pps pot,application/zip,zip,application/x-shockwave-flash,swf swfl,application/vnd.openxmlformats-officedocument.wordprocessingml.document,docx,application/vnd.openxmlformats-officedocument.wordprocessingml.template,dotx,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,xlsx,application/vnd.openxmlformats-officedocument.presentationml.presentation,pptx,application/vnd.openxmlformats-officedocument.presentationml.template,potx,application/vnd.openxmlformats-officedocument.presentationml.slideshow,ppsx,application/x-javascript,js,application/json,json,audio/mpeg,mpga mpega mp2 mp3,audio/x-wav,wav,audio/mp4,m4a,image/bmp,bmp,image/gif,gif,image/jpeg,jpeg jpg jpe,image/photoshop,psd,image/png,png,image/svg+xml,svg svgz,image/tiff,tiff tif,text/plain,asc txt text diff log,text/html,htm html xhtml,text/css,css,text/csv,csv,text/rtf,rtf,video/mpeg,mpeg mpg mpe,video/quicktime,qt mov,video/mp4,mp4,video/x-m4v,m4v,video/x-flv,flv,video/x-ms-wmv,wmv,video/avi,avi,video/webm,webm,video/vnd.rn-realvideo,rv,application/vnd.oasis.opendocument.formula-template,otf,application/octet-stream,exe");var g={VERSION:"1.5.2",STOPPED:1,STARTED:2,QUEUED:1,UPLOADING:2,FAILED:4,DONE:5,GENERIC_ERROR:-100,HTTP_ERROR:-200,IO_ERROR:-300,SECURITY_ERROR:-400,INIT_ERROR:-500,FILE_SIZE_ERROR:-600,FILE_EXTENSION_ERROR:-601,IMAGE_FORMAT_ERROR:-700,IMAGE_MEMORY_ERROR:-701,IMAGE_DIMENSIONS_ERROR:-702,mimeTypes:j,ua:(function(){var s=navigator,r=s.userAgent,t=s.vendor,p,o,q;p=/WebKit/.test(r);q=p&&t.indexOf("Apple")!==-1;o=window.opera&&window.opera.buildNumber;return{windows:navigator.platform.indexOf("Win")!==-1,ie:!p&&!o&&(/MSIE/gi).test(r)&&(/Explorer/gi).test(s.appName),webkit:p,gecko:!p&&/Gecko/.test(r),safari:q,opera:!!o}}()),typeOf:function(p){return({}).toString.call(p).match(/\s([a-z|A-Z]+)/)[1].toLowerCase()},extend:function(o){g.each(arguments,function(p,q){if(q>0){g.each(p,function(s,r){o[r]=s})}});return o},cleanName:function(o){var p,q;q=[/[\300-\306]/g,"A",/[\340-\346]/g,"a",/\307/g,"C",/\347/g,"c",/[\310-\313]/g,"E",/[\350-\353]/g,"e",/[\314-\317]/g,"I",/[\354-\357]/g,"i",/\321/g,"N",/\361/g,"n",/[\322-\330]/g,"O",/[\362-\370]/g,"o",/[\331-\334]/g,"U",/[\371-\374]/g,"u"];for(p=0;p<q.length;p+=2){o=o.replace(q[p],q[p+1])}o=o.replace(/\s+/g,"_");o=o.replace(/[^a-z0-9_\-\.]+/gi,"");return o},addRuntime:function(o,p){p.name=o;l[o]=p;l.push(p);return p},guid:function(){var o=new Date().getTime().toString(32),p;for(p=0;p<5;p++){o+=Math.floor(Math.random()*65535).toString(32)}return(g.guidPrefix||"p")+o+(f++).toString(32)},buildUrl:function(p,o){var q="";g.each(o,function(s,r){q+=(q?"&":"")+encodeURIComponent(r)+"="+encodeURIComponent(s)});if(q){p+=(p.indexOf("?")>0?"&":"?")+q}return p},each:function(r,s){var q,p,o;if(r){q=r.length;if(q===b){for(p in r){if(r.hasOwnProperty(p)){if(s(r[p],p)===false){return}}}}else{for(o=0;o<q;o++){if(s(r[o],o)===false){return}}}}},formatSize:function(o){if(o===b||/\D/.test(o)){return g.translate("N/A")}if(o>1073741824){return Math.round(o/1073741824,1)+" GB"}if(o>1048576){return Math.round(o/1048576,1)+" MB"}if(o>1024){return Math.round(o/1024,1)+" KB"}return o+" b"},getPos:function(p,t){var u=0,s=0,w,v=document,q,r;p=p;t=t||v.body;function o(C){var A,B,z=0,D=0;if(C){B=C.getBoundingClientRect();A=v.compatMode==="CSS1Compat"?v.documentElement:v.body;z=B.left+A.scrollLeft;D=B.top+A.scrollTop}return{x:z,y:D}}if(p&&p.getBoundingClientRect&&(navigator.userAgent.indexOf("MSIE")>0&&v.documentMode!==8)){q=o(p);r=o(t);return{x:q.x-r.x,y:q.y-r.y}}w=p;while(w&&w!=t&&w.nodeType){u+=w.offsetLeft||0;s+=w.offsetTop||0;w=w.offsetParent}w=p.parentNode;while(w&&w!=t&&w.nodeType){u-=w.scrollLeft||0;s-=w.scrollTop||0;w=w.parentNode}return{x:u,y:s}},getSize:function(o){return{w:o.offsetWidth||o.clientWidth,h:o.offsetHeight||o.clientHeight}},parseSize:function(o){var p;if(typeof(o)=="string"){o=/^([0-9]+)([mgk]?)$/.exec(o.toLowerCase().replace(/[^0-9mkg]/g,""));p=o[2];o=+o[1];if(p=="g"){o*=1073741824}if(p=="m"){o*=1048576}if(p=="k"){o*=1024}}return o},xmlEncode:function(o){return o?(""+o).replace(m,function(p){return a[p]?"&"+a[p]+";":p}):o},toArray:function(q){var p,o=[];for(p=0;p<q.length;p++){o[p]=q[p]}return o},inArray:function(q,r){if(r){if(Array.prototype.indexOf){return Array.prototype.indexOf.call(r,q)}for(var o=0,p=r.length;o<p;o++){if(r[o]===q){return o}}}return -1},addI18n:function(o){return g.extend(n,o)},translate:function(o){return n[o]||o},isEmptyObj:function(o){if(o===b){return true}for(var p in o){return false}return true},hasClass:function(q,p){var o;if(q.className==""){return false}o=new RegExp("(^|\\s+)"+p+"(\\s+|$)");return o.test(q.className)},addClass:function(p,o){if(!g.hasClass(p,o)){p.className=p.className==""?o:p.className.replace(/\s+$/,"")+" "+o}},removeClass:function(q,p){var o=new RegExp("(^|\\s+)"+p+"(\\s+|$)");q.className=q.className.replace(o,function(s,r,t){return r===" "&&t===" "?" ":""})},getStyle:function(p,o){if(p.currentStyle){return p.currentStyle[o]}else{if(window.getComputedStyle){return window.getComputedStyle(p,null)[o]}}},addEvent:function(t,o,u){var s,r,q,p;p=arguments[3];o=o.toLowerCase();if(e===b){e="Plupload_"+g.guid()}if(t.addEventListener){s=u;t.addEventListener(o,s,false)}else{if(t.attachEvent){s=function(){var v=window.event;if(!v.target){v.target=v.srcElement}v.preventDefault=h;v.stopPropagation=k;u(v)};t.attachEvent("on"+o,s)}}if(t[e]===b){t[e]=g.guid()}if(!d.hasOwnProperty(t[e])){d[t[e]]={}}r=d[t[e]];if(!r.hasOwnProperty(o)){r[o]=[]}r[o].push({func:s,orig:u,key:p})},removeEvent:function(t,o){var r,u,q;if(typeof(arguments[2])=="function"){u=arguments[2]}else{q=arguments[2]}o=o.toLowerCase();if(t[e]&&d[t[e]]&&d[t[e]][o]){r=d[t[e]][o]}else{return}for(var p=r.length-1;p>=0;p--){if(r[p].key===q||r[p].orig===u){if(t.detachEvent){t.detachEvent("on"+o,r[p].func)}else{if(t.removeEventListener){t.removeEventListener(o,r[p].func,false)}}r[p].orig=null;r[p].func=null;r.splice(p,1);if(u!==b){break}}}if(!r.length){delete d[t[e]][o]}if(g.isEmptyObj(d[t[e]])){delete d[t[e]];try{delete t[e]}catch(s){t[e]=b}}},removeAllEvents:function(p){var o=arguments[1];if(p[e]===b||!p[e]){return}g.each(d[p[e]],function(r,q){g.removeEvent(p,q,o)})}};g.Uploader=function(s){var p={},v,u=[],r,q=false;v=new g.QueueProgress();s=g.extend({chunk_size:0,multipart:true,multi_selection:true,file_data_name:"file",filters:[]},s);function t(){var x,y=0,w;if(this.state==g.STARTED){for(w=0;w<u.length;w++){if(!x&&u[w].status==g.QUEUED){x=u[w];x.status=g.UPLOADING;if(this.trigger("BeforeUpload",x)){this.trigger("UploadFile",x)}}else{y++}}if(y==u.length){this.stop();this.trigger("UploadComplete",u)}}}function o(){var x,w;v.reset();for(x=0;x<u.length;x++){w=u[x];if(w.size!==b){v.size+=w.size;v.loaded+=w.loaded}else{v.size=b}if(w.status==g.DONE){v.uploaded++}else{if(w.status==g.FAILED){v.failed++}else{v.queued++}}}if(v.size===b){v.percent=u.length>0?Math.ceil(v.uploaded/u.length*100):0}else{v.bytesPerSec=Math.ceil(v.loaded/((+new Date()-r||1)/1000));v.percent=v.size>0?Math.ceil(v.loaded/v.size*100):0}}g.extend(this,{state:g.STOPPED,runtime:"",features:{},files:u,settings:s,total:v,id:g.guid(),init:function(){var B=this,C,y,x,A=0,z;if(typeof(s.preinit)=="function"){s.preinit(B)}else{g.each(s.preinit,function(E,D){B.bind(D,E)})}s.page_url=s.page_url||document.location.pathname.replace(/\/[^\/]+$/g,"/");if(!/^(\w+:\/\/|\/)/.test(s.url)){s.url=s.page_url+s.url}s.chunk_size=g.parseSize(s.chunk_size);s.max_file_size=g.parseSize(s.max_file_size);B.bind("FilesAdded",function(D,G){var F,E,I=0,J,H=s.filters;if(H&&H.length){J=[];g.each(H,function(K){g.each(K.extensions.split(/,/),function(L){if(/^\s*\*\s*$/.test(L)){J.push("\\.*")}else{J.push("\\."+L.replace(new RegExp("["+("/^$.*+?|()[]{}\\".replace(/./g,"\\$&"))+"]","g"),"\\$&"))}})});J=new RegExp(J.join("|")+"$","i")}for(F=0;F<G.length;F++){E=G[F];E.loaded=0;E.percent=0;E.status=g.QUEUED;if(J&&!J.test(E.name)){D.trigger("Error",{code:g.FILE_EXTENSION_ERROR,message:g.translate("File extension error."),file:E});continue}if(E.size!==b&&E.size>s.max_file_size){D.trigger("Error",{code:g.FILE_SIZE_ERROR,message:g.translate("File size error."),file:E});continue}u.push(E);I++}if(I){c(function(){B.trigger("QueueChanged");B.refresh()},1)}else{return false}});if(s.unique_names){B.bind("UploadFile",function(D,E){var G=E.name.match(/\.([^.]+)$/),F="tmp";if(G){F=G[1]}E.target_name=E.id+"."+F})}B.bind("UploadProgress",function(D,E){E.percent=E.size>0?Math.ceil(E.loaded/E.size*100):100;o()});B.bind("StateChanged",function(D){if(D.state==g.STARTED){r=(+new Date())}else{if(D.state==g.STOPPED){for(C=D.files.length-1;C>=0;C--){if(D.files[C].status==g.UPLOADING){D.files[C].status=g.QUEUED;o()}}}}});B.bind("QueueChanged",o);B.bind("Error",function(D,E){if(E.file){E.file.status=g.FAILED;o();if(D.state==g.STARTED){c(function(){t.call(B)},1)}}});B.bind("FileUploaded",function(D,E){E.status=g.DONE;E.loaded=E.size;D.trigger("UploadProgress",E);c(function(){t.call(B)},1)});if(s.runtimes){y=[];z=s.runtimes.split(/\s?,\s?/);for(C=0;C<z.length;C++){if(l[z[C]]){y.push(l[z[C]])}}}else{y=l}function w(){var G=y[A++],F,D,E;if(G){F=G.getFeatures();D=B.settings.required_features;if(D){D=D.split(",");for(E=0;E<D.length;E++){if(!F[D[E]]){w();return}}}G.init(B,function(H){if(H&&H.success){B.features=F;B.runtime=G.name;B.trigger("Init",{runtime:G.name});B.trigger("PostInit");B.refresh()}else{w()}})}else{B.trigger("Error",{code:g.INIT_ERROR,message:g.translate("Init error.")})}}w();if(typeof(s.init)=="function"){s.init(B)}else{g.each(s.init,function(E,D){B.bind(D,E)})}},refresh:function(){this.trigger("Refresh")},start:function(){if(this.state!=g.STARTED){this.state=g.STARTED;this.trigger("StateChanged");t.call(this)}},stop:function(){if(this.state!=g.STOPPED){this.state=g.STOPPED;this.trigger("CancelUpload");this.trigger("StateChanged")}},disableBrowse:function(){q=arguments[0]!==b?arguments[0]:true;this.trigger("DisableBrowse",q)},getFile:function(x){var w;for(w=u.length-1;w>=0;w--){if(u[w].id===x){return u[w]}}},removeFile:function(x){var w;for(w=u.length-1;w>=0;w--){if(u[w].id===x.id){return this.splice(w,1)[0]}}},splice:function(y,w){var x;x=u.splice(y===b?0:y,w===b?u.length:w);this.trigger("FilesRemoved",x);this.trigger("QueueChanged");return x},trigger:function(x){var z=p[x.toLowerCase()],y,w;if(z){w=Array.prototype.slice.call(arguments);w[0]=this;for(y=0;y<z.length;y++){if(z[y].func.apply(z[y].scope,w)===false){return false}}}return true},hasEventListener:function(w){return !!p[w.toLowerCase()]},bind:function(w,y,x){var z;w=w.toLowerCase();z=p[w]||[];z.push({func:y,scope:x||this});p[w]=z},unbind:function(w){w=w.toLowerCase();var z=p[w],x,y=arguments[1];if(z){if(y!==b){for(x=z.length-1;x>=0;x--){if(z[x].func===y){z.splice(x,1);break}}}else{z=[]}if(!z.length){delete p[w]}}},unbindAll:function(){var w=this;g.each(p,function(y,x){w.unbind(x)})},destroy:function(){this.stop();this.trigger("Destroy");this.unbindAll()}})};g.File=function(r,p,q){var o=this;o.id=r;o.name=p;o.size=q;o.loaded=0;o.percent=0;o.status=0};g.Runtime=function(){this.getFeatures=function(){};this.init=function(o,p){}};g.QueueProgress=function(){var o=this;o.size=0;o.loaded=0;o.uploaded=0;o.failed=0;o.queued=0;o.percent=0;o.bytesPerSec=0;o.reset=function(){o.size=o.loaded=o.uploaded=o.failed=o.queued=o.percent=o.bytesPerSec=0}};g.runtimes={};window.plupload=g})();(function(){if(window.google&&google.gears){return}var a=null;if(typeof GearsFactory!="undefined"){a=new GearsFactory()}else{try{a=new ActiveXObject("Gears.Factory");if(a.getBuildInfo().indexOf("ie_mobile")!=-1){a.privateSetGlobalObject(this)}}catch(b){if((typeof navigator.mimeTypes!="undefined")&&navigator.mimeTypes["application/x-googlegears"]){a=document.createElement("object");a.style.display="none";a.width=0;a.height=0;a.type="application/x-googlegears";document.documentElement.appendChild(a)}}}if(!a){return}if(!window.google){window.google={}}if(!google.gears){google.gears={factory:a}}})();(function(e,b,c,d){var f={};function a(h,k,m){var g,j,l,o;j=google.gears.factory.create("beta.canvas");try{j.decode(h);if(!k.width){k.width=j.width}if(!k.height){k.height=j.height}o=Math.min(width/j.width,height/j.height);if(o<1||(o===1&&m==="image/jpeg")){j.resize(Math.round(j.width*o),Math.round(j.height*o));if(k.quality){return j.encode(m,{quality:k.quality/100})}return j.encode(m)}}catch(n){}return h}c.runtimes.Gears=c.addRuntime("gears",{getFeatures:function(){return{dragdrop:true,jpgresize:true,pngresize:true,chunks:true,progress:true,multipart:true,multi_selection:true}},init:function(l,n){var m,h,g=false;if(!e.google||!google.gears){return n({success:false})}try{m=google.gears.factory.create("beta.desktop")}catch(k){return n({success:false})}function j(q){var p,o,r=[],s;for(o=0;o<q.length;o++){p=q[o];s=c.guid();f[s]=p.blob;r.push(new c.File(s,p.name,p.blob.length))}l.trigger("FilesAdded",r)}l.bind("PostInit",function(){var p=l.settings,o=b.getElementById(p.drop_element);if(o){c.addEvent(o,"dragover",function(q){m.setDropEffect(q,"copy");q.preventDefault()},l.id);c.addEvent(o,"drop",function(r){var q=m.getDragData(r,"application/x-gears-files");if(q){j(q.files)}r.preventDefault()},l.id);o=0}c.addEvent(b.getElementById(p.browse_button),"click",function(u){var t=[],r,q,s;u.preventDefault();if(g){return}no_type_restriction:for(r=0;r<p.filters.length;r++){s=p.filters[r].extensions.split(",");for(q=0;q<s.length;q++){if(s[q]==="*"){t=[];break no_type_restriction}t.push("."+s[q])}}m.openFiles(j,{singleFile:!p.multi_selection,filter:t})},l.id)});l.bind("CancelUpload",function(){if(h.abort){h.abort()}});l.bind("UploadFile",function(u,r){var w=0,v,s,t=0,q=u.settings.resize,o;if(q&&/\.(png|jpg|jpeg)$/i.test(r.name)){f[r.id]=a(f[r.id],q,/\.png$/i.test(r.name)?"image/png":"image/jpeg")}r.size=f[r.id].length;s=u.settings.chunk_size;o=s>0;v=Math.ceil(r.size/s);if(!o){s=r.size;v=1}function p(){var C,y=u.settings.multipart,x=0,B={name:r.target_name||r.name},z=u.settings.url;function A(E){var D,J="----pluploadboundary"+c.guid(),G="--",I="\r\n",F,H;if(y){h.setRequestHeader("Content-Type","multipart/form-data; boundary="+J);D=google.gears.factory.create("beta.blobbuilder");c.each(c.extend(B,u.settings.multipart_params),function(L,K){D.append(G+J+I+'Content-Disposition: form-data; name="'+K+'"'+I+I);D.append(L+I)});H=c.mimeTypes[r.name.replace(/^.+\.([^.]+)/,"$1").toLowerCase()]||"application/octet-stream";D.append(G+J+I+'Content-Disposition: form-data; name="'+u.settings.file_data_name+'"; filename="'+r.name+'"'+I+"Content-Type: "+H+I+I);D.append(E);D.append(I+G+J+G+I);F=D.getAsBlob();x=F.length-E.length;E=F}h.send(E)}if(r.status==c.DONE||r.status==c.FAILED||u.state==c.STOPPED){return}if(o){B.chunk=w;B.chunks=v}C=Math.min(s,r.size-(w*s));if(!y){z=c.buildUrl(u.settings.url,B)}h=google.gears.factory.create("beta.httprequest");h.open("POST",z);if(!y){h.setRequestHeader("Content-Disposition",'attachment; filename="'+r.name+'"');h.setRequestHeader("Content-Type","application/octet-stream")}c.each(u.settings.headers,function(E,D){h.setRequestHeader(D,E)});h.upload.onprogress=function(D){r.loaded=t+D.loaded-x;u.trigger("UploadProgress",r)};h.onreadystatechange=function(){var D;if(h.readyState==4&&u.state!==c.STOPPED){if(h.status==200){D={chunk:w,chunks:v,response:h.responseText,status:h.status};u.trigger("ChunkUploaded",r,D);if(D.cancelled){r.status=c.FAILED;return}t+=C;if(++w>=v){r.status=c.DONE;u.trigger("FileUploaded",r,{response:h.responseText,status:h.status})}else{p()}}else{u.trigger("Error",{code:c.HTTP_ERROR,message:c.translate("HTTP Error."),file:r,chunk:w,chunks:v,status:h.status})}}};if(w<v){A(f[r.id].slice(w*s,C))}}p()});l.bind("DisableBrowse",function(o,p){g=p});l.bind("Destroy",function(o){var p,q,r={browseButton:o.settings.browse_button,dropElm:o.settings.drop_element};for(p in r){q=b.getElementById(r[p]);if(q){c.removeAllEvents(q,o.id)}}});n({success:true})}})})(window,document,plupload);(function(g,b,d,e){var a={},h={};function c(o){var n,m=typeof o,j,l,k;if(o===e||o===null){return"null"}if(m==="string"){n="\bb\tt\nn\ff\rr\"\"''\\\\";return'"'+o.replace(/([\u0080-\uFFFF\x00-\x1f\"])/g,function(r,q){var p=n.indexOf(q);if(p+1){return"\\"+n.charAt(p+1)}r=q.charCodeAt().toString(16);return"\\u"+"0000".substring(r.length)+r})+'"'}if(m=="object"){j=o.length!==e;n="";if(j){for(l=0;l<o.length;l++){if(n){n+=","}n+=c(o[l])}n="["+n+"]"}else{for(k in o){if(o.hasOwnProperty(k)){if(n){n+=","}n+=c(k)+":"+c(o[k])}}n="{"+n+"}"}return n}return""+o}function f(s){var v=false,j=null,o=null,k,l,m,u,n,q=0;try{try{o=new ActiveXObject("AgControl.AgControl");if(o.IsVersionSupported(s)){v=true}o=null}catch(r){var p=navigator.plugins["Silverlight Plug-In"];if(p){k=p.description;if(k==="1.0.30226.2"){k="2.0.30226.2"}l=k.split(".");while(l.length>3){l.pop()}while(l.length<4){l.push(0)}m=s.split(".");while(m.length>4){m.pop()}do{u=parseInt(m[q],10);n=parseInt(l[q],10);q++}while(q<m.length&&u===n);if(u<=n&&!isNaN(u)){v=true}}}}catch(t){v=false}return v}d.silverlight={trigger:function(n,k){var m=a[n],l,j;if(m){j=d.toArray(arguments).slice(1);j[0]="Silverlight:"+k;setTimeout(function(){m.trigger.apply(m,j)},0)}}};d.runtimes.Silverlight=d.addRuntime("silverlight",{getFeatures:function(){return{jpgresize:true,pngresize:true,chunks:true,progress:true,multipart:true,multi_selection:true}},init:function(p,q){var o,m="",n=p.settings.filters,l,k=b.body;if(!f("2.0.31005.0")||(g.opera&&g.opera.buildNumber)){q({success:false});return}h[p.id]=false;a[p.id]=p;o=b.createElement("div");o.id=p.id+"_silverlight_container";d.extend(o.style,{position:"absolute",top:"0px",background:p.settings.shim_bgcolor||"transparent",zIndex:99999,width:"100px",height:"100px",overflow:"hidden",opacity:p.settings.shim_bgcolor||b.documentMode>8?"":0.01});o.className="plupload silverlight";if(p.settings.container){k=b.getElementById(p.settings.container);if(d.getStyle(k,"position")==="static"){k.style.position="relative"}}k.appendChild(o);for(l=0;l<n.length;l++){m+=(m!=""?"|":"")+n[l].title+" | *."+n[l].extensions.replace(/,/g,";*.")}o.innerHTML='<object id="'+p.id+'_silverlight" data="data:application/x-silverlight," type="application/x-silverlight-2" style="outline:none;" width="1024" height="1024"><param name="source" value="'+p.settings.silverlight_xap_url+'"/><param name="background" value="Transparent"/><param name="windowless" value="true"/><param name="enablehtmlaccess" value="true"/><param name="initParams" value="id='+p.id+",filter="+m+",multiselect="+p.settings.multi_selection+'"/></object>';function j(){return b.getElementById(p.id+"_silverlight").content.Upload}p.bind("Silverlight:Init",function(){var r,s={};if(h[p.id]){return}h[p.id]=true;p.bind("Silverlight:StartSelectFiles",function(t){r=[]});p.bind("Silverlight:SelectFile",function(t,w,u,v){var x;x=d.guid();s[x]=w;s[w]=x;r.push(new d.File(x,u,v))});p.bind("Silverlight:SelectSuccessful",function(){if(r.length){p.trigger("FilesAdded",r)}});p.bind("Silverlight:UploadChunkError",function(t,w,u,x,v){p.trigger("Error",{code:d.IO_ERROR,message:"IO Error.",details:v,file:t.getFile(s[w])})});p.bind("Silverlight:UploadFileProgress",function(t,x,u,w){var v=t.getFile(s[x]);if(v.status!=d.FAILED){v.size=w;v.loaded=u;t.trigger("UploadProgress",v)}});p.bind("Refresh",function(t){var u,v,w;u=b.getElementById(t.settings.browse_button);if(u){v=d.getPos(u,b.getElementById(t.settings.container));w=d.getSize(u);d.extend(b.getElementById(t.id+"_silverlight_container").style,{top:v.y+"px",left:v.x+"px",width:w.w+"px",height:w.h+"px"})}});p.bind("Silverlight:UploadChunkSuccessful",function(t,w,u,z,y){var x,v=t.getFile(s[w]);x={chunk:u,chunks:z,response:y};t.trigger("ChunkUploaded",v,x);if(v.status!=d.FAILED&&t.state!==d.STOPPED){j().UploadNextChunk()}if(u==z-1){v.status=d.DONE;t.trigger("FileUploaded",v,{response:y})}});p.bind("Silverlight:UploadSuccessful",function(t,w,u){var v=t.getFile(s[w]);v.status=d.DONE;t.trigger("FileUploaded",v,{response:u})});p.bind("FilesRemoved",function(t,v){var u;for(u=0;u<v.length;u++){j().RemoveFile(s[v[u].id])}});p.bind("UploadFile",function(t,v){var w=t.settings,u=w.resize||{};j().UploadFile(s[v.id],t.settings.url,c({name:v.target_name||v.name,mime:d.mimeTypes[v.name.replace(/^.+\.([^.]+)/,"$1").toLowerCase()]||"application/octet-stream",chunk_size:w.chunk_size,image_width:u.width,image_height:u.height,image_quality:u.quality||90,multipart:!!w.multipart,multipart_params:w.multipart_params||{},file_data_name:w.file_data_name,headers:w.headers}))});p.bind("CancelUpload",function(){j().CancelUpload()});p.bind("Silverlight:MouseEnter",function(t){var u,v;u=b.getElementById(p.settings.browse_button);v=t.settings.browse_button_hover;if(u&&v){d.addClass(u,v)}});p.bind("Silverlight:MouseLeave",function(t){var u,v;u=b.getElementById(p.settings.browse_button);v=t.settings.browse_button_hover;if(u&&v){d.removeClass(u,v)}});p.bind("Silverlight:MouseLeftButtonDown",function(t){var u,v;u=b.getElementById(p.settings.browse_button);v=t.settings.browse_button_active;if(u&&v){d.addClass(u,v);d.addEvent(b.body,"mouseup",function(){d.removeClass(u,v)})}});p.bind("Sliverlight:StartSelectFiles",function(t){var u,v;u=b.getElementById(p.settings.browse_button);v=t.settings.browse_button_active;if(u&&v){d.removeClass(u,v)}});p.bind("DisableBrowse",function(t,u){j().DisableBrowse(u)});p.bind("Destroy",function(t){var u;d.removeAllEvents(b.body,t.id);delete h[t.id];delete a[t.id];u=b.getElementById(t.id+"_silverlight_container");if(u){k.removeChild(u)}});q({success:true})})}})})(window,document,plupload);(function(f,b,d,e){var a={},g={};function c(){var h;try{h=navigator.plugins["Shockwave Flash"];h=h.description}catch(k){try{h=new ActiveXObject("ShockwaveFlash.ShockwaveFlash").GetVariable("$version")}catch(j){h="0.0"}}h=h.match(/\d+/g);return parseFloat(h[0]+"."+h[1])}d.flash={trigger:function(k,h,j){setTimeout(function(){var n=a[k],m,l;if(n){n.trigger("Flash:"+h,j)}},0)}};d.runtimes.Flash=d.addRuntime("flash",{getFeatures:function(){return{jpgresize:true,pngresize:true,maxWidth:8091,maxHeight:8091,chunks:true,progress:true,multipart:true,multi_selection:true}},init:function(n,p){var l,m,h=0,j=b.body;if(c()<10){p({success:false});return}g[n.id]=false;a[n.id]=n;l=b.getElementById(n.settings.browse_button);m=b.createElement("div");m.id=n.id+"_flash_container";d.extend(m.style,{position:"absolute",top:"0px",background:n.settings.shim_bgcolor||"transparent",zIndex:99999,width:"100%",height:"100%"});m.className="plupload flash";if(n.settings.container){j=b.getElementById(n.settings.container);if(d.getStyle(j,"position")==="static"){j.style.position="relative"}}j.appendChild(m);(function(){var q,r;q='<object id="'+n.id+'_flash" type="application/x-shockwave-flash" data="'+n.settings.flash_swf_url+'" ';if(d.ua.ie){q+='classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" '}q+='width="100%" height="100%" style="outline:0"><param name="movie" value="'+n.settings.flash_swf_url+'" /><param name="flashvars" value="id='+escape(n.id)+'" /><param name="wmode" value="transparent" /><param name="allowscriptaccess" value="always" /></object>';if(d.ua.ie){r=b.createElement("div");m.appendChild(r);r.outerHTML=q;r=null}else{m.innerHTML=q}}());function o(){return b.getElementById(n.id+"_flash")}function k(){if(h++>5000){p({success:false});return}if(!g[n.id]){setTimeout(k,1)}}k();l=m=null;n.bind("Flash:Init",function(){var r={},q;o().setFileFilters(n.settings.filters,n.settings.multi_selection);if(g[n.id]){return}g[n.id]=true;n.bind("UploadFile",function(s,u){var v=s.settings,t=n.settings.resize||{};o().uploadFile(r[u.id],v.url,{name:u.target_name||u.name,mime:d.mimeTypes[u.name.replace(/^.+\.([^.]+)/,"$1").toLowerCase()]||"application/octet-stream",chunk_size:v.chunk_size,width:t.width,height:t.height,quality:t.quality,multipart:v.multipart,multipart_params:v.multipart_params||{},file_data_name:v.file_data_name,format:/\.(jpg|jpeg)$/i.test(u.name)?"jpg":"png",headers:v.headers,urlstream_upload:v.urlstream_upload})});n.bind("CancelUpload",function(){o().cancelUpload()});n.bind("Flash:UploadProcess",function(t,s){var u=t.getFile(r[s.id]);if(u.status!=d.FAILED){u.loaded=s.loaded;u.size=s.size;t.trigger("UploadProgress",u)}});n.bind("Flash:UploadChunkComplete",function(s,u){var v,t=s.getFile(r[u.id]);v={chunk:u.chunk,chunks:u.chunks,response:u.text};s.trigger("ChunkUploaded",t,v);if(t.status!==d.FAILED&&s.state!==d.STOPPED){o().uploadNextChunk()}if(u.chunk==u.chunks-1){t.status=d.DONE;s.trigger("FileUploaded",t,{response:u.text})}});n.bind("Flash:SelectFiles",function(s,v){var u,t,w=[],x;for(t=0;t<v.length;t++){u=v[t];x=d.guid();r[x]=u.id;r[u.id]=x;w.push(new d.File(x,u.name,u.size))}if(w.length){n.trigger("FilesAdded",w)}});n.bind("Flash:SecurityError",function(s,t){n.trigger("Error",{code:d.SECURITY_ERROR,message:d.translate("Security error."),details:t.message,file:n.getFile(r[t.id])})});n.bind("Flash:GenericError",function(s,t){n.trigger("Error",{code:d.GENERIC_ERROR,message:d.translate("Generic error."),details:t.message,file:n.getFile(r[t.id])})});n.bind("Flash:IOError",function(s,t){n.trigger("Error",{code:d.IO_ERROR,message:d.translate("IO error."),details:t.message,file:n.getFile(r[t.id])})});n.bind("Flash:ImageError",function(s,t){n.trigger("Error",{code:parseInt(t.code,10),message:d.translate("Image error."),file:n.getFile(r[t.id])})});n.bind("Flash:StageEvent:rollOver",function(s){var t,u;t=b.getElementById(n.settings.browse_button);u=s.settings.browse_button_hover;if(t&&u){d.addClass(t,u)}});n.bind("Flash:StageEvent:rollOut",function(s){var t,u;t=b.getElementById(n.settings.browse_button);u=s.settings.browse_button_hover;if(t&&u){d.removeClass(t,u)}});n.bind("Flash:StageEvent:mouseDown",function(s){var t,u;t=b.getElementById(n.settings.browse_button);u=s.settings.browse_button_active;if(t&&u){d.addClass(t,u);d.addEvent(b.body,"mouseup",function(){d.removeClass(t,u)},s.id)}});n.bind("Flash:StageEvent:mouseUp",function(s){var t,u;t=b.getElementById(n.settings.browse_button);u=s.settings.browse_button_active;if(t&&u){d.removeClass(t,u)}});n.bind("Flash:ExifData",function(s,t){n.trigger("ExifData",n.getFile(r[t.id]),t.data)});n.bind("Flash:GpsData",function(s,t){n.trigger("GpsData",n.getFile(r[t.id]),t.data)});n.bind("QueueChanged",function(s){n.refresh()});n.bind("FilesRemoved",function(s,u){var t;for(t=0;t<u.length;t++){o().removeFile(r[u[t].id])}});n.bind("StateChanged",function(s){n.refresh()});n.bind("Refresh",function(s){var t,u,v;o().setFileFilters(n.settings.filters,n.settings.multi_selection);t=b.getElementById(s.settings.browse_button);if(t){u=d.getPos(t,b.getElementById(s.settings.container));v=d.getSize(t);d.extend(b.getElementById(s.id+"_flash_container").style,{top:u.y+"px",left:u.x+"px",width:v.w+"px",height:v.h+"px"})}});n.bind("DisableBrowse",function(s,t){o().disableBrowse(t)});n.bind("Destroy",function(s){var t;d.removeAllEvents(b.body,s.id);delete g[s.id];delete a[s.id];t=b.getElementById(s.id+"_flash_container");if(t){j.removeChild(t)}});p({success:true})})}})})(window,document,plupload);(function(a){a.runtimes.BrowserPlus=a.addRuntime("browserplus",{getFeatures:function(){return{dragdrop:true,jpgresize:true,pngresize:true,chunks:true,progress:true,multipart:true,multi_selection:true}},init:function(g,j){var e=window.BrowserPlus,h={},d=g.settings,c=d.resize;function f(o){var n,m,k=[],l,p;for(m=0;m<o.length;m++){l=o[m];p=a.guid();h[p]=l;k.push(new a.File(p,l.name,l.size))}if(m){g.trigger("FilesAdded",k)}}function b(){var k=false;g.bind("PostInit",function(){var o,m=d.drop_element,q=g.id+"_droptarget",l=document.getElementById(m),n;function r(t,s){e.DragAndDrop.AddDropTarget({id:t},function(u){e.DragAndDrop.AttachCallbacks({id:t,hover:function(v){if(!v&&s){s()}},drop:function(v){if(s){s()}f(v)}},function(){})})}function p(){document.getElementById(q).style.top="-1000px"}if(l){if(document.attachEvent&&(/MSIE/gi).test(navigator.userAgent)){o=document.createElement("div");o.setAttribute("id",q);a.extend(o.style,{position:"absolute",top:"-1000px",background:"red",filter:"alpha(opacity=0)",opacity:0});document.body.appendChild(o);a.addEvent(l,"dragenter",function(t){var s,u;s=document.getElementById(m);u=a.getPos(s);a.extend(document.getElementById(q).style,{top:u.y+"px",left:u.x+"px",width:s.offsetWidth+"px",height:s.offsetHeight+"px"})});r(q,p)}else{r(m)}}a.addEvent(document.getElementById(d.browse_button),"click",function(y){var s=[],u,t,x=d.filters,w,v;y.preventDefault();if(k){return}no_type_restriction:for(u=0;u<x.length;u++){w=x[u].extensions.split(",");for(t=0;t<w.length;t++){if(w[t]==="*"){s=[];break no_type_restriction}v=a.mimeTypes[w[t]];if(v&&a.inArray(v,s)===-1){s.push(a.mimes[w[t]])}}}e.FileBrowse.OpenBrowseDialog({mimeTypes:s},function(z){if(z.success){f(z.value)}})});l=o=null});g.bind("CancelUpload",function(){e.Uploader.cancel()});g.bind("DisableBrowse",function(l,m){k=m});g.bind("UploadFile",function(o,l){var n=h[l.id],t={},m=o.settings.chunk_size,p,q=[];function s(u,w){var v;if(l.status==a.FAILED){return}t.name=l.target_name||l.name;if(m){t.chunk=""+u;t.chunks=""+w}v=q.shift();e.Uploader.upload({url:o.settings.url,files:{file:v},cookies:document.cookies,postvars:a.extend(t,o.settings.multipart_params),progressCallback:function(z){var y,x=0;p[u]=parseInt(z.filePercent*v.size/100,10);for(y=0;y<p.length;y++){x+=p[y]}l.loaded=x;o.trigger("UploadProgress",l)}},function(y){var x,z;if(y.success){x=y.value.statusCode;if(m){o.trigger("ChunkUploaded",l,{chunk:u,chunks:w,response:y.value.body,status:x})}if(q.length>0){s(++u,w)}else{l.status=a.DONE;o.trigger("FileUploaded",l,{response:y.value.body,status:x});if(x>=400){o.trigger("Error",{code:a.HTTP_ERROR,message:a.translate("HTTP Error."),file:l,status:x})}}}else{o.trigger("Error",{code:a.GENERIC_ERROR,message:a.translate("Generic Error."),file:l,details:y.error})}})}function r(u){l.size=u.size;if(m){e.FileAccess.chunk({file:u,chunkSize:m},function(x){if(x.success){var y=x.value,v=y.length;p=Array(v);for(var w=0;w<v;w++){p[w]=0;q.push(y[w])}s(0,v)}})}else{p=Array(1);q.push(u);s(0,1)}}if(c&&/\.(png|jpg|jpeg)$/i.test(l.name)){BrowserPlus.ImageAlter.transform({file:n,quality:c.quality||90,actions:[{scale:{maxwidth:c.width,maxheight:c.height}}]},function(u){if(u.success){r(u.value.file)}})}else{r(n)}});j({success:true})}if(e){e.init(function(l){var k=[{service:"Uploader",version:"3"},{service:"DragAndDrop",version:"1"},{service:"FileBrowse",version:"1"},{service:"FileAccess",version:"2"}];if(c){k.push({service:"ImageAlter",version:"4"})}if(l.success){e.require({services:k},function(m){if(m.success){b()}else{j()}})}else{j()}})}else{j()}}})})(plupload);(function(h,k,j,e){var c={},g;function m(o,p){var n;if("FileReader" in h){n=new FileReader();n.readAsDataURL(o);n.onload=function(){p(n.result)}}else{return p(o.getAsDataURL())}}function l(o,p){var n;if("FileReader" in h){n=new FileReader();n.readAsBinaryString(o);n.onload=function(){p(n.result)}}else{return p(o.getAsBinary())}}function d(r,p,n,v){var q,o,u,s,t=this;m(c[r.id],function(w){q=k.createElement("canvas");q.style.display="none";k.body.appendChild(q);o=q.getContext("2d");u=new Image();u.onerror=u.onabort=function(){v({success:false})};u.onload=function(){var B,x,z,y,A;if(!p.width){p.width=u.width}if(!p.height){p.height=u.height}s=Math.min(p.width/u.width,p.height/u.height);if(s<1||(s===1&&n==="image/jpeg")){B=Math.round(u.width*s);x=Math.round(u.height*s);q.width=B;q.height=x;o.drawImage(u,0,0,B,x);if(n==="image/jpeg"){y=new f(atob(w.substring(w.indexOf("base64,")+7)));if(y.headers&&y.headers.length){A=new a();if(A.init(y.get("exif")[0])){A.setExif("PixelXDimension",B);A.setExif("PixelYDimension",x);y.set("exif",A.getBinary());if(t.hasEventListener("ExifData")){t.trigger("ExifData",r,A.EXIF())}if(t.hasEventListener("GpsData")){t.trigger("GpsData",r,A.GPS())}}}if(p.quality){try{w=q.toDataURL(n,p.quality/100)}catch(C){w=q.toDataURL(n)}}}else{w=q.toDataURL(n)}w=w.substring(w.indexOf("base64,")+7);w=atob(w);if(y&&y.headers&&y.headers.length){w=y.restore(w);y.purge()}q.parentNode.removeChild(q);v({success:true,data:w})}else{v({success:false})}};u.src=w})}j.runtimes.Html5=j.addRuntime("html5",{getFeatures:function(){var s,o,r,q,p,n;o=r=p=n=false;if(h.XMLHttpRequest){s=new XMLHttpRequest();r=!!s.upload;o=!!(s.sendAsBinary||s.upload)}if(o){q=!!(s.sendAsBinary||(h.Uint8Array&&h.ArrayBuffer));p=!!(File&&(File.prototype.getAsDataURL||h.FileReader)&&q);n=!!(File&&(File.prototype.mozSlice||File.prototype.webkitSlice||File.prototype.slice))}g=j.ua.safari&&j.ua.windows;return{html5:o,dragdrop:(function(){var t=k.createElement("div");return("draggable" in t)||("ondragstart" in t&&"ondrop" in t)}()),jpgresize:p,pngresize:p,multipart:p||!!h.FileReader||!!h.FormData,canSendBinary:q,cantSendBlobInFormData:!!(j.ua.gecko&&h.FormData&&h.FileReader&&!FileReader.prototype.readAsArrayBuffer),progress:r,chunks:n,multi_selection:!(j.ua.safari&&j.ua.windows),triggerDialog:(j.ua.gecko&&h.FormData||j.ua.webkit)}},init:function(p,r){var n,q;function o(w){var u,t,v=[],x,s={};for(t=0;t<w.length;t++){u=w[t];if(s[u.name]){continue}s[u.name]=true;x=j.guid();c[x]=u;v.push(new j.File(x,u.fileName||u.name,u.fileSize||u.size))}if(v.length){p.trigger("FilesAdded",v)}}n=this.getFeatures();if(!n.html5){r({success:false});return}p.bind("Init",function(w){var G,F,C=[],v,D,t=w.settings.filters,u,B,s=k.body,E;G=k.createElement("div");G.id=w.id+"_html5_container";j.extend(G.style,{position:"absolute",background:p.settings.shim_bgcolor||"transparent",width:"100px",height:"100px",overflow:"hidden",zIndex:99999,opacity:p.settings.shim_bgcolor?"":0});G.className="plupload html5";if(p.settings.container){s=k.getElementById(p.settings.container);if(j.getStyle(s,"position")==="static"){s.style.position="relative"}}s.appendChild(G);no_type_restriction:for(v=0;v<t.length;v++){u=t[v].extensions.split(/,/);for(D=0;D<u.length;D++){if(u[D]==="*"){C=[];break no_type_restriction}B=j.mimeTypes[u[D]];if(B&&j.inArray(B,C)===-1){C.push(B)}}}G.innerHTML='<input id="'+p.id+'_html5"  style="font-size:999px" type="file" accept="'+C.join(",")+'" '+(p.settings.multi_selection&&p.features.multi_selection?'multiple="multiple"':"")+" />";G.scrollTop=100;E=k.getElementById(p.id+"_html5");if(w.features.triggerDialog){j.extend(E.style,{position:"absolute",width:"100%",height:"100%"})}else{j.extend(E.style,{cssFloat:"right",styleFloat:"right"})}E.onchange=function(){o(this.files);this.value=""};F=k.getElementById(w.settings.browse_button);if(F){var z=w.settings.browse_button_hover,A=w.settings.browse_button_active,x=w.features.triggerDialog?F:G;if(z){j.addEvent(x,"mouseover",function(){j.addClass(F,z)},w.id);j.addEvent(x,"mouseout",function(){j.removeClass(F,z)},w.id)}if(A){j.addEvent(x,"mousedown",function(){j.addClass(F,A)},w.id);j.addEvent(k.body,"mouseup",function(){j.removeClass(F,A)},w.id)}if(w.features.triggerDialog){j.addEvent(F,"click",function(H){var y=k.getElementById(w.id+"_html5");if(y&&!y.disabled){y.click()}H.preventDefault()},w.id)}}});p.bind("PostInit",function(){var s=k.getElementById(p.settings.drop_element);if(s){if(g){j.addEvent(s,"dragenter",function(w){var v,t,u;v=k.getElementById(p.id+"_drop");if(!v){v=k.createElement("input");v.setAttribute("type","file");v.setAttribute("id",p.id+"_drop");v.setAttribute("multiple","multiple");j.addEvent(v,"change",function(){o(this.files);j.removeEvent(v,"change",p.id);v.parentNode.removeChild(v)},p.id);s.appendChild(v)}t=j.getPos(s,k.getElementById(p.settings.container));u=j.getSize(s);if(j.getStyle(s,"position")==="static"){j.extend(s.style,{position:"relative"})}j.extend(v.style,{position:"absolute",display:"block",top:0,left:0,width:u.w+"px",height:u.h+"px",opacity:0})},p.id);return}j.addEvent(s,"drop",function(u){var t=u.dataTransfer;if(t&&t.files){o(t.files)}u.preventDefault()},p.id)}});p.bind("Refresh",function(s){var t,u,v,x,w;t=k.getElementById(p.settings.browse_button);if(t){u=j.getPos(t,k.getElementById(s.settings.container));v=j.getSize(t);x=k.getElementById(p.id+"_html5_container");j.extend(x.style,{top:u.y+"px",left:u.x+"px",width:v.w+"px",height:v.h+"px"});if(p.features.triggerDialog){if(j.getStyle(t,"position")==="static"){j.extend(t.style,{position:"relative"})}w=parseInt(j.getStyle(t,"z-index"),10);if(isNaN(w)){w=0}j.extend(t.style,{zIndex:w});j.extend(x.style,{zIndex:w-1})}}});p.bind("DisableBrowse",function(s,u){var t=k.getElementById(s.id+"_html5");if(t){t.disabled=u}});p.bind("CancelUpload",function(){if(q.abort){q.abort()}});p.bind("UploadFile",function(s,u){var v=s.settings,y,t;function x(A,D,z){var B;if(File.prototype.slice){try{A.slice();return A.slice(D,z)}catch(C){return A.slice(D,z-D)}}else{if(B=File.prototype.webkitSlice||File.prototype.mozSlice){return B.call(A,D,z)}else{return null}}}function w(A){var D=0,C=0,z=("FileReader" in h)?new FileReader:null;function B(){var I,M,K,L,H,J,F,E=s.settings.url;function G(V){var T=0,N="----pluploadboundary"+j.guid(),O,P="--",U="\r\n",R="";q=new XMLHttpRequest;if(q.upload){q.upload.onprogress=function(W){u.loaded=Math.min(u.size,C+W.loaded-T);s.trigger("UploadProgress",u)}}q.onreadystatechange=function(){var W,Y;if(q.readyState==4&&s.state!==j.STOPPED){try{W=q.status}catch(X){W=0}if(W>=400){s.trigger("Error",{code:j.HTTP_ERROR,message:j.translate("HTTP Error."),file:u,status:W})}else{if(K){Y={chunk:D,chunks:K,response:q.responseText,status:W};s.trigger("ChunkUploaded",u,Y);C+=J;if(Y.cancelled){u.status=j.FAILED;return}u.loaded=Math.min(u.size,(D+1)*H)}else{u.loaded=u.size}s.trigger("UploadProgress",u);V=I=O=R=null;if(!K||++D>=K){u.status=j.DONE;s.trigger("FileUploaded",u,{response:q.responseText,status:W})}else{B()}}}};if(s.settings.multipart&&n.multipart){L.name=u.target_name||u.name;q.open("post",E,true);j.each(s.settings.headers,function(X,W){q.setRequestHeader(W,X)});if(typeof(V)!=="string"&&!!h.FormData){O=new FormData();j.each(j.extend(L,s.settings.multipart_params),function(X,W){O.append(W,X)});O.append(s.settings.file_data_name,V);q.send(O);return}if(typeof(V)==="string"){q.setRequestHeader("Content-Type","multipart/form-data; boundary="+N);j.each(j.extend(L,s.settings.multipart_params),function(X,W){R+=P+N+U+'Content-Disposition: form-data; name="'+W+'"'+U+U;R+=unescape(encodeURIComponent(X))+U});F=j.mimeTypes[u.name.replace(/^.+\.([^.]+)/,"$1").toLowerCase()]||"application/octet-stream";R+=P+N+U+'Content-Disposition: form-data; name="'+s.settings.file_data_name+'"; filename="'+unescape(encodeURIComponent(u.name))+'"'+U+"Content-Type: "+F+U+U+V+U+P+N+P+U;T=R.length-V.length;V=R;if(q.sendAsBinary){q.sendAsBinary(V)}else{if(n.canSendBinary){var S=new Uint8Array(V.length);for(var Q=0;Q<V.length;Q++){S[Q]=(V.charCodeAt(Q)&255)}q.send(S.buffer)}}return}}E=j.buildUrl(s.settings.url,j.extend(L,s.settings.multipart_params));q.open("post",E,true);q.setRequestHeader("Content-Type","application/octet-stream");j.each(s.settings.headers,function(X,W){q.setRequestHeader(W,X)});q.send(V)}if(u.status==j.DONE||u.status==j.FAILED||s.state==j.STOPPED){return}L={name:u.target_name||u.name};if(v.chunk_size&&u.size>v.chunk_size&&(n.chunks||typeof(A)=="string")){H=v.chunk_size;K=Math.ceil(u.size/H);J=Math.min(H,u.size-(D*H));if(typeof(A)=="string"){I=A.substring(D*H,D*H+J)}else{I=x(A,D*H,D*H+J)}L.chunk=D;L.chunks=K}else{J=u.size;I=A}if(s.settings.multipart&&n.multipart&&typeof(I)!=="string"&&z&&n.cantSendBlobInFormData&&n.chunks&&s.settings.chunk_size){z.onload=function(){G(z.result)};z.readAsBinaryString(I)}else{G(I)}}B()}y=c[u.id];if(n.jpgresize&&s.settings.resize&&/\.(png|jpg|jpeg)$/i.test(u.name)){d.call(s,u,s.settings.resize,/\.png$/i.test(u.name)?"image/png":"image/jpeg",function(z){if(z.success){u.size=z.data.length;w(z.data)}else{if(n.chunks){w(y)}else{l(y,w)}}})}else{if(!n.chunks&&n.jpgresize){l(y,w)}else{w(y)}}});p.bind("Destroy",function(s){var u,v,t=k.body,w={inputContainer:s.id+"_html5_container",inputFile:s.id+"_html5",browseButton:s.settings.browse_button,dropElm:s.settings.drop_element};for(u in w){v=k.getElementById(w[u]);if(v){j.removeAllEvents(v,s.id)}}j.removeAllEvents(k.body,s.id);if(s.settings.container){t=k.getElementById(s.settings.container)}t.removeChild(k.getElementById(w.inputContainer))});r({success:true})}});function b(){var q=false,o;function r(t,v){var s=q?0:-8*(v-1),w=0,u;for(u=0;u<v;u++){w|=(o.charCodeAt(t+u)<<Math.abs(s+u*8))}return w}function n(u,s,t){var t=arguments.length===3?t:o.length-s-1;o=o.substr(0,s)+u+o.substr(t+s)}function p(t,u,w){var x="",s=q?0:-8*(w-1),v;for(v=0;v<w;v++){x+=String.fromCharCode((u>>Math.abs(s+v*8))&255)}n(x,t,w)}return{II:function(s){if(s===e){return q}else{q=s}},init:function(s){q=false;o=s},SEGMENT:function(s,u,t){switch(arguments.length){case 1:return o.substr(s,o.length-s-1);case 2:return o.substr(s,u);case 3:n(t,s,u);break;default:return o}},BYTE:function(s){return r(s,1)},SHORT:function(s){return r(s,2)},LONG:function(s,t){if(t===e){return r(s,4)}else{p(s,t,4)}},SLONG:function(s){var t=r(s,4);return(t>2147483647?t-4294967296:t)},STRING:function(s,t){var u="";for(t+=s;s<t;s++){u+=String.fromCharCode(r(s,1))}return u}}}function f(s){var u={65505:{app:"EXIF",name:"APP1",signature:"Exif\0"},65506:{app:"ICC",name:"APP2",signature:"ICC_PROFILE\0"},65517:{app:"IPTC",name:"APP13",signature:"Photoshop 3.0\0"}},t=[],r,n,p=e,q=0,o;r=new b();r.init(s);if(r.SHORT(0)!==65496){return}n=2;o=Math.min(1048576,s.length);while(n<=o){p=r.SHORT(n);if(p>=65488&&p<=65495){n+=2;continue}if(p===65498||p===65497){break}q=r.SHORT(n+2)+2;if(u[p]&&r.STRING(n+4,u[p].signature.length)===u[p].signature){t.push({hex:p,app:u[p].app.toUpperCase(),name:u[p].name.toUpperCase(),start:n,length:q,segment:r.SEGMENT(n,q)})}n+=q}r.init(null);return{headers:t,restore:function(y){r.init(y);var w=new f(y);if(!w.headers){return false}for(var x=w.headers.length;x>0;x--){var z=w.headers[x-1];r.SEGMENT(z.start,z.length,"")}w.purge();n=r.SHORT(2)==65504?4+r.SHORT(4):2;for(var x=0,v=t.length;x<v;x++){r.SEGMENT(n,0,t[x].segment);n+=t[x].length}return r.SEGMENT()},get:function(x){var y=[];for(var w=0,v=t.length;w<v;w++){if(t[w].app===x.toUpperCase()){y.push(t[w].segment)}}return y},set:function(y,x){var z=[];if(typeof(x)==="string"){z.push(x)}else{z=x}for(var w=ii=0,v=t.length;w<v;w++){if(t[w].app===y.toUpperCase()){t[w].segment=z[ii];t[w].length=z[ii].length;ii++}if(ii>=z.length){break}}},purge:function(){t=[];r.init(null)}}}function a(){var q,n,o={},t;q=new b();n={tiff:{274:"Orientation",34665:"ExifIFDPointer",34853:"GPSInfoIFDPointer"},exif:{36864:"ExifVersion",40961:"ColorSpace",40962:"PixelXDimension",40963:"PixelYDimension",36867:"DateTimeOriginal",33434:"ExposureTime",33437:"FNumber",34855:"ISOSpeedRatings",37377:"ShutterSpeedValue",37378:"ApertureValue",37383:"MeteringMode",37384:"LightSource",37385:"Flash",41986:"ExposureMode",41987:"WhiteBalance",41990:"SceneCaptureType",41988:"DigitalZoomRatio",41992:"Contrast",41993:"Saturation",41994:"Sharpness"},gps:{0:"GPSVersionID",1:"GPSLatitudeRef",2:"GPSLatitude",3:"GPSLongitudeRef",4:"GPSLongitude"}};t={ColorSpace:{1:"sRGB",0:"Uncalibrated"},MeteringMode:{0:"Unknown",1:"Average",2:"CenterWeightedAverage",3:"Spot",4:"MultiSpot",5:"Pattern",6:"Partial",255:"Other"},LightSource:{1:"Daylight",2:"Fliorescent",3:"Tungsten",4:"Flash",9:"Fine weather",10:"Cloudy weather",11:"Shade",12:"Daylight fluorescent (D 5700 - 7100K)",13:"Day white fluorescent (N 4600 -5400K)",14:"Cool white fluorescent (W 3900 - 4500K)",15:"White fluorescent (WW 3200 - 3700K)",17:"Standard light A",18:"Standard light B",19:"Standard light C",20:"D55",21:"D65",22:"D75",23:"D50",24:"ISO studio tungsten",255:"Other"},Flash:{0:"Flash did not fire.",1:"Flash fired.",5:"Strobe return light not detected.",7:"Strobe return light detected.",9:"Flash fired, compulsory flash mode",13:"Flash fired, compulsory flash mode, return light not detected",15:"Flash fired, compulsory flash mode, return light detected",16:"Flash did not fire, compulsory flash mode",24:"Flash did not fire, auto mode",25:"Flash fired, auto mode",29:"Flash fired, auto mode, return light not detected",31:"Flash fired, auto mode, return light detected",32:"No flash function",65:"Flash fired, red-eye reduction mode",69:"Flash fired, red-eye reduction mode, return light not detected",71:"Flash fired, red-eye reduction mode, return light detected",73:"Flash fired, compulsory flash mode, red-eye reduction mode",77:"Flash fired, compulsory flash mode, red-eye reduction mode, return light not detected",79:"Flash fired, compulsory flash mode, red-eye reduction mode, return light detected",89:"Flash fired, auto mode, red-eye reduction mode",93:"Flash fired, auto mode, return light not detected, red-eye reduction mode",95:"Flash fired, auto mode, return light detected, red-eye reduction mode"},ExposureMode:{0:"Auto exposure",1:"Manual exposure",2:"Auto bracket"},WhiteBalance:{0:"Auto white balance",1:"Manual white balance"},SceneCaptureType:{0:"Standard",1:"Landscape",2:"Portrait",3:"Night scene"},Contrast:{0:"Normal",1:"Soft",2:"Hard"},Saturation:{0:"Normal",1:"Low saturation",2:"High saturation"},Sharpness:{0:"Normal",1:"Soft",2:"Hard"},GPSLatitudeRef:{N:"North latitude",S:"South latitude"},GPSLongitudeRef:{E:"East longitude",W:"West longitude"}};function p(u,C){var w=q.SHORT(u),z,F,G,B,A,v,x,D,E=[],y={};for(z=0;z<w;z++){x=v=u+12*z+2;G=C[q.SHORT(x)];if(G===e){continue}B=q.SHORT(x+=2);A=q.LONG(x+=2);x+=4;E=[];switch(B){case 1:case 7:if(A>4){x=q.LONG(x)+o.tiffHeader}for(F=0;F<A;F++){E[F]=q.BYTE(x+F)}break;case 2:if(A>4){x=q.LONG(x)+o.tiffHeader}y[G]=q.STRING(x,A-1);continue;case 3:if(A>2){x=q.LONG(x)+o.tiffHeader}for(F=0;F<A;F++){E[F]=q.SHORT(x+F*2)}break;case 4:if(A>1){x=q.LONG(x)+o.tiffHeader}for(F=0;F<A;F++){E[F]=q.LONG(x+F*4)}break;case 5:x=q.LONG(x)+o.tiffHeader;for(F=0;F<A;F++){E[F]=q.LONG(x+F*4)/q.LONG(x+F*4+4)}break;case 9:x=q.LONG(x)+o.tiffHeader;for(F=0;F<A;F++){E[F]=q.SLONG(x+F*4)}break;case 10:x=q.LONG(x)+o.tiffHeader;for(F=0;F<A;F++){E[F]=q.SLONG(x+F*4)/q.SLONG(x+F*4+4)}break;default:continue}D=(A==1?E[0]:E);if(t.hasOwnProperty(G)&&typeof D!="object"){y[G]=t[G][D]}else{y[G]=D}}return y}function s(){var v=e,u=o.tiffHeader;q.II(q.SHORT(u)==18761);if(q.SHORT(u+=2)!==42){return false}o.IFD0=o.tiffHeader+q.LONG(u+=2);v=p(o.IFD0,n.tiff);o.exifIFD=("ExifIFDPointer" in v?o.tiffHeader+v.ExifIFDPointer:e);o.gpsIFD=("GPSInfoIFDPointer" in v?o.tiffHeader+v.GPSInfoIFDPointer:e);return true}function r(w,u,z){var B,y,x,A=0;if(typeof(u)==="string"){var v=n[w.toLowerCase()];for(hex in v){if(v[hex]===u){u=hex;break}}}B=o[w.toLowerCase()+"IFD"];y=q.SHORT(B);for(i=0;i<y;i++){x=B+12*i+2;if(q.SHORT(x)==u){A=x+8;break}}if(!A){return false}q.LONG(A,z);return true}return{init:function(u){o={tiffHeader:10};if(u===e||!u.length){return false}q.init(u);if(q.SHORT(0)===65505&&q.STRING(4,5).toUpperCase()==="EXIF\0"){return s()}return false},EXIF:function(){var v;v=p(o.exifIFD,n.exif);if(v.ExifVersion&&j.typeOf(v.ExifVersion)==="array"){for(var w=0,u="";w<v.ExifVersion.length;w++){u+=String.fromCharCode(v.ExifVersion[w])}v.ExifVersion=u}return v},GPS:function(){var u;u=p(o.gpsIFD,n.gps);if(u.GPSVersionID){u.GPSVersionID=u.GPSVersionID.join(".")}return u},setExif:function(u,v){if(u!=="PixelXDimension"&&u!=="PixelYDimension"){return false}return r("exif",u,v)},getBinary:function(){return q.SEGMENT()}}}})(window,document,plupload);(function(d,a,b,c){function e(f){return a.getElementById(f)}b.runtimes.Html4=b.addRuntime("html4",{getFeatures:function(){return{multipart:true,triggerDialog:(b.ua.gecko&&d.FormData||b.ua.webkit)}},init:function(f,g){f.bind("Init",function(p){var j=a.body,n,h="javascript",k,x,q,z=[],r=/MSIE/.test(navigator.userAgent),t=[],m=p.settings.filters,o,l,s,w;no_type_restriction:for(o=0;o<m.length;o++){l=m[o].extensions.split(/,/);for(w=0;w<l.length;w++){if(l[w]==="*"){t=[];break no_type_restriction}s=b.mimeTypes[l[w]];if(s&&b.inArray(s,t)===-1){t.push(s)}}}t=t.join(",");function v(){var C,A,y,B;q=b.guid();z.push(q);C=a.createElement("form");C.setAttribute("id","form_"+q);C.setAttribute("method","post");C.setAttribute("enctype","multipart/form-data");C.setAttribute("encoding","multipart/form-data");C.setAttribute("target",p.id+"_iframe");C.style.position="absolute";A=a.createElement("input");A.setAttribute("id","input_"+q);A.setAttribute("type","file");A.setAttribute("accept",t);A.setAttribute("size",1);B=e(p.settings.browse_button);if(p.features.triggerDialog&&B){b.addEvent(e(p.settings.browse_button),"click",function(D){if(!A.disabled){A.click()}D.preventDefault()},p.id)}b.extend(A.style,{width:"100%",height:"100%",opacity:0,fontSize:"99px"});b.extend(C.style,{overflow:"hidden"});y=p.settings.shim_bgcolor;if(y){C.style.background=y}if(r){b.extend(A.style,{filter:"alpha(opacity=0)"})}b.addEvent(A,"change",function(G){var E=G.target,D,F=[],H;if(E.value){e("form_"+q).style.top=-1048575+"px";D=E.value.replace(/\\/g,"/");D=D.substring(D.length,D.lastIndexOf("/")+1);F.push(new b.File(q,D));if(!p.features.triggerDialog){b.removeAllEvents(C,p.id)}else{b.removeEvent(B,"click",p.id)}b.removeEvent(A,"change",p.id);v();if(F.length){f.trigger("FilesAdded",F)}}},p.id);C.appendChild(A);j.appendChild(C);p.refresh()}function u(){var y=a.createElement("div");y.innerHTML='<iframe id="'+p.id+'_iframe" name="'+p.id+'_iframe" src="'+h+':&quot;&quot;" style="display:none"></iframe>';n=y.firstChild;j.appendChild(n);b.addEvent(n,"load",function(D){var E=D.target,C,A;if(!k){return}try{C=E.contentWindow.document||E.contentDocument||d.frames[E.id].document}catch(B){p.trigger("Error",{code:b.SECURITY_ERROR,message:b.translate("Security error."),file:k});return}A=C.body.innerHTML;if(A){k.status=b.DONE;k.loaded=1025;k.percent=100;p.trigger("UploadProgress",k);p.trigger("FileUploaded",k,{response:A})}},p.id)}if(p.settings.container){j=e(p.settings.container);if(b.getStyle(j,"position")==="static"){j.style.position="relative"}}p.bind("UploadFile",function(y,B){var C,A;if(B.status==b.DONE||B.status==b.FAILED||y.state==b.STOPPED){return}C=e("form_"+B.id);A=e("input_"+B.id);A.setAttribute("name",y.settings.file_data_name);C.setAttribute("action",y.settings.url);b.each(b.extend({name:B.target_name||B.name},y.settings.multipart_params),function(F,D){var E=a.createElement("input");b.extend(E,{type:"hidden",name:D,value:F});C.insertBefore(E,C.firstChild)});k=B;e("form_"+q).style.top=-1048575+"px";C.submit();C.parentNode.removeChild(C)});p.bind("FileUploaded",function(y){y.refresh()});p.bind("StateChanged",function(y){if(y.state==b.STARTED){u()}if(y.state==b.STOPPED){d.setTimeout(function(){b.removeEvent(n,"load",y.id);if(n.parentNode){n.parentNode.removeChild(n)}},0)}});p.bind("Refresh",function(A){var G,B,C,D,y,H,I,F,E;G=e(A.settings.browse_button);if(G){y=b.getPos(G,e(A.settings.container));H=b.getSize(G);I=e("form_"+q);F=e("input_"+q);b.extend(I.style,{top:y.y+"px",left:y.x+"px",width:H.w+"px",height:H.h+"px"});if(A.features.triggerDialog){if(b.getStyle(G,"position")==="static"){b.extend(G.style,{position:"relative"})}E=parseInt(G.style.zIndex,10);if(isNaN(E)){E=0}b.extend(G.style,{zIndex:E});b.extend(I.style,{zIndex:E-1})}C=A.settings.browse_button_hover;D=A.settings.browse_button_active;B=A.features.triggerDialog?G:I;if(C){b.addEvent(B,"mouseover",function(){b.addClass(G,C)},A.id);b.addEvent(B,"mouseout",function(){b.removeClass(G,C)},A.id)}if(D){b.addEvent(B,"mousedown",function(){b.addClass(G,D)},A.id);b.addEvent(a.body,"mouseup",function(){b.removeClass(G,D)},A.id)}}});f.bind("FilesRemoved",function(y,B){var A,C;for(A=0;A<B.length;A++){C=e("form_"+B[A].id);if(C){C.parentNode.removeChild(C)}}});f.bind("DisableBrowse",function(y,B){var A=a.getElementById("input_"+q);if(A){A.disabled=B}});f.bind("Destroy",function(y){var A,B,C,D={inputContainer:"form_"+q,inputFile:"input_"+q,browseButton:y.settings.browse_button};for(A in D){B=e(D[A]);if(B){b.removeAllEvents(B,y.id)}}b.removeAllEvents(a.body,y.id);b.each(z,function(F,E){C=e("form_"+F);if(C){j.removeChild(C)}})});v()});g({success:true})}})})(window,document,plupload);

/*********************************************
EasyXDM
**********************************************/

(function(N,d,p,K,k,H){var b=this;var n=Math.floor(Math.random()*10000);var q=Function.prototype;var Q=/^((http.?:)\/\/([^:\/\s]+)(:\d+)*)/;var R=/[\-\w]+\/\.\.\//;var F=/([^:])\/\//g;var I="";var o={};var M=N.easyXDM;var U="easyXDM_";var E;var y=false;var i;var h;function C(X,Z){var Y=typeof X[Z];return Y=="function"||(!!(Y=="object"&&X[Z]))||Y=="unknown"}function u(X,Y){return !!(typeof(X[Y])=="object"&&X[Y])}function r(X){return Object.prototype.toString.call(X)==="[object Array]"}function c(){var Z="Shockwave Flash",ad="application/x-shockwave-flash";if(!t(navigator.plugins)&&typeof navigator.plugins[Z]=="object"){var ab=navigator.plugins[Z].description;if(ab&&!t(navigator.mimeTypes)&&navigator.mimeTypes[ad]&&navigator.mimeTypes[ad].enabledPlugin){i=ab.match(/\d+/g)}}if(!i){var Y;try{Y=new ActiveXObject("ShockwaveFlash.ShockwaveFlash");i=Array.prototype.slice.call(Y.GetVariable("$version").match(/(\d+),(\d+),(\d+),(\d+)/),1);Y=null}catch(ac){}}if(!i){return false}var X=parseInt(i[0],10),aa=parseInt(i[1],10);h=X>9&&aa>0;return true}var v,x;if(C(N,"addEventListener")){v=function(Z,X,Y){Z.addEventListener(X,Y,false)};x=function(Z,X,Y){Z.removeEventListener(X,Y,false)}}else{if(C(N,"attachEvent")){v=function(X,Z,Y){X.attachEvent("on"+Z,Y)};x=function(X,Z,Y){X.detachEvent("on"+Z,Y)}}else{throw new Error("Browser not supported")}}var W=false,J=[],L;if("readyState" in d){L=d.readyState;W=L=="complete"||(~navigator.userAgent.indexOf("AppleWebKit/")&&(L=="loaded"||L=="interactive"))}else{W=!!d.body}function s(){if(W){return}W=true;for(var X=0;X<J.length;X++){J[X]()}J.length=0}if(!W){if(C(N,"addEventListener")){v(d,"DOMContentLoaded",s)}else{v(d,"readystatechange",function(){if(d.readyState=="complete"){s()}});if(d.documentElement.doScroll&&N===top){var g=function(){if(W){return}try{d.documentElement.doScroll("left")}catch(X){K(g,1);return}s()};g()}}v(N,"load",s)}function G(Y,X){if(W){Y.call(X);return}J.push(function(){Y.call(X)})}function m(){var Z=parent;if(I!==""){for(var X=0,Y=I.split(".");X<Y.length;X++){Z=Z[Y[X]]}}return Z.easyXDM}function e(X){N.easyXDM=M;I=X;if(I){U="easyXDM_"+I.replace(".","_")+"_"}return o}function z(X){return X.match(Q)[3]}function f(X){return X.match(Q)[4]||""}function j(Z){var X=Z.toLowerCase().match(Q);var aa=X[2],ab=X[3],Y=X[4]||"";if((aa=="http:"&&Y==":80")||(aa=="https:"&&Y==":443")){Y=""}return aa+"//"+ab+Y}function B(X){X=X.replace(F,"$1/");if(!X.match(/^(http||https):\/\//)){var Y=(X.substring(0,1)==="/")?"":p.pathname;if(Y.substring(Y.length-1)!=="/"){Y=Y.substring(0,Y.lastIndexOf("/")+1)}X=p.protocol+"//"+p.host+Y+X}while(R.test(X)){X=X.replace(R,"")}return X}function P(X,aa){var ac="",Z=X.indexOf("#");if(Z!==-1){ac=X.substring(Z);X=X.substring(0,Z)}var ab=[];for(var Y in aa){if(aa.hasOwnProperty(Y)){ab.push(Y+"="+H(aa[Y]))}}return X+(y?"#":(X.indexOf("?")==-1?"?":"&"))+ab.join("&")+ac}var S=(function(X){X=X.substring(1).split("&");var Z={},aa,Y=X.length;while(Y--){aa=X[Y].split("=");Z[aa[0]]=k(aa[1])}return Z}(/xdm_e=/.test(p.search)?p.search:p.hash));function t(X){return typeof X==="undefined"}var O=function(){var Y={};var Z={a:[1,2,3]},X='{"a":[1,2,3]}';if(typeof JSON!="undefined"&&typeof JSON.stringify==="function"&&JSON.stringify(Z).replace((/\s/g),"")===X){return JSON}if(Object.toJSON){if(Object.toJSON(Z).replace((/\s/g),"")===X){Y.stringify=Object.toJSON}}if(typeof String.prototype.evalJSON==="function"){Z=X.evalJSON();if(Z.a&&Z.a.length===3&&Z.a[2]===3){Y.parse=function(aa){return aa.evalJSON()}}}if(Y.stringify&&Y.parse){O=function(){return Y};return Y}return null};function T(X,Y,Z){var ab;for(var aa in Y){if(Y.hasOwnProperty(aa)){if(aa in X){ab=Y[aa];if(typeof ab==="object"){T(X[aa],ab,Z)}else{if(!Z){X[aa]=Y[aa]}}}else{X[aa]=Y[aa]}}}return X}function a(){var Y=d.body.appendChild(d.createElement("form")),X=Y.appendChild(d.createElement("input"));X.name=U+"TEST"+n;E=X!==Y.elements[X.name];d.body.removeChild(Y)}function A(Y){if(t(E)){a()}var ac;if(E){ac=d.createElement('<iframe name="'+Y.props.name+'"/>')}else{ac=d.createElement("IFRAME");ac.name=Y.props.name}ac.id=ac.name=Y.props.name;delete Y.props.name;if(typeof Y.container=="string"){Y.container=d.getElementById(Y.container)}if(!Y.container){T(ac.style,{position:"absolute",top:"-2000px",left:"0px"});Y.container=d.body}var ab=Y.props.src;Y.props.src="javascript:false";T(ac,Y.props);ac.border=ac.frameBorder=0;ac.allowTransparency=true;Y.container.appendChild(ac);if(Y.onLoad){v(ac,"load",Y.onLoad)}if(Y.usePost){var aa=Y.container.appendChild(d.createElement("form")),X;aa.target=ac.name;aa.action=ab;aa.method="POST";if(typeof(Y.usePost)==="object"){for(var Z in Y.usePost){if(Y.usePost.hasOwnProperty(Z)){if(E){X=d.createElement('<input name="'+Z+'"/>')}else{X=d.createElement("INPUT");X.name=Z}X.value=Y.usePost[Z];aa.appendChild(X)}}}aa.submit();aa.parentNode.removeChild(aa)}else{ac.src=ab}Y.props.src=ab;return ac}function V(aa,Z){if(typeof aa=="string"){aa=[aa]}var Y,X=aa.length;while(X--){Y=aa[X];Y=new RegExp(Y.substr(0,1)=="^"?Y:("^"+Y.replace(/(\*)/g,".$1").replace(/\?/g,".")+"$"));if(Y.test(Z)){return true}}return false}function l(Z){var ae=Z.protocol,Y;Z.isHost=Z.isHost||t(S.xdm_p);y=Z.hash||false;if(!Z.props){Z.props={}}if(!Z.isHost){Z.channel=S.xdm_c.replace(/["'<>\\]/g,"");Z.secret=S.xdm_s;Z.remote=S.xdm_e.replace(/["'<>\\]/g,"");ae=S.xdm_p;if(Z.acl&&!V(Z.acl,Z.remote)){throw new Error("Access denied for "+Z.remote)}}else{Z.remote=B(Z.remote);Z.channel=Z.channel||"default"+n++;Z.secret=Math.random().toString(16).substring(2);if(t(ae)){if(j(p.href)==j(Z.remote)){ae="4"}else{if(C(N,"postMessage")||C(d,"postMessage")){ae="1"}else{if(Z.swf&&C(N,"ActiveXObject")&&c()){ae="6"}else{if(navigator.product==="Gecko"&&"frameElement" in N&&navigator.userAgent.indexOf("WebKit")==-1){ae="5"}else{if(Z.remoteHelper){ae="2"}else{ae="0"}}}}}}}Z.protocol=ae;switch(ae){case"0":T(Z,{interval:100,delay:2000,useResize:true,useParent:false,usePolling:false},true);if(Z.isHost){if(!Z.local){var ac=p.protocol+"//"+p.host,X=d.body.getElementsByTagName("img"),ad;var aa=X.length;while(aa--){ad=X[aa];if(ad.src.substring(0,ac.length)===ac){Z.local=ad.src;break}}if(!Z.local){Z.local=N}}var ab={xdm_c:Z.channel,xdm_p:0};if(Z.local===N){Z.usePolling=true;Z.useParent=true;Z.local=p.protocol+"//"+p.host+p.pathname+p.search;ab.xdm_e=Z.local;ab.xdm_pa=1}else{ab.xdm_e=B(Z.local)}if(Z.container){Z.useResize=false;ab.xdm_po=1}Z.remote=P(Z.remote,ab)}else{T(Z,{channel:S.xdm_c,remote:S.xdm_e,useParent:!t(S.xdm_pa),usePolling:!t(S.xdm_po),useResize:Z.useParent?false:Z.useResize})}Y=[new o.stack.HashTransport(Z),new o.stack.ReliableBehavior({}),new o.stack.QueueBehavior({encode:true,maxLength:4000-Z.remote.length}),new o.stack.VerifyBehavior({initiate:Z.isHost})];break;case"1":Y=[new o.stack.PostMessageTransport(Z)];break;case"2":Z.remoteHelper=B(Z.remoteHelper);Y=[new o.stack.NameTransport(Z),new o.stack.QueueBehavior(),new o.stack.VerifyBehavior({initiate:Z.isHost})];break;case"3":Y=[new o.stack.NixTransport(Z)];break;case"4":Y=[new o.stack.SameOriginTransport(Z)];break;case"5":Y=[new o.stack.FrameElementTransport(Z)];break;case"6":if(!i){c()}Y=[new o.stack.FlashTransport(Z)];break}Y.push(new o.stack.QueueBehavior({lazy:Z.lazy,remove:true}));return Y}function D(aa){var ab,Z={incoming:function(ad,ac){this.up.incoming(ad,ac)},outgoing:function(ac,ad){this.down.outgoing(ac,ad)},callback:function(ac){this.up.callback(ac)},init:function(){this.down.init()},destroy:function(){this.down.destroy()}};for(var Y=0,X=aa.length;Y<X;Y++){ab=aa[Y];T(ab,Z,true);if(Y!==0){ab.down=aa[Y-1]}if(Y!==X-1){ab.up=aa[Y+1]}}return ab}function w(X){X.up.down=X.down;X.down.up=X.up;X.up=X.down=null}T(o,{version:"2.4.15.0",query:S,stack:{},apply:T,getJSONObject:O,whenReady:G,noConflict:e});o.DomHelper={on:v,un:x,requiresJSON:function(X){if(!u(N,"JSON")){d.write('<script type="text/javascript" src="'+X+'"><\/script>')}}};(function(){var X={};o.Fn={set:function(Y,Z){X[Y]=Z},get:function(Z,Y){var aa=X[Z];if(Y){delete X[Z]}return aa}}}());o.Socket=function(Y){var X=D(l(Y).concat([{incoming:function(ab,aa){Y.onMessage(ab,aa)},callback:function(aa){if(Y.onReady){Y.onReady(aa)}}}])),Z=j(Y.remote);this.origin=j(Y.remote);this.destroy=function(){X.destroy()};this.postMessage=function(aa){X.outgoing(aa,Z)};X.init()};o.Rpc=function(Z,Y){if(Y.local){for(var ab in Y.local){if(Y.local.hasOwnProperty(ab)){var aa=Y.local[ab];if(typeof aa==="function"){Y.local[ab]={method:aa}}}}}var X=D(l(Z).concat([new o.stack.RpcBehavior(this,Y),{callback:function(ac){if(Z.onReady){Z.onReady(ac)}}}]));this.origin=j(Z.remote);this.destroy=function(){X.destroy()};X.init()};o.stack.SameOriginTransport=function(Y){var Z,ab,aa,X;return(Z={outgoing:function(ad,ae,ac){aa(ad);if(ac){ac()}},destroy:function(){if(ab){ab.parentNode.removeChild(ab);ab=null}},onDOMReady:function(){X=j(Y.remote);if(Y.isHost){T(Y.props,{src:P(Y.remote,{xdm_e:p.protocol+"//"+p.host+p.pathname,xdm_c:Y.channel,xdm_p:4}),name:U+Y.channel+"_provider"});ab=A(Y);o.Fn.set(Y.channel,function(ac){aa=ac;K(function(){Z.up.callback(true)},0);return function(ad){Z.up.incoming(ad,X)}})}else{aa=m().Fn.get(Y.channel,true)(function(ac){Z.up.incoming(ac,X)});K(function(){Z.up.callback(true)},0)}},init:function(){G(Z.onDOMReady,Z)}})};o.stack.FlashTransport=function(aa){var ac,X,ab,ad,Y,ae;function af(ah,ag){K(function(){ac.up.incoming(ah,ad)},0)}function Z(ah){var ag=aa.swf+"?host="+aa.isHost;var aj="easyXDM_swf_"+Math.floor(Math.random()*10000);o.Fn.set("flash_loaded"+ah.replace(/[\-.]/g,"_"),function(){o.stack.FlashTransport[ah].swf=Y=ae.firstChild;var ak=o.stack.FlashTransport[ah].queue;for(var al=0;al<ak.length;al++){ak[al]()}ak.length=0});if(aa.swfContainer){ae=(typeof aa.swfContainer=="string")?d.getElementById(aa.swfContainer):aa.swfContainer}else{ae=d.createElement("div");T(ae.style,h&&aa.swfNoThrottle?{height:"20px",width:"20px",position:"fixed",right:0,top:0}:{height:"1px",width:"1px",position:"absolute",overflow:"hidden",right:0,top:0});d.body.appendChild(ae)}var ai="callback=flash_loaded"+ah.replace(/[\-.]/g,"_")+"&proto="+b.location.protocol+"&domain="+z(b.location.href)+"&port="+f(b.location.href)+"&ns="+I;ae.innerHTML="<object height='20' width='20' type='application/x-shockwave-flash' id='"+aj+"' data='"+ag+"'><param name='allowScriptAccess' value='always'></param><param name='wmode' value='transparent'><param name='movie' value='"+ag+"'></param><param name='flashvars' value='"+ai+"'></param><embed type='application/x-shockwave-flash' FlashVars='"+ai+"' allowScriptAccess='always' wmode='transparent' src='"+ag+"' height='1' width='1'></embed></object>"}return(ac={outgoing:function(ah,ai,ag){Y.postMessage(aa.channel,ah.toString());if(ag){ag()}},destroy:function(){try{Y.destroyChannel(aa.channel)}catch(ag){}Y=null;if(X){X.parentNode.removeChild(X);X=null}},onDOMReady:function(){ad=aa.remote;o.Fn.set("flash_"+aa.channel+"_init",function(){K(function(){ac.up.callback(true)})});o.Fn.set("flash_"+aa.channel+"_onMessage",af);aa.swf=B(aa.swf);var ah=z(aa.swf);var ag=function(){o.stack.FlashTransport[ah].init=true;Y=o.stack.FlashTransport[ah].swf;Y.createChannel(aa.channel,aa.secret,j(aa.remote),aa.isHost);if(aa.isHost){if(h&&aa.swfNoThrottle){T(aa.props,{position:"fixed",right:0,top:0,height:"20px",width:"20px"})}T(aa.props,{src:P(aa.remote,{xdm_e:j(p.href),xdm_c:aa.channel,xdm_p:6,xdm_s:aa.secret}),name:U+aa.channel+"_provider"});X=A(aa)}};if(o.stack.FlashTransport[ah]&&o.stack.FlashTransport[ah].init){ag()}else{if(!o.stack.FlashTransport[ah]){o.stack.FlashTransport[ah]={queue:[ag]};Z(ah)}else{o.stack.FlashTransport[ah].queue.push(ag)}}},init:function(){G(ac.onDOMReady,ac)}})};o.stack.PostMessageTransport=function(aa){var ac,ad,Y,Z;function X(ae){if(ae.origin){return j(ae.origin)}if(ae.uri){return j(ae.uri)}if(ae.domain){return p.protocol+"//"+ae.domain}throw"Unable to retrieve the origin of the event"}function ab(af){var ae=X(af);if(ae==Z&&af.data.substring(0,aa.channel.length+1)==aa.channel+" "){ac.up.incoming(af.data.substring(aa.channel.length+1),ae)}}return(ac={outgoing:function(af,ag,ae){Y.postMessage(aa.channel+" "+af,ag||Z);if(ae){ae()}},destroy:function(){x(N,"message",ab);if(ad){Y=null;ad.parentNode.removeChild(ad);ad=null}},onDOMReady:function(){Z=j(aa.remote);if(aa.isHost){var ae=function(af){if(af.data==aa.channel+"-ready"){Y=("postMessage" in ad.contentWindow)?ad.contentWindow:ad.contentWindow.document;x(N,"message",ae);v(N,"message",ab);K(function(){ac.up.callback(true)},0)}};v(N,"message",ae);T(aa.props,{src:P(aa.remote,{xdm_e:j(p.href),xdm_c:aa.channel,xdm_p:1}),name:U+aa.channel+"_provider"});ad=A(aa)}else{v(N,"message",ab);Y=("postMessage" in N.parent)?N.parent:N.parent.document;Y.postMessage(aa.channel+"-ready",Z);K(function(){ac.up.callback(true)},0)}},init:function(){G(ac.onDOMReady,ac)}})};o.stack.FrameElementTransport=function(Y){var Z,ab,aa,X;return(Z={outgoing:function(ad,ae,ac){aa.call(this,ad);if(ac){ac()}},destroy:function(){if(ab){ab.parentNode.removeChild(ab);ab=null}},onDOMReady:function(){X=j(Y.remote);if(Y.isHost){T(Y.props,{src:P(Y.remote,{xdm_e:j(p.href),xdm_c:Y.channel,xdm_p:5}),name:U+Y.channel+"_provider"});ab=A(Y);ab.fn=function(ac){delete ab.fn;aa=ac;K(function(){Z.up.callback(true)},0);return function(ad){Z.up.incoming(ad,X)}}}else{if(d.referrer&&j(d.referrer)!=S.xdm_e){N.top.location=S.xdm_e}aa=N.frameElement.fn(function(ac){Z.up.incoming(ac,X)});Z.up.callback(true)}},init:function(){G(Z.onDOMReady,Z)}})};o.stack.NameTransport=function(ab){var ac;var ae,ai,aa,ag,ah,Y,X;function af(al){var ak=ab.remoteHelper+(ae?"#_3":"#_2")+ab.channel;ai.contentWindow.sendMessage(al,ak)}function ad(){if(ae){if(++ag===2||!ae){ac.up.callback(true)}}else{af("ready");ac.up.callback(true)}}function aj(ak){ac.up.incoming(ak,Y)}function Z(){if(ah){K(function(){ah(true)},0)}}return(ac={outgoing:function(al,am,ak){ah=ak;af(al)},destroy:function(){ai.parentNode.removeChild(ai);ai=null;if(ae){aa.parentNode.removeChild(aa);aa=null}},onDOMReady:function(){ae=ab.isHost;ag=0;Y=j(ab.remote);ab.local=B(ab.local);if(ae){o.Fn.set(ab.channel,function(al){if(ae&&al==="ready"){o.Fn.set(ab.channel,aj);ad()}});X=P(ab.remote,{xdm_e:ab.local,xdm_c:ab.channel,xdm_p:2});T(ab.props,{src:X+"#"+ab.channel,name:U+ab.channel+"_provider"});aa=A(ab)}else{ab.remoteHelper=ab.remote;o.Fn.set(ab.channel,aj)}var ak=function(){var al=ai||this;x(al,"load",ak);o.Fn.set(ab.channel+"_load",Z);(function am(){if(typeof al.contentWindow.sendMessage=="function"){ad()}else{K(am,50)}}())};ai=A({props:{src:ab.local+"#_4"+ab.channel},onLoad:ak})},init:function(){G(ac.onDOMReady,ac)}})};o.stack.HashTransport=function(Z){var ac;var ah=this,af,aa,X,ad,am,ab,al;var ag,Y;function ak(ao){if(!al){return}var an=Z.remote+"#"+(am++)+"_"+ao;((af||!ag)?al.contentWindow:al).location=an}function ae(an){ad=an;ac.up.incoming(ad.substring(ad.indexOf("_")+1),Y)}function aj(){if(!ab){return}var an=ab.location.href,ap="",ao=an.indexOf("#");if(ao!=-1){ap=an.substring(ao)}if(ap&&ap!=ad){ae(ap)}}function ai(){aa=setInterval(aj,X)}return(ac={outgoing:function(an,ao){ak(an)},destroy:function(){N.clearInterval(aa);if(af||!ag){al.parentNode.removeChild(al)}al=null},onDOMReady:function(){af=Z.isHost;X=Z.interval;ad="#"+Z.channel;am=0;ag=Z.useParent;Y=j(Z.remote);if(af){T(Z.props,{src:Z.remote,name:U+Z.channel+"_provider"});if(ag){Z.onLoad=function(){ab=N;ai();ac.up.callback(true)}}else{var ap=0,an=Z.delay/50;(function ao(){if(++ap>an){throw new Error("Unable to reference listenerwindow")}try{ab=al.contentWindow.frames[U+Z.channel+"_consumer"]}catch(aq){}if(ab){ai();ac.up.callback(true)}else{K(ao,50)}}())}al=A(Z)}else{ab=N;ai();if(ag){al=parent;ac.up.callback(true)}else{T(Z,{props:{src:Z.remote+"#"+Z.channel+new Date(),name:U+Z.channel+"_consumer"},onLoad:function(){ac.up.callback(true)}});al=A(Z)}}},init:function(){G(ac.onDOMReady,ac)}})};o.stack.ReliableBehavior=function(Y){var aa,ac;var ab=0,X=0,Z="";return(aa={incoming:function(af,ad){var ae=af.indexOf("_"),ag=af.substring(0,ae).split(",");af=af.substring(ae+1);if(ag[0]==ab){Z="";if(ac){ac(true);ac=null}}if(af.length>0){aa.down.outgoing(ag[1]+","+ab+"_"+Z,ad);if(X!=ag[1]){X=ag[1];aa.up.incoming(af,ad)}}},outgoing:function(af,ad,ae){Z=af;ac=ae;aa.down.outgoing(X+","+(++ab)+"_"+af,ad)}})};o.stack.QueueBehavior=function(Z){var ac,ad=[],ag=true,aa="",af,X=0,Y=false,ab=false;function ae(){if(Z.remove&&ad.length===0){w(ac);return}if(ag||ad.length===0||af){return}ag=true;var ah=ad.shift();ac.down.outgoing(ah.data,ah.origin,function(ai){ag=false;if(ah.callback){K(function(){ah.callback(ai)},0)}ae()})}return(ac={init:function(){if(t(Z)){Z={}}if(Z.maxLength){X=Z.maxLength;ab=true}if(Z.lazy){Y=true}else{ac.down.init()}},callback:function(ai){ag=false;var ah=ac.up;ae();ah.callback(ai)},incoming:function(ak,ai){if(ab){var aj=ak.indexOf("_"),ah=parseInt(ak.substring(0,aj),10);aa+=ak.substring(aj+1);if(ah===0){if(Z.encode){aa=k(aa)}ac.up.incoming(aa,ai);aa=""}}else{ac.up.incoming(ak,ai)}},outgoing:function(al,ai,ak){if(Z.encode){al=H(al)}var ah=[],aj;if(ab){while(al.length!==0){aj=al.substring(0,X);al=al.substring(aj.length);ah.push(aj)}while((aj=ah.shift())){ad.push({data:ah.length+"_"+aj,origin:ai,callback:ah.length===0?ak:null})}}else{ad.push({data:al,origin:ai,callback:ak})}if(Y){ac.down.init()}else{ae()}},destroy:function(){af=true;ac.down.destroy()}})};o.stack.VerifyBehavior=function(ab){var ac,aa,Y,Z=false;function X(){aa=Math.random().toString(16).substring(2);ac.down.outgoing(aa)}return(ac={incoming:function(af,ad){var ae=af.indexOf("_");if(ae===-1){if(af===aa){ac.up.callback(true)}else{if(!Y){Y=af;if(!ab.initiate){X()}ac.down.outgoing(af)}}}else{if(af.substring(0,ae)===Y){ac.up.incoming(af.substring(ae+1),ad)}}},outgoing:function(af,ad,ae){ac.down.outgoing(aa+"_"+af,ad,ae)},callback:function(ad){if(ab.initiate){X()}}})};o.stack.RpcBehavior=function(ad,Y){var aa,af=Y.serializer||O();var ae=0,ac={};function X(ag){ag.jsonrpc="2.0";aa.down.outgoing(af.stringify(ag))}function ab(ag,ai){var ah=Array.prototype.slice;return function(){var aj=arguments.length,al,ak={method:ai};if(aj>0&&typeof arguments[aj-1]==="function"){if(aj>1&&typeof arguments[aj-2]==="function"){al={success:arguments[aj-2],error:arguments[aj-1]};ak.params=ah.call(arguments,0,aj-2)}else{al={success:arguments[aj-1]};ak.params=ah.call(arguments,0,aj-1)}ac[""+(++ae)]=al;ak.id=ae}else{ak.params=ah.call(arguments,0)}if(ag.namedParams&&ak.params.length===1){ak.params=ak.params[0]}X(ak)}}function Z(an,am,ai,al){if(!ai){if(am){X({id:am,error:{code:-32601,message:"Procedure not found."}})}return}var ak,ah;if(am){ak=function(ao){ak=q;X({id:am,result:ao})};ah=function(ao,ap){ah=q;var aq={id:am,error:{code:-32099,message:ao}};if(ap){aq.error.data=ap}X(aq)}}else{ak=ah=q}if(!r(al)){al=[al]}try{var ag=ai.method.apply(ai.scope,al.concat([ak,ah]));if(!t(ag)){ak(ag)}}catch(aj){ah(aj.message)}}return(aa={incoming:function(ah,ag){var ai=af.parse(ah);if(ai.method){if(Y.handle){Y.handle(ai,X)}else{Z(ai.method,ai.id,Y.local[ai.method],ai.params)}}else{var aj=ac[ai.id];if(ai.error){if(aj.error){aj.error(ai.error)}}else{if(aj.success){aj.success(ai.result)}}delete ac[ai.id]}},init:function(){if(Y.remote){for(var ag in Y.remote){if(Y.remote.hasOwnProperty(ag)){ad[ag]=ab(Y.remote[ag],ag)}}}aa.down.init()},destroy:function(){for(var ag in Y.remote){if(Y.remote.hasOwnProperty(ag)&&ad.hasOwnProperty(ag)){delete ad[ag]}}aa.down.destroy()}})};b.easyXDM=o})(window,document,location,window.setTimeout,decodeURIComponent,encodeURIComponent);

}



__chute('.chute-widget:not(.chute-loaded)');
