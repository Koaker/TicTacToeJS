/* Nome do aluno: Rafael Irumé Montedo
	ALU201610671
*/




// Declaração de variaveis/
var iniciar = true;				//Inicia o jogo
var njogada =0;					// Váriavel para controlar as jogadas
var jogador1 = true;			// Váriavel booleana
var jogador_vez = 1;			// Controla a vez do jogador em questão
var final;						// Variavel para verificar o vencedor
var p1;							// Nome do jogador 1
var p2;							// Nome do jogador 2
var empate= 0;					// Variavel para verificar se foi empate
var casas;						// Array que armazena as casas


stop(); //Impedir que seja realizado um jogo sem ter iniciado primeiro.

function start_game(id){		
		//Aqui no display usei o caminho feliz por falta de tempo =D
		// Armazena inner html do botão principal

		var trig = document.getElementById(id).innerHTML;
				
		
		//Condicional para começar o jogo e pegar os dados dos jogadores
	if (iniciar == true && trig == "Iniciar" ){
		recomeca(); // na verdade aqui ele começa.
		
		//Pega o nome dos jogadores
		p1 = prompt("Digite o nome do jogador 1");
		p2 = prompt("Digite o nome do jogador 2");
		document.getElementById("jogador1").innerHTML = p1;
		document.getElementById("jogador2").innerHTML = p2;	
		
		//Alera o estilo do css para mostrar as informações do jogo
		document.getElementById("score").style.display = "inline";
		document.getElementById("melhord").style.display = "inline";
		
		//Botão para finalizar a partida caso queiram.
		document.getElementById(id).innerHTML = "Finalizar";
		document.getElementById("tuto").innerHTML = " Clique aqui para finalizar o jogo";

	} else{
		// Volta para o estado inicial
		document.getElementById("score").style.display = "none";
		document.getElementById("melhord").style.display = "none";
		document.getElementById("jogador1").innerHTML = "";
		document.getElementById("jogador2").innerHTML = "";
		//Volta para o botão inciar
		document.getElementById(id).innerHTML = "Iniciar";
		document.getElementById("tuto").innerHTML = "Clique no botão para inciar o jogo";
		stop();
	} 		
		
		

} 


// Função para verificar o jogador e adequar os atributos da img
function Verifica_Jogador(){	

	document.getElementById("ganhador").innerHTML = ""; // Reseta o display do ganhador
	//Seleciona todos os elementos que contenham a classe espaco
   casas = document.body.querySelectorAll(".espaco");	 

   	// Laço de repetição para percorrer todos os elementos do Array criado																	
   for(var x=0; x<casas.length; x++){
   	// Aqui o elemento do array recebe o atributo conforme a variavel booleana para alternar os clicks
  	
  	casas[x].setAttribute("onclick", jogador1 ? "Jogada(this)" : "");	// jogador 1 ~ 1 Clique
    casas[x].setAttribute("ondblclick", jogador1 ? "": "Jogada(this)"); //jogador 2 ~ 2 Cliques
          
      // Se contem a classe jogado adicionada pela função "jogada", remove os atributos dos clicks
      //impossibilitando mais jogadas nesta celula
       
      /* Condicional para o jogador poder remover a primeira jogada do seu turno
      após turno finalizado, as jogadas não podem ser removidas*/
      
      if(njogada == 0 && casas[x].classList.contains("jogadax1")){
      	casas[x].classList.remove("jogadax1");	//Remove o Jogada x1
      	casas[x].classList.add("jogadax");		//Alltera para jogada x final, não pode ser removido	
      } else if ( njogada == 0 && casas[x].classList.contains("jogadao1")){
      	casas[x].classList.remove("jogadao1");	//Remove a jogada o1
      	casas[x].classList.add("jogadao");		//Altera para jogada o final, não pode ser removido
      }

      // Retira os atributos das classes selecionadas, para que fiquem imposssibilidatas de jogar
      if(casas[x].classList.contains("jogadax") || casas[x].classList.contains("jogadao")){
       
         casas[x].removeAttribute("onclick");	
         casas[x].removeAttribute("ondblclick");
      }    
      
 		check();		// Verifica se o jogo terminou
	}
	
	// Mostra no display o turno do jogador
	if(jogador_vez ==1){									
   	document.getElementById("jogada").src = "img/x.png"
   } else{
   	document.getElementById("jogada").src = "img/o.png"
   }

}

function check(){ // Verifica se o jogo terminou
	
	//Recebe o src para a comparação, pois não consegui efetuar a comparação direto com o "img/default.png"
	// a única maneira que sei é pelo método indexOf pórem devido a falta de tempo fiz essa gambi

	var aux = document.getElementById("blank");
	
	//Condições de vitória
	
	if (
	   (casas[0].src == casas[1].src && casas[0].src == casas[2].src && casas[0].src == casas[3].src && casas[0].src != aux.src) 
	|| (casas[0].src == casas[5].src && casas[0].src == casas[10].src && casas[0].src == casas[15].src && casas[0].src != aux.src)
	|| (casas[0].src == casas[4].src && casas[0].src == casas[8].src && casas[0].src == casas[12].src && casas[0].src != aux.src)
	|| (casas[4].src == casas[5].src && casas[4].src == casas[6].src && casas[4].src == casas[7].src &&  casas[4].src != aux.src)
	|| (casas[8].src == casas[9].src && casas[8].src == casas[10].src && casas[8].src == casas[11].src && casas[8].src != aux.src)
	|| (casas[12].src == casas[13].src && casas[12].src == casas[14].src && casas[12].src == casas[15].src && casas[12].src != aux.src)
	|| (casas[1].src == casas[5].src && casas[1].src == casas[9].src && casas[1].src == casas[13].src && casas[1].src != aux.src)
	|| (casas[2].src == casas[6].src && casas[2].src == casas[10].src && casas[2].src == casas[14].src && casas[2].src != aux.src)
	|| (casas[3].src == casas[7].src && casas[3].src == casas[11].src && casas[3].src == casas[15].src && casas[3].src != aux.src)	
	|| (casas[3].src == casas[6].src && casas[3].src == casas[9].src && casas[3].src == casas[12].src && casas[3].src != aux.src)
		){
		
		// Caso o jogador 1 ganhe compara se a última jogada foi a imagem x.
		if(final.src.indexOf("img/x.png") != -1){
			// Mostra no display o ganhador
			document.getElementById("ganhador").innerHTML = "o ganhador foi " + p1;
			 stop(); //Impossibilita qualquer jogada no tabuleiro
		} else {

			document.getElementById("ganhador").innerHTML = "o ganhador foi " + p2;
			 stop(); 
		}
			document.getElementById("proxima_rodada").style.display = "inline";
	} else{
		 // Verifica todas as casas se é diferente de "NULL" no caso diferente da img default. 
		 for(var x=0; x<casas.length; x++){ 
			if(casas[x].src != aux.src){
				empate++; //Contador
			}else {
				empate = 0; // reseta o contador
			}
			// Condição de empate.
			 if(empate == 16) { 
			 document.getElementById("ganhador").innerHTML = "deu velha";
			 document.getElementById("proxima_rodada").style.display = "inline";
			 stop(); 
		 }
		 
		 }
		
	}

 }    

// Função para impossibilitar qualquer jogada no tabuleiro.
function stop(){

		for(var x = 0 ; x <casas.length; x++) {

	     casas[x].removeAttribute("onclick");
         casas[x].removeAttribute("ondblclick");
     }
}

//A função que recomeça o jogo e também a que começa.
function recomeca(){
	//Armazena todos os elementos com a tag espaços e cria um array

	var casas = document.body.querySelectorAll(".espaco");


	 for(var x=0; x<casas.length; x++){ // Percorre todo o array
   	// Aqui o elemento do array recebe o atributo conforme a variavel booleana para alternar os clicks
  	
  	casas[x].src = "img/default.png";			//Limpa o tabuleiro adicinado a img default
	casas[x].classList.remove("jogadax");		//Remove qualquer jogada anterior
    casas[x].classList.remove("jogadao");	
    }

	if(jogador1 == false){			 // Verifica de quem é a vez.
		jogador1 = !jogador1;		 // Seta o jogador 1 para TRUE para poder recomeçar o jogo
	}

    document.getElementById("proxima_rodada").style.display = "none"; // Esconde o botão´.

    njogada = 0; 					 // reseta o número de jogadas
	jogador_vez = jogador1 ? 1 : 2;  //Armazena a vez do jogador.	
	Verifica_Jogador();
}


// Função que vai executar a jogada
function Jogada(casa){  
 
   
   
   // verifica se a vez é do jogador 1 caso falso, é a vez do jogador 2
   if(jogador_vez == 1 ){     
    
     // Condicionais para remover a primeira jogada caso tenha jogado errado ou queira trocar de jogada
     if(casa.classList.contains("jogadax1") && njogada == 1){
     	casa.src ="img/default.png";		// Imagem padrão branca
     	njogada--; 							// Arruma o contador de jogadas
     	casa.classList.remove("jogadax1");  // Remove a jogada
     			
     }else{				
     	casa.src = "img/x.png";				//Imagem do X.
     	casa.classList.add("jogadax1");		//Adiciona classe para póssivel remoção da jogada
     	njogada++; 							//Contador de jogadas
     			
     }			
      
      	// Controle de jogada, para o jogador poder executar duas jogadas
      	
        if(njogada == 2){
      	jogador1 = !jogador1;		
      	njogada = 0;
      	casa.classList.add("jogadax");	//Após definido esta classe o jogador não pode jogar na célula
      }
   }else{

       if(casa.classList.contains("jogadao1") && njogada == 1){
     	casa.src ="img/default.png";		
     	njogada--; 							
     	casa.classList.remove("jogadao1");	
     }else{				
     	casa.src = "img/o.png";				
     	casa.classList.add("jogadao1"); 		
      	njogada++; 							
     }

     	if(njogada == 2){
      	jogador1 = !jogador1;		
      	njogada = 0;
      	casa.classList.add("jogadao");		
      }
   }

   jogador_vez = jogador1 ? 1 : 2; 						// Verifica qual é o jogador

   
   
   final = casa; 		//Armazena para comparação no final do jogo
   
  Verifica_Jogador();
}





//Aciona o evento quando o documento HTML for carregado
document.addEventListener("DOMContentLoaded", Verifica_Jogador); 











