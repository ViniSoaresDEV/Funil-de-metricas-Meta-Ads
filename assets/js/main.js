const btn = document.querySelector('#btn');

//Funil de leads
const investimentoTrafego = document.querySelector('#investimento-trafego');
const ticketMedio = document.querySelector('#ticket-medio');
const impressoes = document.querySelector('#impressoes');

//Cliques
const cliques = document.querySelector('#cliques');
const resTaxaCliques = document.querySelector('#resultado-taxa-cliques');

//Leads
const leads = document.querySelector('#leads');
const resTaxaLeads = document.querySelector('#resultado-taxa-leads');


//Vendas
const vendas = document.querySelector('#vendas');
const resTaxaVendas = document.querySelector('#resultado-taxa-vendas');

//Métricas financeiras
const cpmValor = document.querySelector('#cpm-value');
const cpcValor = document.querySelector('#cpc-value');
const cpaLeadValor = document.querySelector('#cpa-lead-value');
const cpaVendaValor = document.querySelector('#cpa-venda-value');
const faturamentoBruto = document.querySelector('#faturamento-bruto-value');
const roas = document.querySelector('#roas-value');



btn.addEventListener('click', e => {

  const inputs = document.querySelectorAll('input');

  for(let input of inputs){
    if(input.value === ''){
      alert('preencha todos os campos');
      return;
    }
  }

  calculaCliques(Number(cliques.value), Number(impressoes.value.replace(/\./g, "")));
  calculaLeads(Number(leads.value), Number(cliques.value));
  calculaVendas(Number(vendas.value), Number(leads.value));

  calculaCPM(Number(investimentoTrafego.value), Number(impressoes.value.replace(/\./g, "")));
  calculaCPC(Number(investimentoTrafego.value), Number(cliques.value));

  calculaCPALead(Number(investimentoTrafego.value), Number(leads.value));
  calculaCPAVenda(Number(investimentoTrafego.value), Number(vendas.value));


  calculaFaturamentoBruto(Number(vendas.value), Number(ticketMedio.value));
  calculaROAS(Number(vendas.value), Number(ticketMedio.value), Number(investimentoTrafego.value));
})

//Funções de cálculos


//Calculando taxa de conversão de cliques
function calculaCliques(cliques, impressoes) {
  const calculoCliques =  (cliques / impressoes) * 100;
  console.log(cliques/impressoes);

  exibeResultadosCliques(calculoCliques.toFixed(2));
}

//Calculando taxa de conversão de leads
function calculaLeads(leads, cliques){
  const calculoLeads = (leads / cliques) * 100;

  exibeResultadosLeads(calculoLeads.toFixed(2));
}


//Calculando taxa de conversão de vendas
function calculaVendas(vendas, leads) {
  const calculoVendas =  (vendas / leads) * 100;

  exibeResultadosVendas(calculoVendas.toFixed(2));
}


//Calculando taxa de CPM nas métricas
function calculaCPM(investimentoTrafego, impressoes){
  const calculoCPM = (investimentoTrafego / impressoes) * 1000;
  exibeResultadosCPM(calculoCPM.toFixed(2));
}

//Calculando taxa de CPC nas métricas
function calculaCPC(investimentoTrafego, cliques){
  const calculoCPC = investimentoTrafego / cliques;
  exibeResultadosCPC(calculoCPC.toFixed(2));
}

//Calculando taxa de CPA Lead nas métricas
function calculaCPALead(investimentoTrafego, leads){
  const calculoCPALead = investimentoTrafego / leads;
  exibeResultadosCPALeads(calculoCPALead.toFixed(2));
}

//Calculando taxa de CPA Venda nas métricas
function calculaCPAVenda(investimentoTrafego, vendas){
  let calculoCPAVenda = investimentoTrafego / vendas;
  if(vendas > 0){
    exibeResultadosCPAVendas(calculoCPAVenda.toFixed(2));
  }else{
    calculoCPAVenda = '-';
    exibeResultadosCPAVendas(calculoCPAVenda);
  }
}

//Calcula faturamento bruto nas métricas
function calculaFaturamentoBruto(vendas, ticketMedio){
  const calculoFaturamentoBruto = vendas * ticketMedio;
  exibeResultadosFaturamento(calculoFaturamentoBruto);
}

//Calcula ROAS nas métricas
function calculaROAS(vendas, ticketMedio, investimentoTrafego){
  const calculoFaturamentoBruto = vendas * ticketMedio;
  // const calculoLucro = calculoFaturamentoBruto - investimentoTrafego;
  let calculoRoas = calculoFaturamentoBruto / investimentoTrafego;
  let roasPercentual = calculoRoas * 100;
  if(calculoRoas > 0){
    calculoRoas = `+${calculoRoas}`;
    exibeResultadosROAS(calculoRoas, roasPercentual);
    console.log(calculoRoas)
  }else{
    calculoRoas = 0;
    exibeResultadosROAS(calculoRoas);
  }
  
}


//Exibindo resultados

//Exibe resultado de taxa de cliques
function exibeResultadosCliques(calculoCliques){
  resTaxaCliques.style.fontWeight = '600';
  resTaxaCliques.innerHTML = `${calculoCliques}%`
}

//Exibe resultado de taxa de ledas
function exibeResultadosLeads(calculoLeads){
  resTaxaLeads.style.fontWeight = '600';
  resTaxaLeads.innerHTML = `${calculoLeads}%`
}

//Exibe resultado de taxa de vendas
function exibeResultadosVendas(calculoVendas){
  resTaxaVendas.style.fontWeight = '600';
  resTaxaVendas.innerHTML = `${calculoVendas}%`
}

//Exibe resultado do CPM nas métricas
function exibeResultadosCPM(calculoCPM){
  cpmValor.style.fontWeight = '600';
  cpmValor.innerHTML = `R$ ${calculoCPM.toLocaleString('pt-BR', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
}

//Exibe resultado do CPC nas métricas
function exibeResultadosCPC(calculoCPC){
  cpcValor.style.fontWeight = '600';
  cpcValor.innerHTML = `R$ ${calculoCPC.toLocaleString('pt-BR', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
}

//Exibe resultado do CPA Leads nas métricas
function exibeResultadosCPALeads(calculoCPALead){
  cpaLeadValor.style.fontWeight = '600';
  cpaLeadValor.innerHTML = `R$ ${calculoCPALead.toLocaleString('pt-BR', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
}

//Exibe resultado do CPA Vendas nas métricas
function exibeResultadosCPAVendas(calculoCPAVenda){
  cpaVendaValor.style.fontWeight = '600';
  cpaVendaValor.innerHTML = `R$ ${calculoCPAVenda.toLocaleString('pt-BR', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
}

//Exibe resultado do Faturamento Bruto nas métricas
function exibeResultadosFaturamento(calculoFaturamentoBruto){
  if(calculoFaturamentoBruto > Number(investimentoTrafego.value)){
    faturamentoBruto.style.color = 'green';
    faturamentoBruto.style.fontWeight = '600';
    faturamentoBruto.innerHTML = `R$ ${calculoFaturamentoBruto.toLocaleString('pt-BR', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
  }else{
    faturamentoBruto.style.color = 'red';
    faturamentoBruto.style.fontWeight = '600';
    faturamentoBruto.innerHTML = `R$ ${calculoFaturamentoBruto.toLocaleString('pt-BR', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
  }
}

//Exibe resultado do ROAS nas métricas
function exibeResultadosROAS(resROAS, roasPercentual){
  roas.style.fontWeight = '600';
  roas.innerHTML = `R$ ${Number(resROAS).toFixed(2)} / ${roasPercentual.toLocaleString('pt-BR', {minimumFractionDigits: 2, maximumFractionDigits: 2})}%`;
}
