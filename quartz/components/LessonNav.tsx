import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import style from "./styles/lessonNav.scss"
import { FullSlug, resolveRelative } from "../util/path"
import { classNames } from "../util/lang"
import { QuartzPluginData } from "../plugins/vfile"
import { LESSON_ORDER } from "../generated/lessonOrder"

type Lesson = {
  slug: FullSlug
  title: string
  section: number
  depth: number
  isIndex: boolean
}

function sectionOf(slug: string): number {
  if (slug === "index") return -1
  const match = slug.match(/^(\d+)/)
  return match ? Number.parseInt(match[1], 10) : 999
}

function depthOf(slug: string): number {
  return slug.split("/").length
}

function isIndexSlug(slug: string): boolean {
  return slug === "index" || slug.endsWith("/index")
}

function titleOf(file: QuartzPluginData): string {
  const frontmatterTitle = file.frontmatter?.title
  if (frontmatterTitle) return frontmatterTitle
  const slug = file.slug ?? ""
  const last = slug.split("/").pop() ?? slug
  return last
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ")
}

function toLesson(file: QuartzPluginData): Lesson | null {
  if (!file.slug) return null
  return {
    slug: file.slug as FullSlug,
    title: titleOf(file),
    section: sectionOf(file.slug),
    depth: depthOf(file.slug),
    isIndex: isIndexSlug(file.slug),
  }
}

function compareLessons(a: Lesson, b: Lesson): number {
  if (a.section !== b.section) return a.section - b.section
  if (a.depth !== b.depth) return a.depth - b.depth
  if (a.isIndex !== b.isIndex) return a.isIndex ? -1 : 1
  return a.slug.localeCompare(b.slug, undefined, { numeric: true, sensitivity: "base" })
}

const LessonNav: QuartzComponent = ({ fileData, allFiles, displayClass }: QuartzComponentProps) => {
  const current = fileData.slug
  if (!current) return null

  const position = new Map(LESSON_ORDER.map((slug, index) => [slug, index]))
  const lessons = allFiles
    .map(toLesson)
    .filter((lesson): lesson is Lesson => lesson !== null)
    .sort((a, b) => {
      const posA = position.get(a.slug)
      const posB = position.get(b.slug)
      if (posA !== undefined && posB !== undefined) return posA - posB
      if (posA !== undefined) return -1
      if (posB !== undefined) return 1
      return compareLessons(a, b)
    })

  const index = lessons.findIndex((lesson) => lesson.slug === current)
  if (index === -1) return null

  const previous = index > 0 ? lessons[index - 1] : undefined
  const next = index + 1 < lessons.length ? lessons[index + 1] : undefined
  if (!previous && !next) return null

  return (
    <nav class={classNames(displayClass, "lesson-nav")} aria-label="Navigasi materi">
      {previous ? (
        <a class="lesson-nav-card lesson-nav-prev" href={resolveRelative(current as FullSlug, previous.slug)}>
          <span class="lesson-nav-label">← Sebelumnya</span>
          <span class="lesson-nav-title">{previous.title}</span>
        </a>
      ) : (
        <span class="lesson-nav-card lesson-nav-empty" aria-hidden="true" />
      )}
      {next ? (
        <a class="lesson-nav-card lesson-nav-next" href={resolveRelative(current as FullSlug, next.slug)}>
          <span class="lesson-nav-label">Berikutnya →</span>
          <span class="lesson-nav-title">{next.title}</span>
        </a>
      ) : (
        <span class="lesson-nav-card lesson-nav-empty" aria-hidden="true" />
      )}
      <a class="lesson-nav-path" href={resolveRelative(current as FullSlug, "00-orientation/learning-path" as FullSlug)}>
        Kembali ke learning path
      </a>
    </nav>
  )
}

LessonNav.css = style

export default (() => LessonNav) satisfies QuartzComponentConstructor
