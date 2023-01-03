export const parsePathname = (path: string) => path.replace('/', '').charAt(0).toUpperCase() + path.slice(2)
