export const isDevelopmentEnv = (): boolean => {
  return process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'dev'
}
