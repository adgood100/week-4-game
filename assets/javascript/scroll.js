/*
 * Star Wars opening crawl based on version from 1977
 * 
 *This Crawl is based on the one Tim Pietrusky made and wrote an article where he explain how this works:
 * http://timpietrusky.com/star-wars-opening-crawl-from-1977
 * 
 * Stuff he used:
 * - CSS (animation, transform)
 * - HTML audio (the opening theme)
 * - JavaScript (to sync the animation/audio)
 *
 * I created this version for Fantasy Flight Games new Edge of the Empire game. I added the following elements:
 * 
 * - Edge of the Empire logo from Fantasy Flight
 * - Star field background (I always liked it)
 * - Section for adding episode title (for each game session). 
 *  ** I'm still working on getting the episode title to center correctly, currently doing it with spaces. 
 *
 * Sound copyright by The Walt Disney Company.
 * 
 *
 * Original code 2013 by Tim Pietrusky (timpietrusky.com)
 * Additions added 2013 by Jim Garner
 * 
 */
StarWars = (function() {
  
  /* 
   * Constructor
   */
  function StarWars(args) {
    // Context wrapper
    this.el = $(args.el);
    
    // Audio to play the opening crawl
    this.audio = this.el.find('audio').get(0);
    
    // Start the animation
    this.start = this.el.find('.start');
    
    // The animation wrapper
    this.animation = this.el.find('.animation');
    
    // Remove animation and shows the start screen
    this.reset();

    // Start the animation on click
    this.start.bind('click', $.proxy(function() {
      this.start.hide();
      this.audio.play();
      this.el.append(this.animation);
    }, this));
    
    // Reset the animation and shows the start screen
    $(this.audio).bind('ended', $.proxy(function() {
      this.audio.currentTime = 0;
      this.reset();
    }, this));
  }
  
  /*
   * Resets the animation and shows the start screen.
   */
  StarWars.prototype.reset = function() {
    this.start.show();
    this.cloned = this.animation.clone(true);
    this.animation.remove();
    this.animation = this.cloned;
  };

  return StarWars;
})();

new StarWars({
  el : '.starwars'
});