# Pet Selector

React + TypeScript take-home app for browsing, selecting, sorting, and downloading pet images from `GET /pets`.

## Run

```bash
npm install
npm start
```

The app tries `"/pets"` first and falls back to the hosted Eulerity endpoint if the local route is unavailable.

If you want Vite to proxy `/pets` to the hosted API during development, set:

```bash
VITE_API_PROXY_TARGET=https://eulerity-hackathon.appspot.com npm start
```

## Features

- Responsive gallery layout: 1 column on mobile, 2 on tablet, 4 on desktop
- Search across title and description
- Sort by name A-Z, name Z-A, newest first, and oldest first
- Client-side pagination
- Persistent selection across routes
- Select all filtered results, clear selection, and download selected images
- Estimated total file size for the current selection
- Dynamic detail route at `/pets/:id`
- About page and not-found route
- Explicit loading, error, empty, and no-results states
- Styled with `styled-components`

## Data Handling

- The API records are normalized into a stable internal `Pet` shape.
- Deterministic IDs are generated because the API does not provide unique identifiers.
- Created dates are parsed into timestamps so date sorting is reliable.
- External image URLs are normalized so the gallery and downloads use the same source URL.
- File size estimation uses `HEAD` requests and falls back cleanly when metadata is unavailable.

## Architecture

- `PetsProvider` owns fetch, normalization, and server-state loading concerns.
- `SelectionProvider` owns selected pet IDs so selection persists across route changes.
- `GalleryPage` owns local search, sort, and pagination state.
- Filtered, sorted, and paginated results are derived from the fetched data rather than stored separately.

## Project Structure

- `src/context/PetsContext.tsx` - fetches and normalizes `/pets`
- `src/context/SelectionContext.tsx` - global selection state
- `src/pages/GalleryPage.tsx` - gallery view, search, sort, and pagination
- `src/pages/PetDetailPage.tsx` - detail route for `/pets/:id`
- `src/pages/AboutPage.tsx` - project overview page
- `src/utils/normalizePets.ts` - data normalization and ID generation
- `src/utils/sortPets.ts` - sort helpers
- `src/utils/estimateFileSize.ts` - best-effort file size estimation
- `src/utils/downloadPets.ts` - selected image download flow

## Notes

- Selection persists when navigating from the gallery to a detail view and back.
- The app treats image size estimates as best-effort metadata, not guaranteed values.
- Download failures are reported partially when remote hosts block requests or return errors.
