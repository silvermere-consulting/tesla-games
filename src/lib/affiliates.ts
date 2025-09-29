import stores from "../data/stores.json";
import gameLinks from "../data/game-links.json";

// Normalise a game key (slug) to the JSON map
function bySlug(slug: string) {
  const entry = (gameLinks as any)[slug];
  if (!entry) throw new Error(`No game-links entry for slug: ${slug}`);
  return entry;
}

// Build a URL for each authorised store, preferring productId → else search query
function buildStoreUrl(store: string, name: string, opt?: {productId?: string; query?: string}) {
  const partner = (stores as any).partners[store] || "XXXX";
  const pid = opt?.productId?.trim();
  const q   = (opt?.query || name).trim();

  switch (store) {
    case "gmg":
      return pid
        ? `https://www.greenmangaming.com/${pid}?tap_a=${partner}`
        : `https://www.greenmangaming.com/search?query=${encodeURIComponent(q)}&tap_a=${partner}`;

    case "fanatical":
      return pid
        ? `https://www.fanatical.com/en/game/${pid}?ref=${partner}`
        : `https://www.fanatical.com/en/search?ref=${partner}&query=${encodeURIComponent(q)}`;

    case "gog":
      return pid
        ? `https://www.gog.com/en/game/${pid}?pp=${partner}`
        : `https://www.gog.com/en/games?pp=${partner}&query=${encodeURIComponent(q)}`;

    case "humble":
      return pid
        ? `https://www.humblebundle.com/store/${pid}?partner=${partner}`
        : `https://www.humblebundle.com/store/search?partner=${partner}&search=${encodeURIComponent(q)}`;

    case "epic":
      // EGS uses Support-A-Creator; no reliable search deep link, so send to store with creator id.
      return `https://store.epicgames.com/?epic_creator_id=${partner}`;

    case "steam":
      return pid
        ? `https://store.steampowered.com/app/${pid}/`
        : `https://store.steampowered.com/search/?term=${encodeURIComponent(q)}`;

    case "ms":
      return pid
        ? `https://www.xbox.com/en-gb/games/store/${pid}`
        : `https://www.xbox.com/en-gb/search?q=${encodeURIComponent(q)}`;

    case "amazon-switch":
     // use your Amazon tag from stores.json or hardcode gamelocnet-21
      return `https://www.amazon.co.uk/s?k=${encodeURIComponent(q)}+nintendo+switch&tag=${encodeURIComponent((stores as any).amazonTag || "gamelocnet-21")}`;

    default:
      throw new Error(`Unknown store: ${store}`);
  }
}
// PUBLIC API

export type StoreLink = {
  store: string;        // "gmg" | "fanatical" | "gog" | "humble" | "epic" | "steam" | "ms" | "amazon-switch" | ...
  label: string;        // Human label
  url: string;          // Final URL with affiliate params applied
  isAffiliate: boolean; // True if this store pays you on click/purchase
};

type GameAffiliateOptions = {
  /** only return stores that can pay commission (e.g. GMG/Fanatical/GOG/Humble/Amazon) */
  onlyAffiliate?: boolean;
};

export function gameAffiliateLinks(slug: string, opts: GameAffiliateOptions = {}): StoreLink[] {
  const entry = bySlug(slug); // your existing helper reading src/data/game-links.json
  const order: string[] = (stores as any).order || ["gmg","fanatical","gog","humble","amazon-switch","steam","ms","epic"];
  const affiliateSet: Set<string> =
    new Set(((stores as any).affiliateStores as string[]) || ["gmg","fanatical","gog","humble","amazon-switch"]);

  const name: string = entry.name;

  // Build links in configured order, skip any store not present for this game
  const links: StoreLink[] = order.flatMap((store) => {
    const cfg = entry.stores?.[store];
    if (!cfg) return [];
    const url = buildStoreUrl(store, name, cfg); // your existing URL builder handles query/productId/partner params
    const label = storeLabel(store);
    const isAffiliate = affiliateSet.has(store);
    return [{ store, label, url, isAffiliate }];
  });

  return opts.onlyAffiliate ? links.filter(l => l.isAffiliate) : links;
}

export function storeLabel(store: string) {
  switch (store) {
    case "gmg": return "Green Man Gaming";
    case "fanatical": return "Fanatical";
    case "gog": return "GOG";
    case "humble": return "Humble Store";
    case "epic": return "Epic Games (creator code)";
    case "steam": return "Steam";
    case "ms": return "Microsoft Store";
    case "amazon-switch": return "Amazon (Switch / eShop code)";
    default: return store.toUpperCase();
  }
}

// Keep Amazon helper for hardware (ASIN map approach you already use)
import asins from "../data/asins.json";
export const affiliates = {
  amazon: (key: keyof typeof asins) =>
    `https://www.amazon.co.uk/dp/${asins[key]}?tag=gamelocnet-21`
};
