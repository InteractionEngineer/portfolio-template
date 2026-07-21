<script lang="ts">
  import { fade, scale } from "svelte/transition";
  import Portal from "svelte-portal";

  export let images: { src: string; alt: string }[] = [];
  export let startIndex: number;
  let index = startIndex;
  export let dialog: any;

  let zoomLevel: 1 | 2 = 1;
  let zoomOrigin = "50% 50%";

  $: {
    if ($dialog.expanded) {
      index = startIndex;
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = "16px";
    } else {
      document.body.style.overflow = "auto";
      document.body.style.paddingRight = "0";
    }
  }

  // Reset zoom when image changes
  $: if (index !== undefined) {
    zoomLevel = 1;
    zoomOrigin = "50% 50%";
  }

  function handleKey(e: KeyboardEvent) {
    if (!$dialog.expanded) return;
    if (e.key === "ArrowRight" && index < images.length - 1) index++;
    if (e.key === "ArrowLeft" && index > 0) index--;
    if (e.key === "Escape") dialog.close();
  }

  // Desktop: click-to-zoom at click position
  function handleImageClick(e: MouseEvent) {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    if (zoomLevel === 1) {
      zoomOrigin = `${e.clientX - rect.left}px ${e.clientY - rect.top}px`;
      zoomLevel = 2;
    } else {
      zoomLevel = 1;
      zoomOrigin = "50% 50%";
    }
  }

  // Mobile: swipe to navigate + double-tap to zoom
  let touchStartX = 0;
  let touchStartY = 0;
  let lastTapTime = 0;
  let lastTapX = 0;
  let lastTapY = 0;

  function handleTouchStart(e: TouchEvent) {
    const t = e.touches[0];
    touchStartX = t.clientX;
    touchStartY = t.clientY;
  }

  function handleTouchEnd(e: TouchEvent) {
    e.preventDefault(); // prevent click event from firing after touch
    const t = e.changedTouches[0];
    const dx = t.clientX - touchStartX;
    const dy = t.clientY - touchStartY;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist > 50 && Math.abs(dx) > Math.abs(dy) && zoomLevel === 1) {
      // Swipe navigation (only when not zoomed)
      if (dx > 0 && index > 0) index--;
      else if (dx < 0 && index < images.length - 1) index++;
    } else if (dist < 20) {
      // Tap — check for double-tap to zoom
      const now = Date.now();
      if (now - lastTapTime < 300) {
        const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
        if (zoomLevel === 1) {
          zoomOrigin = `${lastTapX - rect.left}px ${lastTapY - rect.top}px`;
          zoomLevel = 2;
        } else {
          zoomLevel = 1;
          zoomOrigin = "50% 50%";
        }
        lastTapTime = 0;
      } else {
        lastTapTime = now;
        lastTapX = t.clientX;
        lastTapY = t.clientY;
      }
    }
  }

  const btnClass =
    "bg-white/20 rounded-full p-3 backdrop-filter backdrop-blur-md shadow-lg transition-all duration-300 hover:bg-white/40 hover:scale-105 active:scale-90";
</script>

<svelte:window on:keydown={handleKey} />

<Portal target="body">
  {#if $dialog.expanded}
    <div class="z-10 overflow-hidden">
      <button
        class="fixed inset-0 bg-black/70 backdrop-filter backdrop-blur-xl bg-opacity-20 h-screen"
        on:click={dialog.close}
        transition:fade={{ duration: 100 }}
      />
      <div class="fixed inset-0">
        <div
          class="flex items-center justify-center text-center w-full p-4 lg:p-12"
        >
          <div
            class="w-11/12"
            use:dialog.modal
            in:scale={{ duration: 300, delay: 100 }}
            out:scale={{ duration: 200 }}
          >
            <div class="flex justify-end mb-4">
              <button class={btnClass} on:click={dialog.close} aria-label="Schließen">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6 text-gray-100"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div class="flex flex-row items-center">
              {#if index > 0}
                <button
                  class="{btnClass} mr-4"
                  on:click={() => (index = index - 1)}
                  aria-label="Vorheriges Bild"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6 text-gray-100"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>
              {:else}
                <div class="w-12 h-12 mr-4" />
              {/if}

              <div class="flex flex-col w-full">
                <div
                  class="rounded-xl bg-white/20 border-white/30 shadow-xl backdrop-filter backdrop-blur-md bg-opacity-20 border p-6 h-[calc(75vh)] w-full overflow-hidden"
                  on:touchstart={handleTouchStart}
                  on:touchend={handleTouchEnd}
                >
                  {#each [images[index]] as { src, alt }}
                    <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
                    <img
                      {src}
                      {alt}
                      class="rounded-xl object-contain h-full w-full transition-transform duration-200 select-none"
                      style="transform: scale({zoomLevel}); transform-origin: {zoomOrigin}; cursor: {zoomLevel === 1 ? 'zoom-in' : 'zoom-out'};"
                      on:click={handleImageClick}
                      draggable="false"
                    />
                  {/each}
                </div>
                <p class="text-center text-gray-100 text-opacity-80 pt-3 italic text-sm">
                  {images[index].alt}
                </p>
              </div>

              {#if index < images.length - 1}
                <button
                  class="{btnClass} ml-4"
                  on:click={() => (index = index + 1)}
                  aria-label="Nächstes Bild"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6 text-gray-100"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              {:else}
                <div class="w-12 h-12 ml-4" />
              {/if}
            </div>
          </div>
        </div>
      </div>
    </div>
  {/if}
</Portal>
