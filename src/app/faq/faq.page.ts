import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.page.html',
  styleUrls: ['./faq.page.scss'],
})
export class FaqPage implements OnInit {
  arrayFaq = [
    {
      cod: '1',
      pergunta: 'Quem pode doar?',
      resposta: 'Qualquer pessoa com idade entre 18 e 69 anos que pese mais de 50 quilos. Jovens de 16 ou 17anos também estão aptos, desde que tenham o consentimento dos pais ou dos responsáveis.'
    },
    {
      cod: '2',
      pergunta: 'Quanto tempo demora?',
      resposta: 'A coleta do sangue é bem rápida: leva de 8 a 12 minutos. Antes, o doador faz uma triagem e passa algumas informações de saúde para os funcionários do local.'
    },
    {
      cod: '3',
      pergunta: 'O procedimento oferece algum  perigo?',
      resposta: 'Não. A doação é totalmente segura e não apresenta nenhum risco. Os materiais utilizados, como a agulha e os cateteres, são descartáveis.'
    },
    {
      cod: '4',
      pergunta: '',
      resposta: 'Em média, são coletados 450 mililitros. Esse volume pode salvar a vida de até quatro pessoas.'
    },
    {
      cod: '5', pergunta: '- Mas meu corpo não vai sentir falta desse sangue?',
      resposta: 'Não. Nós possuímos cerca de 5 litros do líquido vermelho circulando pelos vasos. A retirada não prejudica em nada: o organismo repõe e alcança os níveis normais em até 72 horas.'
    },
    {
      cod: '6',
      pergunta: 'Onde eu posso doar?',
      resposta: 'Nos principais hospitais e hemocentros próximos da sua casa. Para mais informações, acesse o site do Ministério da Saúde ou das secretarias de saúde estaduais e municipais.'
    },
    {
      cod: '7',
      pergunta: 'Existem algumas doenças que impedem a doação de sangue?',
      resposta: 'Sim. Doenças infecciosas, como a gripe, e inflamatórias, como aquelas que atacam o intestino,exigem que a doação seja postergada para outra data. Em caso de dúvida, converse com o profissional de saúde do hemocentro para saber se tudo está ok.'
    },
    {
      cod: '8',
      pergunta: 'E o que eu preciso levar no dia da doação?',
      resposta: 'Apenas um documento original com foto.'
    },
    {
      cod: '9',
      pergunta: 'Posso doar apresentando cópia de documentos?',
      resposta: 'Não. A Legislação exige que seja apresentado um documento oficial com foto. Essa medida é muito importante para identificar você corretamente e evitar erros na emissão dos seus resultados de exames.'
    },
    {
      cod: '10',
      pergunta: 'Posso apresentar CNH digital para doar sangue?',
      resposta: 'Sim. O Hemocentro está preparado para fazer a sua identificação.'
    },
    {
      cod: '11',
      pergunta: 'Eu fiz uma cirurgia recentemente. Posso doar sangue?',
      resposta: 'Você deve esperar 72 horas para doar sangue após uma extração dentária. Operações simples, como apendicite e retirada de varizes, pedem 3 meses.Procedimentos mais complexos, como a remoção da tireoide ou de um rim, meio ano.Caso você tenha passado por uma transfusão de sangue ou fez uma tatuagem, é importante aguardar por um ano.'
    },
    {
      cod: '12',
      pergunta: 'E quanto tempo eu tenho que esperar entre uma doação e outra?',
      resposta: 'Os homens podem visitar o banco de sangue a cada 60 dias. Já as mulheres devem aguardar três meses.'
    },
    {
      cod: '13',
      pergunta: 'Qual o limite de doações de sangue?',
      resposta: 'Podem ser realizadas até 04 doações de sangue por ano.'
    },
    {
      cod: '14',
      pergunta: 'E depois de doar sangue? Devo seguir alguma recomendação médica?',
      resposta: 'Sim. Evite esforços físicos, beba bastante água, não fume por duas horas e evite ingerir álcool pelo resto do dia. Também é importante não praticar esportes radicais, como paraquedismo ou mergulho, ou dirigir veículos de grande porte.'
    },
    {
      cod: '15',
      pergunta: 'Posso Ingerir bebidas alcoólicas antes da doação?',
      resposta: 'A ingestão de álcool na dose máxima de 40g impede a doação por um prazo de 12 horas. Consumo em dose superior impedirá a doação por 24h.'
    },
    {
      cod: '16',
      pergunta: 'Posso aproveitar a doação de sangue e fazer meu cadastro para doar medula óssea?',
      resposta: 'Sim. É possível aproveitar a coleta de sangue e realizar o cadastro para doar medula óssea. Porém, é muito importante atualizar os dados no Hemocentro em caso de mudança de endereço e telefone pois precisaremos localizá-lo caso haja algum paciente compatível.'
    },
  ];

  mostraArray = false;
  constructor() { }

  ngOnInit() {
  }

  mostraResposta(item: any) {
    this.arrayFaq.forEach(element => {
      if (element.cod == item.cod) {
        this.mostraArray = !this.mostraArray
      }
    });

  }

}
