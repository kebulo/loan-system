var app = new Vue({
	el: '#mainLoanApp',
	data: {
		loan: {},
		loan_status: ''
	},
	delimiters: ['[[',']]'],
	methods: {
		quoteLoan: function(){
			if (typeof this.loan.tax_id == 'undefined' || this.loan.tax_id == '') {
				alert("The Tax ID cannot be empty");
				return false;
			}

			if (typeof this.loan.business_name == 'undefined' || this.loan.business_name == '') {
				alert("The business name cannot be empty");
				return false;
			}

			if (typeof this.loan.requested_amount == 'undefined' || this.loan.requested_amount == '') {
				alert("The requested amount cannot be empty");
				return false;
			}

			this.$http.post("https://loansystema.herokuapp.com/api/v1/loans/", this.loan)
				.then(function(response){
					this.loan_status = response.data.message;
				}, function(err){
					console.log(err);
				}
			);

			// this.$http.post("http://127.0.0.1:5000/api/v1/loans/", this.loan)
			// 	.then(function(response){
			// 		this.loan_status = response.data.message;
			// 		console.log(response.data.message);
			// 	}, function(err){
			// 		console.log(err);
			// 		alert('Error!');
			// 	}
			// );
		},
		goBack: function(){
			this.loan_status = '';
			this.loan = {};
		}
	}
});