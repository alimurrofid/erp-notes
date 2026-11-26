import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"

// Components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  afterBody: [Component.LessonNav()],
  footer: Component.Footer({
    links: {
      "GitHub Repository": "https://github.com/alimurrofid/erp-notes",
    },
  }),
}

// Components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.ConditionalRender({
      component: Component.Breadcrumbs(),
      condition: (page) => page.fileData.slug !== "index",
    }),
    Component.ArticleTitle(),
    Component.ContentMeta(),
    Component.TagList(),
  ],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      components: [
        {
          Component: Component.Search(),
          grow: true,
        },
        { Component: Component.Darkmode() },
        { Component: Component.ReaderMode() },
      ],
    }),
    Component.Explorer({
      title: "Navigation",
      folderDefaultState: "collapsed",
      folderClickBehavior: "link",
      mapFn: (node) => {
        const nameMap: Record<string, string> = {
          "00-orientation": "Orientation",
          "01-fundamentals": "Fundamentals",
          "02-business-processes": "Business Processes",
          "03-accounting": "Accounting",
          "04-sales": "Sales",
          "05-purchasing": "Purchasing",
          "06-inventory": "Inventory",
          "07-manufacturing": "Manufacturing",
          "08-finance": "Finance",
          "09-assets": "Assets",
          "10-project": "Project",
          "11-hr": "HR",
          "12-tax": "Tax",
          "20-software": "Software",
          "odoo": "Odoo",
          "erpnext": "ERPNext",
          "dynamics365": "Dynamics 365",
          "30-naventra": "Naventra",
        }
        if (node.isFolder && node.slugSegment && nameMap[node.slugSegment]) {
          node.displayName = nameMap[node.slugSegment]
        }
      },
      sortFn: (a, b) => {
        if ((!a.isFolder && !b.isFolder) || (a.isFolder && b.isFolder)) {
          const customOrder: Record<string, number> = {
            "00-orientation": 0,
            "01-fundamentals": 1,
            "02-business-processes": 2,
            "03-accounting": 3,
            "04-sales": 4,
            "05-purchasing": 5,
            "06-inventory": 6,
            "07-manufacturing": 7,
            "08-finance": 8,
            "09-assets": 9,
            "10-project": 10,
            "11-hr": 11,
            "12-tax": 12,
            "20-software": 13,
            "odoo": 14,
            "erpnext": 15,
            "dynamics365": 16,
            "30-naventra": 17,
          }
          const orderA = a.slugSegment ? customOrder[a.slugSegment] : undefined
          const orderB = b.slugSegment ? customOrder[b.slugSegment] : undefined

          if (orderA !== undefined && orderB !== undefined) {
            return orderA - orderB
          }
          if (orderA !== undefined) return -1
          if (orderB !== undefined) return 1

          return a.displayName.localeCompare(b.displayName, undefined, {
            numeric: true,
            sensitivity: "base",
          })
        }

        if (!a.isFolder && b.isFolder) {
          return 1
        } else {
          return -1
        }
      },
    }),
  ],
  right: [
    Component.Graph(),
    Component.DesktopOnly(Component.TableOfContents()),
    Component.Backlinks(),
  ],
}

// Components for pages that display lists of pages (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [Component.Breadcrumbs(), Component.ArticleTitle(), Component.ContentMeta()],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      components: [
        {
          Component: Component.Search(),
          grow: true,
        },
        { Component: Component.Darkmode() },
      ],
    }),
    Component.Explorer({
      title: "Navigation",
      folderDefaultState: "collapsed",
      folderClickBehavior: "link",
    }),
  ],
  right: [],
}
