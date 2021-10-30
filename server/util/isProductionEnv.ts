export const isProductionEnv = (): boolean => {
  return process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'prod' || process.env.NODE_ENV === undefined
}
