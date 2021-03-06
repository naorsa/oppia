// Copyright 2015 The Oppia Authors. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS-IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * @fileoverview Factory for creating new frontend instances of SubtitledHtml
 * domain objects.
 */

oppia.factory('SubtitledHtmlObjectFactory', [
  'AudioTranslationObjectFactory', function(AudioTranslationObjectFactory) {
    var SubtitledHtml = function(html, audioTranslations) {
      this._html = html;
      this._audioTranslations = audioTranslations;
    };

    SubtitledHtml.prototype.getHtml = function() {
      return this._html;
    };

    SubtitledHtml.prototype.setHtml = function(newHtml) {
      // TODO(sll): Consider sanitizing here.
      // TODO(sll): At this point do we invalidate the existing audio
      // translations? In particular, saving empty HTML should invalidate all
      // audio.
      this._html = newHtml;
    };

    SubtitledHtml.prototype.getBindableAudioTranslations = function() {
      return this._audioTranslations;
    };

    SubtitledHtml.prototype.isEmpty = function() {
      return !this._html;
    };

    SubtitledHtml.prototype.toBackendDict = function() {
      return {
        html: this._html,
        audio_translations: this._audioTranslations.map(function(translation) {
          return translation.toBackendDict();
        })
      };
    };

    SubtitledHtml.createFromBackendDict = function(subtitledHtmlBackendDict) {
      return new SubtitledHtml(
        subtitledHtmlBackendDict.html,
        subtitledHtmlBackendDict.audio_translations.map(function(translation) {
          return AudioTranslationObjectFactory.createFromBackendDict(
            translation);
        })
      );
    };

    SubtitledHtml.createDefault = function(html) {
      return new SubtitledHtml(html, []);
    };

    return SubtitledHtml;
  }
]);
