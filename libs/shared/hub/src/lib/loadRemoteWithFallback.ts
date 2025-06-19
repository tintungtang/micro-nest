export async function loadRemoteWithFallback<T>(
  remote: string,
  exposedModule: string,
  fallback: () => Promise<T>
): Promise<T> {
  try {
    const module = await import(/* webpackIgnore: true */ `${remote}/${exposedModule}`);
    return module;
  } catch (err) {
    console.error(`Failed to load remote ${remote}/${exposedModule}`, err);
    return fallback();
  }
}
