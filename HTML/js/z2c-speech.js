/**
 * Copyright 2015 IBM Corp. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/*
 ** z2c-speech.js
 */



function initPage() {
    "use strict";

    console.log("Initializing Page .....");
    var _mic = $('#microphone');

    // Make sure the mic is off at startup
    _mic[0].checked = false;

    // define the stream we will be using to talk to WatsonSpeech
    var stream;

    // Set up handler when mic is turned on
    _mic.on("click", function() {
        if (this.checked) {
            console.log("Starting text-to-speech service...");

            // Call the Watson Speech to text service
            $.when($.get('/api/speech-to-text/token')).done(
                function(token) {
                    stream = WatsonSpeech.SpeechToText.recognizeMicrophone({
                        token: token,
                        outputElement: '#speech' // CSS selector or DOM Element
                    });
                    stream.on('error', function(err) {
                        console.log(err);
                    });
                });
        } else {
            console.log("Stopping text-to-speech service...");
            if (stream !== undefined) {
                stream.stop();
            }
        }
    });
}
