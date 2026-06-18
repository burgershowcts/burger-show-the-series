import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { site } from "@/config/site";

export type SiteSettings = {
  whatsapp: string;
  whatsapp_display: string;
  hours: string;
  instagram: string;
  address: string;
};

const defaults: SiteSettings = {
  whatsapp: site.whatsapp,
  whatsapp_display: site.whatsappDisplay,
  hours: site.hours,
  instagram: site.instagram,
  address: site.address,
};

export function useSiteSettings() {
  const q = useQuery({
    queryKey: ["site_settings"],
    queryFn: async () => {
      const { data, error } = await supabase.from("site_settings").select("key,value");
      if (error) throw error;
      const map: Record<string, unknown> = {};
      for (const row of data ?? []) map[row.key] = row.value;
      const merged: SiteSettings = { ...defaults };
      (Object.keys(defaults) as (keyof SiteSettings)[]).forEach((k) => {
        const v = map[k];
        if (typeof v === "string" && v.length > 0) merged[k] = v;
      });
      return merged;
    },
    staleTime: 60_000,
  });
  return { settings: q.data ?? defaults, isLoading: q.isLoading };
}

export function buildWhatsappUrl(whatsapp: string, message: string) {
  const digits = whatsapp.replace(/\D/g, "");
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}
