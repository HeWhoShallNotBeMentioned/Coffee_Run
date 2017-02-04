(function (window) {
  'use strict';
  var FORM_SELECTOR = '[data-coffee-order="form"]';
  var CHECKLIST_SELECTOR = '[data-coffee-order="checklist"]';
  var App = window.App;
  var Truck = App.Truck;
  var DataStore = App.DataStore;
  var FormHandler = App.FormHandler;
  var Validation = App.Validation;
  var CheckList = App.CheckList;
  var webshim = window.webshim;
  var myTruck = new Truck('ncc-1701', new DataStore());
  var checkList = new CheckList(CHECKLIST_SELECTOR);
  checkList.addClickHandler(myTruck.deliverOrder.bind(myTruck));
  window.myTruck = myTruck;
  var formHandler = new FormHandler(FORM_SELECTOR);

  formHandler.addSubmitHandler(function(data){
    myTruck.createOrder.call(myTruck, data);
    checkList.addRow.call(checkList, data);
  });

  formHandler.addInputHandler(Validation.isCompanyEmail);

  webshim.polyfill('forms forms-ext');
  webshim.setOptions('forms', { addValidators: true, lazyCustomMessages: true});

})(window);


var rangeSlider = function() {
  var slider = $('.range-slider');
  var range = $('.range-slider__range');
  var value = $('.range-slider__value');

  slider.each(function() {

    value.each(function() {
      var value = $(this).prev().attr('value');
      $(this).html(value);
    });

    range.on('input', function() {
      $(this).next(value).html(this.value);
    });
  });
};
rangeSlider();
