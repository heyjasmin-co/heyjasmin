export class TokenManager {
  private static instance: TokenManager;
  private getTokenFn: (() => Promise<string | null>) | null = null;
  private tokenPromise: Promise<string | null> | null = null;
  private cachedToken: string | null = null;
  private tokenCacheTimestamp: number = 0;
  private readonly CACHE_DURATION = 55000; // 55 seconds (Clerk tokens usually last 60s)

  private constructor() {}

  public static getInstance(): TokenManager {
    if (!TokenManager.instance) {
      TokenManager.instance = new TokenManager();
    }
    return TokenManager.instance;
  }

  public setGetToken(getToken: () => Promise<string | null>) {
    this.getTokenFn = getToken;
  }

  public async getToken(): Promise<string | null> {
    if (!this.getTokenFn) {
      console.warn("TokenManager: getToken function not initialized");
      return null;
    }

    const now = Date.now();
    if (
      this.cachedToken &&
      now - this.tokenCacheTimestamp < this.CACHE_DURATION
    ) {
      return this.cachedToken;
    }

    if (!this.tokenPromise) {
      this.tokenPromise = this.getTokenFn()
        .then((token) => {
          if (token) {
            this.cachedToken = token;
            this.tokenCacheTimestamp = Date.now();
          }
          return token;
        })
        .catch((err) => {
          console.error("TokenManager: Failed to fetch token", err);
          return null;
        })
        .finally(() => {
          this.tokenPromise = null;
        });
    }

    return this.tokenPromise;
  }

  public clearCache() {
    this.cachedToken = null;
    this.tokenCacheTimestamp = 0;
  }
}
