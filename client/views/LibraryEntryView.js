// LibraryEntryView.js - Defines a backbone view class for the entries that will appear within the library views. These will be inserted using the "subview" pattern.
var LibraryEntryView = Backbone.View.extend({

  initialize: function(){
    this.model.on('change', this.render, this);
  },

  tagName: 'tr',

  template: _.template([
    '<td class=songartist>',
      '(<%= artist %>)',
    '</td>',
    '<td class=songtitle>',
      '<%= title %>',
    '</td>',
    '<td>',
      '<span class="glyphicon <%if (star===false) {%>glyphicon-star-empty<%}',
      ' else {%>glyphicon-star<%}%>"></span>',
    '</td>'].join('')
  ),

  events: {
    'click .songartist': function() {
      this.model.queue();
    },
    'click .songtitle': function() {
      this.model.queue();
    },
    'click span': function(){
      this.model.set('star', !this.model.get('star'));
    }
  },

  render: function(){
    return this.$el.html(this.template(this.model.attributes));
  }

});
