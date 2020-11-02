export const filterAds = (ads, filter) => {
  return ads.ads.filter(ad =>
    ad.title.toLowerCase().includes(filter.toLowerCase().trim())
  );
};
