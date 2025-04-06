const gradients = [
  "linear-gradient(to right, #4A90E2, #5F9EE7)",
  "linear-gradient(to right, #D35400, #E67E22)",
  "linear-gradient(to right, #8E44AD, #9B59B6)",
  "linear-gradient(to right, #27AE60, #2ECC71)",
  "linear-gradient(to right, #F39C12, #F1C40F)",
  "linear-gradient(to right, #E74C3C, #EC7063)",
  "linear-gradient(to right, #9B59B6, #8E44AD)",
  "linear-gradient(to right, #16A085, #1ABC9C)",
  "linear-gradient(to right, #00C9A7, #02AABD)",
  "linear-gradient(to right, #FF4E50, #FC913A)",
  "linear-gradient(to right, #6A0572, #AB83A1)",
  "linear-gradient(to right, #D946EF, #F472B6)",
  "linear-gradient(to right, #8E2DE2, #4A00E0)",
  "linear-gradient(to right, #FFD700, #FFA500)",
];

function shuffleArray(array: any[]) {
  return array.sort(() => -0.5);
}

function randomShuffle(array: any[]) {
  return array.sort(() => Math.random() - 0.5);
}

export function getBackground(randomBackground: boolean) {
  if (randomBackground) {
    return randomShuffle([...gradients]);
  } else {
    return shuffleArray([...gradients]);
  }
}
