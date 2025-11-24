import storesRaw from "../data/stores.json";
import gameLinksRaw from "../data/game-links.json";
import asins from "../data/asins.json";

type StoreId = string;

type StoreLinkConfig = {
  productId?: string;
  query?: string;
};

type GameLinkEntry = {
  name?: string;
  stores?: Record<StoreId, StoreLinkConfig | undefined>;
};

type StoresConfig = {
  order?: StoreId[];
  affiliateStores?: StoreId[];
  amazonTag?: string;
  partners?: Record<StoreId, string | Record<string, string>>;
};

const DEFAULT_ORDER: StoreId[] = ["gmg","fanatical","gog","humble","amazon-switch","steam","ms","epic"];
const DEFAULT_AFFILIATE: StoreId[] = ["gmg","fanatical","gog","humble","amazon-switch"];
const AMAZON_BASE = "https://www.amazon.co.uk";

const storeSettings = storesRaw as StoresConfig;
const gameLinks = gameLinksRaw as Record<string, GameLinkEntry>;
const storeOrder = storeSettings.order?.length ? storeSettings.order : DEFAULT_ORDER;
const affiliateStoreIds = new Set(storeSettings.affiliateStores?.length ? storeSettings.affiliateStores : DEFAULT_AFFILIATE);
const partnerConfig = storeSettings.partners ?? {};
const amazonTag = storeSettings.amazonTag || "gamelocnet-21";

/**
 * Map of store IDs to human readable labels.
 */
const STORE_LABELS: Record<StoreId, string> = {
  gmg: "Green Man Gaming",
  fanatical: "Fanatical",
  gamivo: "Gamivo",
  gameseal: "Gameseal",
  gog: "GOG",
  humble: "Humble Store",
  epic: "Epic Games (creator code)",
  steam: "Steam",
  ms: "Microsoft Store",
  "amazon-switch": "Amazon (Switch / eShop code)",
  argos: "Argos",
  gamefly: "GameFly",
};

const amazonSearch = (term: string) =>
  `${AMAZON_BASE}/s?k=${encodeURIComponent(term)}&tag=${encodeURIComponent(amazonTag)}`;
const amazonProduct = (asin: string) =>
  `${AMAZON_BASE}/dp/${asin}?tag=${encodeURIComponent(amazonTag)}`;

const getGameEntry = (slug: string): GameLinkEntry | undefined => gameLinks[slug];

const getPartnerCode = (storeId: StoreId, preferredKeys: string[] = []): string | undefined => {
  const config = partnerConfig[storeId];
  if (!config) return undefined;
  if (typeof config === "string") return config.trim() || undefined;

  const pick = (key: string) => {
    const value = config[key];
    return typeof value === "string" && value.trim().length > 0 ? value.trim() : undefined;
  };

  for (const key of preferredKeys) {
    const value = pick(key);
    if (value) return value;
  }

  for (const key of ["id", "partner", "creatorId"]) {
    const value = pick(key);
    if (value) return value;
  }

  return undefined;
};

const buildStoreUrl = (storeId: StoreId, gameName: string, cfg: StoreLinkConfig = {}): string | null => {
  const productId = cfg.productId?.trim();
  const query = (cfg.query || gameName).trim();

  switch (storeId) {
    case "gmg": {
      const partner = getPartnerCode(storeId, ["id"]);
      if (!partner) return null;
      return productId
        ? `https://www.greenmangaming.com/${productId}?tap_a=${partner}`
        : `https://www.greenmangaming.com/search?query=${encodeURIComponent(query)}&tap_a=${partner}`;
    }
    case "fanatical": {
      const partner = getPartnerCode(storeId, ["id"]);
      if (!partner) return null;
      return productId
        ? `https://www.fanatical.com/en/game/${productId}?ref=${partner}`
        : `https://www.fanatical.com/en/search?ref=${partner}&query=${encodeURIComponent(query)}`;
    }
    case "gog": {
      const partner = getPartnerCode(storeId, ["partner"]);
      if (!partner) return null;
      return productId
        ? `https://www.gog.com/en/game/${productId}?pp=${partner}`
        : `https://www.gog.com/en/games?pp=${partner}&query=${encodeURIComponent(query)}`;
    }
    case "humble": {
      const partner = getPartnerCode(storeId, ["partner"]);
      if (!partner) return null;
      return productId
        ? `https://www.humblebundle.com/store/${productId}?partner=${partner}`
        : `https://www.humblebundle.com/store/search?partner=${partner}&search=${encodeURIComponent(query)}`;
    }
    case "epic": {
      const creatorId = getPartnerCode(storeId, ["creatorId"]);
      if (!creatorId) return null;
      return `https://store.epicgames.com/?epic_creator_id=${creatorId}`;
    }
    case "steam":
      return productId
        ? `https://store.steampowered.com/app/${productId}/`
        : `https://store.steampowered.com/search/?term=${encodeURIComponent(query)}`;
    case "ms":
      return productId
        ? `https://www.xbox.com/en-gb/games/store/${productId}`
        : `https://www.xbox.com/en-gb/search?q=${encodeURIComponent(query)}`;
    case "amazon-switch":
      return amazonSearch(`${query} nintendo switch`);
    case "argos":
      // TODO: replace with full Awin deep-link once tracking parameters are available.
      return `https://www.argos.co.uk/search/${encodeURIComponent(query)}/`;
    case "gamefly":
      // TODO: replace with full CJ deep-link once tracking parameters are available.
      return `https://www.gamefly.com/search/${encodeURIComponent(query)}/`;
    default:
      return null;
  }
};

export type StoreLink = {
  store: StoreId;
  label: string;
  url: string;
  isAffiliate: boolean;
};

type GameAffiliateOptions = {
  /** Only return affiliates (GMG/Fanatical/GOG/Humble/Amazon) when true */
  onlyAffiliate?: boolean;
};

/**
 * Build affiliate-aware store links for a given game slug.
 * Falls back gracefully if the slug or store config is missing.
 */
export function gameAffiliateLinks(slug: string, opts: GameAffiliateOptions = {}): StoreLink[] {
  const entry = getGameEntry(slug);
  if (!entry?.stores) return [];
  const name = entry.name || slug;

  const links: StoreLink[] = [];
  for (const storeId of storeOrder) {
    const cfg = entry.stores[storeId];
    if (!cfg) continue;
    const url = buildStoreUrl(storeId, name, cfg);
    if (!url) continue;

    links.push({
      store: storeId,
      label: storeLabel(storeId),
      url,
      isAffiliate: affiliateStoreIds.has(storeId),
    });
  }

  return opts.onlyAffiliate ? links.filter((link) => link.isAffiliate) : links;
}

/**
 * Convert a store key into a human readable label.
 */
export function storeLabel(store: StoreId): string {
  return STORE_LABELS[store] || store.toUpperCase();
}

/**
 * Hardware affiliate helpers (currently only Amazon ASINs).
 */
export const affiliates = {
  amazon: (key: keyof typeof asins) => {
    const asin = asins[key];
    if (!asin) {
      const fallbackQuery = key.replaceAll("_", " ");
      return amazonSearch(fallbackQuery);
    }
    return amazonProduct(asin);
  },
};
