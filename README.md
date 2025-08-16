# PokePump-AI 🚀

Uma aplicação moderna de Pokédex construída com React, TypeScript e Vite. Explore o mundo Pokémon com uma interface elegante, recursos de comparação e navegação otimizada.

## 🚀 Como Executar

```bash
# Clone o repositório
git clone <repository-url>
cd PokePump-AI

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev

# Build para produção
npm run build
```

## 📊 Data Flow & Caching

**Arquitetura de Dados:**

- **TanStack Query**: Gerenciamento de estado do servidor com cache automático
- **Cache Strategy**: Stale-while-revalidate com TTL de 5 minutos
- **Optimistic Updates**: Atualizações instantâneas na UI com rollback automático
- **Background Refetch**: Dados atualizados em background quando a aba fica ativa

**Fluxo de Dados:**

1. **API Layer** (`pokemonApi.ts`) → Requisições HTTP para PokéAPI
2. **Query Layer** (hooks `usePokemon`, `useMove`) → Cache e sincronização
3. **Component Layer** → Consumo reativo dos dados
4. **Local Storage** → Persistência de comparações e preferências

## 🔗 URL State Management

- **Search Parameters**: Estado de busca sincronizado com URL (`?q=pikachu`)
- **Pagination**: Página atual mantida na URL (`?page=2`)
- **Filters**: Filtros aplicados refletidos na URL (`?type=fire&generation=1`)
- **Deep Linking**: URLs compartilháveis para estados específicos
- **Browser History**: Navegação back/forward preserva estado

## ⏱️ Timebox Cuts & Trade-offs

**Implementado (Prioridade Alta):**

- ✅ Lista pesquisável com paginação
- ✅ Página de detalhes com árvore de evolução
- ✅ Drawer de comparação (até 3 Pokémon)
- ✅ Navegação por teclado e acessibilidade
- ✅ Responsividade mobile-first

**Simplificado (Timebox):**

- 🔶 Filtros básicos (tipo, geração) em vez de filtros avançados
- 🔶 Animações essenciais em vez de micro-interações complexas
- 🔶 Testes unitários removidos para focar na funcionalidade

## 📦 Bundle Optimization

**Total do Bundle**: ~659kB (gzip: ~188kB)

### Breakdown dos Chunks (Otimizado):

- **React DOM**: 174.71kB (gzip: 55.17kB) - React DOM separado
- **Animations**: 114.76kB (gzip: 36.83kB) - Motion/Framer Motion
- **React Core**: 62.77kB (gzip: 21.82kB) - React core separado
- **Vendor Utils**: 56.33kB (gzip: 18.53kB) - Utilitários e bibliotecas
- **Main App**: 51.56kB (gzip: 12.31kB) - Lógica principal da aplicação
- **i18n**: 45.56kB (gzip: 14.49kB) - Traduções e internacionalização
- **Router**: 30.70kB (gzip: 11.20kB) - React Router separado
- **Utils**: 26.56kB (gzip: 8.03kB) - Funções utilitárias
- **Index**: 19.79kB (gzip: 6.37kB) - Código de entrada
- **Comparison Drawer**: 13.07kB (gzip: 3.76kB) - Lazy-loaded component
- **CSS**: 103.17kB (gzip: 15.01kB) - Tailwind CSS e estilos
- **UI Components**: 0.20kB (gzip: 0.16kB) - Componentes UI menores

### Otimizações Implementadas:

- **Code Splitting** automático por rota
- **Lazy Loading** de componentes pesados (ComparisonDrawer)
- **Tree Shaking** para remover código não utilizado
- **Manual Chunks** granulares para melhor cache
- **Separação React/React-DOM** para cache otimizado
- **Router separado** para carregamento sob demanda
- **Minificação agressiva** com ES2022 target
- **Remoção de console.logs** em produção

### Possíveis Melhorias Futuras:

- **Bundle Analyzer** para identificar dependências desnecessárias
- **Preload/Prefetch** estratégico de recursos críticos
- **Service Worker** para cache de assets
- **WebP/AVIF** para imagens otimizadas
- **HTTP/2 Push** para recursos críticos

## ♿ Accessibility Notes

**WCAG 2.1 AA Compliance:**

- **Keyboard Navigation**: Tab, Enter, Escape, Arrow keys
- **Screen Readers**: Labels semânticos, ARIA attributes
- **Color Contrast**: Mínimo 4.5:1 em todos os textos
- **Focus Management**: Indicadores visuais claros
- **Semantic HTML**: Estrutura hierárquica apropriada

**Testes de Acessibilidade:**

- Navegação completa via teclado testada
- Compatibilidade com NVDA/JAWS verificada
- Contraste validado com ferramentas automatizadas

## 🛠️ Tech Stack

- **React 19** + **TypeScript** + **Vite 7**
- **Tailwind CSS 4** + **Motion** (animações)
- **TanStack Query** (state management)
- **React Router DOM** (routing)
- **Shadcn/ui** (componentes acessíveis)
- **i18next** (internacionalização)

## 📱 Features

- 🔍 Busca com debounce otimizado
- 📊 Comparação side-by-side de Pokémon
- 🎨 Interface responsiva e moderna
- 🌐 Suporte PT/EN
- ⚡ Performance otimizada
- ♿ Totalmente acessível
