start_page()
// set the first nav item as active
var dis = $(".list-wrap li").eq(2);

// align the wave
align(dis);

// align the wave on click
$(".list-wrap li").click(function(){
  dis = $(this);
  
  align(dis);
});

$('body').on('keydown',function(e){
    var code = e.keyCode || e.which;
  
    if(code == 9) {
      
      if(dis.is(':last-child')){
        $(".list-wrap li:nth-child(1)").trigger("click");
      }
      else{
        dis.next().trigger("click");
      }
      
    } 
});

$("body").keydown(function(e) {
  if(e.keyCode == 37) { // left
    $("#showroom").animate({
      left: "-=980"
    });
  }
  else if(e.keyCode == 39) { // right
    $("#showroom").animate({
      left: "+=980"
    });
  }
});

function align(dis){
  
  // get index of item
  var index = dis.index() + 1;
  
  // add active class to the new item
  $(".list-wrap li").removeClass("active");
  dis.delay(100).queue(function() {
    dis.addClass('active').dequeue();
  });
  
  // move the wave
  // var left = index * 80 - 98;
  
  // $("#wave").css('left', left);
  
  // ▼ this is not necessary for the navigation ▼
  
  // set the background color
  // var color = dis.data('color');

  // $("body").css('background', color);
  
  // set the text
  // $(".page").text(dis.attr("title"));
}


$(document).on('click', '.list-wrap li', function(e){
  e.preventDefault();

  pagina = $(this).attr('data-pagina');




  $.ajax({
    url: '/page',
    method: 'POST',
    data:{page: pagina},
    type: 'POST', // For jQuery < 1.9
    success: function(data){
       
        
        $('#corpor_app').html(data)

        if(pagina == 'home'){
          $('#btn_voltar').attr('data-url_voltar', '');
          $('#btn_voltar').css('display', 'none')
        }else if(pagina == 'cotacoes'){
          $('#btn_voltar').attr('data-url_voltar', '');
          $('#btn_voltar').css('display', 'none')
        }
        
    }
  });

})



$(document).on('click', '.tipo_cotacoes', function(e){
  e.preventDefault();

  pagina = $(this).attr('data-tipo');
  button = $(this);

  id_vendedor = button.attr('data-id_vendedor');
  id_proposta = button.attr('data-id_proposta');
  id_tipo_fechamento = button.attr('data-id');

  if(id_proposta != undefined){
    $('#id_proposta').val(id_proposta)
  }

  if(id_vendedor != undefined){
    $('#id_vendedor').val(id_vendedor)
  }


  if(id_tipo_fechamento != undefined){
    $('#tipo_proposta_fechamento').val(id_tipo_fechamento)
  }


 

  $.ajax({
    url: '/page',
    method: 'POST',
    data:{
      page: pagina
    },
    type: 'POST', // For jQuery < 1.9
    success: function(data){
       
        
        $('#corpor_app').html(data)

        if(pagina == 'home'){
          $('#btn_voltar').attr('data-url_voltar', '');
          $('#btn_voltar').css('display', 'none')
        }else if(pagina == 'cotacoes'){
          $('#btn_voltar').attr('data-url_voltar', '');
          $('#btn_voltar').css('display', 'none')
        }else if(pagina == 'cotacao_vendedores_abertas' || pagina == 'cotacao_vendedores_aprovadas' || pagina == 'cotacao_vendedores_reprovadas' || pagina == 'fechamentos_data'){
          $('#btn_voltar').attr('data-url_voltar', 'cotacoes');
          $('#btn_voltar').css('display', 'block')
        }else if(pagina == 'vendedor_abertas'){
          $('#btn_voltar').attr('data-url_voltar', 'cotacao_vendedores_abertas');
          $('#btn_voltar').css('display', 'block')
        }else if(pagina == 'vendedor_reprovadas'){
          $('#btn_voltar').attr('data-url_voltar', 'cotacao_vendedores_reprovadas');
          $('#btn_voltar').css('display', 'block')
        }else if(pagina == 'vendedor_aprovadas'){
          $('#btn_voltar').attr('data-url_voltar', 'cotacao_vendedores_aprovadas');
          $('#btn_voltar').css('display', 'block')
        }else if(pagina == 'ver_proposta_aberta'){
          $('#btn_voltar').attr('data-url_voltar', 'vendedor_abertas');
          $('#btn_voltar').css('display', 'block')
        }else if(pagina == 'ver_proposta_aprovada'){
          $('#btn_voltar').attr('data-url_voltar', 'vendedor_aprovadas');
          $('#btn_voltar').css('display', 'block')
        }else if(pagina == 'ver_proposta_reprovada'){
          $('#btn_voltar').attr('data-url_voltar', 'vendedor_reprovadas');
          $('#btn_voltar').css('display', 'block')
        }else if(pagina == 'propostas_fechamento_data'){
          $('#btn_voltar').attr('data-url_voltar', 'fechamentos_data');
          $('#btn_voltar').css('display', 'block')
        }else if(pagina == 'ver_proposta_fechamento'){
          $('#btn_voltar').attr('data-url_voltar', 'propostas_fechamento_data');
          $('#btn_voltar').css('display', 'block')
        }

        


        
        

        
        
    }
  });

})


$(document).on('click', '#btn_voltar', function(e){
  url_voltar = $(this).attr('data-url_voltar');
 
  $.ajax({
    url: '/page',
    method: 'POST',
    data:{page: url_voltar},
    type: 'POST', // For jQuery < 1.9
    success: function(data){
    
       
        
        $('#corpor_app').html(data)


        if(url_voltar == 'home'){
          $('#btn_voltar').attr('data-url_voltar', '');
          $('#btn_voltar').css('display', 'none')
        }else if(url_voltar == 'cotacoes'){
          $('#btn_voltar').attr('data-url_voltar', '');
          $('#btn_voltar').css('display', 'none')
        }else if(url_voltar == 'vendedor_abertas'){
          $('#btn_voltar').attr('data-url_voltar', 'cotacao_vendedores_abertas');
          $('#btn_voltar').css('display', 'block')
        }else if(url_voltar == 'vendedor_reprovadas'){
          $('#btn_voltar').attr('data-url_voltar', 'cotacao_vendedores_reprovadas');
          $('#btn_voltar').css('display', 'block')
        }else if(url_voltar == 'vendedor_aprovadas'){
          $('#btn_voltar').attr('data-url_voltar', 'cotacao_vendedores_aprovadas');
          $('#btn_voltar').css('display', 'block')
        }else if(url_voltar == 'cotacao_vendedores_abertas' || url_voltar == 'cotacao_vendedores_aprovadas' || url_voltar == 'cotacao_vendedores_reprovadas' || url_voltar == 'fechamentos_data'){
          $('#btn_voltar').attr('data-url_voltar', 'cotacoes');
          $('#btn_voltar').css('display', 'block')
        }else if(url_voltar == 'propostas_fechamento_data'){
          $('#btn_voltar').attr('data-url_voltar', 'fechamentos_data');
          $('#btn_voltar').css('display', 'block')
        }else if(url_voltar == 'ver_proposta_fechamento'){
          $('#btn_voltar').attr('data-url_voltar', 'propostas_fechamento_data');
          $('#btn_voltar').css('display', 'block')
        }


        
        
    }
  });

})


function start_page(){

  $.ajax({
    url: '/page',
    method: 'POST',
    data:{page: 'home'},
    type: 'POST', // For jQuery < 1.9
    success: function(data){
       
        
        $('#corpor_app').html(data)
        
    }
  });
}


