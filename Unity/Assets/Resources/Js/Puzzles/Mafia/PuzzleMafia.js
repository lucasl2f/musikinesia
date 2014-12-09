﻿#pragma strict

static var tempoCerto : boolean; //PuzzleMafiaTeclas.js

var animTriggerPrefab : GameObject[];

var metronomo : AudioClip[];

static var perdeu : boolean;

var panela : GameObject[];

static var proximo : int;
static var chamaFuncao : boolean;
var btProximo : GameObject;

var texto : GameObject[];
var posicao : Vector3;
var visorTeclado : GameObject[];

var fundoPanela : GameObject;

var spritePanela : Sprite[];

var contadorMix : int; //conta o numero de vezes que o jogador tocou o mix

function Start () {

	Animacao();
	chamaFuncao = false;
	btProximo.transform.position.y = -20;
	
	panela[0].GetComponent(Animator).enabled = false;
	panela[1].GetComponent(Animator).enabled = false;
	panela[2].GetComponent(Animator).enabled = false;
	visorTeclado[0].renderer.enabled = false;
	visorTeclado[1].renderer.enabled = false;
	visorTeclado[2].renderer.enabled = false;
	fundoPanela.transform.position.x = -20;
	fundoPanela.GetComponent(SpriteRenderer).color = Color(0.6, 0.2, 0.2, 1);

}

function Update () {
	
	//TESTES
	if(Input.GetKeyDown("q"))
		chamaFuncao = true;
		
	if(Input.GetKeyDown("w"))
		print(proximo);
		
		
		
		

	if(Input.GetKeyDown("space"))
		if(btProximo.transform.position.y > -5)
			chamaFuncao = true;

	/*if(Input.GetKeyDown("a"))
		if(tempoCerto)
			print("ok");
	
	*/
	
	if(chamaFuncao)
		{
		Verificacao();
		chamaFuncao = false;
		}
	
	if(PuzzleMafiaTeclas.chamaFuncao)
		{
		CorFundo();
		PuzzleMafiaTeclas.chamaFuncao = false;
		}

}

function OnTriggerEnter(other : Collider) {

	tempoCerto = true;

}

function OnTriggerExit(other : Collider) {

	tempoCerto = false;
	
	if(!PuzzleMafiaTeclas.etapaOK)
		perdeu = true;

}

function Verificacao() {

	proximo++;
	print(proximo);	
	btProximo.transform.position.y = -20;	
	
	yield WaitForSeconds(0.2);
			
	if(proximo < 14)
		Animacao();
		
	if(proximo >= 14)
		MixPanelas();

}

function Animacao() {
	
	posicao = Vector3(0.18, 0.96, 0); //instantiate do texto
	Instantiate(texto[proximo], posicao, Quaternion.identity);
	
	if(proximo == 3)
		{
		PuzzleMafiaTeclas.etapa = 0;
		Instantiate(animTriggerPrefab[0], Vector3(20, 0, 0), Quaternion.identity);
		audio.clip = metronomo[0];
		audio.Play();
		audio.loop = true;
		panela[0].GetComponent(Animator).enabled = true;
		visorTeclado[0].renderer.enabled = true;
		fundoPanela.transform.position.x = -5.5;
		}
		
	if(proximo == 7)
		{
		PuzzleMafiaTeclas.etapa = 0;
		Instantiate(animTriggerPrefab[1], Vector3(20, 0, 0), Quaternion.identity);
		audio.clip = metronomo[1];
		audio.Play();
		audio.loop = true;
		panela[1].GetComponent(Animator).enabled = true;
		visorTeclado[1].renderer.enabled = true;
		fundoPanela.transform.position.x = 0;
		}
	
	if(proximo == 11)
		{
		PuzzleMafiaTeclas.etapa = 0;
		Instantiate(animTriggerPrefab[2], Vector3(20, 0, 0), Quaternion.identity);
		audio.clip = metronomo[2];
		audio.Play();
		audio.loop = true;
		panela[2].GetComponent(Animator).enabled = true;
		visorTeclado[2].renderer.enabled = true;
		fundoPanela.transform.position.x = 5.5;
		}
	
	if(proximo == 4 || proximo == 8 || proximo == 12)
		{
		panela[0].GetComponent(Animator).enabled = false;
		panela[1].GetComponent(Animator).enabled = false;
		panela[2].GetComponent(Animator).enabled = false;
		panela[0].GetComponent(SpriteRenderer).sprite = spritePanela[0];
		panela[1].GetComponent(SpriteRenderer).sprite = spritePanela[1];
		panela[2].GetComponent(SpriteRenderer).sprite = spritePanela[2];
		visorTeclado[0].renderer.enabled = false;
		visorTeclado[1].renderer.enabled = false;
		visorTeclado[2].renderer.enabled = false;
		fundoPanela.transform.position.x = -20;
		audio.Stop();
		}
	
	if(proximo != 3 && proximo != 7 && proximo != 11)
		{
		yield WaitForSeconds(1);
		
		btProximo.transform.position.y = -4;
		}
	
}

function MixPanelas() {

	yield WaitForSeconds(0.1);
	
	print(contadorMix);
	PuzzleMafiaTeclas.etapa = 0;
	audio.loop = true;
	panela[0].GetComponent(Animator).enabled = false;
	panela[1].GetComponent(Animator).enabled = false;
	panela[2].GetComponent(Animator).enabled = false;
	visorTeclado[0].renderer.enabled = false;
	visorTeclado[1].renderer.enabled = false;
	visorTeclado[2].renderer.enabled = false;
	fundoPanela.transform.position.x = -20;
	audio.Stop();
	
	if(contadorMix == 3)
		print("ok");
	
	if(contadorMix == 2)
		{
		proximo = 17;
		contadorMix++;
		Instantiate(animTriggerPrefab[2], Vector3(20, 0, 0), Quaternion.identity);
		Instantiate(texto[11], posicao, Quaternion.identity);
		audio.clip = metronomo[2];
		audio.Play();
		panela[2].GetComponent(Animator).enabled = true;
		visorTeclado[2].renderer.enabled = true;
		fundoPanela.transform.position.x = 5.5;
		}
	
	if(contadorMix == 1)
		{
		proximo = 15;
		contadorMix++;
		Instantiate(animTriggerPrefab[0], Vector3(20, 0, 0), Quaternion.identity);
		Instantiate(texto[3], posicao, Quaternion.identity);
		audio.clip = metronomo[0];
		audio.Play();
		panela[0].GetComponent(Animator).enabled = true;
		visorTeclado[0].renderer.enabled = true;
		fundoPanela.transform.position.x = -5.5;
		}
	
	if(contadorMix == 0)
		{
		proximo = 16;
		contadorMix++;
		Instantiate(animTriggerPrefab[1], Vector3(20, 0, 0), Quaternion.identity);
		Instantiate(texto[7], posicao, Quaternion.identity);
		audio.clip = metronomo[1];
		audio.Play();
		panela[1].GetComponent(Animator).enabled = true;
		visorTeclado[1].renderer.enabled = true;
		fundoPanela.transform.position.x = 0;
		}

/*
	if(Random.value < 0.33)
		{
		proximo = 15;
		contadorMix++;
		panela[0].GetComponent(SpriteRenderer).sprite = spritePanela[0];
		Instantiate(texto[3], posicao, Quaternion.identity);
		PuzzleMafiaTeclas.etapa = 0;
		audio.clip = metronomo[0];
		audio.loop = true;
		panela[1].GetComponent(Animator).enabled = false;
		panela[2].GetComponent(Animator).enabled = false;
		visorTeclado[1].renderer.enabled = false;
		visorTeclado[2].renderer.enabled = false;
		
		yield WaitForSeconds(0.2);
		
		Instantiate(animTriggerPrefab[0], Vector3(20, 0, 0), Quaternion.identity);
		audio.Play();
		panela[0].GetComponent(Animator).enabled = true;
		fundoPanela.transform.position.x = -5.5;		
		visorTeclado[0].renderer.enabled = true;
		}
		
	if(Random.value >= 0.33 && Random.value <= 0.66)
		{
		proximo = 16;
		contadorMix++;
		panela[1].GetComponent(SpriteRenderer).sprite = spritePanela[1];
		Instantiate(texto[7], posicao, Quaternion.identity);
		PuzzleMafiaTeclas.etapa = 0;
		audio.clip = metronomo[1];
		audio.loop = true;
		panela[0].GetComponent(Animator).enabled = false;
		panela[2].GetComponent(Animator).enabled = false;
		visorTeclado[0].renderer.enabled = false;
		visorTeclado[2].renderer.enabled = false;
		
		yield WaitForSeconds(0.2);
		
		Instantiate(animTriggerPrefab[1], Vector3(20, 0, 0), Quaternion.identity);
		audio.Play();
		panela[1].GetComponent(Animator).enabled = true;
		visorTeclado[1].renderer.enabled = true;
		fundoPanela.transform.position.x = 0;
		}
		
	if(Random.value > 0.66)
		{
		proximo = 17;
		panela[2].GetComponent(SpriteRenderer).sprite = spritePanela[2];
		Instantiate(texto[11], posicao, Quaternion.identity);
		PuzzleMafiaTeclas.etapa = 0;
		audio.clip = metronomo[2];
		audio.loop = true;
		panela[0].GetComponent(Animator).enabled = false;
		panela[1].GetComponent(Animator).enabled = false;
		visorTeclado[0].renderer.enabled = false;
		visorTeclado[1].renderer.enabled = false;
		
		yield WaitForSeconds(0.2);
		
		Instantiate(animTriggerPrefab[2], Vector3(20, 0, 0), Quaternion.identity);
		audio.Play();
		panela[2].GetComponent(Animator).enabled = true;
		visorTeclado[2].renderer.enabled = true;
		fundoPanela.transform.position.x = 5.5;
		contadorMix++;
		}
	*/
	
	/*
	if(proximo != 3 && proximo != 7 && proximo != 11)
		{
		yield WaitForSeconds(1);
		
		btProximo.transform.position.y = -4;
		}*/

}

function CorFundo(){
	
	fundoPanela.GetComponent(SpriteRenderer).color = Color(0.1, 0.6, 0.2, 1);
	
	yield WaitForSeconds(0.1);
	
	fundoPanela.GetComponent(SpriteRenderer).color = Color(0.6, 0.2, 0.2, 1);

}

/*
function OnGUI() {

	if(tempoCerto)
		if(proximo == 3 || proximo == 7 || proximo == 11)
			GUI.Box(Rect(Screen.width*0.85, Screen.height*0.1, Screen.width*0.1, Screen.height*0.1), "");

}*/