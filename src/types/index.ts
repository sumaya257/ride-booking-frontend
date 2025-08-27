import type { ComponentType } from "react"

export interface IsidebarItems{
    title: string
    items: {
        title: string
        url: string
        component: ComponentType
    }[]
}

export type TRole = "admin" | "driver" | "rider";
