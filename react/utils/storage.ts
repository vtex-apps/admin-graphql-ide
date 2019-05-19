class ScopedStorage implements Storage {
  private keys: Set<string>

  constructor(
    private namespace: string
  ) {
    this.keys = new Set<string>()
  }

  public get length(): number {
    return this.keys.size
  }

  public setItem = (key: string, value: string) => {
    const scopedKey = this.addScope(key)
    this.keys.add(scopedKey)
    window.localStorage.setItem(scopedKey, value)
  }

  public clear = () => {
    this.keys.forEach(window.localStorage.removeItem)
  }

  public removeItem = (key: string) => window.localStorage.removeItem(this.addScope(key))

  public key = (index: number ) => window.localStorage.key(index)

  public getItem = (key: string) => window.localStorage.getItem(this.addScope(key))

  private addScope = (key: string) => `${this.namespace}::${key}`
}

const storage: Record<string, Storage> = {}

export const getOrCreateScopedStorage = (namespace: string) => {
  if (!storage[namespace]) {
    storage[namespace] = new ScopedStorage(namespace)
  }
  return storage[namespace]
}