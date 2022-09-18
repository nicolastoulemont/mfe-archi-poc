export type LoaderType<T extends (...args: any) => any> = Awaited<ReturnType<ReturnType<T>>>
