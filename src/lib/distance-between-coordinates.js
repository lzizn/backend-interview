/**
 * Given two coordinates that represent points in the globe, calculates the shortest distance (in kilometers) over the earth’s surface.
 *
 * @link https://www.movable-type.co.uk/scripts/latlong.html
 *
 * @param {number} lat1
 * @param {number} lon1
 * @param {number} lat2
 * @param {number} lon2
 * @returns {number} Distance between coordinates in KM
 */
module.exports.distanceBetweenCoords = (lat1, lon1, lat2, lon2) => {
  const toRadians = (degree) => (degree * Math.PI) / 180;

  const R = 6371; // Earth Radius in KM

  /*
   ? a = sin²(dLat/2) + cos(lat1Rad) * cos(lat2Rad) * sin²(dLon/2)
   ? c = 2 * atan2(√a, √(1−a))
   ? d = R * c
   */

  const lat1Rad = toRadians(lat1);
  const lat2Rad = toRadians(lat2);

  const dLatRad = toRadians(lat2 - lat1);
  const dLonRad = toRadians(lon2 - lon1);

  const a =
    Math.pow(Math.sin(dLatRad / 2), 2) +
    Math.cos(lat1Rad) * Math.cos(lat2Rad) * Math.pow(Math.sin(dLonRad / 2), 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
};
