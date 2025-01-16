import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { BarChart3, Layers, Map } from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="flex h-screen">
        <Sidebar>
          <SidebarHeader>
            <h2 className="text-xl font-bold p-4">Admin Dashboard</h2>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Navigation</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link href="/admin">
                        <BarChart3 className="mr-2 h-4 w-4" />
                        <span>Luminosity Readings</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link href="/admin/group-lights">
                        <Layers className="mr-2 h-4 w-4" />
                        <span>Group Lights</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link href="/admin/map">
                        <Map className="mr-2 h-4 w-4" />
                        <span>Map</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
        <div className="overflow-auto overflow-x-hidden w-screen lg:w-[calc(100vw-263px)]">
          <header className="bg-white shadow">
            <div className="max-w-7xl px-4 py-6 sm:px-6 lg:px-8 flex justify-start items-center">
              <SidebarTrigger />
            </div>
          </header>
          <main>
            <div className="w-full py-6 sm:px-6 lg:px-8">{children}</div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
