module.exports = function(options) {
  
  if(typeof options === "string") {
    options = {
      redirectTo: options
    };
  }
  options = options || {};
  
  var url = options.redirectTo || "/login",
      setReturnTo = options.setReturnTo === undefined ? true : options.setReturnTo;
  
  return function* ensureLogin(next) {
    if(!this.isAuthenticated || !this.isAuthenticated()) {
      if(setReturnTo && this.session) {
        this.session.returnTo = this.originalUrl || this.req.url;
      }
      return this.redirect(url);
    }
    yield next;
  };
};