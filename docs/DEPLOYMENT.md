# Cloudflare Pages

Rivcurve uses the Next.js static export in an npm workspace. No server runtime is needed for the current routes.

The site is live at **https://rivcurve.pages.dev**. The Pages project `rivcurve` is connected to `rivcurve/icons` through the Cloudflare Workers and Pages GitHub app: every push to `main` deploys production, and pushes to `work/*` branches get preview URLs. Builds use `NODE_VERSION=24`.

If the project ever needs to be recreated, keep **Root directory** at the repository root so the install can read the root package lock and workspace configuration. Use these build settings:

| Setting | Value |
| --- | --- |
| Production branch | `main` |
| Build command | `npm run build` |
| Build output directory | `apps/site/out` |

After a deploy, verify the home page, documentation and a direct URL such as `/icons/download/`. A custom domain can be added later under **Custom domains** in the project.

## Releasing packages

Bump `version` in both `packages/icons/package.json` and `packages/react/package.json`, merge to `main`, then push a matching tag (`git tag v0.2.0 && git push origin v0.2.0`). `.github/workflows/publish.yml` validates, tests and publishes both packages through npm trusted publishing.

References: [Next.js static export on Pages](https://developers.cloudflare.com/pages/framework-guides/nextjs/deploy-a-static-nextjs-site/) · [Build configuration](https://developers.cloudflare.com/pages/configuration/build-configuration/) · [Custom domains](https://developers.cloudflare.com/pages/configuration/custom-domains/).
