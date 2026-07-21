<script lang="ts">
  import { onMount, tick } from "svelte";
  import { Language, categoryColorMap, Category } from "../../../constants.ts";
  import { selectedTagsStore } from "../../stores/selectedTagsStore";
  import { createListbox } from "svelte-headlessui";
  import Pill from "../Pill.svelte";
  import { fade } from "svelte/transition";
  import CloseIcon from "../Icons/CloseIcon.svelte";
  import { useTranslations } from "../../i18n/utils";
  import Dropdown from "../Dropdown.svelte";
  import { getAvailableTags, getColorProps } from "../../helpers.ts";

  export let dropdownClasses: string;
  export let language: Language;

  const availableTags = getAvailableTags(language);
  const fromDict = useTranslations(language);
  const listBox = createListbox({
    label: fromDict("projects.filter"),
    multi: true,
    selected: $selectedTagsStore,
  });

  const options = availableTags.map((tag) => tag.name);
  const optionStyles = availableTags.map((tag) => ({
    bgColor: getColorProps(tag.color).bgColor,
    textColor: getColorProps(tag.color).textColor,
  }));

  type TranslationKey = Parameters<typeof fromDict>[0];

  const legendEntries: { key: TranslationKey; legendDotColor: string }[] = [
    { key: "legend.design",         legendDotColor: getColorProps(categoryColorMap[Category.Interface]).legendDotColor },
    { key: "legend.platforms",      legendDotColor: getColorProps(categoryColorMap[Category.Platform]).legendDotColor },
    { key: "legend.programming",    legendDotColor: getColorProps(categoryColorMap[Category.ProgrammingLanguage]).legendDotColor },
    { key: "legend.engineering",    legendDotColor: getColorProps(categoryColorMap[Category.Engineering]).legendDotColor },
    { key: "legend.infrastructure", legendDotColor: getColorProps(categoryColorMap[Category.ServerNetwork]).legendDotColor },
    { key: "legend.management",     legendDotColor: getColorProps(categoryColorMap[Category.Management]).legendDotColor },
    { key: "legend.science",        legendDotColor: getColorProps(categoryColorMap[Category.Science]).legendDotColor },
  ];

  function handleSelect(event: CustomEvent<{ selected: string[] }>) {
    selectedTagsStore.set(event.detail.selected);
  }

  // Legend overflow detection — show all labels or none
  let outerRowEl: HTMLElement;
  let legendContainerEl: HTMLElement;
  let legendFits = false;
  let checkingFit = false;

  async function checkLegendFit() {
    if (typeof window !== "undefined" && window.innerWidth < 768) {
      legendFits = false;
      return;
    }
    checkingFit = true;
    await tick();
    if (legendContainerEl) {
      legendFits = legendContainerEl.scrollWidth <= legendContainerEl.clientWidth + 1;
    }
    checkingFit = false;
  }

  onMount(() => {
    checkLegendFit();
    const ro = new ResizeObserver(checkLegendFit);
    if (outerRowEl) ro.observe(outerRowEl);
    return () => ro.disconnect();
  });
</script>

<div class="flex flex-col w-full gap-3">
  <!-- Row 1: legend (left, all-or-nothing) + dropdown (always right) -->
  <div bind:this={outerRowEl} class="flex items-center gap-4 w-full">
    <div
      bind:this={legendContainerEl}
      class="flex-1 min-w-0 flex items-center gap-x-3 flex-nowrap overflow-hidden"
      class:hidden={!legendFits && !checkingFit}
    >
      <p class="text-xs text-gray-400 font-medium uppercase tracking-wide whitespace-nowrap shrink-0">
        {fromDict("legend.title")}
      </p>
      {#each legendEntries as entry}
        <span class="inline-flex items-center gap-1.5 text-xs text-gray-300 whitespace-nowrap shrink-0">
          <span class="w-2.5 h-2.5 rounded-full flex-shrink-0 {entry.legendDotColor}"></span>
          {fromDict(entry.key)}
        </span>
      {/each}
    </div>

    <div class="shrink-0">
      <Dropdown classes={dropdownClasses} items={listBox} options={options} {optionStyles} selectEvent={handleSelect} placeholder={fromDict("projects.filter")} listAlignLeft={!legendFits}/>
    </div>
  </div>

  <!-- Row 2: selected pills — only rendered when active -->
  {#if $listBox.selected.length > 0}
    <div class="flex flex-wrap gap-2">
      {#each $listBox.selected as tag (tag)}
        {@const tagData = availableTags.find((t) => t.name === tag)}
        <div transition:fade use:listBox.deselect={tag} class="cursor-pointer">
          {#if tagData}
            <Pill color={tagData.color} description={tagData.name}>
              <div slot="postfixIcon">
                <CloseIcon color={tagData.color} />
              </div>
            </Pill>
          {/if}
        </div>
      {/each}
    </div>
  {/if}
</div>
