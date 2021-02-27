export async function nextTick() {
  return new Promise(setImmediate);
}
