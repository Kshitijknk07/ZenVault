const mongoose = require("mongoose");

const folderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 255,
    },
    parentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Folder",
      default: null,
    },
    path: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

folderSchema.index({ userId: 1 });
folderSchema.index({ parentId: 1 });
folderSchema.index({ userId: 1, parentId: 1, name: 1 }, { unique: true });
folderSchema.index({ path: 1 });

const Folder = mongoose.model("Folder", folderSchema);

const generatePath = async (userId, name, parentId = null) => {
  if (!parentId) {
    return `/${name}`;
  }

  const parent = await Folder.findById(parentId);
  if (!parent) {
    throw new Error("Parent folder not found");
  }

  return `${parent.path}/${name}`;
};

const createFolder = async ({ userId, name, parentId = null }) => {
  try {
    const path = await generatePath(userId, name, parentId);

    const folder = new Folder({
      userId,
      name,
      parentId,
      path,
    });

    await folder.save();
    return folder;
  } catch (error) {
    if (error.code === 11000) {
      throw new Error(
        "A folder with this name already exists in this location"
      );
    }
    throw error;
  }
};

const getFoldersByUser = async (userId, parentId = null) => {
  const query = { userId };
  if (parentId !== undefined) {
    query.parentId = parentId;
  }

  return await Folder.find(query).sort({ name: 1 });
};

const getFolderById = async (folderId, userId) => {
  return await Folder.findOne({ _id: folderId, userId });
};

const updateFolder = async (folderId, userId, { name, parentId }) => {
  try {
    const updateData = {};
    if (name) updateData.name = name;
    if (parentId !== undefined) updateData.parentId = parentId;

    if (name || parentId !== undefined) {
      const newPath = await generatePath(
        userId,
        name || (await Folder.findById(folderId)).name,
        parentId
      );
      updateData.path = newPath;
    }

    const folder = await Folder.findOneAndUpdate(
      { _id: folderId, userId },
      updateData,
      { new: true, runValidators: true }
    );

    return folder;
  } catch (error) {
    if (error.code === 11000) {
      throw new Error(
        "A folder with this name already exists in this location"
      );
    }
    throw error;
  }
};

const deleteFolder = async (folderId, userId) => {
  const folder = await Folder.findOne({ _id: folderId, userId });
  if (!folder) {
    throw new Error("Folder not found");
  }

  await Folder.deleteMany({ path: { $regex: `^${folder.path}/` } });

  await Folder.findByIdAndDelete(folderId);

  return folder;
};

const moveFolder = async (folderId, userId, newParentId) => {
  try {
    const folder = await Folder.findOne({ _id: folderId, userId });
    if (!folder) {
      throw new Error("Folder not found");
    }

    if (newParentId) {
      const newParent = await Folder.findById(newParentId);
      if (!newParent) {
        throw new Error("Destination folder not found");
      }

      if (newParent.path.startsWith(folder.path)) {
        throw new Error("Cannot move folder into itself or its descendants");
      }
    }

    const newPath = await generatePath(userId, folder.name, newParentId);

    const oldPath = folder.path;
    const newPathRegex = new RegExp(
      `^${oldPath.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`
    );

    await Folder.updateMany({ path: newPathRegex }, [
      {
        $set: {
          path: {
            $replaceAll: {
              input: "$path",
              find: oldPath,
              replacement: newPath,
            },
          },
        },
      },
    ]);

    const updatedFolder = await Folder.findByIdAndUpdate(
      folderId,
      { parentId: newParentId, path: newPath },
      { new: true }
    );

    return updatedFolder;
  } catch (error) {
    if (error.code === 11000) {
      throw new Error(
        "A folder with this name already exists in the destination"
      );
    }
    throw error;
  }
};

const copyFolder = async (folderId, userId, newParentId, newName = null) => {
  try {
    const sourceFolder = await Folder.findOne({ _id: folderId, userId });
    if (!sourceFolder) {
      throw new Error("Source folder not found");
    }

    const folderName = newName || sourceFolder.name;
    const newPath = await generatePath(userId, folderName, newParentId);

    const newFolder = new Folder({
      userId,
      name: folderName,
      parentId: newParentId,
      path: newPath,
    });

    await newFolder.save();

    return newFolder;
  } catch (error) {
    if (error.code === 11000) {
      throw new Error(
        "A folder with this name already exists in the destination"
      );
    }
    throw error;
  }
};

const getFolderTree = async (userId) => {
  const folders = await Folder.find({ userId }).sort({ path: 1 });

  const buildTree = (items, parentId = null) => {
    return items
      .filter((item) => {
        if (parentId === null) {
          return item.parentId === null;
        }
        return (
          item.parentId && item.parentId.toString() === parentId.toString()
        );
      })
      .map((item) => ({
        ...item.toObject(),
        children: buildTree(items, item._id),
      }));
  };

  return buildTree(folders);
};

const getFolderPath = async (folderId) => {
  const folder = await Folder.findById(folderId);
  if (!folder) {
    throw new Error("Folder not found");
  }

  const pathParts = folder.path.split("/").filter(Boolean);
  const pathFolders = [];

  for (let i = 0; i < pathParts.length; i++) {
    const path = "/" + pathParts.slice(0, i + 1).join("/");
    const folderInPath = await Folder.findOne({ userId: folder.userId, path });
    if (folderInPath) {
      pathFolders.push({
        id: folderInPath._id,
        name: folderInPath.name,
        path: folderInPath.path,
      });
    }
  }

  return pathFolders;
};

module.exports = {
  Folder,
  createFolder,
  getFoldersByUser,
  getFolderById,
  updateFolder,
  deleteFolder,
  moveFolder,
  copyFolder,
  getFolderTree,
  getFolderPath,
};
