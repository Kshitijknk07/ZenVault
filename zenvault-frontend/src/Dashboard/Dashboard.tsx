import { useState } from 'react';
import { useUser, useAuth } from '@clerk/clerk-react';
import { Link, useNavigate } from 'react-router-dom';
import {
    HardDrive,
    FileText,
    Image,
    Film,
    Upload,
    FolderPlus,
    Search,
    Grid,
    List,
    Clock,
    Star,
    Trash2,
    Share2,
    MoreVertical,
    Shield,
    User,
    Settings,
    LogOut,
    Home,
    Menu,
    X
} from 'lucide-react';

const Dashboard = () => {
    const { user } = useUser();
    const { signOut } = useAuth();
    const navigate = useNavigate();
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [searchQuery, setSearchQuery] = useState('');
    const [currentFolder, setCurrentFolder] = useState('My Files');
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [userMenuOpen, setUserMenuOpen] = useState(false);

    const storageUsed = 2.5;
    const storageTotal = 10;
    const storagePercentage = (storageUsed / storageTotal) * 100;

    const recentFiles = [
        { id: 1, name: 'Project Proposal.pdf', type: 'pdf', size: '2.4 MB', modified: '2 hours ago', starred: true },
        { id: 2, name: 'Meeting Notes.docx', type: 'docx', size: '1.2 MB', modified: '5 hours ago', starred: false },
        { id: 3, name: 'Budget 2024.xlsx', type: 'xlsx', size: '3.5 MB', modified: 'Yesterday', starred: true },
        { id: 4, name: 'Profile Picture.jpg', type: 'jpg', size: '4.2 MB', modified: '3 days ago', starred: false },
        { id: 5, name: 'Presentation.pptx', type: 'pptx', size: '8.7 MB', modified: '1 week ago', starred: false },
    ];

    const folders = [
        { id: 1, name: 'Documents', files: 24, size: '128 MB' },
        { id: 2, name: 'Images', files: 156, size: '1.2 GB' },
        { id: 3, name: 'Videos', files: 8, size: '850 MB' },
        { id: 4, name: 'Projects', files: 12, size: '340 MB' },
    ];

    const getFileIcon = (type: string) => {
        switch (type) {
            case 'jpg':
            case 'png':
            case 'gif':
                return <Image className="h-6 w-6 text-accent" />;
            case 'mp4':
            case 'mov':
                return <Film className="h-6 w-6 text-accent" />;
            case 'pdf':
            case 'docx':
            case 'xlsx':
            case 'pptx':
            default:
                return <FileText className="h-6 w-6 text-accent" />;
        }
    };

    const filteredFiles = recentFiles.filter(file =>
        file.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleSignOut = async () => {
        await signOut();
        navigate('/');
    };

    const getInitials = (firstName: string, lastName: string) => {
        return `${firstName?.charAt(0) || ''}${lastName?.charAt(0) || ''}`.toUpperCase();
    };

    return (
        <div className="min-h-screen bg-background flex">
            {/* Mobile sidebar toggle */}
            <div className="lg:hidden fixed top-4 left-4 z-50">
                <button
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    className="p-2 rounded-lg bg-white shadow-md text-accent hover:bg-accent hover:text-white transition-colors"
                >
                    {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
                </button>
            </div>

            {/* Sidebar */}
            <div className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 fixed lg:static top-0 left-0 h-full w-64 bg-white shadow-xl transition-transform duration-300 ease-in-out z-40`}>
                <div className="p-4 flex flex-col h-full">
                    {/* Logo */}
                    <div className="flex items-center mb-8 mt-2">
                        <Link to="/" className="flex items-center">
                            <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-accent text-white shadow-accent-sm">
                                <Shield className="h-5 w-5" />
                            </div>
                            <span className="ml-2 text-xl font-bold">ZenVault</span>
                        </Link>
                    </div>

                    {/* User profile section */}
                    <div className="mb-8 p-3 bg-gray-50 rounded-xl">
                        <div className="flex items-center space-x-3">
                            <div className="relative">
                                {user?.imageUrl ? (
                                    <img
                                        src={user.imageUrl}
                                        alt="Profile"
                                        className="h-10 w-10 rounded-full border-2 border-accent"
                                    />
                                ) : (
                                    <div className="h-10 w-10 rounded-full bg-accent text-white flex items-center justify-center font-medium">
                                        {getInitials(user?.firstName || '', user?.lastName || '')}
                                    </div>
                                )}
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium truncate">
                                    {user?.firstName} {user?.lastName}
                                </p>
                                <p className="text-xs text-gray-500 truncate">
                                    {user?.emailAddresses[0].emailAddress}
                                </p>
                            </div>
                        </div>
                    </div>

                    <nav className="flex-1 space-y-1">
                        <button
                            onClick={() => setCurrentFolder('My Files')}
                            className={`w-full flex items-center px-3 py-2 rounded-lg text-sm font-medium ${currentFolder === 'My Files' ? 'bg-accent text-white' : 'text-gray-700 hover:bg-gray-100'}`}
                        >
                            <HardDrive className="h-5 w-5 mr-3" />
                            My Files
                        </button>

                        <button
                            onClick={() => setCurrentFolder('Recent')}
                            className={`w-full flex items-center px-3 py-2 rounded-lg text-sm font-medium ${currentFolder === 'Recent' ? 'bg-accent text-white' : 'text-gray-700 hover:bg-gray-100'}`}
                        >
                            <Clock className="h-5 w-5 mr-3" />
                            Recent
                        </button>

                        <button
                            onClick={() => setCurrentFolder('Starred')}
                            className={`w-full flex items-center px-3 py-2 rounded-lg text-sm font-medium ${currentFolder === 'Starred' ? 'bg-accent text-white' : 'text-gray-700 hover:bg-gray-100'}`}
                        >
                            <Star className="h-5 w-5 mr-3" />
                            Starred
                        </button>

                        <button
                            onClick={() => setCurrentFolder('Shared')}
                            className={`w-full flex items-center px-3 py-2 rounded-lg text-sm font-medium ${currentFolder === 'Shared' ? 'bg-accent text-white' : 'text-gray-700 hover:bg-gray-100'}`}
                        >
                            <Share2 className="h-5 w-5 mr-3" />
                            Shared
                        </button>

                        <button
                            onClick={() => setCurrentFolder('Trash')}
                            className={`w-full flex items-center px-3 py-2 rounded-lg text-sm font-medium ${currentFolder === 'Trash' ? 'bg-accent text-white' : 'text-gray-700 hover:bg-gray-100'}`}
                        >
                            <Trash2 className="h-5 w-5 mr-3" />
                            Trash
                        </button>
                    </nav>

                    <div className="mt-auto pt-4">
                        <div className="p-3 bg-gray-50 rounded-xl">
                            <div className="flex justify-between text-sm mb-1">
                                <span className="font-medium">Storage</span>
                                <span>{storageUsed} GB / {storageTotal} GB</span>
                            </div>
                            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-accent"
                                    style={{ width: `${storagePercentage}%` }}
                                ></div>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">
                                {(storageTotal - storageUsed).toFixed(1)} GB available
                            </p>
                        </div>
                    </div>

                    <div className="mt-4 space-y-2">
                        <Link
                            to="/profile"
                            className="w-full flex items-center px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100"
                        >
                            <User className="h-5 w-5 mr-3" />
                            Profile
                        </Link>

                        <button
                            className="w-full flex items-center px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100"
                        >
                            <Settings className="h-5 w-5 mr-3" />
                            Settings
                        </button>

                        <button
                            onClick={handleSignOut}
                            className="w-full flex items-center px-3 py-2 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50"
                        >
                            <LogOut className="h-5 w-5 mr-3" />
                            Sign Out
                        </button>
                    </div>
                </div>
            </div>

            <div className="flex-1 p-4 lg:p-8 ml-0 lg:ml-64">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
                    <div>
                        <h1 className="text-2xl font-bold">{currentFolder}</h1>
                        <p className="text-gray-500 text-sm">
                            {currentFolder === 'My Files' && 'Access all your files and folders'}
                            {currentFolder === 'Recent' && 'Recently accessed files'}
                            {currentFolder === 'Starred' && 'Your favorite files'}
                            {currentFolder === 'Shared' && 'Files shared with you'}
                            {currentFolder === 'Trash' && 'Deleted files (kept for 30 days)'}
                        </p>
                    </div>

                    <div className="flex items-center space-x-2">
                        <div className="relative">
                            <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search files..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-9 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-accent/50 w-full md:w-64"
                            />
                        </div>

                        <button className="p-2 rounded-lg bg-accent text-white hover:bg-accent/90 transition-colors">
                            <Upload className="h-5 w-5" />
                        </button>

                        <button className="p-2 rounded-lg bg-accent text-white hover:bg-accent/90 transition-colors">
                            <FolderPlus className="h-5 w-5" />
                        </button>
                    </div>
                </div>

                <div className="flex justify-end mb-4">
                    <div className="inline-flex rounded-lg border border-gray-200 overflow-hidden">
                        <button
                            onClick={() => setViewMode('grid')}
                            className={`p-2 ${viewMode === 'grid' ? 'bg-accent text-white' : 'bg-white text-gray-700'}`}
                        >
                            <Grid className="h-5 w-5" />
                        </button>
                        <button
                            onClick={() => setViewMode('list')}
                            className={`p-2 ${viewMode === 'list' ? 'bg-accent text-white' : 'bg-white text-gray-700'}`}
                        >
                            <List className="h-5 w-5" />
                        </button>
                    </div>
                </div>

                {currentFolder === 'My Files' && (
                    <div className="mb-8">
                        <h2 className="text-lg font-semibold mb-4">Folders</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            {folders.map((folder) => (
                                <div
                                    key={folder.id}
                                    className="bg-white rounded-xl p-4 border border-gray-200 hover:shadow-md transition-shadow cursor-pointer"
                                >
                                    <div className="flex items-start justify-between">
                                        <div className="flex items-center">
                                            <div className="h-10 w-10 rounded-lg bg-accent/10 flex items-center justify-center">
                                                <HardDrive className="h-5 w-5 text-accent" />
                                            </div>
                                            <div className="ml-3">
                                                <h3 className="font-medium">{folder.name}</h3>
                                                <p className="text-xs text-gray-500">{folder.files} files · {folder.size}</p>
                                            </div>
                                        </div>
                                        <button className="text-gray-400 hover:text-gray-600">
                                            <MoreVertical className="h-5 w-5" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                <div>
                    <h2 className="text-lg font-semibold mb-4">
                        {currentFolder === 'Recent' ? 'Recent Files' :
                            currentFolder === 'Starred' ? 'Starred Files' :
                                currentFolder === 'Shared' ? 'Shared Files' :
                                    currentFolder === 'Trash' ? 'Deleted Files' : 'Files'}
                    </h2>

                    {filteredFiles.length === 0 ? (
                        <div className="bg-white rounded-xl p-8 border border-gray-200 text-center">
                            <FileText className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                            <h3 className="text-lg font-medium mb-2">No files found</h3>
                            <p className="text-gray-500">
                                {searchQuery ? `No results for "${searchQuery}"` : 'Upload your first file to get started'}
                            </p>
                        </div>
                    ) : viewMode === 'grid' ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                            {filteredFiles.map((file) => (
                                <div
                                    key={file.id}
                                    className="bg-white rounded-xl p-4 border border-gray-200 hover:shadow-md transition-shadow"
                                >
                                    <div className="flex items-start justify-between">
                                        <div className="flex items-center">
                                            {getFileIcon(file.type)}
                                            <div className="ml-3">
                                                <h3 className="font-medium">{file.name}</h3>
                                                <p className="text-xs text-gray-500">{file.size} · {file.modified}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center">
                                            {file.starred && <Star className="h-4 w-4 text-yellow-400 mr-1" fill="#FBBF24" />}
                                            <button className="text-gray-400 hover:text-gray-600">
                                                <MoreVertical className="h-5 w-5" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Size</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Modified</th>
                                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {filteredFiles.map((file) => (
                                        <tr key={file.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    {getFileIcon(file.type)}
                                                    <div className="ml-3">
                                                        <div className="text-sm font-medium text-gray-900 flex items-center">
                                                            {file.name}
                                                            {file.starred && <Star className="h-4 w-4 text-yellow-400 ml-2" fill="#FBBF24" />}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{file.size}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{file.modified}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <button className="text-accent hover:text-accent/80 mr-3">
                                                    <Share2 className="h-4 w-4" />
                                                </button>
                                                <button className="text-gray-400 hover:text-gray-600">
                                                    <MoreVertical className="h-4 w-4" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;