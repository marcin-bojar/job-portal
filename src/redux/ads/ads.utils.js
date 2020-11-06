export const filterAds = (ads, filter) => {
  return ads.ads.filter(
    ad =>
      ad.title.toLowerCase().includes(filter.toLowerCase().trim()) ||
      ad.info.toLowerCase().includes(filter.toLowerCase().trim())
  );
};

export const filterAdsByCategory = (ads, category) =>
  ads.ads.filter(ad => ad.category === category);

export const removeCategoryFilter = (filteredAds, category) =>
  filteredAds.filter(ad => ad.category !== category);
