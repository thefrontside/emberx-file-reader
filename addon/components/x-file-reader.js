import Ember from 'ember';
import layout from '../templates/components/x-file-reader';

import State from '../file-reader';

export default Ember.Component.extend({
  layout: layout,
  classNames: ["spec-file-reader"],
  file: null,
  model: new State(),
  readFile: Ember.observer('file', function() {
    let file = this.get('file');
    let reader = new FileReader();
    this.set('model', new State());
    reader.onloadstart = Ember.run.bind(this, function(event) {
      this.set('model', this.get('model').loadstart(event));
    });
    reader.onprogress = Ember.run.bind(this, function(event) {
      this.set('model', this.get('model').progress(event));
    });
    reader.onloadend = Ember.run.bind(this, function(event) {
      this.set('model', this.get('model').loadend(event));
    });
    reader.onabort = Ember.run.bind(this, function(event) {
      this.set('model', this.get('model').abort(event));
    });
    reader.onerror = Ember.run.bind(this, function(event) {
      this.set('model', this.get('model').error(event));
    });
    reader.readAsDataURL(file);
  })
});
