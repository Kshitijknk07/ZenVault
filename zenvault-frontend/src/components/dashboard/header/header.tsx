import { Input } from '../../ui/input'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Search, Grid, List } from 'lucide-react'

type HeaderProps = {
    viewMode: 'grid' | 'list'
    searchQuery: string
    currentFolder: string
    onViewChange: (mode: 'grid' | 'list') => void
    onSearch: (query: string) => void
}

export const DashboardHeader = ({
    viewMode,
    searchQuery,
    currentFolder,
    onViewChange,
    onSearch
}: HeaderProps) => (
    <header className="border-b p-4 bg-background/95 backdrop-blur">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="space-y-1">
                <h1 className="text-2xl font-bold capitalize">{currentFolder}</h1>
                <p className="text-sm text-muted-foreground">
                    {currentFolder === 'My Files' && 'All your files and folders'}
                    {currentFolder === 'Recent' && 'Recently accessed files'}
                    {currentFolder === 'Starred' && 'Your favorite files'}
                    {currentFolder === 'Shared' && 'Files shared with you'}
                    {currentFolder === 'Trash' && 'Deleted files'}
                </p>
            </div>

            <div className="flex items-center gap-2">
                <div className="relative w-full md:w-64">
                    <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <Input
                        placeholder="Search files..."
                        value={searchQuery}
                        onChange={(e) => onSearch(e.target.value)}
                        className="pl-9"
                    />
                </div>

                <Tabs defaultValue="grid" value={viewMode}>
                    <TabsList>
                        <TabsTrigger value="grid" onClick={() => onViewChange('grid')}>
                            <Grid className="h-4 w-4" />
                        </TabsTrigger>
                        <TabsTrigger value="list" onClick={() => onViewChange('list')}>
                            <List className="h-4 w-4" />
                        </TabsTrigger>
                    </TabsList>
                </Tabs>
            </div>
        </div>
    </header>
)