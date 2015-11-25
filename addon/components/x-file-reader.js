import Ember from 'ember';
import layout from '../templates/components/x-file-reader';

export default Ember.Component.extend({
  layout: layout,
  classNames: ["spec-file-reader"],
  file: null,
  model: {result: null, style: ""},
  readFile: Ember.observer('file', function() {
    console.log('readFile');
    let file = this.get('file');
    let reader = new FileReader();
    this.set('model', {result: null, style: ""});
    reader.onloadend = Ember.run.bind(this, function() {
      this.set('model', {result: reader.result, style:`background-image: url(${reader.result})`});
    });
    reader.readAsDataURL(file);
  })
});
