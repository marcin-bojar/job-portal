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
  // const t1 = performance.now();
  arr1.forEach(ad1 => {
    const index = arr2.findIndex(ad2 => ad2.id === ad1.id);
    if (index !== -1) {
      arr2.splice(index, 1);
    }
  });

  // const t2 = performance.now();
  // console.log(((t2 - t1) / 1000).toFixed(2));

  return arr1.concat(arr2);
};

export const formatDate = timestamp => {
  const now = new Date();
  const months = [
    'Sty',
    'Lut',
    'Mar',
    'Kwi',
    'Maj',
    'Cze',
    'Lip',
    'Sie',
    'Wrz',
    'Paź',
    'Lis',
    'Gru',
  ];
  const dateAdded = new Date(timestamp * 1000);
  const day = dateAdded.getDate();
  const month = dateAdded.getMonth();
  const h = dateAdded.getHours();
  const mins = dateAdded.getMinutes();

  if (
    now.getDate() === day &&
    now.getMonth() === month &&
    now.getFullYear() === dateAdded.getFullYear()
  ) {
    return `${h}:${mins}`;
  }

  return `${day} ${months[month]}`;
};
