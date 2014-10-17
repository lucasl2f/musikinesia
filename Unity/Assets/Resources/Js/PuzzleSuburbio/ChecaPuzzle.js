﻿#pragma strict
//script ativado em Pontuacao.js

var quadro : GameObject;
static var quadroOK : boolean; //acessado em botaoAvancar.js e em Teclas.js. Zerada em Pontuacao.js
var btAvancar : GameObject;
var AvancarOK : boolean; //define que o botao avançar ta na tela

var falaPai : GameObject; //sprite do balao e do pai
var texto : GameObject[]; //falas do pai
var posicao : Vector3; //posicao de instantiate

static var chamaFuncao : boolean; //acessada em botaoAvancar.js e em Teclas.js

static var proximo : int; //define a etapa do puzzle e dos textos; acessada em botaoAvancar.js e Teclas.js

var relog : float;
var relogInt : int;
var pontos : int;
var skinPontos : GUISkin;

function Start () {

	relog = 90;
	pontos = 0;

	falaPai.renderer.enabled = true;
	
	if(proximo == 0)
		{
		posicao = Vector3(0.15, 0.95, 0);
		Instantiate(texto[0], posicao, Quaternion.identity);
		
		yield WaitForSeconds(2);
			
		AvancarOK = true;
		}

}

function Update () {

	if(Mathf.Abs(transform.position.y - quadro.transform.position.y) <= 0.35 && Mathf.Abs(transform.position.x - quadro.transform.position.x) <= 0.33 && (quadro.transform.rotation.z <= 0.021 && quadro.transform.rotation.z >= -0.021) )
		quadroOK = true;
	
	if(quadroOK)
		{
		Teclas.etapaPuzzle = 7;
		AvancarOK = true;
		}
	
	if(chamaFuncao)
		{
		TextoPai();
		chamaFuncao = false;
		}
	
	if(AvancarOK)
		btAvancar.transform.position.y = -18; //aparece na tela
		else
			btAvancar.transform.position.y = -40; //sai a tela
	
	if(Teclas.etapaPuzzle == 6 && relog >= -0.1 && !quadroOK)
		{
		relog -= Time.deltaTime;
		relogInt = Mathf.Abs(relog);
		}
	
	if(Teclas.etapaPuzzle == 7)
		pontos = Mathf.Abs(relog * 100 / Teclas.pontoNota);		
		 
	if(relog <= 0) //derrota
		Application.LoadLevel("Derrota");
	
}

function TextoPai() {

	//ajuste dos valores da var etapaPuzzle pra liberar as teclas do teclado
	if(proximo == 1)
		Teclas.etapaPuzzle = 1;
	
	else if(proximo == 3)
		Teclas.etapaPuzzle = 2;
	
	else if(proximo == 6)
		Teclas.etapaPuzzle = 3;
	
	else if(proximo == 10)
		Teclas.etapaPuzzle = 4;
	
	else if(proximo == 13)
		Teclas.etapaPuzzle = 5;
	
	else if(proximo == 17)
		Teclas.etapaPuzzle = 6;
	
	else
		Teclas.etapaPuzzle = -1;
	
	//texto
	AvancarOK = false;
	posicao = Vector3(0.15, 0.95, 0); //instantiate do texto
	if(proximo < 17)
		Instantiate(texto[proximo], posicao, Quaternion.identity);
		
	else if(proximo == 18)
		Instantiate(texto[proximo - 1], posicao, Quaternion.identity);
			
	yield WaitForSeconds(2);
	
	if(proximo != 1 &&	proximo != 3 && proximo != 6 && proximo != 10 && proximo != 13 && proximo != 17)
		AvancarOK = true;
	
	
}

function OnGUI() {
	
	GUI.skin = skinPontos;
	
	if(Pontuacao.puzzle == 1)
		{
		//relogio
		if(Teclas.etapaPuzzle == 6)
			{
			GUI.Box(Rect(Screen.width*0.8, Screen.height*0.25, Screen.width*0.13, Screen.height*0.1), "TEMPO: ");
			GUI.Box(Rect(Screen.width*0.9, Screen.height*0.25, Screen.width*0.1, Screen.height*0.1), relogInt.ToString());
			}
		
		if(Teclas.etapaPuzzle == 7)
			{
			GUI.Box(Rect(Screen.width*0.78, Screen.height*0.4, Screen.width*0.15, Screen.height*0.1), "PONTOS: ");
			GUI.Box(Rect(Screen.width*0.9, Screen.height*0.4, Screen.width*0.1, Screen.height*0.1), pontos.ToString());
			}
		}

}