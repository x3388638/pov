# pov

A React (Next.js) app integrated with Contentful (headless CMS) collects car photography and POV driving videos to share the beauty of Taiwan.

<img width="1336" alt="img" src="https://github.com/x3388638/pov/assets/8147952/3cc615b5-0ee3-4a77-95f3-5949b5cd100b">

## Dev note

### Env

node: v20.9.0  
npm: v10.1.0

### Run locally

```
npm ci --force
```

```
npm run dev
```

### Build

```
npm run build
```

run the built version:

```
npm start
```

### Lint

```
npm run lint
```

### Update Contentful data to local

```
SPACE_ID={{SPACE ID}} ACCESS_TOKEN={{ACCESS TOKEN}} npm run contentful:fetch
```

### Deploy

The website is hosted on [Vercel](https://vercel.com/)

- push to any branch will trigger preview build for that branch
- push to `release` branch will trigger production build

### GitHub Actions

Cronjob: `/.github/workflows/action.yml`  
It will fetch latest data from Contentful and generate sitemap list, and commit to `release` branch

### Legacy version

Check the [csr-version-2024-01](https://github.com/x3388638/pov/tree/csr-version-2024-01) branch, which is a pure frontend app (CSR)
