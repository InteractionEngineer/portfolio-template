<script lang="ts">
  import type { Language } from "../../constants.ts";
  import { useTranslations } from "../../i18n/utils";

  export let title: string;
  export let location: string;
  export let locationUrl: string | undefined = undefined;
  export let description: string;
  export let dateStart: Date;
  export let dateEnd: Date | undefined;
  export let isLast: boolean;
  export let language: Language;

  const fromDict = useTranslations(language);
</script>

<li>
  <div class="relative pb-8">
    {#if !isLast}
      <span
        class="absolute top-4 left-4 -ml-px mt-6 h-3/5 w-0.5 bg-gray-200"
        aria-hidden="true"
      ></span>
    {/if}
    <div class="relative flex gap-2">
      <span
        class="relative z-10 w-9 h-8 flex items-center justify-around bg-white/10 border-white/20 border backdrop-filter backdrop-blur-md rounded-full"
      >
        <slot name="icon"></slot>
      </span>
      <div class="mt-1 ml-4 flex flex-row justify-between gap-2 w-full">
        <div class="flex flex-col">
          <p class="font-medium text-gray-100 title">
            {title}
            {#if locationUrl}
              <a href={locationUrl} target="_blank" rel="noopener noreferrer" class="font-medium text-gray-100">@ {location}</a>
            {:else}
              <span class="font-medium text-gray-100">@ {location}</span>
            {/if}
          </p>
          <p class="text-sm text-gray-300">{description}</p>
        </div>
        <div class="flex flex-col justify-center ml-4 items-center">
          {#if dateStart}
            <time
              class="text-sm text-gray-300"
              datetime={dateStart.toISOString()}
            >
              {dateStart.getFullYear()}
            </time>
          {/if}
          <span class="block text-sm text-gray-300 text-center"
            >{fromDict("timeline.timespan")}</span
          >
          {#if dateEnd}
            <time
              class="text-sm text-gray-300"
              datetime={dateEnd.toISOString()}
            >
              {dateEnd.getFullYear()}
            </time>
          {:else}
            <time class="text-sm text-gray-300"
              >{fromDict("timeline.current")}</time
            >
          {/if}
        </div>
      </div>
    </div>
  </div>
</li>

<style>
  p {
    margin-block: 0.2rem;
  }
  .title {
    margin-top: 0;
  }
</style>
