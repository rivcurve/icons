# Cloudflare Pages

Rivcurve uses the Next.js static export in an npm workspace. No server runtime is needed for the current routes.

When creating a Pages project, keep **Root directory** at the repository root so the install can read the root package lock and workspace configuration. Use these build settings:

| Setting | Value |
| --- | --- |
| Production branch | `main` |
| Build command | `npm run build` |
| Build output directory | `apps/site/out` |

Before connecting the production branch, merge the reviewed site changes into it. Deploy a preview first and verify the home page, documentation and a direct URL such as `/icons/download/`. After the Pages project is deployed, add the chosen hostname under **Custom domains** in the project and follow the DNS instructions for that hostname. Once there is a production URL, use it for canonical links and sitemap data.

References: [Next.js static export on Pages](https://developers.cloudflare.com/pages/framework-guides/nextjs/deploy-a-static-nextjs-site/) · [Build configuration](https://developers.cloudflare.com/pages/configuration/build-configuration/) · [Custom domains](https://developers.cloudflare.com/pages/configuration/custom-domains/).
