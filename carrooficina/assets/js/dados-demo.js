/* Dados da demonstração. Tudo fictício: OS, chamados, agências, pessoas, valores e horários.
   As mesmas OS aparecem no hero, na mesa explorável e nas cenas. Base: RS.
   Regras reproduzidas (comportamento real do VALAR OPS, ver REGISTRO_EVIDENCIAS_LANDING.md):
   - medição pelo ciclo de 21 a 20, pela conformidade do banco, com "Travado por chamado";
   - RAT com itens 1.1 Chamado e 1.2 Deslocamento fixos;
   - quantidades derivadas da Confecção (medida → item × fator). */
window.VALAR_DEMO = {

  /* ---------------------------------------------------------------
     OS (estado "agora", usado pela mesa explorável)
     trilho: 6 etapas do ciclo (feito | atual | trava | '')
     percurso: Execução, Documentação, Medição, Pagamento (ok | vez | trava | pendente)
     --------------------------------------------------------------- */
  os: [
    {
      id: '260251309', chamado: 'C041822731', ag: 'Ag. Serra Azul', uf: 'RS', esp: 'Civil',
      servico: 'Recuperação do piso da área de atendimento',
      valor: 'R$ 4.186,30 · 2 RATs',
      prazo: { tipo: 'trava', texto: 'Travado por chamado' },
      etapaNome: 'Medição',
      filtros: ['atencao', 'chamado', 'medicao'],
      trilho: ['feito', 'feito', 'feito', 'feito', 'trava', ''],
      percurso: ['ok', 'ok', 'trava', 'pendente'],
      pendencia: {
        tipo: 'trava', rotulo: 'Segura o chamado',
        titulo: 'Conformada, mas o chamado ainda não fechou',
        texto: 'O banco paga por chamado. O chamado C041822731 também agrupa a OS 260251377, que ainda aguarda conformidade. Até lá, os R$ 4.186,30 desta OS ficam fora do saldo do ciclo, em "Travado por chamado".',
        acao: '', link: { href: '#saldo', texto: 'Ver o chamado no saldo do ciclo' },
        nota: 'Na operação, a conformidade é do banco: o sistema mostra o valor retido e qual OS segura o chamado, e a equipe cobra.',
        resolucao: null
      },
      docs: [
        { nome: 'RAT 1', estado: 'ok', info: 'cadastrada e anexada' },
        { nome: 'RAT 2', estado: 'ok', info: 'cadastrada e anexada' },
        { nome: 'Conformidade do banco', estado: 'ok', info: '01/10' },
        { nome: 'OS 260251377 (mesmo chamado)', estado: 'trava', info: 'sem conformidade' }
      ],
      eventos: [
        { h: '06:10', t: 'Leitura do portal: OS conformada · chamado com OS irmã aberta · valor movido para "Travado por chamado"' },
        { h: 'ontem', t: 'Fechamento diário no grupo de medição: "cobrar as irmãs" do chamado C041822731' }
      ]
    },
    {
      id: '260279034', chamado: 'C041866019', ag: 'Ag. Lagoa Funda', uf: 'RS', esp: 'Hidráulica',
      servico: 'Troca da bomba de recalque',
      valor: 'R$ 3.177,90 · 1 RAT',
      prazo: { tipo: 'trava', texto: 'Travado por chamado' },
      etapaNome: 'Medição',
      filtros: ['atencao', 'chamado', 'medicao'],
      trilho: ['feito', 'feito', 'feito', 'feito', 'trava', ''],
      percurso: ['ok', 'ok', 'trava', 'pendente'],
      pendencia: {
        tipo: 'trava', rotulo: 'Segura o chamado',
        titulo: 'Conformada, esperando a OS irmã',
        texto: 'Conformidade do banco em 30/09. O chamado C041866019 tem outra OS sem conformidade, então os R$ 3.177,90 ficam fora do saldo do ciclo.',
        acao: '', link: { href: '#saldo', texto: 'Ver no saldo do ciclo' },
        nota: '',
        resolucao: null
      },
      docs: [
        { nome: 'RAT 1', estado: 'ok', info: 'cadastrada e anexada' },
        { nome: 'Conformidade do banco', estado: 'ok', info: '30/09' },
        { nome: 'OS irmã do chamado', estado: 'trava', info: 'sem conformidade' }
      ],
      eventos: [
        { h: '06:10', t: 'Leitura do portal: OS conformada · chamado com OS irmã aberta · valor em "Travado por chamado"' }
      ]
    },
    {
      id: '260251377', chamado: 'C041822731', ag: 'Ag. Serra Azul', uf: 'RS', esp: 'Civil',
      servico: 'Reparo da porta de vidro do autoatendimento',
      valor: 'R$ 1.402,60 · 1 RAT',
      prazo: { tipo: 'amanha', texto: 'Aguarda conformidade' },
      etapaNome: 'Medição',
      filtros: ['medicao'],
      trilho: ['feito', 'feito', 'feito', 'feito', 'atual', ''],
      percurso: ['ok', 'ok', 'vez', 'pendente'],
      pendencia: {
        tipo: 'info', rotulo: 'Segura o chamado',
        titulo: 'Aguardando a conformidade do banco',
        texto: 'Concluída pela prestadora em 29/09, com a RAT 1 registrada no portal. Enquanto o banco não registra a conformidade, a OS 260251309, do mesmo chamado, fica travada.',
        acao: '', link: { href: '#saldo', texto: 'Ver o chamado no saldo do ciclo' },
        nota: '',
        resolucao: null
      },
      docs: [
        { nome: 'RAT 1', estado: 'ok', info: 'cadastrada e anexada' },
        { nome: 'Conformidade do banco', estado: 'falta', info: 'aguardando' }
      ],
      eventos: [
        { h: '29/09', t: 'Concluída pelo fornecedor, com conferência das RATs por código e valor' }
      ]
    },
    {
      id: '260266050', chamado: 'C041907114', ag: 'Ag. Rio Manso', uf: 'RS', esp: 'Elétrica',
      servico: 'Revisão do quadro de distribuição',
      valor: 'R$ 812,90 · 1 RAT',
      prazo: { tipo: 'hoje', texto: 'RAT devolvida' },
      etapaNome: 'Documentação',
      filtros: ['atencao', 'rat'],
      trilho: ['feito', 'feito', 'feito', 'trava', '', ''],
      percurso: ['ok', 'trava', 'pendente', 'pendente'],
      pendencia: {
        tipo: 'falta', rotulo: 'Devolvida com motivo',
        titulo: 'A foto da RAT 1 chegou cortada no pé da folha',
        texto: 'Faltaram as datas de início e saída e o carimbo do responsável técnico. O motivo foi publicado no grupo da agência às 11:20, com o pedido de foto da folha inteira.',
        acao: 'Simular o reenvio da foto inteira',
        nota: 'No exemplo, o botão altera só esta demonstração. Na operação, quem reenvia é o técnico, pelo grupo.',
        resolvidoTexto: 'Foto inteira recebida, conferida, cadastrada e anexada no portal (exemplo).',
        resolucao: {
          hora: '15:12', evento: 'Foto inteira recebida · conferida · RAT 1 cadastrada e anexada no Portal BB · resposta no grupo',
          prazo: { tipo: 'ok', texto: 'Pronta p/ conclusão' },
          trilho: ['feito', 'feito', 'feito', 'feito', 'atual', ''],
          percurso: ['ok', 'vez', 'pendente', 'pendente'],
          filtros: ['todas'],
          etapaNome: 'Documentação',
          docs: [
            { nome: 'RAT 1', estado: 'ok', info: 'cadastrada e anexada · 15:12' },
            { nome: 'Fotos de conclusão', estado: 'ok', info: '4 de 4' }
          ]
        }
      },
      docs: [
        { nome: 'RAT 1', estado: 'trava', info: 'devolvida · 11:20' },
        { nome: 'Fotos de conclusão', estado: 'ok', info: '4 de 4' }
      ],
      eventos: [
        { h: '11:20', t: 'Conferência: folha cortada no pé · motivo publicado no grupo, nada foi ao portal' },
        { h: '11:18', t: 'Foto da RAT 1 recebida no grupo da agência' },
        { h: '08:47', t: 'RAT 1 emitida · e-mail ao gerente e à caixa da agência aceito · comprovante nos grupos' }
      ]
    },
    {
      id: '260288241', chamado: 'C041955082', ag: 'Ag. Morro Claro', uf: 'RS', esp: 'Hidráulica',
      servico: 'Reparo de vazamento no banheiro dos funcionários',
      valor: 'sem RAT',
      prazo: { tipo: 'amanha', texto: 'Reitera amanhã' },
      etapaNome: 'Execução',
      filtros: ['atencao'],
      trilho: ['feito', 'atual', '', '', '', ''],
      percurso: ['vez', 'pendente', 'pendente', 'pendente'],
      pendencia: {
        tipo: 'falta', rotulo: 'Sem previsão',
        titulo: 'Atendimento ainda sem previsão',
        texto: 'A OS entrou na coleta das 13:30. Pela régua do contrato, o banco reitera amanhã se não houver atendimento. A régua é previsão, não certeza.',
        acao: 'Incluir no cronograma de amanhã',
        nota: 'No exemplo, o botão altera só esta demonstração. Na operação, a equipe monta o cronograma e confirma cada envio.',
        resolvidoTexto: 'Incluída no cronograma de amanhã: roteiro de campo para a equipe e previsão pronta para registrar no portal (exemplo).',
        resolucao: {
          hora: '15:20', evento: 'Incluída no cronograma de amanhã · roteiro de campo gerado · previsão pronta para o portal',
          prazo: { tipo: 'ok', texto: 'Prevista amanhã' },
          filtros: ['todas'],
          etapaNome: 'Execução',
          docs: [{ nome: 'Roteiro de campo', estado: 'ok', info: 'gerado · 15:20' }]
        }
      },
      docs: [
        { nome: 'Roteiro de campo', estado: 'falta', info: 'a gerar' }
      ],
      eventos: [
        { h: '13:30', t: 'Coletada do Portal BB · aviso publicado no grupo da agência' }
      ]
    },
    {
      id: '260311872', chamado: 'C041930558', ag: 'Ag. Pedra Alta', uf: 'RS', esp: 'Elétrica',
      servico: 'Troca das luminárias da sala de autoatendimento',
      valor: 'R$ 1.320,40 · 1 RAT',
      prazo: { tipo: 'amanha', texto: 'Falta relatório' },
      etapaNome: 'Documentação',
      filtros: ['documentos'],
      trilho: ['feito', 'feito', 'feito', 'feito', 'atual', ''],
      percurso: ['ok', 'vez', 'pendente', 'pendente'],
      pendencia: {
        tipo: 'falta', rotulo: 'Falta',
        titulo: 'Relatório fotográfico de conclusão',
        texto: 'A RAT 1 está cadastrada e anexada no portal desde as 14:35, com o valor relido. As 6 fotos de conclusão já estão no acervo da OS.',
        acao: 'Gerar relatório de conclusão',
        nota: 'No exemplo, o botão altera só esta demonstração. Na operação, a equipe escolhe as fotos e revisa o relatório antes do anexo.',
        resolvidoTexto: 'Relatório gerado em Word editável e em PDF, pronto para a revisão da equipe (exemplo).',
        resolucao: {
          hora: '15:05', evento: 'Relatório de conclusão gerado (Word e PDF) · aguardando revisão da equipe',
          prazo: { tipo: 'ok', texto: 'Em revisão' },
          filtros: ['todas'],
          docs: [
            { nome: 'RAT 1', estado: 'ok', info: 'cadastrada e anexada · 14:35' },
            { nome: 'Fotos de conclusão', estado: 'ok', info: '6 de 6' },
            { nome: 'Relatório de conclusão', estado: 'falta', info: 'em revisão' }
          ]
        }
      },
      docs: [
        { nome: 'RAT 1', estado: 'ok', info: 'cadastrada e anexada · 14:35' },
        { nome: 'Fotos de conclusão', estado: 'ok', info: '6 de 6' },
        { nome: 'Relatório de conclusão', estado: 'falta', info: 'pendente' }
      ],
      eventos: [
        { h: '14:35', t: 'RAT 1 cadastrada e anexada no Portal BB · valor relido: R$ 1.320,40 · resposta no grupo' },
        { h: '14:33', t: 'Conferência aprovada: RAT do sistema, legível, folha inteira, itens, datas e assinaturas' },
        { h: '14:32', t: 'Foto da RAT 1 recebida no grupo da agência' },
        { h: '09:12', t: 'RAT 1 emitida · e-mail ao gerente e à caixa da agência aceito · comprovante nos grupos' }
      ]
    },
    {
      id: '260274466', chamado: 'C041871240', ag: 'Ag. Campo Largo', uf: 'RS', esp: 'Climatização',
      servico: 'Manutenção corretiva do condicionador da sala técnica',
      valor: 'R$ 3.912,60 · 2 RATs',
      prazo: { tipo: 'ok', texto: 'No ciclo' },
      etapaNome: 'Medição',
      filtros: ['medicao'],
      trilho: ['feito', 'feito', 'feito', 'feito', 'atual', ''],
      percurso: ['ok', 'ok', 'vez', 'pendente'],
      pendencia: {
        tipo: 'info', rotulo: 'Na medição',
        titulo: 'Conformada no ciclo de 21/09 a 20/10',
        texto: 'O banco registrou a conformidade em 02/10, data que põe a OS neste ciclo. O valor no portal confere com as RATs 1 e 2. O número final do ciclo vem da planilha do banco.',
        acao: '', link: { href: '#apuracao', texto: 'Ver como o saldo do ciclo é montado' },
        nota: '',
        resolucao: null
      },
      docs: [
        { nome: 'RAT 1', estado: 'ok', info: 'cadastrada e anexada' },
        { nome: 'RAT 2', estado: 'ok', info: 'cadastrada e anexada' },
        { nome: 'Relatório de conclusão', estado: 'ok', info: 'anexado' },
        { nome: 'Conformidade do banco', estado: 'ok', info: '02/10' }
      ],
      eventos: [
        { h: '02/10', t: 'Leitura do portal: conformidade registrada pelo banco · OS entra no saldo do ciclo' },
        { h: '30/09', t: 'Concluída pelo fornecedor, com conferência das RATs por código e valor' }
      ]
    },
    {
      id: '260309415', chamado: '', ag: 'Ag. Vale das Garças', uf: 'RS', esp: 'Civil',
      servico: 'Substituição do forro da tesouraria',
      valor: 'orçamento R$ 2.906,80',
      prazo: { tipo: 'ok', texto: 'Com o banco' },
      etapaNome: 'Orçamento',
      filtros: ['documentos'],
      trilho: ['feito', 'atual', '', '', '', ''],
      percurso: ['vez', 'pendente', 'pendente', 'pendente'],
      pendencia: {
        tipo: 'info', rotulo: 'Enviado',
        titulo: 'Orçamento no portal, aguardando o banco',
        texto: 'Planilha e PDF do relatório foram anexados e os itens cadastrados na aba Orçamento às 14:40, numa sessão só. A mesa avisa quando a situação mudar no portal.',
        acao: '', link: { href: '#documentos', texto: 'Ver os documentos deste orçamento' },
        nota: '',
        resolucao: null
      },
      docs: [
        { nome: 'Orc.260309415_Portal.xlsx', estado: 'ok', info: 'anexada · 14:40' },
        { nome: 'Relatório fotográfico (PDF)', estado: 'ok', info: 'anexado · 14:40' },
        { nome: 'Relatório fotográfico (Word)', estado: 'ok', info: 'editável, no acervo' }
      ],
      eventos: [
        { h: '14:40', t: 'Dossiê enviado ao Portal BB: planilha, PDF e itens do orçamento · releitura confere' },
        { h: '14:38', t: 'Equipe aprovou o orçamento revisado' },
        { h: '14:05', t: 'Planilha, relatório em Word e PDF gerados a partir da mesma base' }
      ]
    }
  ],

  /* ---------------------------------------------------------------
     Hero: mesa com eventos (estado inicial útil e sequência curta)
     --------------------------------------------------------------- */
  hero: {
    resumoInicial: { abertas: 8, atencao: 3, portal: 3 },
    linhas: [
      { os: '260311872', prazo: { tipo: 'amanha', texto: 'Reitera amanhã' }, icone: 'doc', evento: 'RAT 1 emitida e enviada ao gerente · aguardando assinatura em campo', trilho: ['feito', 'feito', 'atual', '', '', ''] },
      { os: '260309415', prazo: { tipo: 'hoje', texto: 'Cai hoje' }, icone: 'doc', evento: 'Orçamento pronto para revisão · 18,00 m² de forro', trilho: ['feito', 'atual', '', '', '', ''] },
      { os: '260251309', prazo: { tipo: 'trava', texto: 'Travado por chamado' }, icone: 'trava', evento: 'Conformada · o chamado C041822731 ainda tem OS sem conformidade', trilho: ['feito', 'feito', 'feito', 'feito', 'trava', ''] },
      { os: '260274466', prazo: { tipo: 'ok', texto: 'No ciclo' }, icone: 'medicao', evento: 'Conformidade do banco em 02/10 · no saldo do ciclo', trilho: ['feito', 'feito', 'feito', 'feito', 'atual', ''] },
      { os: '260288241', prazo: { tipo: 'amanha', texto: 'Reitera amanhã' }, icone: 'coleta', evento: 'Coletada do Portal BB às 13:30 · aviso no grupo da agência', trilho: ['atual', '', '', '', '', ''] }
    ],
    feedInicial: [
      { h: '14:05', os: '260309415', texto: 'planilha, Word e PDF gerados da mesma base' },
      { h: '13:52', os: '260274466', texto: 'RAT 2 registrada no portal · valor relido confere' },
      { h: '13:30', os: '260288241', texto: 'coletada do Portal BB · aviso no grupo' }
    ],
    sequencia: [
      { h: '14:32', os: '260311872', icone: 'wa', texto: 'foto da RAT assinada recebida no grupo', linha: 'Foto da RAT 1 recebida no grupo · conferindo', trilho: ['feito', 'feito', 'feito', 'atual', '', ''] },
      { h: '14:33', os: '260311872', icone: 'ok', texto: 'conferência aprovada: folha inteira, itens, datas e assinaturas', linha: 'RAT 1 conferida · cadastrando no portal' },
      { h: '14:35', os: '260311872', icone: 'portal', texto: 'RAT cadastrada e anexada no portal · valor relido: R$ 1.320,40', linha: 'RAT 1 cadastrada e anexada no portal · resposta no grupo', trilho: ['feito', 'feito', 'feito', 'feito', 'atual', ''], prazo: { tipo: 'ok', texto: 'Pronta p/ conclusão' }, resumo: { atencao: 2, portal: 5 } },
      { h: '14:38', os: '260309415', icone: 'ok', texto: 'equipe aprovou o orçamento revisado', linha: 'Orçamento aprovado pela equipe · preparando o dossiê' },
      { h: '14:40', os: '260309415', icone: 'portal', texto: 'dossiê no portal: planilha, PDF e itens numa sessão', linha: 'Dossiê anexado no portal · releitura confere', prazo: { tipo: 'ok', texto: 'Com o banco' }, resumo: { atencao: 1, portal: 8 } },
      { h: '14:46', os: '260251309', icone: 'medicao', texto: 'R$ 4.186,30 travados por chamado · OS irmã sem conformidade', linha: 'R$ 4.186,30 fora do saldo até a OS irmã ter conformidade' }
    ]
  },

  /* Dados da RAT impressa usados nas cópias (a foto cortada é a RAT da OS 260266050) */
  ratVariantes: {
    'rio-manso': {
      os: '260266050', chamado: 'C041907114', prefixo: '9533', dependencia: 'Ag. Rio Manso · RS',
      servico: 'Revisão do quadro de distribuição.',
      itens: [['1.1', 'Chamado', '1', 'un', '96,00', '96,00', true], ['1.2', 'Deslocamento', '64', 'km', '2,80', '179,20', true], ['4.31', 'Revisão de quadro de distribuição', '1', 'un', '537,70', '537,70', false]],
      mo: '537,70', total: '812,90', carimbo: 'Ag. Rio Manso<br>gerência<br>06/10/2026'
    }
  },

  /* ---------------------------------------------------------------
     Ciclo do contrato (6 etapas, os 6 vértices do hexágono)
     selo: auto | assistido | humano
     --------------------------------------------------------------- */
  ciclo: [
    {
      curto: 'Acionamento', selo: 'auto',
      titulo: 'A OS chega do Portal BB e entra na mesa',
      resumo: 'O portal é lido ao longo do dia útil e numa consulta profunda de madrugada. OS nova ou que muda de situação aparece na mesa e gera aviso no grupo da agência.',
      entra: 'OS aberta no portal, com chamado, dependência, criticidade, acionamento e prazo.',
      faz: 'Espelha a situação de cada OS e calcula a régua do contrato: vence hoje, Reitera amanhã, Cai hoje.',
      equipe: 'Faz a triagem e define previsão, equipe e veículo.',
      avanca: 'A OS tem previsão de atendimento.',
      link: { href: '#mesa', texto: 'Ver a mesa em movimento' }
    },
    {
      curto: 'Preparação', selo: 'assistido',
      titulo: 'Orçamento, cronograma e campo',
      resumo: 'A equipe compõe o orçamento na Confecção e monta o cronograma. O roteiro sai para o campo e a previsão pode ir ao portal como observação.',
      entra: 'Levantamento com ambientes, medidas e fotos, mais os itens da tabela do contrato.',
      faz: 'Calcula quantidades derivadas e gera planilha no modelo do banco, relatório em Word e PDF. Monta o roteiro de campo.',
      equipe: 'Revisa itens e medidas, aprova o orçamento e confirma cada envio ao portal.',
      avanca: 'Orçamento no portal e atendimento programado.',
      link: { href: '#documentos', texto: 'Ver uma medida virar três documentos' }
    },
    {
      curto: 'RAT', selo: 'assistido',
      titulo: 'RAT emitida e enviada para assinatura',
      resumo: 'A RAT sai da tabela do contrato em PDF e segue por e-mail ao gerente e à caixa da agência, com o pedido de assinatura e de registro da conformidade.',
      entra: 'Itens executados, escolhidos na tabela contratual.',
      faz: 'Gera o PDF, envia o e-mail e só publica o comprovante nos grupos depois que o servidor de e-mail aceita a mensagem.',
      equipe: 'Confere itens e quantidades e emite. Em campo, técnico e dependência assinam.',
      avanca: 'RAT assinada em campo.',
      link: { href: '#rat', texto: 'Acompanhar uma RAT' }
    },
    {
      curto: 'Portal', selo: 'auto',
      titulo: 'A foto assinada vira registro no portal',
      resumo: 'O técnico manda a foto da RAT no grupo, como já faz. O VALAR OPS confere, cadastra e anexa no portal, relê o valor e responde no grupo.',
      entra: 'Foto da RAT assinada no grupo da agência.',
      faz: 'Confere a foto, cadastra a RAT, anexa um PDF único da folha assinada e relê o portal para provar o valor.',
      equipe: 'Reenvia quando a foto volta com motivo. Concluir a OS continua sendo decisão da equipe.',
      avanca: 'Registro confirmado pela releitura do portal.',
      link: { href: '#rat', texto: 'Ver a conferência e o registro' }
    },
    {
      curto: 'Medição', selo: 'auto',
      titulo: 'Conformidade do banco e saldo do ciclo',
      resumo: 'Todo dia útil o sistema lê a situação das OS no portal e monta o saldo do ciclo de 21 a 20: o que aguarda conformidade, o que entrou e o que o chamado segura.',
      entra: 'Conformidade registrada pelo banco no portal e, quando chega, a planilha de fechamento do banco.',
      faz: 'Separa pendentes de conformidade, conformadas do ciclo e travadas por chamado, e explica cada variação do saldo. Confere a planilha do banco chave a chave.',
      equipe: 'Cobra conformidades e as OS que seguram um chamado. Anexa a planilha do banco.',
      avanca: 'OS conformada e com o chamado completo.',
      link: { href: '#apuracao', texto: 'Ver o saldo do ciclo' }
    },
    {
      curto: 'Pagamento', selo: 'assistido',
      titulo: 'Do pagamento previsto ao pago',
      resumo: 'A planilha do banco traz a data prevista de pagamento do ciclo e o portal marca a OS como paga. A mesa mostra os dois, cada um com a sua origem.',
      entra: 'Planilha de fechamento do banco e a situação "Pagamento realizado" no portal.',
      faz: 'Lê a situação de pagamento e cruza com a planilha do ciclo: confere, confere pelo chamado, valor divergente, só no banco, só no sistema.',
      equipe: 'Trata as divergências e acompanha o recebimento no financeiro da empresa.',
      avanca: 'OS paga, no ciclo indicado pela planilha do banco.',
      link: { href: '#medicao', texto: 'Explorar as OS da medição' }
    }
  ],

  /* ---------------------------------------------------------------
     Cenas da RAT (legendas). selos: [tipo, rótulo]
     --------------------------------------------------------------- */
  rat: {
    cenas: [
      {
        selos: [['assistido', 'Sistema prepara'], ['humano', 'Equipe revisa']],
        titulo: 'Itens revisados, RAT pronta para emitir',
        texto: 'A Estação de RAT parte da tabela do contrato. Chamado e deslocamento entram sozinhos; a equipe escolhe os itens executados, confere quantidades e emite.',
        destaque: 'Itens, códigos e preços desta cena são fictícios. Na operação, vêm da tabela do contrato vigente.'
      },
      {
        selos: [['auto', 'Automático']],
        titulo: 'PDF gerado, e-mail aceito, comprovante no grupo',
        texto: 'A RAT segue por e-mail para o gerente e para a caixa da agência, com o pedido de assinatura e de registro da conformidade no portal do banco. O comprovante só aparece nos grupos depois que o servidor de e-mail aceita a mensagem.',
        destaque: 'Sem aceite do e-mail, não há comprovante. O grupo não recebe um "enviado" que não aconteceu.'
      },
      {
        selos: [['humano', 'Campo']],
        titulo: 'Execução e assinatura em campo',
        texto: 'O técnico executa o serviço. A RAT recebe o visto da empresa contratada e o carimbo e visto da dependência, no papel.',
        destaque: 'O sistema não assina por ninguém.'
      },
      {
        selos: [['humano', 'Técnico envia'], ['auto', 'Sistema reconhece']],
        titulo: 'A foto chega no grupo da agência',
        texto: 'O técnico fotografa a RAT assinada e manda no grupo, como já faz hoje. O VALAR OPS reconhece a foto entre as mensagens e avisa que começou.',
        destaque: 'Tudo o que o sistema faz com a foto é avisado no próprio grupo, etapa por etapa.*'
      },
      {
        selos: [['auto', 'Automático']],
        titulo: 'Conferência antes de qualquer registro',
        texto: 'A foto passa por checagens: é RAT do sistema, está legível, a folha está inteira, a OS existe, itens e valor batem com a emissão, as datas conferem e as assinaturas estão lá.',
        destaque: 'Leitura óptica e classificação de imagem rodam no servidor da operação. Nada é cadastrado se uma checagem falhar.',
        correcao: {
          selos: [['auto', 'Automático'], ['humano', 'Técnico corrige']],
          titulo: 'Voltou com motivo, voltou corrigida',
          texto: 'Quando uma checagem falha, nada vai ao portal. O motivo vai ao grupo com o pedido certo; o técnico reenvia e a conferência recomeça.',
          destaque: 'Exemplo real de motivo: folha cortada no pé, sem as datas de início e saída e sem o carimbo do responsável técnico.'
        }
      },
      {
        selos: [['auto', 'Automático'], ['humano', 'Equipe conclui']],
        titulo: 'Cadastrada, anexada, relida e respondida',
        texto: 'Aprovada, a RAT é cadastrada no Portal BB, a folha assinada é anexada como um PDF único e o valor é relido no portal para provar o registro. O grupo recebe a confirmação.',
        destaque: 'Anexar a RAT não conclui a OS. O sistema para em "pronta para conclusão" e a decisão fica com a equipe.'
      }
    ]
  },

  /* ---------------------------------------------------------------
     Orçamento demonstrativo (preços e códigos fictícios; regra explícita)
     origem: medida (memória de cálculo) ou derivada de outro item × fator
     --------------------------------------------------------------- */
  orcamento: {
    medidaInicial: 18, min: 6, max: 40, passo: 0.5, largura: 4,
    itens: [
      { id: 'for', cod: 'F.1', nome: 'Forro de gesso acartonado', un: 'm²', origem: 'medida', fator: 1, casas: 2, preco: 74.5, regra: 'medida × 1' },
      { id: 'ret', cod: 'F.2', nome: 'Retirada do forro existente', un: 'm²', origem: 'for', fator: 1, casas: 2, preco: 14.8, regra: 'derivada de F.1 × 1' },
      { id: 'ent', cod: 'F.3', nome: 'Remoção de entulho', un: 'm³', origem: 'for', fator: 0.15, casas: 2, preco: 96, regra: 'derivada de F.1 × 0,15' },
      { id: 'pin', cod: 'F.4', nome: 'Pintura do forro, duas demãos', un: 'm²', origem: 'medida', fator: 1, casas: 2, preco: 22.9, regra: 'medida × 1' },
      { id: 'ema', cod: 'F.5', nome: 'Emassamento do forro', un: 'm²', origem: 'pin', fator: 1, casas: 2, preco: 19.6, regra: 'derivada de F.4 × 1' }
    ],
    fixos: { nome: 'Chamado e deslocamento (itens 1.1 e 1.2)', valor: 275.2, regra: 'entram pela regra do contrato' }
  },

  /* ---------------------------------------------------------------
     Gerente × dono (cada ganho aponta para a demonstração)
     --------------------------------------------------------------- */
  ganhos: {
    gerente: [
      { titulo: 'A manhã começa pela mesa', texto: 'Régua de prazo, previsão e pendência de cada OS num lugar só: vence hoje, Reitera amanhã, Cai hoje.', onde: 'mesa de OS', href: '#mesa' },
      { titulo: 'A RAT não se perde no grupo', texto: 'A foto assinada é reconhecida, conferida e registrada no portal. Quando volta, volta com o motivo e o pedido certo.', onde: 'cenas da RAT', href: '#rat' },
      { titulo: 'Documentos que concordam entre si', texto: 'Planilha, relatório e PDF saem da mesma base e vão ao portal numa sessão, depois da sua revisão.', onde: 'documentos', href: '#documentos' },
      { titulo: 'Gravação no portal com prova', texto: 'As gravações terminam numa releitura. Sem prova, a ação fica marcada como efeito desconhecido e não é repetida às cegas.', onde: 'ciclo do contrato', href: '#ciclo' }
    ],
    dono: [
      { titulo: 'Saldo do ciclo todo dia útil', texto: 'O que aguarda conformidade, o que entrou no ciclo e o que o chamado segura, com a explicação de cada variação do saldo.', onde: 'medição', href: '#apuracao' },
      { titulo: 'Dinheiro retido com nome e motivo', texto: 'Quando um chamado segura o pagamento, o saldo mostra o valor parado e qual OS falta para liberar.', onde: 'saldo do ciclo', href: '#saldo' },
      { titulo: 'Planilha do banco conferida', texto: 'Chave a chave contra a apuração, com veredito: confere, confere pelo chamado, valor divergente, só no banco, só no sistema.', onde: 'medição', href: '#apuracao' },
      { titulo: 'Equipe no que pede decisão', texto: 'Coleta, avisos, conferência e registro da RAT rodam sozinhos. A equipe fica com orçamento, encaminhamentos e conclusão.', onde: 'ciclo do contrato', href: '#ciclo' }
    ]
  }
};
