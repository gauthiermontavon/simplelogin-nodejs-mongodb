function mainController($scope, $http) {
	// landing on the page => get all users and display them

	$http.get('/api/users').success(function(data) {
		$scope.users = data;
		})
		.error(function(data) {
			console.log('Error: ' + data);
	});

    $scope.authUser = function(){
        $http.post('/api/user/auth', $scope.formLoginData)
            .success(function(data){
                // clear the form after user is logged in
            	$scope.formLoginData = {}; 
            	console.log('result user logged:'+data);
            	if(data.error){
            	    console.log('login error');
            	}else{
            	    console.log('user logged'+data._id);
            	    $scope.idLoggedUser = data._id;
            	}
            	
            })
            .error(function(data){
                console.log('Error: ' + data);
            });
            
    };	

	// when submitting the add form, send the data's form to the node API
	$scope.createUser = function() {
		$http.post('/api/users', $scope.formCreateData)
			.success(function(data) {
			    // clear the form so our user is ready to enter another one
				$scope.formCreateData = {}; 
				$scope.users = data;
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
	};
	
	// delete a user and refresh users' list in scope
	$scope.deleteUser = function(id) {
		$http.delete('/api/users/' + id)
			.success(function(data) {
				$scope.users = data;
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
	};


}
