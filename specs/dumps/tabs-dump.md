# Sticky Debug Input Snapshot

## 1. SegmentedTabs Wrapper Structure

Current outer sticky wrapper is inside `StickyAnchor` in `src/components/SegmentedTabs/SegmentedTabs.tsx`.

```tsx
return (
  <div
    className={cn(
      segmentedTabsBehavior.sticky.sectionTrack,
      "w-full select-none",
    )}
  >
    <div
      className={cn(
        "pointer-events-none absolute top-0 bottom-0 left-1/2 z-0 w-screen -translate-x-1/2 transition-all duration-300",
        railClass,
      )}
      aria-hidden
    />

    <div className="w-full px-6 py-5 transition-all duration-300 md:px-8">
      <div className="mx-auto flex max-w-[1400px] items-center justify-start">
        <div className="relative z-10 w-full">{children}</div>
      </div>
    </div>

    <div
      className={cn(
        "pointer-events-none absolute top-full left-1/2 z-0 h-6 w-screen -translate-x-1/2 opacity-90 transition-opacity duration-300",
        gradientClass,
      )}
      aria-hidden
    />
  </div>
);
```

`segmentedTabsBehavior.sticky.sectionTrack` expands to:

```ts
"sticky top-16 z-20"
```

Resulting outer wrapper class:

```txt
sticky top-16 z-20 w-full select-none
```

## 2. Parent Containers / Risk Properties

### OverviewChallenges.tsx

Callsite wrapper:

```tsx
<div className="mt-3 flex justify-start">
  <SegmentedTabs
    tabs={content.tabs}
    activeTab={activeTab}
    onChange={setActiveTab}
    sticky={true}
  />
</div>
```

Runtime computed values:

```txt
direct parent class: mt-3 flex justify-start
display: flex
flex-direction: row
overflow-x: visible
overflow-y: visible
transform: none
position: static
rect height: 91.5
```

Ancestor values:

```txt
container: mx-auto max-w-7xl
container overflow: visible / visible
container transform: none
section: px-6 bg-white scroll-mt-20 pt-4 pb-5
section overflow: visible / visible
section transform: none
```

### ArchitecturePressure.tsx

Callsite wrapper:

```tsx
<div className="mt-3 flex justify-start">
  <SegmentedTabs
    tabs={content.tabs}
    activeTab={activeTab}
    onChange={(id) => setActiveTab(id as "tab1" | "tab2" | "tab3")}
    sticky={true}
  />
</div>
```

Runtime computed values:

```txt
direct parent class: mt-3 flex justify-start
display: flex
flex-direction: row
overflow-x: visible
overflow-y: visible
transform: none
position: static
rect height: 91.5
```

Ancestor values:

```txt
container: mx-auto max-w-7xl
container overflow: visible / visible
container transform: none
section: px-6 scroll-mt-20 py-8
section overflow: visible / visible
section transform: none
```

### ArchitectureLayers.tsx

Callsite wrapper:

```tsx
<div className="flex shrink-0 items-center self-start lg:self-auto">
  <SegmentedTabs
    variant="dark"
    tabs={[
      { id: "layer", label: content.viewModes.core },
      { id: "full", label: content.viewModes.expanded },
    ]}
    activeTab={viewMode}
    onChange={(id) =>
      id === "layer" ? handleLayerView() : handleFullView()
    }
    sticky={true}
  />
</div>
```

Runtime computed values:

```txt
direct parent class: flex shrink-0 items-center self-start lg:self-auto
display: flex
flex-direction: row
overflow-x: visible
overflow-y: visible
transform: none
position: static
rect height: 88.5
```

Grandparent values:

```txt
grandparent class: mb-12 flex flex-col justify-between gap-8 border-b pb-8 lg:flex-row lg:items-end border-white/10
display: flex
flex-direction: column
overflow-x: visible
overflow-y: visible
transform: none
position: static
rect height: 252.14
```

Section values:

```txt
section class: relative w-full bg-[#071133] text-white px-6 py-24
position: relative
overflow-x: visible
overflow-y: visible
transform: none
```

## 3. Current Scroll Container

Runtime probe result:

```txt
scrollContainer: documentElement/html
html overflow-y: visible
body overflow-y: visible
```

This was the same for:

```txt
overview light
architecture pressure light
architecture layers dark
```

No inspected page used a local `overflow-y-auto h-screen` scrolling div as the active scroll container.

## 4. Tailwind Computed Sticky Values

### Overview Light

Target:

```txt
Dependency Explosion Policy Fragmentation Workflow Drift
```

Computed sticky wrapper:

```txt
class: sticky top-16 z-20 w-full select-none
position: sticky
top: 64px
display: block
overflow-x: visible
overflow-y: visible
transform: none
z-index: 20
rect top at page load: 589
rect height: 91.5
rect width: 708
```

### Architecture Pressure Light

Target:

```txt
Semantic Consistency Runtime Planning Policy Isolation
```

Computed sticky wrapper:

```txt
class: sticky top-16 z-20 w-full select-none
position: sticky
top: 64px
display: block
overflow-x: visible
overflow-y: visible
transform: none
z-index: 20
rect top at page load: 778.75
rect height: 91.5
rect width: 708
```

### Architecture Layers Dark

Target:

```txt
Layer View Full View
```

Computed sticky wrapper:

```txt
class: sticky top-16 z-20 w-full select-none
position: sticky
top: 64px
display: block
overflow-x: visible
overflow-y: visible
transform: none
z-index: 20
rect top at page load: 2468.08
rect height: 88.5
rect width: 252.48
```
