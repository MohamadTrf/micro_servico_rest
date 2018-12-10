microServico.controller('microServicoCtrl' ,  function($scope,microServicoService) {
	$scope.app = "microServico";
	$scope.retorno="";
	$scope.municipio={};
	$scope.nvocc={};
	$scope.cliente={};
	$scope.email={};

$scope.validaObjref = function(){
	return $scope.cadastroCliente.objref.$invalid && $scope.cadastroCliente.objref.$touched;
}	

$scope.validaNome = function(){
	return $scope.cadastroCliente.nome.$invalid && $scope.cadastroCliente.nome.$touched;
}
$scope.validaCnpj = function(){
	return  $scope.cadastroCliente.cnpj.$invalid && $scope.cadastroCliente.cnpj.$touched;
}

$scope.validaMunicipio = function()
{
	return	$scope.cadastroCliente.cidadeEstado.$invalid && $scope.cadastroCliente.municipio.$touched;
}

function _ajustaAtualização () {
		$scope.btnDeleta=false;
		$scope.btnEditar=false;
		$scope.ref=false
		$scope.cnpj=false
		$scope.formCadastro = false;
		$scope.tabela=false;	
}



$scope.atualizaCliente = function(){
	var cliente = $scope.cliente;
	var objref = cliente.objref;
	_enviaSelects();
	microServicoService.atualizaCliente(objref, cliente).then(function (response) { 	
		$scope.atualiza  = response.data; 
		$scope.cliente=[];
		_ajustaAtualização();

	 },function (error) { 
		$scope.error= "Não foi possivel carregar os dados";
		});
}

$scope.exibirForm = function (){
	$scope.formCadastro=true;
	$scope.salvarCliente=true;
	$scope.atualizarCliente=false;
	$scope.cliente={};
	$scope.msgCadastro = true;
	$scope.msgEdita = false;
	$scope.disabledCampos= false;
	$scope.limpar();
}

//buscando dados
$scope.editarCliente = function(objref){
	microServicoService.carregaApi(objref).then(function (response) { //certo		
		$scope.cliente  = response.data; 
		$scope.disabledCampos= true;
		$scope.formCadastro=true;
		$scope.atualizarCliente=true;
		$scope.msgCadastro = false;
		$scope.buscaMunicipio();
		$scope.buscaNvocc();
		$scope.buscaEmail();
		$scope.msgEdita= true;
		$scope.salvarCliente=false;
		_ajustaSelects();
		$('select').formSelect();
		$scope.emailCadastro = true;
	},function (error) { 
		$scope.error= "Não foi possivel carregar os dados";
	});
}
/*
$scope.clienteAlterado = function() //atualizar cliente Valido
	{
		var cnpj = $scope.cliente.cnpj;
		var objref = $scope.cliente.objref;
		//$scope.atualizaCliente();
		//var valida = $scope.valida;
		microServicoService.clienteAlterado(cnpj,objref).then(function (response) { //certo
				var valida  = response.data; //retorno da api
		
				
				$scope.atualizaCliente();
				
			},function (error) { 
				alert(error.data.message);
				$scope.error= "Não foi possivel carregar os dados";
				//console.log(error);//se der errado
		 });
	}*/

$scope.buscaCliente = function(btnDeleta){
	$scope.btnDeleta = [];
	microServicoService.buscaCliente().then(function (response){
		$scope.retorno = response.data;
		$scope.btnDeleta=true;
		$scope.btnEditar=true;
	},function (error) { 
		$scope.error= "Não foi possivel carregar os dados";
	});
}

$scope.carregaApi = function (){
  var objref = $scope.objref;
  $scope.retorno = [];
	 microServicoService.carregaApi(objref).then(function (response) {
		if (response.data.length != 0) 
		$scope.retorno.push(response.data); 
			if($scope.retorno.length == 0){
				alert("Registro não encontrado!");
				$scope.btnDeleta=false;
				$scope.btnEditar=false;
				return false;
				}
					$scope.btnDeleta=true;
					$scope.btnEditar=true;	

		},function (error) {  
			$scope.error= "Não foi possivel carregar os dados";
		});			
}

$scope.verificaCnpj = function(){
	var cnpj = $scope.cliente.cnpj
	  	microServicoService.verificaCnpj(cnpj).then(function (response) { 
			$scope.valida  = response.data; 
			if($scope.cliente.cnpj == null){
				alert("cnpj ja existe")
				$scope.salvarCliente=false;
			}

		},function (error) {  
			$scope.error= "Não foi possivel carregar os dados";
		});
}

$scope.insereEmail = function(){
	var email = $scope.email;
	$scope.email.objrefCliente = $scope.cliente.objref;

		if($scope.cliente.objref==undefined) {
			return  $scope.errorEmail="está faltando objref para cliente";
		}
		
		if($scope.email.nome == undefined||$scope.email.email==undefined){
			return $scope.errorEmail = "coloque um  nome e email para seu cliente"
		}

		microServicoService.cadastraEmail(email).then(function(response){
			$scope.emailGravados = response.data;
			$scope.buscaEmail();
			$scope.email={};
		
	},function(error){
		$scope.errorEmail = error.data;
		console.log($scope.email.objrefCliente);
	});
}


$scope.insereCliente = function(){
	var cliente = $scope.cliente;
	var objref = $scope.cliente.objref;

		microServicoService.cadastraCliente(cliente).then(function (response) { 
			$scope.cliente = response.data; 
			alert("Cliente cadastrado com Sucesso!");
			$scope.limpar();
		},function (error) {
			$scope.error= "Não foi possivel carregar os dados";
		});
}

$scope.cadastraCliente = function(){
	var cnpj = $scope.cliente.cnpj;
	var objref=$scope.cliente.objref;

		microServicoService.verificaCnpj(cnpj,objref).then(function (response) { 
			var valida  = response.data; //retorno da api
			$scope.insereCliente();
		},function (error) { 
			console.log(error.data);
			alert(error.data.message);
			$scope.error= error.data.message;
		});
}



$scope.getEmailSelecionado = function(){
	for(var key in $scope.emails){
		if( $scope.emails[key].selecionado==true){
			return $scope.emails[key];
		}
	}
}

$scope.deletaEmail = function(){
	var emailSelecionado = $scope.getEmailSelecionado(); //VIROU UM OBJETO
	var objref = emailSelecionado.objref;
	var apagaEmail = emailSelecionado;
	microServicoService.deletarEmail(objref).then (function (response) {
		alert("Email Deletado com sucesso");
		$scope.buscaEmail();
	},function(error){
		alert("deu erro");
	});
}

$scope.deletarEmails = function(){
	var objrefCliente = $scope.cliente.objref;
	console.log(objrefCliente);
	microServicoService.deletarEmail(objrefCliente).then(function(response){
		alert("Email do Cliente deletado com sucesso");
	},function(error){
		alert("ERRROUUUUUUU");
		console.log(objrefCliente);
	});
}



$scope.deletaCliente = function(){
	var objref= $scope.objref
		microServicoService.deletaCliente(objref).then(function (response) { 
			$scope.exclue  = response.data; 
			$scope.retorno=[];
			$scope.btnDeleta=false;
			$scope.btnEditar=false;
			$scope.formCadastro = false;
			$scope.limpar();
			alert("Cliente Deletado com sucesso");
		 },function (error) {  
			$scope.error= "Não foi possivel carregar os dados";
		});
}

$scope.limpar = function(){
	$scope.cliente={};
	$scope.cadastroCliente.$setPristine();
	$scope.cadastroCliente.$setUntouched();
	$scope.cliente.situacao="";
	$scope.cliente.captacao="";
	$scope.municipio={};
	$scope.nvocc={};
	$scope.error2="";
}

$scope.buscaMunicipio = function(){
	var objrefMunicipio = $scope.cliente.objref_municipio;

	if(objrefMunicipio ==undefined) {
	$scope.municipio.nome="";
	return  $scope.error="campo obrigatorio";
	}

	microServicoService.buscaMunicipio(objrefMunicipio).then(function (response) {
		$scope.municipio = response.data

	}, function (error) {  
		$scope.error= error.data.message;
		$scope.municipio.nome="";
	});
}

$scope.buscaNvocc= function(){
	var objrefNvocc = $scope.cliente.referenciawmsnvocc;

	if(objrefNvocc == undefined || objrefNvocc==null){
		return $scope.error2="";
	}

   microServicoService.buscaNvocc(objrefNvocc).then(function(response){
		$scope.nvocc=response.data;
		$scope.error2= "";
	},function (error) {
		$scope.error2 = error.data.message 
		$scope.nvocc.nome="";
		$scope.cliente.referenciawmsnvocc="";
	});
}

$scope.buscaEmail = function(){
	var objrefCliente = $scope.cliente.objref;

	microServicoService.buscaEmail(objrefCliente).then (function(response){
		$scope.emails = response.data;
	}, function(error){

	});
}

function _ajustaSelects() {
	$scope.cliente.captacao = $scope.cliente.captacao == 1 ? '1' : '0';
	$scope.cliente.situacao = $scope.cliente.situacao == 1 ? '1' : '0';
}

function _enviaSelects() {
	$scope.cliente.captacao = $scope.cliente.captacao ==  '1' ? 1 : 0;
	$scope.cliente.situacao = $scope.cliente.situacao == '1' ? 1 : 0;
}


});