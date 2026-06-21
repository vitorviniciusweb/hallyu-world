# Hallyu World — Game Design Document

## 1. Visão Geral

**Gênero:** Simulação de vida / RPG casual  
**Plataforma:** Web (HTML5 + Canvas), mobile-first  
**Público:** 14–28 anos, fãs de K-pop, K-drama e cultura coreana  
**Elevator pitch:** Um mundo virtual onde o jogador cria um idol, vive em Seul, faz amizades, treina, lança músicas e conquista fãs — tudo em estética pixel art pastel.

---

## 2. Estilo Visual — "Pastel Idol Flat"

- Paleta pastel suave: mints (#B5EAD7), lavender (#C7CEEA), peach (#FFDAC1), rose (#FFB7B2), sky (#AED6F1)
- Pixel art de 16×16 a 32×32 por tile
- UI flat com bordas arredondadas, sem sombras pesadas
- Fonte display: estilo rounded/cute (ex. M PLUS Rounded 1c ou similar)
- Animações: sprites 4 frames por direção (idle, walk, dance)
- HUD minimalista, ícones em estilo sticker

---

## 3. Mundo e Cenários

### Seul — Mapa Principal
| Área | Descrição |
|------|-----------|
| Hongdae | Distrito artístico; palco de street performance |
| Gangnam | Agências e lojas de luxo |
| Myeongdong | Shopping e alimentação; missões sociais |
| Han River Park | Descanso, picnic, eventos sazonais |
| HYBE District | Agência tier S; objetivo de longo prazo |

Cada área é um tilemap independente com NPCs, lojas e eventos.

---

## 4. Sistema de Avatar

### Criação Inicial
- Corpo: tipo (slim / medium / curvy) — 3 opções
- Tom de pele: 6 tons
- Rosto: olhos (6), nariz (4), boca (4), sobrancelha (4)
- Cabelo: forma (8) × cor (10 + custom)
- Roupa inicial: 3 kits de estilo (casual, street, formal)

### Customização Contínua
- Peças desbloqueáveis por missão, loja e gacha
- Categorias: top, bottom, shoes, outer, acessório, hair dye
- Closet: salvar até 10 outfits completos
- "Mood color" do avatar: afeta diálogos e reações de NPCs

---

## 5. Sistemas de Jogo

### 5.1 Stats do Idol
| Stat | Afeta |
|------|-------|
| Vocal | Qualidade de músicas, duetos |
| Dance | Performance, cover battles |
| Rap | Freestyle events, composição |
| Visual | Popularidade inicial, brand deals |
| Stamina | Quantas ações por dia |
| Carisma | Negociação, fanbase growth |

Stats crescem via treino, missões e itens. Cap: 100 por stat.

### 5.2 Ciclo Diário
- Cada dia = 8 slots de ação (manhã × tarde × noite / 4 cada)
- Ações: treinar, socializar, trabalhar part-time, descansar, explorar
- Eventos aleatórios por slot (encontros, audições, incidentes)

### 5.3 Fanbase
- Contador global de fãs
- Fãs ganhos por: performances, redes sociais in-game, lançamentos
- Fãs perdidos por: escândalos, inatividade, rivalidade

### 5.4 Agência & Grupos
- Começar solo ou entrar em grupo (até 5 membros — NPCs ou outros jogadores)
- Agências têm tiers (indie → mid → big3 → HYBE)
- Contratos têm duração e % de royalties

### 5.5 Música & Releases
- Compor faixa: escolher gênero, mood, colaboradores
- Lançamento: timing (comebacks sazonais dão bônus)
- Charting: sistema de ranking semanal

---

## 6. Progressão e Metas

### Arco Principal
1. Chegar em Seul como trainee
2. Fazer debut solo ou em grupo
3. Lançar primeiro mini-álbum
4. Ganhar 10.000 fãs
5. Assinar com agência Big3
6. Realizar concert no KSPO Dome

### Sistema de Conquistas
- Conquistas visíveis no perfil público
- Desbloqueiam cosméticos exclusivos

---

## 7. Multiplayer & Social

- Mundo compartilhado: encontrar outros jogadores nas ruas
- Collab: gravar faixa juntos (sistema de turn-based contribuição)
- Fan clubs: grupos de jogadores com líder e hierarquia
- Gacha social: enviar/receber "support packages"

---

## 8. Monetização (F2P)

- **Moeda hard (Starcoins):** compra com dinheiro real; cosméticos exclusivos, gacha premium
- **Moeda soft (Heartbeats):** ganhos jogando; loja básica, aceleração de treino
- **Season Pass:** bônus diários, cosméticos de temporada, XP extra
- Sem pay-to-win: stats só crescem por gameplay

---

## 9. Tecnologia

- **Frontend:** React + TypeScript + Pixi.js (canvas 2D)
- **Backend:** Supabase (auth, banco, realtime, storage)
- **Assets:** sprites gerados e organizados por sheet 512×512
- **Mapas:** Tiled (.tmx) exportado para JSON
- **Áudio:** Howler.js, faixas .ogg

---

## 10. Tom e Narrativa

- Tom: otimista, acolhedor, levemente dramático (como K-drama)
- Narrador: "Sistema" estilizado como app de idol management
- Diálogos: português brasileiro informal, com termos K-pop preservados (oppa, unnie, sunbae, fighting!)
- Sem violência; conflitos resolvidos via batalhas de dança ou rap battle
