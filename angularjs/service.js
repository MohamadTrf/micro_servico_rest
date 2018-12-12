microServico.factory('microServicoService' ,  function($http,config) 
{
	var _carregaApi = function (objref) {
			return $http.get(config.baseUrl + "/buscaCliente/" + objref);
	}

	var _buscaCliente = function()	{
		return $http.get(config.baseUrl + "/buscaTudo");
	}

	var _cadastraCliente = function(cliente) {
		return $http.post(config.baseUrl+ "/cadastroCliente",cliente);
	}

	var _cadastraEmail = function(emailAutorizado){
		return $http.post(config.baseUrl+"/cadastroEmail",emailAutorizado);
	}

	var _deletaCliente = function(objref) {
		return $http.delete(config.baseUrl + "/deletaCliente/" + objref);
	}

	var _atualizaCliente = function(objref,cliente){
		return $http.put(config.baseUrl + "/alteraCliente/"+objref, cliente);
	}

	//verificaCnpj e Objref
	var _verificaCnpj=function(cnpj,objref){
		return $http.get(config.baseUrl + "/buscaCnpj/" +cnpj+"/"+objref);
	}

	
	var _buscaMunicipio = function (objref) {
			return $http.get(config.baseUrl + "/buscaMunicipio/" + objref);
	}

	var _buscaNvocc = function(objref){
		return $http.get(config.baseUrl+"/buscaNvocc/"+objref);
	}

	var _buscaEmail = function(objrefCliente){
		return $http.get(config.baseUrl+"/buscaEmail/"+objrefCliente);
	}

	var _deletarEmail = function(objref){
		return $http.delete(config.baseUrl+"/deletarEmail/"+objref);
	}

	var _deletarEmails=function(objrefCliente){
		return $http.delete(config.baseUrl+"/deletarEmails/"+objrefCliente);
	}


		return { // deixando  objeto de privado para publico
			carregaApi: _carregaApi,
			cadastraCliente:_cadastraCliente,
			cadastraEmail:_cadastraEmail,
			deletaCliente:_deletaCliente,
			atualizaCliente:_atualizaCliente,
			verificaCnpj:_verificaCnpj,
			buscaCliente:_buscaCliente,
			buscaMunicipio:_buscaMunicipio,
			buscaNvocc:_buscaNvocc,
			buscaEmail:_buscaEmail,
			deletarEmail:_deletarEmail,
			deletarEmails:_deletarEmails
		}
	
});

