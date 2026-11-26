import { FullSlug } from "../../util/path"
import { QuartzEmitterPlugin } from "../types"
import { write } from "./helpers"

/**
 * Emits a root-level robots.txt.
 *
 * The generic Static emitter copies files to /static, where crawlers will not
 * look for robots.txt. This emitter keeps the file at the site root and points
 * crawlers at the generated sitemap.
 */
export const Robots: QuartzEmitterPlugin = () => ({
  name: "Robots",
  async *emit(ctx) {
    const sitemapUrl = `https://${ctx.cfg.configuration.baseUrl}/sitemap.xml`
    const content = [
      "User-agent: *",
      "Allow: /",
      "",
      `Sitemap: ${sitemapUrl}`,
      "",
    ].join("\n")

    yield write({
      ctx,
      slug: "robots" as FullSlug,
      ext: ".txt",
      content,
    })
  },
  async *partialEmit() {},
})
