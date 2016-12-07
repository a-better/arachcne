var MySqlDAO = require('../../dao/mySqlDAO');
var Promise = require('promise');
var RankService = function(){
	mySqlDAO = new MySqlDAO();
}

RankService.prototype.constructor = RankService;

RankService.prototype.search = function(USER_SEQID, GAME_SEQID){
	var query = "select * from RANKING where USER_SEQID = "
				+ "'" + USER_SEQID +"'"
				+ "AND GAME_SEQID = "
				+ "'" + GAME_SEQID +"'"
	return mySqlDAO.select(query);			
}

RankService.prototype.create = function(USER_SEQID, GAME_SEQID, Score){
	var query = "insert into RANKING SET ?"
	var values = {
		"USER_SEQID" : USER_SEQID,
		"GAME_SEQID" : GAME_SEQID,
		"SCORE"		 : Score	
	}
	return mySqlDAO.create(query, values);	
}

RankService.prototype.update = function(USER_SEQID, GAME_SEQID, Score){ 
	var query = "update  RANKING set ? where USER_SEQID = "
				+ "'" + USER_SEQID + "'"
				+ ' AND GAME_SEQID = '
				+ "'" + GAME_SEQID + "'"; 			
	var values = {
		"SCORE" : Score	
	}
	return mySqlDAO.update(query, values);
}

module.exports = RankService;