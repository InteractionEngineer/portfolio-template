<script lang="ts">
  import { createListbox } from "svelte-headlessui";

  export let classes: string;
  export let items: ReturnType<typeof createListbox>;
  export let options: string[];
  export let optionStyles: { bgColor?: string; textColor?: string }[] = [];
  export let placeholder: string;
  export let clickEvent = () => {};
  export let selectEvent: (event: CustomEvent<{ selected: string[] }>) => void;
  export let listAlignLeft = false;
</script>

<div class="relative inline-flex max-h-10">
  <button
    use:items.button
    class="inline-flex justify-center w-full text-gray-100 bg-white/10 border border-transparent rounded-md shadow-sm hover:bg-white/20 focus:outline-none backdrop-filter backdrop-blur-md {classes}"
    on:click={clickEvent}
    on:select={selectEvent}
  >
    <span class="text-nowrap text-gray-100">{placeholder}</span>
  </button>
  {#if $items.expanded && options.length > 0}
    <!-- TODO: blend scrollbar more into the applied colorscheme -->
    <ul
      use:items.items
      class="absolute {listAlignLeft ? 'left-0' : 'right-0'} z-10 mt-12 w-max min-w-full max-w-[min(20rem,calc(100vw_-_1rem))] bg-slate-900/50 border border-white/20 backdrop-filter backdrop-blur-md rounded-md shadow-lg ring-1 ring-black ring-opacity-5 list-none focus:outline-none lg:max-h-96 max-h-80 overflow-y-auto overflow-x-hidden"
    >
      {#each options as option, i}
        {#if !$items.selected.includes(option)}
          <li
            use:items.item={{ value: option }}
            class="block w-full text-left cursor-pointer select-none relative hover:bg-white/20 px-3 py-1.5"
          >
            {#if optionStyles[i]?.bgColor && optionStyles[i]?.textColor}
              <span class="inline-flex items-center {optionStyles[i].bgColor} {optionStyles[i].textColor} rounded-full px-2.5 py-0.5 text-xs font-medium">
                {option}
              </span>
            {:else}
              <span class="text-gray-100 text-sm">{option}</span>
            {/if}
          </li>
        {/if}
      {/each}
    </ul>
  {/if}
</div>

<style>
  ::-webkit-scrollbar {
    background: rgba(0, 0, 0, 0.2);
    width: 10px;
    height: 0px;
  }
  ::-webkit-scrollbar-thumb {
    height: 16px;
    border-radius: 5px;
    border: 5px solid #383F4A;
    background-clip: content-box;
    background-color: black;
  }
</style>
