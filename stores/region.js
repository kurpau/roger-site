import { defineStore } from "pinia";

const REGION = "medusa_region";
const COUNTRY = "medusa_country";

export const useRegionStore = defineStore("region", {
  state: () => ({
    country: undefined,
    region: undefined,
    regions: [],
  }),
  actions: {
    updateRegion(payload) {
      this.region = payload.region;
      this.country = payload.country || payload.region.countries[0];
      localStorage.setItem(REGION, JSON.stringify(this.region));
      localStorage.setItem(COUNTRY, JSON.stringify(this.country));
    },
    async initializeRegions() {
      try {
        const response = await fetch(
          "https://roger-medusa-server-roger-server.cipixf.easypanel.host/store/regions",
        ); // remove from production
        const { regions } = await response.json();
        this.regions = regions;

        if (process.browser) {
          const regionJSON = localStorage.getItem(REGION);
          const countryJSON = localStorage.getItem(COUNTRY);

          if (regionJSON && countryJSON) {
            const region = JSON.parse(regionJSON);
            const country = JSON.parse(countryJSON);
            this.updateRegion({ region, country });
          } else {
            this.updateRegion({ region: this.regions[0] });
          }
        }
      } catch (error) {
        throw new Error(error);
      }
    },
  },
});
