# Memories photo gallery

The **Memories** button in the homepage navigation opens an overlay gallery. The gallery is generated automatically from **every supported photo in `src/assets/memories/`**. There is no photo list, manifest, or code to edit.

## Add, remove, or reorder photos

1. In GitHub, open `src/assets/memories/` and choose **Add file → Upload files**. Upload JPG, JPEG, PNG, WebP, or AVIF photos and commit the changes. (You can also add files locally and push.)
2. To remove a photo, delete its file from that same folder and commit.
3. Photos are shown in filename order. To set the order, name them `01-our-first-trip.jpg`, `02-family-celebration.webp`, etc. The descriptive part of the filename also becomes the photo's accessible description, so choose meaningful names.
4. Once the change reaches `main`, the normal GitHub Pages deployment rebuilds the gallery. No other file needs changing.

For best loading speed, export photos at around 1600–2000 pixels on the long edge and preferably below 2 MB each. The website automatically generates optimized viewing and thumbnail images during the build. Photos are **publicly viewable**; only upload photos you have permission to share.

## Initial sample photos

The ten numbered images in this folder are **temporary gallery test images**, copied from the public GitHub sample photography repository [`omipandit/photography`](https://github.com/omipandit/photography). They are not photographs of Swarnimam and Plabini. **Replace these samples with your own authorized photos before publishing the gallery.**

The gallery also handles an empty folder gracefully: it displays a short placeholder message instead of a broken viewer.
