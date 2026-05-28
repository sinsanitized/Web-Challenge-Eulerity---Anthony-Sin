# PROMPTS.md

## AI Prompt Log

This file is a log of the messages I sent to AI tools during development.

---

## Prompt

Review the frontend take-home requirements and identify hidden complexity or architectural traps.

### Notes

The main complexity was not rendering a pet gallery by itself, but coordinating several interacting UI states:

- fetching remote data
- loading, error, and empty states
- filtering
- sorting
- pagination
- selection
- detail routing
- preserving selection across routes

This pushed me toward explicit state ownership instead of a heavier global state solution.

---

## Prompt

Analyze the provided `/pets` dataset before implementation and explain how the data shape should influence architecture.

### Notes

Important dataset observations:

- the API response did not include stable unique IDs
- image URLs were external and included `format=tiny`
- dates were provided as strings
- all current records appeared to share the same creation timestamp
- the dataset was small and static
- there was no server-side pagination metadata

These observations changed the implementation plan. Instead of assuming an ideal API shape, I normalized the data after fetching so the rest of the app could work with a more stable internal model.

I also removed `format=tiny` from the image URLs during normalization so the gallery could use the same source URL for display and download behavior.

---

## Prompt

How should I handle pet identity when the dataset does not include unique IDs?

### Notes

Because the API did not provide IDs, I generated deterministic IDs during normalization rather than using random UUIDs.

This was important because IDs are used for:

- React keys
- selected item tracking
- detail routes like `/pets/:id`
- lookup behavior after navigation

I avoided random IDs because they could change after reloads and break selection or route consistency.

---

## Prompt

The assignment asks for date sorting, but the current dataset appears to use the same creation date for every pet. How should this be handled?

### Notes

I implemented date sorting using normalized timestamps even though the current dataset does not visibly reorder much because the records appear to share the same creation date.

This keeps the logic correct if the dataset changes later, without modifying or faking the data just to make the sorting behavior look more dramatic.

---

## Prompt

Tradeoffs between infinite scroll and pagination for this assignment.

### Notes

I initially considered infinite scroll because the app is an image gallery. After reviewing the dataset and requirements, I chose pagination.

Reasons:

- the dataset is small
- there is no backend pagination metadata
- sorting, filtering, selection, and routing already create enough interaction complexity
- pagination makes route transitions and selection persistence easier to reason about
- infinite scroll would add scroll restoration and observer edge cases without much benefit for this dataset

The final choice prioritized predictable behavior and maintainability over extra UI complexity.

---

## Prompt

How should state ownership be divided between server state, global UI state, and local UI state?

### Notes

The implementation ended up using this state ownership:

- pet data, loading, error, and empty states live in the pets data layer
- selected pet IDs live in global context because selection must persist across routes
- search query, sort mode, and current page stay local to the gallery page

This kept global state minimal while still satisfying the persistence requirement.

---

## Prompt

How should filtering, sorting, and pagination be implemented without creating synchronization bugs?

### Notes

I used derived state instead of storing separate filtered, sorted, and paginated arrays as independent state.

The flow is:

```txt
normalized pets
→ filtered pets
→ sorted pets
→ paginated pets
```

This avoids stale state bugs when the user changes search, sort order, page, or selection.

---

## Prompt

What should “Select All” mean when search, filtering, and pagination exist?

### Notes

I treated Select All as applying to the current filtered result set, not the entire original dataset.

Selected count remains global, so selected pets remain selected even if they become hidden by search, sorting, or pagination.

Clear Selection clears all selected pets globally.

This behavior seemed more predictable than making Select All only affect the current page, while still keeping the selected state visible through the global selected count.

---

## Prompt

How should file size estimation work for external image URLs?

### Notes

I attempted to estimate image sizes using `HEAD` requests and `Content-Length` headers where available.

Because the images are external URLs, CORS restrictions or missing headers may prevent accurate size estimation. In those cases, the app falls back gracefully instead of displaying fake precision.

This was treated as best-effort metadata rather than guaranteed data.

---

## Prompt

What edge cases should this app handle gracefully where practical?

### Notes

Edge cases considered during implementation:

- `/pets` request fails
- API response is empty
- API response is not shaped as expected
- image URL fails to load
- date parsing fails
- user visits an invalid pet detail route
- search returns no results
- filtering or sorting changes while on a later page
- selected pets are hidden by a filter
- file size metadata is unavailable
- image downloads partially fail

The goal was to avoid obvious blank-screen failure modes and keep the UI predictable for the most likely data and network issues.

---

## Prompt

What abstractions are justified for a project of this size?

### Notes

I wanted the app to stay clear and maintainable without becoming overengineered.

Used:

- a custom data hook/context for pet loading
- selection context for global selected IDs
- utility functions for normalization, sorting, file size estimation, and downloads
- component-level styled-components

Avoided:

- Redux
- Zustand
- generic entity managers
- excessive custom hooks
- unnecessary framework-like architecture

The goal was to separate meaningful concerns without making the project feel larger than the assignment required.

---

## Prompt

What UX improvements provide the best return for this assignment?

### Notes

I focused on polish that directly supported the requirements:

- responsive gallery layout
- clear controls for search, sort, pagination, and selection
- loading states
- hover and selected-card states
- clear empty and error states
- graceful image fallback behavior
- detail pages that preserve selection state

I avoided adding unrelated features or excessive animation so the app stayed focused on the assignment.

---

## Prompt

Review the implementation for consistency with the requirements and identify places where the app may be overclaiming or underexplaining decisions.

### Notes

The main review feedback was to make sure the written explanation matched the actual implementation.

Areas checked:

- deterministic IDs are justified because the dataset lacks IDs
- date sorting is implemented even though the current data does not make it visually obvious
- pagination is a deliberate tradeoff, not a shortcut
- selection persistence is handled through global context
- image size estimation is best-effort and should not be described as guaranteed
- edge-case handling should be described realistically rather than as exhaustive validation

This helped keep the final explanation grounded in the codebase instead of turning the prompts log into a generic architecture document.

---

## Prompt

The API should try `/pets` first, but if that is not available, should the app fall back to the hosted endpoint? If so, how should that be described in the implementation log?

### Notes

I implemented fetch with a fallback chain of `/pets` first and `https://eulerity-hackathon.appspot.com/pets` second.

That decision matters because the app can still run when the local route is unavailable, while keeping `/pets` as the primary contract required by the challenge.

I described this as a network fallback, not a change to the core data model.
