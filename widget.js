;( function() {

  var iframe_tmpl = '<div id="noteBlock"><audio id="noteBlockAudioPlayer" controls="false" autoplay="false" src="" /></div>';

  function merge() {
    var args,
        target,
        nesteds;

    nesteds = Array.prototype.slice.call( arguments );
    target = nesteds.shift();

    if ( nesteds.length > 0 ) {
      for ( var i = 0, l = nesteds.length; i < l; i++ ) {
        for ( var k in nesteds[ i ] ) {
          if ( nesteds[ i ].hasOwnProperty( k ) ) {
            if ( typeof( target[ k ] ) == 'object' ) {
              target[ k ] = merge( {}, target[ k ], nesteds[ i ][ k ] );
            } else {
              target[ k ] = nesteds[ i ][ k ];
            }
          }
        }
      }
    }

    return target;
  }

  function getScriptSrc() {
    var scripts = document.getElementsByTagName( 'script' ),
        script = scripts[ scripts.length - 1 ];

    if ( script !== undefined && script.getAttribute !== undefined ) {
      return script.getAttribute('src')
    }

    return null;
  }

  function getUrlHost( src ) {
    src = src || getScriptSrc();
    var host = src.match(/^(http(s)?:)?\/\/(.+?)\//i)
    if ( host !== undefined && host !== null ) {
      return host[ 0 ];
    }
    return null;
  }

  function getUrlParams( src ) {
    var params_string,
        params_pairs,
        params,
        pair;
    
    src = src || getScriptSrc();
    if ( src === null ) {
      return null;
    }
    params_string = src.split( '?', 2 )[ 1 ];
    if ( params_string === undefined ) {
      return null;
    }
    params_pairs = params_string.split( '&' );
    params = {};
    for ( var i = 0, l = params_pairs.length; i < l; i++ ) {
      pair = params_pairs[ i ].split( '=' );
      if ( pair[ 0 ] !== undefined && pair[ 1 ] !== undefined ) {
        params[ pair[ 0 ] ] = pair[ 1 ];
      }
    }

    return params;
  }

  function drawIframe( draw_options ) {
    var content = tmpl( iframe_tmpl, draw_options );
    if ( draw_options[ 'element_id' ] === undefined ) {
      document.write( content );
    } else {
      window.addEventListener( 'DOMContentLoaded', function() {
        var element = document.getElementById( draw_options[ 'element_id' ] );
        if ( element ) {
          element.innerHTML = content;
        }
      }, false );
    }
  }

  function tmpl( template, params ) {
    var result = template;
    for ( var i in params ) {
      if ( params.hasOwnProperty( i ) ) {
        result = result.replace( new RegExp( '%{' + i + '}', 'g' ), params[ i ] );
      }
    }

    return result;
  }

  var default_options = {
    width: '400',
    height: '400'
  },
  params = getUrlParams(),
  draw_options = merge( {}, default_options, params );
  
  drawIframe( draw_options );
  
} )( window );
