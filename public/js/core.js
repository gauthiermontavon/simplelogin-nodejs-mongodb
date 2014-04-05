
function mainController($scope, $http) {
	$scope.formData = {};

	// when landing on the page, get all todos and show them

	$http.get('/api/users').success(function(data) {
		$scope.users = data;
		console.log(data);
		})
		.error(function(data) {
			console.log('Error: ' + data);
	});

    $scope.authUser = function(){
        $http.post('/api/user/auth', $scope.formLoginData)
            .success(function(data){
            	$scope.formLoginData = {}; 
            	//TODO:highlight logged user
            	console.log('result user logged:'+data);
            	if(data.error){
            	    console.log('login error');
            	}else{
            	    console.log('user logged'+data._id);
            	}
            	
            })
            .error(function(data){
                console.log('Error: ' + data);
            });
            
    };	

	// when submitting the add form, send the text to the node API
	$scope.createUser = function() {
		$http.post('/api/users', $scope.formCreateData)
			.success(function(data) {
			// clear the form so our user is ready to enter another
				$scope.formCreateData = {}; 
				$scope.users = data;
				console.log(data);
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
	};
	
	// delete a todo after checking it
	$scope.deleteUser = function(id) {
		$http.delete('/api/users/' + id)
			.success(function(data) {
				$scope.users = data;
				console.log(data);
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
	};


}
