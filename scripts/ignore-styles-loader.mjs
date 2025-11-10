// Minimal ESM loader to ignore CSS/SCSS imports during Node execution
export async function resolve(specifier, context, nextResolve) {
  if (
    specifier.endsWith('.css') ||
    specifier.endsWith('.scss') ||
    specifier.endsWith('.sass') ||
    specifier.endsWith('.less')
  ) {
    return {
      url: 'data:text/javascript,export default {}',
      shortCircuit: true,
    }
  }
  return nextResolve(specifier, context)
}

export async function load(url, context, nextLoad) {
  if (url.startsWith('data:text/javascript')) {
    return { format: 'module', shortCircuit: true, source: 'export default {}' }
  }
  if (
    url.endsWith('.css') ||
    url.endsWith('.scss') ||
    url.endsWith('.sass') ||
    url.endsWith('.less')
  ) {
    return { format: 'module', shortCircuit: true, source: 'export default {}' }
  }
  return nextLoad(url, context)
}
