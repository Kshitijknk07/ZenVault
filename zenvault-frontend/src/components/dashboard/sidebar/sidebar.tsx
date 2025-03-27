import { User } from '@clerk/clerk-react'
import { Button } from '../../ui/button'
import { Card } from '../../ui/card'
import {
    HardDrive,
    Star,
    Clock,
    Share2,
    Trash2,
    User as UserIcon,
    Settings,
    LogOut
} from 'lucide-react'

type SidebarProps = {
    user: User | null | undefined
    currentFolder: string
    onFolderChange: (folder: string) => void
    onSignOut: () => void
}

export const DashboardSidebar = ({
    user,
    currentFolder,
    onFolderChange,
    onSignOut
}: SidebarProps) => (
    <Card className="h-full w-64 rounded-none border-r-0 shadow-lg hidden lg:block">
        <div className="p-4 h-full flex flex-col gap-6">
            <div className="space-y-4">
                <div className="flex items-center gap-2 p-2">
                    <HardDrive className="h-6 w-6 text-accent" />
                    <span className="font-semibold">ZenVault</span>
                </div>

                <nav className="space-y-1">
                    {['My Files', 'Recent', 'Starred', 'Shared', 'Trash'].map((folder) => (
                        <Button
                            key={folder}
                            variant={currentFolder === folder ? 'secondary' : 'ghost'}
                            className="w-full justify-start gap-2"
                            onClick={() => onFolderChange(folder)}
                        >
                            {folder === 'My Files' && <HardDrive className="h-4 w-4" />}
                            {folder === 'Recent' && <Clock className="h-4 w-4" />}
                            {folder === 'Starred' && <Star className="h-4 w-4" />}
                            {folder === 'Shared' && <Share2 className="h-4 w-4" />}
                            {folder === 'Trash' && <Trash2 className="h-4 w-4" />}
                            {folder}
                        </Button>
                    ))}
                </nav>
            </div>

            <div className="mt-auto space-y-4">
                <Button variant="ghost" className="w-full justify-start gap-2">
                    <UserIcon className="h-4 w-4" />
                    Profile
                </Button>
                <Button variant="ghost" className="w-full justify-start gap-2">
                    <Settings className="h-4 w-4" />
                    Settings
                </Button>
                <Button
                    variant="ghost"
                    className="w-full justify-start gap-2 text-red-600 hover:text-red-700"
                    onClick={onSignOut}
                >
                    <LogOut className="h-4 w-4" />
                    Sign Out
                </Button>
            </div>
        </div>
    </Card>
)