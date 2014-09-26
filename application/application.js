(function (self, $) {

    // Private Data
    var display = $('.-display');
    var currentWord = " ";
    var currentIndex = 0;
    var input = $('input.-answer');

    function log () {
        if (location.hostname === 'localhost') {
            console.log.apply(console, arguments);
        }
    }

    function checkAnswer () {
        log('app::checkAnswer()');

        if (input[0].value === currentWord) {

            input.prop('disabled', true);
            var evt = jQuery.Event('keypress');
            evt.which = 13;
            evt.keyCode = 13;
            input.trigger(evt);


            display.fadeOut('fast', function () {
                display.text(self.corpus[currentIndex].meaning);
                display.fadeIn('fast', function () {
                    setTimeout(function () {
                        selectNewWord();
                        input.prop('disabled', false).focus();
                    }, 2000);
                });
            });
        }
    }

    function selectNewWord () {
        log('app::selectNewWord()');

        input[0].value = '';
        currentIndex = Math.floor(Math.random() * self.corpus.length);

        display.fadeOut('fast', function () {
            currentWord = self.corpus[currentIndex].word;
            display.text(currentWord);
            display.fadeIn('fast');
        });
    }

    function playSpeech () {
        log('app::playSpeech()');

        var utterance = new SpeechSynthesisUtterance();
        utterance.lang = 'ja';
        utterance.text = currentWord;
        utterance.rate = 0.1;
        speechSynthesis.speak(utterance);
    }

    self.init = function () {
        log('app::init()');

        input.blur(function () { input.focus(); })
            .focus();

        $('form').on('submit', function (event) {
            event.preventDefault();
            checkAnswer();
        });

        $('.-skip').on('click', selectNewWord);

        if (!speechSynthesis) {
            $('.-speak')
                .attr('disabled', 'disabled')
                .tooltip({
                    placement: 'bottom',
                    title: 'Your browser does not support speech synthesis',
                    trigger: 'hover'
                });
        } else {
            $('.-speak').click(playSpeech);
        }

        selectNewWord();

        $(document).keyup(function (event) {
            if (event.keyCode === 27) {
                if (event.ctrlKey) {
                    playSpeech();
                } else {
                    selectNewWord();
                }
            }
        });
    };

})(app || {}, $);
