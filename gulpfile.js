/* @preserve
 *
 * Author:  Jaume Sala <jaume.sala@teknos.cat>
 * Center: Teknós - Campus Professional UVic-UCC
 * Studies: Desenvolupament d'Aplicacions Multiplataforma
 * Course: M04 Llenguatges de marques i sistemes de gestió d'informació
 *
 */

const elixir = require('laravel-elixir');

require('laravel-elixir-vue');

/*
 |--------------------------------------------------------------------------
 | Global variables
 |--------------------------------------------------------------------------
 */

var npmPath         = 'node_modules/';
var publicPath      = 'www';
var min             = elixir.config.production ? '.min' : '';

elixir.config.publicPath    = publicPath;
elixir.config.assetsPath    = 'assets';


/*
 |--------------------------------------------------------------------------
 | Npm modules array (plugins.js)
 |--------------------------------------------------------------------------
 */

var npmModules = [

    npmPath + 'bootstrap-sass/assets/javascripts/bootstrap.js',

];


/*
 |--------------------------------------------------------------------------
 | Copy array
 |--------------------------------------------------------------------------
 */
var copyToPublic = [

    // JQuery
    [   npmPath +'jquery/dist/jquery' + min + '.js',
        elixir.config.publicPath + '/' + elixir.config.js.outputFolder +'/vendor/jquery.min.js'],

    // Bootstrap fonts
    [   npmPath + 'bootstrap-sass/assets/fonts/bootstrap',
        elixir.config.publicPath + '/fonts'],

    // Project fonts
    [   elixir.config.assetsPath + '/fonts',
        elixir.config.publicPath + '/fonts'],

];

/*
 |--------------------------------------------------------------------------
 | Main default task
 |--------------------------------------------------------------------------
 */
elixir(mix => {

    mix
        // main.scss
        .sass(
            'main.scss',
            elixir.config.publicPath + '/' + elixir.config.css.outputFolder + '/main' + min + '.css'
        )

        // main.less
        //.less(
        //    'main.less',
        //   elixir.config.publicPath + '/' + elixir.config.css.outputFolder + '/main' + min + '.css'
        //)

        // main.js
        .scriptsIn(
            elixir.config.assetsPath + '/js',
            elixir.config.publicPath + '/' + elixir.config.js.outputFolder + '/main' + min + '.js'
        )

        //plugins.js
        .scripts(
            npmModules,
            elixir.config.publicPath + '/' + elixir.config.js.outputFolder + '/plugins' + min + '.js',
            '.'
        );

        // copy files
        for (var i = 0, len = copyToPublic.length; i < len; i++) {
            mix.copy(
                copyToPublic[i][0],
                copyToPublic[i][1]
            );
        }

        // https://browsersync.io/docs/options/
        mix.browserSync({
            files: [
                publicPath + '/**/*.html',
                publicPath + '/**/*.css',
                publicPath + '/**/*.js'
            ],

            watchOptions: {
                usePolling: true
            },

            snippetOptions: {
                rule: {
                    match: /(<\/body>|<\/pre>)/i,
                    fn: (snippet, match) => snippet + match
                }
            },

            server: {
                baseDir: publicPath,
                index: "index.html"
            },

            directory: false,

            proxy: false

        });

});


