aultimport { useState } from 'react'
import { useUser, useAuth } from '@clerk/clerk-react'
import { File, Folder } from '@/types'
import { DashboardSidebar } from '@/components/dashboard/sidebar'
import { DashboardHeader } from '@/components/dashboard/header'
import { FileGrid, FileTable } from '@/components/dashboard/files'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Progress } from '@/components/ui/progress'

const Dashboard = () => {
    const { user } = useUser()
    const { signOut } = useAuth()
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
    const [searchQuery, setSearchQuery] = useState('')
    const [currentFolder, setCurrentFolder] = useState('My Files')

    // Example data - replace with real data
    const files: File[] = [
        { id: '1', name: 'project.pdf', type: 'pdf', size: 2.4, modified: new Date(), starred: true },
        { id: '2', name: 'meeting.mp4', type: 'mp4', size: 15.2, modified: new Date(), starred: false },
    ]

    const folders: Folder[] = [
        { id: '1', name: 'Documents', items: 24, size: 128 },
        { id: '2', name: 'Images', items: 156, size: 1200 },
    ]

    return (
        <div className="flex min-h-screen bg-background">
            <DashboardSidebar
                user={user}
                currentFolder={currentFolder}
                onFolderChange={setCurrentFolder}
                onSignOut={signOut}
            />

            <div className="flex-1">
                <DashboardHeader
                    viewMode={viewMode}
                    searchQuery={searchQuery}
                    currentFolder={currentFolder}
                    onViewChange={setViewMode}
                    onSearch={setSearchQuery}
                />

                <main className="p-6 space-y-6">
                    {currentFolder === 'My Files' && (
                        <Card>
                            <CardHeader className="text-lg font-semibold px-6 pt-4 pb-2">
                                Folders
                            </CardHeader>
                            <CardContent className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                                {folders.map((folder) => (
                                    <Card key={folder.id} className="p-4 hover:shadow-md transition-shadow">
                                        <div className="flex items-center gap-4">
                                            <div className="h-10 w-10 bg-accent/10 rounded-lg flex items-center justify-center">
                                                <HardDrive className="h-5 w-5 text-accent" />
                                            </div>
                                            <div>
                                                <h3 className="font-medium">{folder.name}</h3>
                                                <p className="text-sm text-muted-foreground">
                                                    {folder.items} items • {folder.size} MB
                                                </p>
                                            </div>
                                        </div>
                                    </Card>
                                ))}
                            </CardContent>
                        </Card>
                    )}

                    <Card>
                        <CardHeader className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 px-6 pt-4 pb-2">
                            <h2 className="text-lg font-semibold">
                                {currentFolder === 'Recent' && 'Recent Files'}
                                {currentFolder === 'Starred' && 'Starred Files'}
                                {currentFolder === 'Trash' && 'Deleted Files'}
                            </h2>
                            <div className="flex items-center gap-2">
                                <Button variant="outline" size="sm">
                                    <Upload className="h-4 w-4 mr-2" />
                                    Upload
                                </Button>
                                <Button variant="outline" size="sm">
                                    <FolderPlus className="h-4 w-4 mr-2" />
                                    New Folder
                                </Button>
                            </div>
                        </CardHeader>

                        <CardContent>
                            {viewMode === 'grid' ? (
                                <FileGrid files={files} />
                            ) : (
                                <FileTable files={files} />
                            )}
                        </CardContent>
                    </Card>

                    <StorageWidget used={25} total={100} />
                </main>
            </div>
        </div>
    )
}

const StorageWidget = ({ used, total }: { used: number; total: number }) => (
    <Card className="bg-accent/5 border-accent/20">
        <CardContent className="p-6 space-y-2">
            <div className="flex justify-between text-sm">
                <span className="font-medium text-accent">Storage</span>
                <span className="text-accent">{used}GB / {total}GB</span>
            </div>
            <Progress value={(used / total) * 100} className="h-2 bg-accent/10" />
            <p className="text-xs text-accent/80">
                {total - used}GB available • Upgrade plan for more space
            </p>
        </CardContent>
    </Card>
)

export default Dashboard