# ReneJade
Gulp work environment for Frontend using Jade templating language

<!-- ## Features
- [Bower](http://bower.io)
Used to install your project's dependencies.

- [Gulp](http://gulpjs.com)
Streaming build system.

- [Less](http://lesscss.org/)
Less CSS pre-processor.

- [Jade](http://jade-lang.com)
Jade markup templating language used as HTML pre-processor.

- [Autoprefixer](https://github.com/postcss/autoprefixer)
Automagically prefix your CSS code for optimal cross-browser consistency.

- [BrowserSync](http://www.browsersync.io)
LiveReload-like server to preview your code changes in the browser on the fly, supporting multi-device page synchronization.

- [Imagemin](https://github.com/imagemin/imagemin)
Image web optimization. -->

## Setup
Install ReneJade dependencies
    
    npm install
    
Install default Bower packages (Modernizr, jQuery, Bootstrap)
    
    bower install  

To install custom Bower packages type:
		
		bower install package-name --save
    
## Use
To start coding just type 

    gulp
    
This will wire up all your Bower assets to your markup an run the local webserver.

When you are done coding and ready to build up your project run this command:

    gulp build
    
You can now find the production-ready code inside the `dist` folder.

If the server stops for any reason, use this command to start it again:

    gulp connect
    
To delete the compiled code and clean the project folder run:

    gulp clean

## Thanks

Thanks to @pwnjack which helped me a lot with Gulp stuffs!
