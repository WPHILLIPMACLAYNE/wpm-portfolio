# 08 — Muzli Top 100 Portfolio Lessons

Data: 2026-05-05

Fonte principal:
- `https://muz.li/blog/top-100-most-creative-and-unique-portfolio-websites-of-2024/`

Objetivo: transformar a lista da Muzli em criterios praticos para elevar o WPM.OS sem copiar layout, texto, imagens, cores, logos, interacoes proprietarias ou identidade de nenhum portfolio.

## Leitura Da Fonte

A Muzli publicou em 2024 uma curadoria de 100 portfolios criativos e visualmente fortes. O proprio artigo reforca dois pontos importantes:
- a ordem dos sites e aleatoria, nao um ranking;
- nem todo portfolio experimental serve para todo objetivo profissional.

Conclusao para WPM.OS:
- nao devemos copiar o site mais "barulhento";
- devemos escolher os principios que combinam com Wallace: operacao real, tecnologia aplicada, produto, escrita tecnica, UX e capacidade de construir sistemas.

## Padroes Que Aparecem Na Lista

### 1. Uma Ideia-Mae Forte

Os melhores portfolios nao parecem uma pagina com secoes. Eles parecem um objeto: filme, estudio, arquivo, sistema, indice, manifesto, galeria, experiencia, maquina, livro, jogo ou dossier.

Aplicacao WPM.OS:
- a ideia-mae ja existe: um sistema operacional autoral;
- a correcao nao deve trocar essa identidade;
- deve aprofundar a sensacao de "estou navegando um sistema real criado pelo Wallace".

### 2. Primeira Dobra Com Assinatura

O primeiro viewport precisa parecer decidido. Em portfolios premium, a tela inicial tem uma composicao clara: tipografia forte, pouco ruído, ritmo, contraste e um gesto memoravel.

Aplicacao WPM.OS:
- `/projects` nao pode abrir como "Project Library" generico;
- precisa abrir como indice curado de dois trabalhos reais;
- a tela deve comunicar: "existem poucos projetos porque estes sao os corpos de trabalho publicaveis agora".

### 3. Work Index Como Peça Editorial

Portfolios fortes tratam projetos como obras, casos ou capitulos, nao como cards de template. Mesmo quando usam listas simples, ha escala, numeracao, relacao com imagem, metadata e movimento.

Aplicacao WPM.OS:
- os dois projetos devem ganhar numeracao `01` / `02`;
- cada projeto precisa ter uma presenca visual propria;
- a capa do livro deve aparecer;
- WPM Gestao Interna deve ter uma visualizacao abstrata segura, sem dados sensiveis nem screenshot de login.

### 4. Media System, Nao Decoração

Muitos exemplos da lista usam video, 3D, fotografia, WebGL, ilustração ou cartazes. O ponto comum nao e "usar mídia"; e criar uma gramatica visual reconhecivel.

Aplicacao WPM.OS:
- usar a capa do livro como artefato editorial real;
- criar fallback visual code-native para o sistema operacional de academias;
- evitar placeholder vazio;
- evitar imagem que nao conversa com a interface.

### 5. Motion Com Propósito

As referencias boas usam motion para revelar estado: entrada, selecao, carregamento, exploracao, hover, foco e transicao. Movimento sem papel vira adorno.

Aplicacao WPM.OS:
- hover/focus dos projetos deve parecer interacao de sistema;
- transicoes devem ser sutis e legiveis;
- respeitar `prefers-reduced-motion`;
- nao adicionar audio, WebGL novo ou loader pesado nesta correcao P6.

### 6. Tipografia Como Produto

Ha portfolios que vencem pelo texto gigante, outros pela microtipografia. Em todos, a tipografia tem intencao: escala, alinhamento, line-height, peso, contraste e espaco.

Aplicacao WPM.OS:
- headings devem ter mais coragem onde a tela pede assinatura;
- labels mono devem parecer sistema, nao ruido;
- texto longo no mobile precisa quebrar corretamente;
- chips/tags nunca podem expandir a viewport.

### 7. Prova Real No Lugar De Claim

Muitos exemplos exibem clientes, anos, premios, publicacoes, projetos, areas de atuacao ou autoria. Isso funciona quando e verdadeiro.

Aplicacao WPM.OS:
- prova real permitida: WPM Gestao Interna, livro LLMs e Agentes de Codigo, formacao, certificacoes, experiencia operacional, stacks confirmadas;
- proibido inventar awards, clientes, resultados, receita, datas, cargos ou metricas;
- nada de dados sensiveis de academia, aluno, unidade, keys, anon_key ou informacao interna.

### 8. Mobile Como Tela Desenhada

Portfolio premium nao e desktop empilhado no celular. A versao mobile reorganiza densidade, texto, imagem, toque, spacing e footer.

Aplicacao WPM.OS:
- corrigir overflow em `/projects`, `/about` e `/skills`;
- garantir `min-w-0`, `max-w-full`, `break-words`, `whitespace-normal` e padding inferior;
- footer fixo nao pode cobrir conteudo;
- validar em 390x844.

### 9. Curadoria, Nao Acúmulo

A lista tem muitos estudios e criativos com trabalhos extensos, mas a sensacao premium vem de curadoria: escolher o que merece destaque.

Aplicacao WPM.OS:
- nesta fase, dois projetos reais sao suficientes;
- remover ou esconder tudo que pareca placeholder;
- `/skills` deve ser mapa de competencias, nao despejo de tags;
- `/resume` deve virar uma leitura limpa, nao um curriculo colado.

## Direcao Adaptada Para O WPM.OS

### Norte Criativo

WPM.OS deve parecer:
- um sistema operacional autoral;
- um dossier interativo de trabalho real;
- um portfolio de produto/UX/operacao com sensibilidade de creative development;
- escuro, preciso, tecnico, com alma;
- menos "site que lista coisas" e mais "maquina que revela evidencias".

### Frase De Qualidade

"Poucos projetos, tratados como artefatos reais dentro de uma maquina autoral."

### P6 Deve Melhorar Agora

Sem abrir novo escopo de arquitetura, a proxima correcao deve:
- transformar `/projects` em work index premium;
- renderizar a capa do livro;
- criar visual seguro para WPM Gestao Interna;
- eliminar overflow mobile;
- remover redundancia de skills;
- deixar a copy fiel ao CV;
- aumentar hierarquia visual sem quebrar WPM.OS.

## Gate De Reprovacao Codex

Codex deve reprovar se:
- a tela ainda parecer lista generica de cards;
- a capa do livro continuar invisivel;
- o sistema de academias nao tiver nenhuma representacao visual segura;
- mobile cortar texto ou cards;
- `/skills` continuar com redundancia sem proposito;
- houver claim inventado;
- houver dado sensivel;
- o resultado parecer apenas "arrumei texto" e nao direcao visual.

## Contrato Para DeepSeek

DeepSeek deve usar este documento junto com:
- `docs/07-REFERENCE-PORTFOLIO-DECONSTRUCTION.md`
- `docs/CV_RECONSTRUCTION.md`
- `CODEX2MSG-0025`

No proximo report, incluir:
- `Aplicacao Muzli Top 100`
- `Aplicacao das referencias premium`
- `Correcoes feitas a partir da revisao Codex`
- `Evidencia de mobile sem overflow`
- `Screenshots production desktop/mobile`

Resumo:
- inspirar-se em nivel, nao copiar aparencia;
- elevar a composicao;
- manter verdade factual;
- entregar evidencia visual;
- tratar Codex como direcao/QA final.
