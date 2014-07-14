module.exports = function(options) {
  if (typeof options == "string") {
    options = {
      redirectTo: options
    };
  }
  options = options || {};
  
  var url = options.redirectTo || "/";
  
  return function* ensureLoggedOut(next) {
    if (this.isAuthenticated && this.isAuthenticated()) {
      return this.redirect(url);
    }
    yield next;
  };
};