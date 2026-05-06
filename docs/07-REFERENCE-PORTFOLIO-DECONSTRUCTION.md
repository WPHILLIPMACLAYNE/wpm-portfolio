# Reference Portfolio Deconstruction

Data: 2026-05-05

Referencias analisadas:
- `https://inette.co/`
- `https://thibaud.film/`
- `https://www.sebastian-martinez.com/`
- `https://sannisahil.com/`
- `https://robertborghesi.is/`
- `https://wodniack.dev/`
- `https://rogierdeboeve.com/`

Objetivo: extrair o que esses portfolios usam, como funcionam e quais padroes devem ser adaptados ao WPM.OS sem copiar identidade, texto, assets ou layout.

## Leitura Tecnica Publica

Esta leitura vem de headers, HTML publico, DOM renderizado e screenshots locais em Chrome headless. Nao representa acesso ao codigo-fonte privado.

| Referencia | Sinais tecnicos publicos | Licao para WPM.OS |
| --- | --- | --- |
| Inette | Framer, Lenis, tipografia gigante, menu minimo, secoes about/work/contact | Um portfolio pode ser memoravel com uma unica assinatura tipografica forte e muito espaco negativo. |
| Thibaud Fellay | WordPress/custom theme, grid/list de obras, filtros, videos, secret works com password/NDA | Projetos devem ter modos de exploracao, categorias e area bloqueada quando o trabalho nao pode ser publico. |
| Sebastian Martinez | Framer, Lenis, tipografia extrema, cor brutal, imagem pessoal, composicao editorial | A primeira dobra precisa ser inesquecivel e comunicar personalidade antes de explicar detalhes. |
| Sanni Sahil | Next.js, menu simples, greetings multilíngues, grid linear, identidade de design director | Narrativa pessoal + nav reduzida + linhas/grid podem criar presenca com pouco ruido visual. |
| Robert Borghesi | Nuxt, WebGL/canvas, loading performatico, PRJ/WHO/MSG, lista de projetos, awards | Creative dev de alto nivel combina prova tecnica, awards, projetos e personalidade em uma experiencia unica. |
| Antoine Wodniack | Astro, GSAP, WebGL/canvas, controle de contraste, binarios, work index denso | Uma linguagem tecnica pode virar identidade visual se for sistematica e acessivel. |
| Rogier de Boeve | Astro, loading/enter, opcao sem som, portfolio de trabalhos, dark cinematic | Entrada consciente, audio opcional e loading cinematografico aumentam imersao sem violar usuario. |

## Padroes Comuns De Alto Nivel

1. Ideia central unica:
- Cada portfolio tem uma metafora clara: estudio, cinema, designer brutalista, voyage, creative coder, codigo/binario, experience enter.
- O WPM.OS ja tem uma metafora forte: sistema operacional autoral/console. Ela deve ser aprofundada, nao substituida.

2. Primeira dobra com assinatura:
- Tipografia muito grande ou loading/entry memoravel.
- Poucos elementos, alto contraste, composicao decisiva.
- O visitante entende "este site tem direcao" nos primeiros segundos.

3. Navegacao minima:
- 3 a 5 destinos principais.
- Rotulos curtos.
- Pouca explicacao visivel.
- O WPM.OS deve preservar console/nav, mas reduzir ruido de secoes sem conteudo real.

4. Movimento como linguagem:
- Loading, scroll, hover, reveal, cursor, transicoes e entrada nao sao decoracao.
- Cada movimento explica estado: entrando, carregando, selecionando, revelando, desbloqueando.
- Motion deve respeitar `prefers-reduced-motion`.

5. Projetos com peso real:
- Trabalhos aparecem como indice, grid, lista ou case cards.
- Bons portfolios nao misturam trabalho real com placeholder no mesmo nivel.
- Na P6, so os 2 projetos reais devem ter protagonismo.

6. Prova e autoridade:
- Awards, publicacoes, clientes, talks ou numeros aparecem quando sao verdadeiros.
- Para Wallace, prova real deve vir de: WPM Gestao Interna, livro v1.1, formacao, certificacoes, experiencia operacional e documentacao.
- Nao publicar metricas sensiveis ou nao autorizadas.

7. Sistema visual consistente:
- Cores, tipografia, bordas, espacamento e microcopy seguem uma gramatica.
- O WPM.OS deve manter roxo/ciano/mono/sans/CRT, mas tornar o conteudo mais maduro e publico.

8. Acessibilidade como parte da experiencia:
- Opcoes como skip, contrast, enter without sound e reduced motion aparecem em referencias de alto nivel.
- WPM.OS ja tem skip/reduced motion; futuras fases podem adicionar performance mode e sound opt-in, mas nao na P6 sem autorizacao.

## Como Isso Deve Ser Adaptado Ao WPM.OS

### O Que Copiar Como Principio

- Tipografia com coragem: grandes headings quando a pagina precisa de assinatura.
- Menos projetos, mais peso por projeto.
- Entrada e transicoes com significado.
- Copy curta, precisa e sem enchimento.
- Menus curtos e escaneaveis.
- Provas reais acima de claims.
- Work index que pareca curado, nao despejado.
- Contraste e estados de foco impecaveis.
- Visual system proprio, repetido com disciplina.

### O Que Nao Copiar

- Nao copiar layouts, textos, imagens, cores especificas, logos ou interacoes proprietarias.
- Nao transformar o WPM.OS em clone brutalista laranja/vermelho.
- Nao trocar a identidade console por portfolio editorial generico.
- Nao adicionar audio, WebGL novo ou loaders complexos dentro da P6 sem contrato.
- Nao esconder conteudo real atras de efeitos.

## Tradução Direta Para A P6

A P6 deve usar esses aprendizados sem abrir uma nova arquitetura.

Obrigatorio:
- `/projects` deve parecer curado: 2 projetos reais, fortes, com visual intencional.
- `/about` deve reposicionar Wallace com narrativa real, nao fantasia generica.
- `/skills` deve virar mapa de competencias, nao nuvem de tags.
- `/resume` deve ser timeline compacta e profissional, nao copia longa do LinkedIn.
- `/contact` deve mostrar apenas canais reais.
- Nenhuma pagina deve parecer placeholder.

Desejavel dentro do escopo:
- Uma primeira dobra mais forte em `/projects`.
- Cards de projeto com maior presenca visual e melhor ritmo.
- Pequenas microinteracoes em hover/focus.
- Secoes com divisorias/sinais de sistema mais refinados.
- Melhor hierarquia entre titulo, subtitulo, contexto, CTA e stack.
- Layout mobile que pareca desenhado, nao apenas empilhado.

## Nivel De Qualidade Esperado

Codex deve reprovar a entrega se:
- parecer apenas troca de texto;
- os 2 projetos nao tiverem protagonismo;
- houver layout pobre por haver apenas 2 cards;
- houver texto inventado;
- houver CTA vazio ou link nao confirmado;
- houver qualquer dado sensivel;
- mobile ficar sem composicao;
- hover/focus/reduced motion regredirem;
- build passar, mas a experiencia parecer inacabada.

DeepSeek deve mirar:
- portfolio publico serio;
- assinatura visual forte;
- conteudo real;
- interacao sutil;
- legibilidade;
- performance;
- responsividade;
- evidencia por screenshots.

## Ferramentas Disponiveis No Projeto

Stack local atual:
- Next.js `16.2.4`
- React `19.2.4`
- TypeScript
- Tailwind CSS 4
- Motion
- GSAP
- Three.js / React Three Fiber / Drei

Conclusao tecnica:
- O projeto ja tem stack suficiente para atingir nivel alto.
- Nao propor novas bibliotecas so porque as referencias usam outro stack.
- Framer, Astro, Nuxt ou WordPress aparecem nas referencias, mas nao sao necessarios para WPM.OS.
- O diferencial sera direcao, composicao, assets, motion grammar, QA e execucao disciplinada.

## Contrato Para DeepSeek

DeepSeek deve ler este documento antes de continuar qualquer frente visual.

Ao executar:
- entender o principio por tras das referencias;
- adaptar ao WPM.OS;
- manter o contrato de Codex;
- propor se precisar de escopo maior;
- entregar evidencias visuais;
- nao copiar diretamente nenhuma referencia.

Ao reportar:
- citar quais padroes deste documento foram aplicados;
- explicar como a entrega ficou mais proxima do nivel das referencias;
- mostrar screenshots desktop/mobile;
- listar o que ficou para fase futura se algo exigir WebGL/audio/loader novo.
