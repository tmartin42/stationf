'use strict';

/* https://github.com/angular/protractor/blob/master/docs/toc.md */

describe('my app', function() {


  it('should automatically redirect to /booking when location hash/fragment is empty', function() {
    browser.get('index.html');
    expect(browser.getLocationAbsUrl()).toMatch("/booking");
  });


  describe('booking', function() {

    beforeEach(function() {
      browser.get('index.html#!/booking');
    });


    it('should render booking when user navigates to /booking', function() {
      expect(element.all(by.css('[ng-view] p')).first().getText()).
        toMatch(/partial for view 1/);
    });

  });


  describe('bookingHistory', function() {

    beforeEach(function() {
      browser.get('index.html#!/bookingHistory');
    });


    it('should render bookingHistory when user navigates to /bookingHistory', function() {
      expect(element.all(by.css('[ng-view] p')).first().getText()).
        toMatch(/partial for view 2/);
    });

  });
});
