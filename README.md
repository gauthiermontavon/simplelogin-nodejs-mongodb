##Troubleshootings

Check if some node instances are running :
###Node server always running
ps -aux
then 
killall -9 node 
or
kill $(ps ax | grep '[j]s' | awk '{ print $1 }'))

####Routes
app.get('*', function(req, res) {
	res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
});

if we define a route with *, static content won't be available
http://host/img/image.png => replace by /public/index.html

then, use app.get('/'

####POST Request parameters
app.configure must be before app.post, otherwise it never be called


##Sources inspiration

http://scotch.io/tutorials/javascript/creating-a-single-page-todo-app-with-node-and-angular
http://danialk.github.io/blog/2013/02/20/simple-authentication-in-nodejs/

Welcome to Cloud9 IDE!

To get you started, we have created a demo chat application.

1) Open the server.js file

2) Click the 'Run' button at the top to start your server,

3) Click the URL that is emitted to the Output tab of the console

Happy coding!
The Cloud9 IDE team

## Support & Documentation

Visit http://docs.c9.io for documentation, or http://support.c9.io for support.
To watch some training videos, visit http://www.youtube.com/user/c9ide.
