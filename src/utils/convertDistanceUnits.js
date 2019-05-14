export const convertUnit = (distance, unit) => {
  distance = distance.replace(/[^0-9.]/g, '');
  console.log(distance, unit, 'distsnce and unit');
  if (unit === 'km') {
    return (Number(distance) * 0.6).toFixed(2);
  }
  if ((unit = 'miles')) {
    return (Number(distance) * 1.6).toFixed(2);
  }
};
