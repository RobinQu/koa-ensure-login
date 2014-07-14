# koa-ensure-login

This is a port of [jaredhanson/connect-ensure-login](https://raw.githubusercontent.com/jaredhanson/connect-ensure-login) to koa

This middleware ensures that a user is logged in.  If a request is received that
is unauthenticated, the request will be redirected to a login page.  The URL
will be saved in the session, so the user can be conveniently returned to the
page that was originally requested.

## Install

    $ npm install koa-ensure-login

## Usage

#### Ensure Authentication

In this example, an application has a settings page where preferences can be
configured.  A user must be logged in before accessing this page.

    app.use(ensureLoggedIn('/login'));
    app.use(function() {
      yield this.render('profile', { user: req.user });
    });
      
If a user is not logged in when attempting to access this page, the request will
be redirected to `/login` and the original request URL (`/settings`) will be
saved to the session at `req.session.returnTo`.

#### Log In and Return To

This middleware integrates seamlessly with [Passport](http://passportjs.org/).

To use with koa, you may find [rkusa/koa-passport](https://github.com/rkusa/koa-passport) is more useful.

Simply mount Passport's `authenticate()` middleware at the login route.

    router.get('/login', function() {
      yield this.render('login');
    });

    router.post('/login', passport.authenticate('local', { successReturnToOrRedirect: '/', failureRedirect: '/login' }));
    
Upon log in, Passport will notice the `returnTo` URL saved in the session and
redirect the user back to `/settings`.

#### Step By Step

If the user is not logged in, the sequence of requests and responses that take
place during this process can be confusing.  Here is a step-by-step overview of
what happens:

1. User navigates to `GET /profile`
    - Middleware sets `session.returnTo` to `/profile`
    - Middleware redirects to `/login`
2. User's browser follows redirect to `GET /login`
    - Application renders a login form (or, alternatively, offers SSO)
3. User submits credentials to `POST /login`
    - Application verifies credentials
    - Passport reads `session.returnTo` and redirects to `/profile`
4. User's browser follows redirect to `GET /profile`
    - Now authenticated, application renders profile page

## License

[The MIT License](http://opensource.org/licenses/MIT)
