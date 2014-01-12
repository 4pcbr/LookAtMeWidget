;( function() {

  var NOTE_BLOCK_ID                 = 'noteBlock',
      NOTE_BLOCK_FRAME_1_ID         = 'noteBlockFrame_1',
      NOTE_BLOCK_FRAME_2_ID         = 'noteBlockFrame_2',
      NOTE_BLOCK_FRAME_3_ID         = 'noteBlockFrame_3',
      NOTE_BLOCK_FRAME_4_ID         = 'noteBlockFrame_4',
      AUDIO_PLAYER_ID               = 'noteBlockAudioPlayer',
      NOTE_BLOCK_FRAME_2_LABEL_ID   = 'noteBlockLabel_2',
      BUTTON_ANSWER_YES_ID          = 'noteBlockAnswerYes',
      BUTTON_ANSWER_NO_ID           = 'noteBlockAnswerNo',
      NOTE_BLOCK_HIDDEN_CLASS       = 'noteBlockHidden',
      NOTE_BLOCK_FRAME_CLASS        = 'noteBlockFrame',
      CORRECT_CLASS                 = 'correct',
      INCORRECT_CLASS               = 'incorrect',
      FRAME_2_LABEL_TEMPLATE        = 'Прошло %{dt} сек.',
      NOTES                         = [ 'C4', 'C4#', 'D4' ],
      soundSources                  = {
        'C4': 'data:audio/mp3;base64,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qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqpMQU1FMy45NyAoYmV0YSmqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqr/+5LEjoPAAAGkAAAAIAAANIAAAASqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq',
        'C4#': 'data:audio/mp3;base64,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VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVMQU1FMy45NyAoYmV0YSlVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVX/+5LEsoPAAAGkAAAAIAAANIAAAARVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV',
        'D4': 'data:audio/mp3;base64,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VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/7ksTaA8AAAaQAAAAgAAA0gAAABFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVU='
      },
      iframe_tmpl = '\
        <div class="noteBlock" id="noteBlock">\
          <style type="text/css">\
            .noteBlock {\
              width: %{width}px;\
              height: %{height}px;\
              border: 1px solid black;\
              vertical-align: middle;\
              position: relative;\
            }\
            .noteBlock button {\
              border: 1px solid #000;\
              background-color: #FFF;\
              outline-style: none;\
            }\
            .noteBlock .noteBlockFrame {\
              position: absolute;\
              left: 0;\
              top: 0;\
              width: 500px;\
              height: 100px;\
              text-align: center;\
            }\
            .noteBlock .noteBlockHidden {\
              display: none;\
            }\
            .noteBlock .noteBlockFrame_4 .noteBlockLabelCorrect,\
            .noteBlock .noteBlockFrame_4 .noteBlockLabelIncorrect {\
              display: none;\
            }\
            .noteBlock .noteBlockFrame_4.correct .noteBlockLabelCorrect {\
              display: block;\
            }\
            .noteBlock .noteBlockFrame_4.correct .noteBlockLabelIncorrect {\
              display: none;\
            }\
            .noteBlock .noteBlockFrame_4.incorrect .noteBlockLabelCorrect {\
              display: none;\
            }\
            .noteBlock .noteBlockFrame_4.incorrect .noteBlockLabelIncorrect {\
              display: block;\
            }\
            .noteBlock .noteBlockFrame_1 {\
              padding-top: 40px;\
            }\
            .noteBlock .noteBlockFrame_2 {\
              padding-top: 25px;\
            }\
            .noteBlock .noteBlockFrame_3 {\
              padding-top: 40px;\
            }\
            .noteBlock .noteBlockFrame_4 {\
              padding-top: 25px;\
            }\
          </style>\
          <audio src="" id="noteBlockAudioPlayer"></audio>\
          <div class="noteBlockFrame noteBlockFrame_1 noteBlockHidden" id="noteBlockFrame_1">\
            <button class="noteBlockPlayFirstNote" id="noteBlockPlayFirstNote">Сыграть ноту</button>\
          </div>\
          <div class="noteBlockFrame noteBlockFrame_2 noteBlockHidden" id="noteBlockFrame_2">\
            <div class="noteBlockLabel_2" id="noteBlockLabel_2"></div>\
            <button class="noteBlockPlayAnotherNote" id="noteBlockPlayAnotherNote">Сыграть вторую</button>\
          </div>\
          <div class="noteBlockFrame noteBlockFrame_3 noteBlockHidden" id="noteBlockFrame_3">\
            <button value="1" class="noteBlockAnswerYes" id="noteBlockAnswerYes">Та же нота</button>\
            <button value="0" class="noteBlockAnswerNo" id="noteBlockAnswerNo">Другая нота</button>\
          </div>\
          <div class="noteBlockFrame noteBlockFrame_4 noteBlockHidden" id="noteBlockFrame_4">\
            <div class="noteBlockLabelCorrect" id="noteBlockLabelCorrect">\
              <strong>Да</strong>, верно\
            </div>\
            <div class="noteBlockLabelIncorrect" id="noteBlockLabelIncorrect">\
              <strong>Нет</strong>, вы ошиблись\
            </div>\
            <button class="noteBlockRepeat" id="noteBlockRepeat">Повторить</button>\
          </div>\
        </div>\
      ';

  var noteBlock,
      noteBlockFrame1,
      noteBlockFrame2,
      noteBlockFrame3,
      noteBlockFrame4,
      audioPlayer,
      timeLeftTimer,
      notes;

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
            if ( isObject( target[ k ] ) ) {
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
    var content = tmpl( iframe_tmpl, draw_options ),
        initHandler = function() {
          init();
          gotoState1();
        }
    if ( draw_options[ 'holder' ] === undefined ) {
      document.write( content );
      initHandler();
    } else {
      window.addEventListener( 'DOMContentLoaded', function() {
        var element = document.getElementById( draw_options[ 'holder' ] );
        if ( element ) {
          element.innerHTML = content;
          initHandler();
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

  function hideAllFrames(cb) {
    var frames = [
      noteBlockFrame1,
      noteBlockFrame2,
      noteBlockFrame3,
      noteBlockFrame4
    ];
    frames.forEach(function(frame) {
      frame.classList.add(NOTE_BLOCK_HIDDEN_CLASS);
    });
    if (isFunction(cb)) {
      cb();
    }
  }

  function playNote(cb) {
    if (!notes) {
      notes = [];
    }
    var note = Math.round(Math.random() * (NOTES.length - 1));
    var noteSrc = soundSources[NOTES[note]];
    var audioEndedListener = function() {
      audioPlayer.removeEventListener('ended', audioEndedListener, false);
      if (isFunction(cb)) {
        cb();
      }
    }
    audioPlayer.addEventListener('ended', audioEndedListener, false);
    audioPlayer.src = noteSrc;
    audioPlayer.play();
    notes.push(note);
  }

  function hasPlayedSameNote() {
    return  (notes.length > 1) &&
            (notes[notes.length - 1] === notes[notes.length - 2]);
  }

  function showFrame(frame) {
    frame.classList.remove(NOTE_BLOCK_HIDDEN_CLASS);
  }

  function isFunction(arg) {
    return '[object Function]' == Object.prototype.toString.call(arg);
  }

  function isObject(arg) {
    return '[object Object]' == Object.prototype.toString.call(arg);
  }

  function initState1() {
    var playButton = noteBlockFrame1.querySelector('button');
    playButton.addEventListener('click', function(e) {
      playNote(function() {
        gotoState2();
      });
    }, false);
  }

  function initState2() {
    var button = noteBlockFrame2.querySelector('button');
    button.addEventListener('click', function() {
      gotoState3();
    }, false);
  }

  function initState3() {
    var buttons = noteBlockFrame3.querySelectorAll(
      [
        '#' + BUTTON_ANSWER_NO_ID,
        '#' + BUTTON_ANSWER_YES_ID
      ].join(',')
    );
    buttons = Array.prototype.slice.call(buttons, 0);
    buttons.forEach(function(button) {
      button.addEventListener('click', function() {
        gotoState4(this.value);
      }, false);
    });
  }

  function initState4() {
    var button = noteBlockFrame4.querySelector('button');
    button.addEventListener('click', function() {
      var cl = noteBlockFrame4.classList;
      cl.remove(CORRECT_CLASS);
      cl.remove(INCORRECT_CLASS);
      gotoState1();
    }, false);
  }

  function gotoState1() {
    hideAllFrames(function() {
      showFrame(noteBlockFrame1);
    });
  }

  function gotoState2() {

    var label = noteBlockFrame2.querySelector('#' + NOTE_BLOCK_FRAME_2_LABEL_ID);

    label.innerHTML = '';

    function updateTimePassedLabel(dt) {
      label.innerHTML = tmpl(FRAME_2_LABEL_TEMPLATE, { dt: dt });
    }

    updateTimePassedLabel(0);

    hideAllFrames(function() {
      showFrame(noteBlockFrame2);
      var dt          = 0,
          timeOffset  = 1000;
      timeLeftTimer = window.setInterval(function() {
        dt++;
        updateTimePassedLabel(dt);
      }, timeOffset);
    });
  }

  function gotoState3() {
    hideAllFrames(function() {
      window.clearInterval(timeLeftTimer);
      playNote(function() {
        showFrame(noteBlockFrame3);
      });
    });
  }

  function gotoState4(answer) {
    answer = !!(answer|0);
    hideAllFrames(function() {
      if (answer == hasPlayedSameNote()) {
        noteBlockFrame4.classList.add(CORRECT_CLASS);
      } else {
        noteBlockFrame4.classList.add(INCORRECT_CLASS);
      }
      showFrame(noteBlockFrame4);
      notes = [];
    });
  }

  function init() {
    noteBlock       = document.getElementById(NOTE_BLOCK_ID);
    noteBlockFrame1 = noteBlock.querySelector('#' + NOTE_BLOCK_FRAME_1_ID);
    noteBlockFrame2 = noteBlock.querySelector('#' + NOTE_BLOCK_FRAME_2_ID);
    noteBlockFrame3 = noteBlock.querySelector('#' + NOTE_BLOCK_FRAME_3_ID);
    noteBlockFrame4 = noteBlock.querySelector('#' + NOTE_BLOCK_FRAME_4_ID);
    audioPlayer     = noteBlock.querySelector('#' + AUDIO_PLAYER_ID);
    initState1();
    initState2();
    initState3();
    initState4();
  }

  var default_options = {
    width: '500',
    height: '100',
    holder: null
  },
  params = getUrlParams(),
  draw_options = merge( {}, default_options, params );

  document.addEventListener('DOMContentLoaded', function() {
    drawIframe( draw_options );
  }, false);

} )( window );
