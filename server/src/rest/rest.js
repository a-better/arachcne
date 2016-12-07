var Promise = require('promise');
var GameService = require('../service/game/gameService');
var UserService = require('../service/user/userService');
var RankService = require('../service/rank/rankService');
var LinkService = require('../service/link/linkService');
var Rest = function(application, linkService){
	app = application;
	this.gameService = new GameService();
	this.userService = new UserService();
	this.rankService = new RankService();
	this.linkService = linkService;

	rest = this;
}

Rest.prototype.constructor = Rest;

Rest.prototype = {
	setRESTAPI : function(){
		this.setLinkAPI();
		this.setUserAPI();
		this.setGameRegisterAPI();
		this.setRankAPI();
	},
	setUserAPI : function(){
		app.put('/user', function(req, res){
			var body = req.body;
			rest.userService.search(body).then(function(result){
				if(result.length == 0){
					return rest.userService.create(body);
				}
				else{
					return rest.userService.update(body);
				}
			}).then(function(result){
				res.send(200);
			},function(err){
				console.log('error in saving user ' + err);
				res.send(400);
			});
		});
	},
	setGameRegisterAPI : function(){
		app.post('/game', function(req, res){
			var body = req.body;
			rest.gameService.searchByTitle(body).then(function(result){
				console.log(result.length);
				if(result.length > 0){
					throw res.send(403);
				}
				else{
					return rest.gameService.register(body);
				}
				
			}).then(function(result){
				res.send(200);
			}, function(err){
				console.log('error in insert' + err);
				res.send(400);
			});				
		});
	},
	setRankAPI : function(){
		app.put('/rank/:game', function(){
			var gameTitle = req.params.game;
			var body = req.body;
			var userId = body.ID;
			var messenger = body.MESSENGER;
			var Score = req.body.SCORE;
			delete req.body[SCORE];
			var USER_SEQID;
			var GAME_SEQID;

			rest.gameService.searchByTitle(body).then(function(result){
				GAME_SEQID = result[0].SEQ_ID; 
				return rest.userService.search(req.body);
			}).then(function(result){
				USER_SEQID = result[0].SEQ_ID;
				return rest.rankService.search(USER_SEQID, GAME_SEQID);
			}).then(function(result){
				if(result.length == 0){
					return rest.rankService.create(USER_SEQID, GAME_SEQID, Score);
				}
				else{
					return rest.rankService.update(USER_SEQID, GAME_SEQID, Score);
				}
			}).then(function(result){
				res.send(200);
			}, function(err){
				console.err('error in saving score' + err);
				throw res.send(400); 
			});

		});
	},
	setLinkAPI : function(){
		//create Link REST API
		//app.post();
		app.put('/link/:id', function(req, res){
			var id = req.params.id;
			if(rest.linkService.checkLink(id)){
				if(rest.linkService.checkTimeout(id)){
					delete rest.linkService.timeouts[id];
				}
			}
		});
		app.delete('/link/:id', function(req, res){
			var id = req.params.id;
			if(rest.linkService.checkLink(id)){
				rest.linkService.removeLink(id);
				if(rest.linkService.checkTimeout(id))
				{
					delete rest.linkService.timeouts[id];
				}
			}
		});
	}
}

module.exports = Rest;