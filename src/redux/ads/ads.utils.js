export const filterAds = (ads, filter) => {
  const filtered = {};

  Object.keys(ads).forEach(key => {
    const ad = ads[key];

    if (
      ad.title.toLowerCase().includes(filter.toLowerCase().trim()) ||
      ad.info.toLowerCase().includes(filter.toLowerCase().trim()) ||
      ad.region.toLowerCase().includes(filter.toLowerCase().trim())
    ) {
      filtered[key] = ad;
    }
  });

  return filtered;
};

export const filterAdsByCategory = (ads, category) => {
  const filtered = {};

  Object.keys(ads).forEach(key => {
    const ad = ads[key];

    if (ad.category === category) filtered[key] = ad;
  });

  return filtered;
};

export const removeCategoryFilter = (filteredAds, category) => {
  Object.keys(filteredAds).forEach(key => {
    const ad = filteredAds[key];

    if (ad.category === category) delete filteredAds[key];
  });

  return Object.assign({}, filteredAds);
};

export const mergeTwoAdsObjects = (obj1, obj2) => Object.assign({}, obj1, obj2);

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
  let h = dateAdded.getHours();
  let mins = dateAdded.getMinutes();

  if (h < 10) h = '0' + h;
  if (mins < 10) mins = '0' + mins;

  if (
    now.getDate() === day &&
    now.getMonth() === month &&
    now.getFullYear() === dateAdded.getFullYear()
  ) {
    return `${h}:${mins}`;
  }

  return `${day} ${months[month]}`;
};

export const sortAdsByDateAdded = adsObject => {
  const sorted = {};
  Object.entries(adsObject)
    .sort((a, b) => b[1].addedAt - a[1].addedAt)
    .forEach(el => (sorted[el[0]] = el[1]));
  return sorted;
};
