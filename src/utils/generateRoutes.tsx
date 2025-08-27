import type { IsidebarItems } from "@/types"


export const generateRoutes = (sidebarItems:IsidebarItems[])=>{
    return sidebarItems.flatMap((section)=>
        section.items.map(route=>({
            path: route.url,
            Component: route.component
        }))
    )

}