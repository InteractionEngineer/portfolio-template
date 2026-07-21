<script lang="ts">
  import TimelineEntry from "./TimelineEntry.svelte";
  import { type TimelineData, IconType } from "../../types";
  import {
    BadgeCheckSolid,
    AwardSolid,
    HeartSolid,
    LandmarkSolid,
    BriefcaseSolid,
  } from "flowbite-svelte-icons";
  import type { Language } from "../../constants.ts";
  export let timeLineEntries: TimelineData[];
  export let language: Language;

  function makeIcon(type: IconType) {
    switch (type) {
      case IconType.Work:
        return BriefcaseSolid;
      case IconType.Education:
        return LandmarkSolid;
      case IconType.Certification:
        return AwardSolid;
      case IconType.Volunteer:
        return HeartSolid;
      case IconType.Other:
        return BadgeCheckSolid;
      default:
        return;
    }
  }
</script>

<ul role="list" class="w-full">
  {#each timeLineEntries as entry, index}
    <TimelineEntry
      {language}
      title={entry.title}
      location={entry.location}
      locationUrl={entry.locationUrl}
      description={entry.description}
      dateStart={entry.dateStart}
      dateEnd={entry.dateEnd}
      isLast={index === timeLineEntries.length - 1}
    >
      <span slot="icon">
        {@const icon = makeIcon(entry.type)}
        {#if icon}
          <svelte:component this={icon} class="w-4 h-4 text-gray-100" />
        {/if}
      </span>
    </TimelineEntry>
  {/each}
</ul>

<style>
  ul {
    list-style-type: none;
  }
</style>
