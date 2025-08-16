export interface Pokemon {
  id: number;
  name: string;
  height: number;
  weight: number;
  sprites: {
    front_default: string | null;
    back_default: string | null;
    front_shiny: string | null;
    back_shiny: string | null;
    other: {
      "official-artwork": {
        front_default: string | null;
      };
      dream_world: {
        front_default: string | null;
      };
      home: {
        front_default: string | null;
        front_shiny: string | null;
      };
    };
  };
  types: Array<{
    slot: number;
    type: {
      name: string;
      url: string;
    };
  }>;
  abilities: Array<{
    ability: {
      name: string;
      url: string;
    };
    is_hidden: boolean;
    slot: number;
  }>;
  stats: Array<{
    base_stat: number;
    effort: number;
    stat: {
      name: string;
      url: string;
    };
  }>;
  species: {
    name: string;
    url: string;
  };
  moves: Array<{
    move: {
      name: string;
      url: string;
    };
    version_group_details: Array<{
      level_learned_at: number;
      move_learn_method: {
        name: string;
        url: string;
      };
      version_group: {
        name: string;
        url: string;
      };
    }>;
  }>;
}

export interface PokemonListItem {
  name: string;
  url: string;
}

export interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonListItem[];
}

export interface PokemonSearchParams {
  query?: string;
  page?: number;
  limit?: number;
}

export interface PokemonSpecies {
  id: number;
  name: string;
  evolution_chain: {
    url: string;
  };
  varieties: Array<{
    is_default: boolean;
    pokemon: {
      name: string;
      url: string;
    };
  }>;
}

export interface ComparisonPokemon {
  id: number;
  name: string;
  sprites: {
    other: {
      "official-artwork": {
        front_default: string | null;
      };
    };
    front_default: string | null;
  };
  types: Array<{
    type: {
      name: string;
    };
  }>;
  stats: Array<{
    base_stat: number;
    stat: {
      name: string;
    };
  }>;
  height: number;
  weight: number;
  abilities: Array<{
    ability: {
      name: string;
    };
    is_hidden: boolean;
  }>;
}

export interface EvolutionChain {
  id: number;
  chain: EvolutionChainLink;
}

export interface EvolutionChainLink {
  species: {
    name: string;
    url: string;
  };
  evolves_to: EvolutionChainLink[];
  evolution_details: Array<{
    min_level?: number;
    trigger: {
      name: string;
    };
  }>;
}

export interface EvolutionNode {
  pokemon: Pokemon;
  evolvesTo: EvolutionNode[];
  evolutionDetails?: {
    minLevel?: number;
    item?: string;
    trigger?: string;
    timeOfDay?: string;
    location?: string;
    happiness?: number;
    beauty?: number;
    affection?: number;
    gender?: number;
    heldItem?: string;
    knownMove?: string;
    knownMoveType?: string;
    minAffection?: number;
    minBeauty?: number;
    minHappiness?: number;
    needsOverworldRain?: boolean;
    partySpecies?: string;
    partyType?: string;
    relativePhysicalStats?: number;
    tradeSpecies?: string;
    turnUpsideDown?: boolean;
  };
}

export interface UseEvolutionChainResult {
  evolutionTree: EvolutionNode | null;
  isLoading: boolean;
  error: string | null;
  flatEvolutions: Pokemon[];
  hasComplexChain: boolean;
  chainDepth: number;
}

export interface Move {
  id: number;
  name: string;
  accuracy: number | null;
  effect_chance: number | null;
  pp: number;
  priority: number;
  power: number | null;
  damage_class: {
    name: string;
    url: string;
  };
  effect_entries: Array<{
    effect: string;
    language: {
      name: string;
      url: string;
    };
  }>;
  flavor_text_entries: Array<{
    flavor_text: string;
    language: {
      name: string;
      url: string;
    };
    version_group: {
      name: string;
      url: string;
    };
  }>;
  generation: {
    name: string;
    url: string;
  };
  machines: Array<{
    machine: {
      url: string;
    };
    version_group: {
      name: string;
      url: string;
    };
  }>;
  meta: {
    ailment: {
      name: string;
      url: string;
    };
    category: {
      name: string;
      url: string;
    };
    min_hits: number | null;
    max_hits: number | null;
    min_turns: number | null;
    max_turns: number | null;
    drain: number;
    healing: number;
    crit_rate: number;
    ailment_chance: number;
    flinch_chance: number;
    stat_chance: number;
  };
  names: Array<{
    name: string;
    language: {
      name: string;
      url: string;
    };
  }>;
  past_values: Array<any>;
  stat_changes: Array<{
    change: number;
    stat: {
      name: string;
      url: string;
    };
  }>;
  super_contest_effect: {
    url: string;
  } | null;
  target: {
    name: string;
    url: string;
  };
  type: {
    name: string;
    url: string;
  };
}

export interface Machine {
  id: number;
  item: {
    name: string;
    url: string;
  };
  move: {
    name: string;
    url: string;
  };
  version_group: {
    name: string;
    url: string;
  };
}

export interface MachineListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Array<{
    url: string;
  }>;
}
