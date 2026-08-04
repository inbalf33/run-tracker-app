// Calculate total distance runs
const calculateTotalDistance = (runs) => {
  if (!runs || runs.length === 0) {
    return 0;
  }

  let totalDistance = 0;

  for (let run of runs) {
    totalDistance += Number(run.distance) || 0;
  }

  return Number(totalDistance.toFixed(2));
};

// Calculate Avg pace runs (min/km)
const calculateAveragePace = (runs) => {
  const totalDistance = calculateTotalDistance(runs);
  if (totalDistance === 0) {
    return 0;
  }

  let totalDuration = 0;
  for (let run of runs) {
    totalDuration += Number(run.duration) || 0;
  }

  const avgPace = totalDuration / totalDistance;
  return avgPace;
};

module.exports = { calculateTotalDistance, calculateAveragePace };