'use strict';

describe('Integration tests: videolist', function() {
  // var firstNumber = element(by.model('first'));
  // var secondNumber = element(by.model('second'));
  // var goButton = element(by.id('gobutton'));
  // var latestResult = element(by.binding('latest'));

  // beforeEach(function() {
  //   browser.get('http://juliemr.github.io/protractor-demo/');
  // });

  // it('should have a title', function() {
  //   expect(browser.getTitle()).toEqual('Super Calculator');
  // });

  // it('should add one and two', function() {
  //   firstNumber.sendKeys(1);
  //   secondNumber.sendKeys(2);

  //   goButton.click();

  //   expect(latestResult.getText()).toEqual('3');
  // });
  beforeEach(function(){
      browser.get('http://52.26.121.248:8000/app');
      browser.waitForAngular();
  });

  it('should render the videolist when user navigates to /app', function(){
      
      expect(browser.getCurrentUrl()).toMatch('\/#');
      var ele = by.css('.movie-container');
      expect(browser.isElementPresent(ele)).toBe(true);
      var firstDiv = element.all(by.repeater('video in videos').row(0)).first();
      expect(firstDiv.element(by.tagName('img')).getAttribute('title')).not.toEqual("");
  });
  it('should take you to the city videolist when you click a link on the city list', function(){
     var link = element(by.css('.list-group-item:nth-child(1)'));
     link.click();
     expect(browser.getCurrentUrl()).toMatch('\/city');
     var ele = by.css('.movie-container');
     expect(browser.isElementPresent(ele)).toBe(true);
     var firstDiv = element.all(by.repeater('video in videos').row(0)).first();
     expect(firstDiv.element(by.tagName('img')).getAttribute('title')).not.toEqual("");
  });
  

});

describe('Integration tests: citylist', function() {
  beforeEach(function(){
      browser.get('http://52.26.121.248:8000/app/#/city/22.25,+114.166667');
      browser.waitForAngular();
  });
  it('should render the video details when you click a video in the videolist', function(){
    var link = element(by.css('.movie-container:nth-child(1)'));
    link.click();
    expect(browser.getCurrentUrl()).toMatch('\/watch');
    var ele = element(by.binding('videoWatch.title'));
    expect(ele.getText()).not.toEqual("");
    
  });

});  

describe('Integration tests: watchvid', function() {
  beforeEach(function(){
      browser.get('http://52.26.121.248:8000/app/#/watch/9bZkp7q19f0');
  });
  it('should play the video when you click on the video inside video details page', function(){
    
    var link = element(by.css('.yt-video-poster'));
    link.click();
    var ele = by.tagName("iframe");
    expect(browser.isElementPresent(ele)).toBe(true);
  });

});  

describe('Integration test: SearchFormCtrl', function(){
  beforeEach(function(){
      browser.get('http://52.26.121.248:8000/app');
      browser.waitForAngular();
  });
  it('should display error message when you input incorrect date sequence', function(){
    var dateafter = element(by.id('inputDateAfter'));
    var datebefore = element(by.id('inputDateBefore'));
    var goButton = element(by.id('updateButton'));
    dateafter.sendKeys('2016-02-01');
    datebefore.sendKeys('2016-01-01');
    goButton.click();
    var ele = element(by.className("alert-danger"));
    expect(ele.isDisplayed()).toBe(true);
  });
});