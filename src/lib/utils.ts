import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);

  const formatter = new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: '2-digit'
  });

  return formatter.format(date);
}

export function formatNumber(
  number: number,
  notation: 'standard' | 'scientific' | 'engineering' | 'compact' | undefined = 'standard',
  decimals: number
) {
  const formatter = Intl.NumberFormat('en', { notation, maximumFractionDigits: decimals });

  return formatter.format(number);
}

export function formatSecondsToHoursMinSecs(totalSeconds: number) {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  let result = '';
  if (hours > 0) {
    result += `${hours}h `;
  }
  if (minutes > 0 || hours > 0) {
    result += `${minutes}m `;
  }
  result += `${seconds.toFixed(0)}s`;

  return result.trim();
}

// Use some form of poisson disc stuff to get scattered hearts
export const generateHeartPositions = (numHearts: number, minDistance: number) => {
  const width = 90;
  const height = 80;

  const positions: { top: string; left: string }[] = [];

  const cellSize = minDistance / Math.sqrt(2);
  const grid: (number | null)[][] = Array(Math.ceil(height / cellSize))
    .fill(null)
    .map(() => Array(Math.ceil(width / cellSize)).fill(null));

  const addPoint = (x: number, y: number) => {
    const position = { top: `${y + 10}%`, left: `${x + 10}%` };
    positions.push(position);
    grid[Math.floor(y / cellSize)][Math.floor(x / cellSize)] = positions.length - 1;
  };

  const getNeighbors = (x: number, y: number) => {
    const neighbors = [];
    for (let i = -2; i <= 2; i++) {
      for (let j = -2; j <= 2; j++) {
        const newX = x + i * cellSize;
        const newY = y + j * cellSize;
        if (newX >= 0 && newX < width && newY >= 0 && newY < height) {
          const gridX = Math.floor(newX / cellSize);
          const gridY = Math.floor(newY / cellSize);
          const pointIndex = grid[gridY][gridX];
          if (pointIndex !== null) {
            neighbors.push(positions[pointIndex]);
          }
        }
      }
    }
    return neighbors;
  };

  const isValidPoint = (x: number, y: number) => {
    const neighbors = getNeighbors(x, y);
    return neighbors.every((neighbor) => {
      if (!neighbor) return true;
      const dx = x - (parseFloat(neighbor.left) - 10);
      const dy = y - (parseFloat(neighbor.top) - 10);
      return Math.sqrt(dx * dx + dy * dy) >= minDistance;
    });
  };

  // Add first point
  addPoint(Math.random() * width, Math.random() * height);

  let attempts = 0;
  const maxAttempts = 1000; // Prevent infinite loop

  while (positions.length < numHearts && attempts < maxAttempts) {
    if (positions.length === 0) {
      // If all points were removed, add a new starting point
      addPoint(Math.random() * width, Math.random() * height);
      continue;
    }

    const activeIndex = Math.floor(Math.random() * positions.length);
    const activePoint = positions[activeIndex];

    // Check if activePoint is undefined before proceeding
    if (!activePoint) {
      attempts++;
      continue;
    }

    let found = false;

    for (let i = 0; i < 30; i++) {
      const angle = Math.random() * Math.PI * 2;
      const distance = minDistance + Math.random() * minDistance;
      const newX = parseFloat(activePoint.left) - 10 + Math.cos(angle) * distance;
      const newY = parseFloat(activePoint.top) - 10 + Math.sin(angle) * distance;

      if (newX >= 0 && newX < width && newY >= 0 && newY < height && isValidPoint(newX, newY)) {
        addPoint(newX, newY);
        found = true;
        break;
      }
    }

    if (!found) {
      positions.splice(activeIndex, 1);
    }

    attempts++;
  }

  // If we couldn't generate enough points, fill the remaining with random positions
  while (positions.length < numHearts) {
    addPoint(Math.random() * width, Math.random() * height);
  }

  return positions;
};

export function generatePoissonDiskPositions(
  containerWidthPercent: number,
  containerHeightPercent: number,
  numItems: number,
  minDistancePercent: number,
  attemptsPerPoint: number = 30
): { top: string; left: string }[] {
  const cellSize = minDistancePercent / Math.sqrt(2);
  const grid: (number[] | null)[][] = [];
  const activeList: number[][] = [];
  const points: number[][] = [];

  function randomPointAround(point: number[]): number[] | null {
    const r = minDistancePercent * (1 + Math.random());
    const angle = 2 * Math.PI * Math.random();
    const newPoint = [point[0] + r * Math.cos(angle), point[1] + r * Math.sin(angle)];

    // Ensure the new point is within the boundaries
    if (newPoint[0] >= 0 && newPoint[0] <= containerWidthPercent && newPoint[1] >= 0 && newPoint[1] <= containerHeightPercent) {
      return newPoint;
    }
    return null;
  }

  function inNeighborhood(point: number[]): boolean {
    const gridX = Math.floor(point[0] / cellSize);
    const gridY = Math.floor(point[1] / cellSize);

    for (let i = Math.max(0, gridX - 2); i <= Math.min(gridX + 2, Math.floor(containerWidthPercent / cellSize) - 1); i++) {
      if (!grid[i]) continue;
      for (let j = Math.max(0, gridY - 2); j <= Math.min(gridY + 2, Math.floor(containerHeightPercent / cellSize) - 1); j++) {
        const neighbor = grid[i][j];
        if (neighbor) {
          const dist = Math.hypot(point[0] - neighbor[0], point[1] - neighbor[1]);
          if (dist < minDistancePercent) {
            return true;
          }
        }
      }
    }
    return false;
  }

  // Start with an initial random point
  const initialPoint = [Math.random() * containerWidthPercent, Math.random() * containerHeightPercent];
  const gridX = Math.floor(initialPoint[0] / cellSize);
  const gridY = Math.floor(initialPoint[1] / cellSize);

  if (!grid[gridX]) grid[gridX] = [];
  grid[gridX][gridY] = initialPoint;
  activeList.push(initialPoint);
  points.push(initialPoint);

  while (points.length < numItems && activeList.length > 0) {
    const index = Math.floor(Math.random() * activeList.length);
    const point = activeList[index];
    let found = false;

    for (let i = 0; i < attemptsPerPoint; i++) {
      const newPoint = randomPointAround(point);
      if (newPoint && !inNeighborhood(newPoint)) {
        const newGridX = Math.floor(newPoint[0] / cellSize);
        const newGridY = Math.floor(newPoint[1] / cellSize);

        if (!grid[newGridX]) grid[newGridX] = [];
        grid[newGridX][newGridY] = newPoint;
        activeList.push(newPoint);
        points.push(newPoint);
        found = true;
        break;
      }
    }

    if (!found) {
      activeList.splice(index, 1);
    }
  }

  return points.map((point) => ({
    top: `${point[1]}%`,
    left: `${point[0]}%`
  }));
}
