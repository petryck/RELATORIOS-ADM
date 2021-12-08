const conexao = require('./conexao/connect');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const server = require('http').Server(app);
const conexao_sql = require('./conexao/connect_sql');
var Request = require('tedious').Request;  


app.use(require("cors")());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


// conexao.incia_conexao();
conexao_sql.conecta_sql();


const appRoot = require('app-root-path');
app.use(express.static(appRoot + '/public'));
http = require('https')



app.get('/', function (req, res) {

   
    res.sendFile(appRoot + '/public/index.html');
});


app.post('/page', function (req, res) {


    res.sendFile(appRoot + '/public/'+req.body.page+'.html');
});


app.post('/api_valores_proposta', function (req, res) {

  IdOferta_Frete = req.body.id;
   
  var trans = [];

  
  sql = `SELECT TOP 10 * FROM vis_Painel_Valores_Proposta WHERE IdOferta_Frete = ${IdOferta_Frete}`

  CONEXA_HEAD.execSql(new Request(sql, function(err, rowCount, rows){
    if(err) {
        throw err;
    }
}).on('doneInProc',function(rowCount_transbodo, more2, rows_transbodo){
 
  
  var contun2 = 0;
  rows_transbodo.forEach(function (column_trans) {
    trans[contun2] = {};
    column_trans.forEach(function (column_trans_entro) {
      // console.log(column_trans_entro.metadata.colName)

      if(column_trans_entro.value == null){
        column_trans_entro.value = '';
      }

      trans[contun2][column_trans_entro.metadata.colName] = column_trans_entro.value;

      // console.log(column_trans_entro.metadata.colName, column_trans_entro.value)
    });

    contun2 = contun2 + 1;
  })

  //  console.log(trans)
  // console.log(driver)
  

  }).on('requestCompleted',function(rowCount, more, rows){
   
    res.json(trans);
    
  }));


    // res.sendFile(appRoot + '/public/'+req.body.page+'.html');
});


app.post('/api_propostas_total', function (req, res) {

  // IdOferta_Frete = req.body.id;
   
  var trans = [];

  
  sql = `SELECT TOP 10 * FROM vis_Painel_Proposta_Total`

  CONEXA_HEAD.execSql(new Request(sql, function(err, rowCount, rows){
    if(err) {
        throw err;
    }
}).on('doneInProc',function(rowCount_transbodo, more2, rows_transbodo){
 
  
  var contun2 = 0;
  rows_transbodo.forEach(function (column_trans) {
    trans[contun2] = {};
    column_trans.forEach(function (column_trans_entro) {
      // console.log(column_trans_entro.metadata.colName)

      if(column_trans_entro.value == null){
        column_trans_entro.value = '';
      }

      trans[contun2][column_trans_entro.metadata.colName] = column_trans_entro.value;

      // console.log(column_trans_entro.metadata.colName, column_trans_entro.value)
    });

    contun2 = contun2 + 1;
  })

  //  console.log(trans)
  // console.log(driver)
  

  }).on('requestCompleted',function(rowCount, more, rows){
   
    res.json(trans);
    
  }));


    // res.sendFile(appRoot + '/public/'+req.body.page+'.html');
});





app.post('/api_propostas_mes', function (req, res) {

  id_vendedor = req.body.id;
   
  var trans = [];

  
  sql = `SELECT TOP 10 * FROM vis_Painel_Proposta_Mes_Total ORDER BY Mes ASC`

  CONEXA_HEAD.execSql(new Request(sql, function(err, rowCount, rows){
    if(err) {
        throw err;
    }
}).on('doneInProc',function(rowCount_transbodo, more2, rows_transbodo){
 
  
  var contun2 = 0;
  rows_transbodo.forEach(function (column_trans) {
    trans[contun2] = {};
    column_trans.forEach(function (column_trans_entro) {
      // console.log(column_trans_entro.metadata.colName)

      if(column_trans_entro.value == null){
        column_trans_entro.value = '';
      }

      trans[contun2][column_trans_entro.metadata.colName] = column_trans_entro.value;

      // console.log(column_trans_entro.metadata.colName, column_trans_entro.value)
    });

    contun2 = contun2 + 1;
  })

  //  console.log(trans)
  // console.log(driver)
  

  }).on('requestCompleted',function(rowCount, more, rows){
   
    // res.json(trans);
    saida = {};
    saida['abertas'] = [];
    saida['aprovadas'] = [];
    saida['reprovadas'] = [];
    saida['pendentes'] = [];
    saida['mes'] = [];

    meses = {
      '01': 'Jan',
      '02': 'Fev',
      '03': 'Mar',
      '04': 'Abr',
      '05': 'Mai',
      '06': 'Jun',
      '07': 'Jul',
      '08': 'Ago',
      '09': 'Set',
      '10': 'Out',
      '11': 'Nov',
      '12': 'Dez',
      '13': 'Error'
    }




    trans.forEach(element => {
      saida['abertas'].push(element.QuantidadeProposta)
      saida['aprovadas'].push(element.QuantidadeAprovada)
      saida['reprovadas'].push(element.QuantidadeReprovada)
      saida['pendentes'].push(element.QuantidadePendente)
      saida['mes'].push(meses[element.Mes]+'-'+ element.Ano)
    });
    
    res.json(saida);
  }));


    // res.sendFile(appRoot + '/public/'+req.body.page+'.html');
});






app.post('/api_infos_propostas', function (req, res) {

  id_vendedor = req.body.id;
  SituacaoProposta = req.body.situacao;
  page = req.body.page;
  console.log(SituacaoProposta)

  if(SituacaoProposta == 0){ //ABERTA
 situacao = 'NOT IN (2,3)'
  }else if (SituacaoProposta == 1){//aprovada
    situacao = 'IN (2)'
  }else if (SituacaoProposta == 2){//reprovada
    situacao = 'IN (3)'
  }
   
  var trans = [];

//sql = `SELECT TOP 10 * FROM vis_Painel_Proposta WHERE IdVendedor = ${id_vendedor} ORDER BY Data_abertura_convertido DESC OFFSET ${inicio} ROWS FETCH NEXT 10 rows only`
  // sql = `SELECT ROW_NUMBER() OVER(PARTITION BY @@ROWCOUNT ORDER BY @@ROWCOUNT) AS Indice, * FROM vis_Painel_Proposta WHERE IdVendedor = ${id_vendedor} AND ROW_NUMBER() OVER(PARTITION BY @@ROWCOUNT ORDER BY @@ROWCOUNT) BETWEEN 1 AND 10 ORDER BY Data_abertura_convertido DESC`
  
  sql = `SELECT * FROM (
    SELECT ROW_NUMBER() OVER(ORDER BY IdOferta_Frete) AS Numero, * FROM vis_Painel_Proposta where IdVendedor = ${id_vendedor} AND IdSituacaoProposta ${situacao}
      ) AS TBL
WHERE Tbl.Numero BETWEEN ((${page} - 1) * 10 + 1) AND (${page} * 10)
ORDER BY Tbl.Data_abertura_convertido DESC`
console.log(sql)

  // if(req.body.inicio){
  //   sql = `SELECT TOP 10 * FROM vis_Painel_Proposta WHERE IdVendedor = ${id_vendedor} Indice between 1 and 10 ORDER BY Data_abertura_convertido DESC`
  // }else{
  //   sql = `SELECT TOP 10 * FROM vis_Painel_Proposta WHERE IdVendedor = ${id_vendedor} ORDER BY Data_abertura_convertido DESC`
  // }


  
  

  CONEXA_HEAD.execSql(new Request(sql, function(err, rowCount, rows){
    if(err) {
        throw err;
    }
}).on('doneInProc',function(rowCount_transbodo, more2, rows_transbodo){
 
  
  var contun2 = 0;
  rows_transbodo.forEach(function (column_trans) {
    trans[contun2] = {};
    column_trans.forEach(function (column_trans_entro) {
      // console.log(column_trans_entro.metadata.colName)

      if(column_trans_entro.value == null){
        column_trans_entro.value = '';
      }

      trans[contun2][column_trans_entro.metadata.colName] = column_trans_entro.value;

      // console.log(column_trans_entro.metadata.colName, column_trans_entro.value)
    });

    contun2 = contun2 + 1;
  })

  //  console.log(trans)
  // console.log(driver)
  

  }).on('requestCompleted',function(rowCount, more, rows){
   
    res.json(trans);

  }));


    // res.sendFile(appRoot + '/public/'+req.body.page+'.html');
});

app.post('/api_infos_uma_proposta', function (req, res) {

  id_proposta = req.body.id;
   
  var trans = [];

  
  sql = `SELECT TOP 10 * FROM vis_Painel_Proposta WHERE IdOferta_Frete = ${id_proposta} ORDER BY Data_abertura_convertido DESC`

  CONEXA_HEAD.execSql(new Request(sql, function(err, rowCount, rows){
    if(err) {
        throw err;
    }
}).on('doneInProc',function(rowCount_transbodo, more2, rows_transbodo){
 
  
  var contun2 = 0;
  rows_transbodo.forEach(function (column_trans) {
    trans[contun2] = {};
    column_trans.forEach(function (column_trans_entro) {
      // console.log(column_trans_entro.metadata.colName)

      if(column_trans_entro.value == null){
        column_trans_entro.value = '';
      }

      trans[contun2][column_trans_entro.metadata.colName] = column_trans_entro.value;

      // console.log(column_trans_entro.metadata.colName, column_trans_entro.value)
    });

    contun2 = contun2 + 1;
  })

  //  console.log(trans)
  // console.log(driver)
  

  }).on('requestCompleted',function(rowCount, more, rows){
   
    res.json(trans);
    
  }));


    // res.sendFile(appRoot + '/public/'+req.body.page+'.html');
});


app.post('/api_infos_proposta_mes', function (req, res) {
 
  id_vendedor = req.body.id;
  var trans = [];

  
  sql = `SELECT * FROM vis_Painel_Proposta_Mes WHERE IdVendedor = ${id_vendedor} ORDER BY Mes_Proposta DESC`

  CONEXA_HEAD.execSql(new Request(sql, function(err, rowCount, rows){
    if(err) {
        throw err;
    }
}).on('doneInProc',function(rowCount_transbodo, more2, rows_transbodo){
 
  
  var contun2 = 0;
  rows_transbodo.forEach(function (column_trans) {
    trans[contun2] = {};
    column_trans.forEach(function (column_trans_entro) {
      // console.log(column_trans_entro.metadata.colName)

      if(column_trans_entro.value == null){
        column_trans_entro.value = '';
      }

      trans[contun2][column_trans_entro.metadata.colName] = column_trans_entro.value;

      // console.log(column_trans_entro.metadata.colName, column_trans_entro.value)
    });

    contun2 = contun2 + 1;
  })

  //  console.log(trans)
  // console.log(driver)
  

  }).on('requestCompleted',function(rowCount, more, rows){
   
    res.json(trans);
    
  }));

})



app.post('/api_infos_proposta_atividades', function (req, res) {
 
  id_oferta = req.body.id;
  var trans = [];

  
  sql = `SELECT * FROM vis_Painel_Atividade_Oferta WHERE IdOferta_Frete = ${id_oferta} order by Codigo asc`

  CONEXA_HEAD.execSql(new Request(sql, function(err, rowCount, rows){
    if(err) {
        throw err;
    }
}).on('doneInProc',function(rowCount_transbodo, more2, rows_transbodo){
 
  
  var contun2 = 0;
  rows_transbodo.forEach(function (column_trans) {
    trans[contun2] = {};
    column_trans.forEach(function (column_trans_entro) {
      // console.log(column_trans_entro.metadata.colName)

      if(column_trans_entro.value == null){
        column_trans_entro.value = '';
      }

      trans[contun2][column_trans_entro.metadata.colName] = column_trans_entro.value;

      // console.log(column_trans_entro.metadata.colName, column_trans_entro.value)
    });

    contun2 = contun2 + 1;
  })

  //  console.log(trans)
  // console.log(driver)
  

  }).on('requestCompleted',function(rowCount, more, rows){
   
    res.json(trans);
    
  }));

})

app.post('/api_infos_vendedor', function (req, res) {

   
  var trans = [];

  
  sql = `SELECT * FROM vis_Painel_Vendedor ORDER BY Vendedor ASC`

  CONEXA_HEAD.execSql(new Request(sql, function(err, rowCount, rows){
    if(err) {
        throw err;
    }
}).on('doneInProc',function(rowCount_transbodo, more2, rows_transbodo){
 
  
  var contun2 = 0;
  rows_transbodo.forEach(function (column_trans) {
    trans[contun2] = {};
    column_trans.forEach(function (column_trans_entro) {
      // console.log(column_trans_entro.metadata.colName)

      if(column_trans_entro.value == null){
        column_trans_entro.value = '';
      }

      trans[contun2][column_trans_entro.metadata.colName] = column_trans_entro.value;

      // console.log(column_trans_entro.metadata.colName, column_trans_entro.value)
    });

    contun2 = contun2 + 1;
  })

  //  console.log(trans)
  // console.log(driver)
  

  }).on('requestCompleted',function(rowCount, more, rows){
   
    res.json(trans);
    
  }));


    // res.sendFile(appRoot + '/public/'+req.body.page+'.html');
});






server.listen(process.env.PORT || 3060, function () {
    console.log(`Convite Carregado ${server.address().port}`);
});