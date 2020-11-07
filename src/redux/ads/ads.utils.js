export const filterAds = (ads, filter) => {
  return ads.filter(
    ad =>
      ad.title.toLowerCase().includes(filter.toLowerCase().trim()) ||
      ad.info.toLowerCase().includes(filter.toLowerCase().trim()) ||
      ad.region.toLowerCase().includes(filter.toLowerCase().trim())
  );
};

export const filterAdsByCategory = (ads, category) =>
  ads.filter(ad => ad.category === category);

export const removeCategoryFilter = (filteredAds, category) =>
  filteredAds.filter(ad => ad.category !== category);

export const mergeTwoAdsArrays = (arr1, arr2) => {
  arr1.forEach(ad1 => {
    const index = arr2.findIndex(ad2 => ad2.id === ad1.id);
    if (index !== -1) {
      arr2.splice(index, 1);
    }
  });

  return arr1.concat(arr2);
};
