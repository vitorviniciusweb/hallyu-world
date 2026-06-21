# Hallyu World — MVP Scope

## Objetivo do MVP

Validar o loop central do jogo: criar avatar → explorar Seul → interagir com o mundo.  
Entregável: único arquivo `index.html` abrível sem servidor.

---

## O que está NO MVP

### 1. Criação de Avatar
- Seleção de tom de pele (6 opções)
- Seleção de cabelo: forma (4) × cor (6)
- Seleção de olhos (4 opções)
- Roupa inicial: 2 kits (casual / street)
- Preview em tempo real do sprite montado
- Botão "Começar" → entra no mundo

### 2. Cenário — Hongdae (tilemap pixel art)
- Mapa 20×15 tiles (tile 32×32px = 640×480 canvas)
- Tiles: calçada, rua, grama, café, loja de CD, palco
- Decorações estáticas: luminária, árvore, banner K-pop, graffiti
- Câmera: segue o avatar (viewport scroll)

### 3. Movimentação do Avatar
- WASD ou setas: mover nas 4 direções
- Sprite animado: 4 frames por direção (walk cycle)
- Colisão com tiles sólidos
- Animação idle quando parado

### 4. NPCs Estáticos
- 3 NPCs no mapa com sprite único
- Ao se aproximar: prompt "Falar [E]"
- Ao interagir: caixa de diálogo simples (1–2 linhas, fechar com E)

### 5. HUD Mínimo
- Nome do avatar (canto superior esquerdo)
- Localização atual: "Hongdae" (canto superior direito)
- Miniatura do avatar no HUD

---

## O que NÃO está no MVP

- Sistema de stats / treino
- Fanbase / música / releases
- Inventário / closet completo
- Multiplayer
- Áudio
- Outras áreas de Seul
- Monetização
- Backend / autenticação
- Mobile touch controls

---

## Critérios de Sucesso do MVP

1. Avatar renderiza corretamente com as escolhas do jogador
2. Movimentação fluida (60fps) sem bugs de colisão
3. Pelo menos 1 diálogo de NPC funcional
4. Estética "Pastel Idol Flat" visível e coerente
5. Funciona em Chrome/Firefox abrindo o HTML direto (file://)

---

## Stack do MVP

- HTML5 + CSS3 + JavaScript vanilla
- Canvas 2D API (sem bibliotecas externas)
- Sprites desenhados inline via código (sem assets externos)
- Tudo em `index.html` — zero dependências

---

## Próximos Passos Após MVP

1. Extrair para React + TypeScript
2. Adicionar sistema de stats e ciclo diário
3. Criar mapa de Myeongdong como segunda área
4. Integrar Supabase para persistência
5. Adicionar áudio (BGM + SFX)
