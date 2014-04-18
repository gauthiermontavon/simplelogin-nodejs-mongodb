##Troubleshootings


###Node server always running
Check if some node instances are running (cloud9 ide) :

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
http://host/img/image.png => will be replaced by /public/index.html

then, use app.get('/'

####POST Request parameters
app.configure must be before app.post, otherwise it never be called

