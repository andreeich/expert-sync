import { cn } from "@/lib/utils";
import * as React from "react";

const getVariant = (variant?: string) => {
  switch (variant) {
    case "file-04":
      return (
        <path d="M13 2.26v4.13c0 .9.01 1.11.21 1.5 .19.37.49.68.87.87 .39.2.6.21 1.5.21h4.13c.55 0 1-.45 1-1 0-.56-.45-1-1-1h-4.14c-.5 0-.62-.01-.61 0 0 0 0 0-.01-.01 0 .01 0-.11 0-.6V2.22c0-.56-.45-1-1-1 -.56 0-1 .44-1 1Zm6 7.71v7.21c0 1.89-.04 2.35-.22 2.7 -.2.37-.5.68-.88.87 -.36.18-.81.21-2.71.21h-6.4c-1.9 0-2.36-.04-2.71-.22 -.38-.2-.69-.5-.88-.88 -.19-.36-.22-.81-.22-2.71V6.75c0-1.9.03-2.36.21-2.71 .19-.38.49-.69.87-.88 .35-.19.8-.22 2.7-.22h3.21c.82 0 1.01 0 1.21.05 .2.04.39.12.57.23 .02.01.04.03.07.04 .15.1.3.24.82.77l3.18 3.18c.58.58.71.72.81.89 .1.17.19.37.23.57 .04.19.05.38.05 1.21Zm2 0c0-1.01-.02-1.27-.12-1.68 -.1-.41-.26-.8-.48-1.16 -.23-.37-.4-.56-1.11-1.27L16.1 2.67c-.62-.62-.8-.79-1.09-.99 -.07-.05-.13-.09-.19-.13 -.36-.22-.75-.39-1.16-.48 -.42-.1-.67-.12-1.68-.12H8.76c-2.31 0-2.85.04-3.62.43 -.76.38-1.37.99-1.75 1.74 -.4.76-.44 1.31-.44 3.61v10.4c0 2.3.04 2.84.43 3.61 .38.75.99 1.36 1.74 1.74 .76.39 1.31.43 3.61.43h6.4c2.3 0 2.84-.05 3.61-.44 .75-.39 1.36-1 1.74-1.75 .39-.77.43-1.32.43-3.62V9.88Z" />
      );
    case "file-05":
      return (
        <path d="M13 2.26v4.13c0 .9.01 1.11.21 1.5 .19.37.49.68.87.87 .39.2.6.21 1.5.21h4.13c.55 0 1-.45 1-1 0-.56-.45-1-1-1h-4.14c-.5 0-.62-.01-.61 0 0 0 0 0-.01-.01 0 .01 0-.11 0-.6V2.22c0-.56-.45-1-1-1 -.56 0-1 .44-1 1Zm1 13.73H8c-.56 0-1 .44-1 1 0 .55.44 1 1 1h6c.55 0 1-.45 1-1 0-.56-.45-1-1-1Zm2-4H8c-.56 0-1 .44-1 1 0 .55.44 1 1 1h8c.55 0 1-.45 1-1 0-.56-.45-1-1-1Zm3-2.02v7.21c0 1.89-.04 2.35-.22 2.7 -.2.37-.5.68-.88.87 -.36.18-.81.21-2.71.21h-6.4c-1.9 0-2.36-.04-2.71-.22 -.38-.2-.69-.5-.88-.88 -.19-.36-.22-.81-.22-2.71V6.75c0-1.9.03-2.36.21-2.71 .19-.38.49-.69.87-.88 .35-.19.8-.22 2.7-.22h3.21c.82 0 1.01 0 1.21.05 .2.04.39.12.57.23 .02.01.04.03.07.04 .15.1.3.24.82.77l3.18 3.18c.58.58.71.72.81.89 .1.17.19.37.23.57 .04.19.05.38.05 1.21Zm2 0c0-1.01-.02-1.27-.12-1.68 -.1-.41-.26-.8-.48-1.16 -.23-.37-.4-.56-1.11-1.27L16.1 2.67c-.62-.62-.8-.79-1.09-.99 -.07-.05-.13-.09-.19-.13 -.36-.22-.75-.39-1.16-.48 -.42-.1-.67-.12-1.68-.12H8.76c-2.31 0-2.85.04-3.62.43 -.76.38-1.37.99-1.75 1.74 -.4.76-.44 1.31-.44 3.61v10.4c0 2.3.04 2.84.43 3.61 .38.75.99 1.36 1.74 1.74 .76.39 1.31.43 3.61.43h6.4c2.3 0 2.84-.05 3.61-.44 .75-.39 1.36-1 1.74-1.75 .39-.77.43-1.32.43-3.62V9.88Z" />
      );
    case "plus":
      return (
        <path d="M11 5v14c0 .55.44 1 1 1 .55 0 1-.45 1-1V5c0-.56-.45-1-1-1 -.56 0-1 .44-1 1Zm-6 8h14c.55 0 1-.45 1-1 0-.56-.45-1-1-1H5c-.56 0-1 .44-1 1 0 .55.44 1 1 1Z" />
      );
    case "plus-circle":
      return (
        <path d="M11 8v8c0 .55.44 1 1 1 .55 0 1-.45 1-1V8c0-.56-.45-1-1-1 -.56 0-1 .44-1 1Zm-3 5h8c.55 0 1-.45 1-1 0-.56-.45-1-1-1H8c-.56 0-1 .44-1 1 0 .55.44 1 1 1Zm13-1c0 4.97-4.03 9-9 9 -4.98 0-9-4.03-9-9 0-4.98 4.02-9 9-9 4.97 0 9 4.02 9 9Zm2 0c0-6.08-4.93-11-11-11C5.92 1 1 5.92 1 12c0 6.07 4.92 11 11 11 6.07 0 11-4.93 11-11Z" />
      );
    case "settings-01":
      return (
        <g>
          <path d="M12 16c2.2 0 4-1.8 4-4 0-2.21-1.8-4-4-4 -2.21 0-4 1.79-4 4 0 2.2 1.79 4 4 4Zm0-2c-1.11 0-2-.9-2-2 0-1.11.89-2 2-2 1.1 0 2 .89 2 2 0 1.1-.9 2-2 2Z" />
          <path d="M17.81 14.32c-.21.45-.27.96-.18 1.45 .08.49.32.94.67 1.3l.06.06c.07.07.13.16.17.26 .04.09.06.2.06.31 0 .1-.03.21-.07.31 -.05.09-.11.18-.18.26 -.08.07-.17.13-.27.17 -.1.04-.21.06-.32.06 -.11 0-.22-.03-.32-.07 -.1-.05-.19-.11-.27-.18l-.06-.06c-.37-.36-.82-.6-1.31-.69 -.5-.09-1-.03-1.46.17 -.44.18-.83.5-1.09.91 -.27.4-.42.88-.42 1.37l-.01.15c0 .21-.09.42-.24.57 -.16.15-.37.23-.58.23 -.22 0-.43-.09-.58-.24 -.16-.16-.24-.37-.24-.58v-.09c-.02-.53-.18-1.02-.47-1.42 -.3-.41-.7-.72-1.18-.9 -.4-.18-.91-.24-1.4-.15 -.5.08-.95.32-1.31.67l-.07.06c-.08.07-.17.13-.27.17 -.1.04-.21.06-.32.06 -.11 0-.22-.03-.32-.07 -.1-.05-.19-.11-.27-.18 -.08-.08-.14-.17-.18-.27 -.05-.1-.07-.21-.07-.32 0-.11.02-.22.06-.32 .04-.1.1-.19.17-.27l.05-.06c.35-.37.59-.82.68-1.31 .08-.5.02-1-.18-1.46 -.19-.44-.51-.83-.92-1.09 -.41-.27-.89-.42-1.38-.42l-.16-.01c-.22 0-.43-.09-.58-.24 -.16-.16-.24-.37-.24-.58 0-.22.08-.43.23-.58 .15-.16.36-.24.57-.24h.08c.52-.02 1.01-.18 1.41-.47 .4-.3.71-.7.89-1.18 .17-.4.23-.91.14-1.4 -.09-.5-.33-.95-.68-1.31l-.07-.07c-.08-.08-.14-.17-.18-.27 -.05-.1-.07-.21-.07-.32 0-.11.02-.22.06-.32 .04-.1.1-.19.17-.27 .07-.08.16-.14.26-.18 .09-.05.2-.07.31-.07 .1 0 .21.02.31.06 .09.04.18.1.26.17l.05.05c.36.35.81.59 1.3.68 .49.08.99.02 1.45-.18l-.41-.92v1h.07c.13 0 .26-.03.39-.09 .44-.2.83-.52 1.09-.92 .26-.41.41-.89.41-1.38l0-.16c0-.22.08-.43.23-.58 .15-.16.36-.24.57-.24 .21 0 .42.08.57.23 .15.15.23.36.23.57v.08c0 .49.14.96.41 1.37 .26.4.65.72 1.09.91 .44.19.95.25 1.44.16s.94-.33 1.3-.68l.06-.07c.07-.08.16-.14.26-.18 .09-.05.2-.07.31-.07 .1 0 .21.02.31.06 .09.04.18.1.26.17 .07.07.13.16.17.26 .04.09.06.2.06.31 0 .1-.03.21-.07.31 -.05.09-.11.18-.18.26l-.06.05c-.36.36-.6.81-.69 1.31 -.09.49-.03.99.17 1.45l.91-.41h-1v.07c0 .13.02.26.08.39 .19.44.51.83.91 1.09 .4.26.88.41 1.37.41l.15 0c.21 0 .42.08.57.23 .15.15.23.36.23.57 0 .21-.09.42-.24.57 -.16.15-.37.23-.58.23h-.09c-.5 0-.97.14-1.38.41 -.41.26-.73.65-.92 1.09Zm1.83.79c.03-.09.1-.17.18-.22 .08-.06.17-.09.27-.09l.07 0c.74 0 1.46-.3 1.99-.83 .52-.53.82-1.25.82-2s-.3-1.47-.83-2 -1.25-.83-2-.83h-.16c-.1-.01-.19-.03-.28-.09 -.09-.06-.15-.14-.19-.23l-.92.39h1v-.08c0-.14-.03-.28-.09-.41 -.05-.1-.06-.2-.04-.3 .01-.1.06-.19.13-.27l.04-.05c.26-.27.46-.58.61-.92 .14-.35.21-.71.21-1.08 0-.38-.08-.74-.22-1.08 -.15-.35-.35-.66-.62-.92 -.27-.27-.58-.47-.92-.62 -.35-.15-.71-.22-1.08-.22 -.38 0-.74.07-1.08.21 -.35.14-.66.34-.92.61l-.06.05c-.07.06-.16.1-.26.12 -.1.01-.2 0-.3-.04 -.1-.05-.18-.11-.23-.19 -.06-.09-.09-.18-.09-.28l0-.08c0-.75-.3-1.47-.83-2s-1.25-.83-2-.83 -1.47.29-2 .82c-.53.52-.83 1.24-.83 1.99v.15c-.01.09-.03.18-.09.27 -.06.08-.14.14-.22.18l.39.91v-1h-.08c-.14 0-.28.02-.41.08 -.1.04-.2.05-.3.03 -.1-.02-.19-.07-.27-.14l-.05-.05c-.27-.27-.58-.47-.92-.62 -.35-.15-.71-.22-1.08-.22 -.38 0-.74.07-1.08.21 -.35.14-.66.34-.92.61 -.27.26-.47.57-.62.91 -.15.34-.22.7-.22 1.07 0 .37.07.73.21 1.07 .14.34.34.65.61.91l.05.05c.06.06.1.15.12.25 .01.09 0 .19-.04.29 -.06.15-.13.23-.21.29 -.09.05-.18.09-.28.09l-.06-.01c-.75 0-1.47.29-2 .82 -.53.52-.83 1.24-.83 1.99 0 .74.29 1.46.82 1.99 .52.52 1.24.82 1.99.82h.15c.09 0 .18.02.27.08 .08.05.14.13.18.21 .04.1.05.2.03.3 -.02.09-.07.18-.14.26l-.05.04c-.27.26-.47.57-.62.91 -.15.34-.22.7-.22 1.07 0 .37.07.73.21 1.07 .14.34.34.65.61.91 .26.26.57.46.91.61 .34.14.7.21 1.07.21 .37 0 .73-.08 1.07-.22 .34-.15.65-.35.91-.62l.05-.06c.06-.07.15-.11.25-.13 .09-.02.19-.01.29.03 .15.05.23.12.29.2 .05.08.09.17.09.27l-.01.05c0 .74.29 1.46.82 1.99 .52.52 1.24.82 1.99.82 .74 0 1.46-.3 1.99-.83 .52-.53.82-1.25.82-2v-.16c0-.1.02-.19.08-.28 .05-.09.13-.15.22-.19 .1-.05.2-.06.3-.04 .09.01.18.06.26.13l.04.04c.26.26.57.46.91.61 .34.14.7.21 1.07.21 .37 0 .73-.08 1.07-.22 .34-.15.65-.35.91-.62s.46-.58.61-.92c.14-.35.21-.71.21-1.08 0-.38-.08-.74-.22-1.08 -.15-.35-.35-.66-.62-.92l-.06-.06c-.07-.07-.11-.16-.13-.26 -.02-.1-.01-.2.03-.3Z" />
        </g>
      );
    case "settings-04":
      return (
        <path d="M3 9h12c.55 0 1-.45 1-1 0-.56-.45-1-1-1H3c-.56 0-1 .44-1 1 0 .55.44 1 1 1Zm11-1c0 2.2 1.79 4 4 4 2.2 0 4-1.8 4-4 0-2.21-1.8-4-4-4 -2.21 0-4 1.79-4 4Zm2 0c0-1.11.89-2 2-2 1.1 0 2 .89 2 2 0 1.1-.9 2-2 2 -1.11 0-2-.9-2-2Zm-7 9h12c.55 0 1-.45 1-1 0-.56-.45-1-1-1H9c-.56 0-1 .44-1 1 0 .55.44 1 1 1Zm-1-1c0 1.1-.9 2-2 2 -1.11 0-2-.9-2-2 0-1.11.89-2 2-2 1.1 0 2 .89 2 2Zm2 0c0-2.21-1.8-4-4-4 -2.21 0-4 1.79-4 4 0 2.2 1.79 4 4 4 2.2 0 4-1.8 4-4Z" />
      );
    case "arrow-left":
      return (
        <path d="M19 11H5c-.56 0-1 .44-1 1 0 .55.44 1 1 1h14c.55 0 1-.45 1-1 0-.56-.45-1-1-1ZM4.29 12.7l7 7c.39.39 1.02.39 1.41 0 .39-.4.39-1.03 0-1.42l-7-7c-.4-.4-1.03-.4-1.42 0 -.4.39-.4 1.02 0 1.41Zm1.41 0l7-7c.39-.4.39-1.03 0-1.42 -.4-.4-1.03-.4-1.42 0l-7 7c-.4.39-.4 1.02 0 1.41 .39.39 1.02.39 1.41 0Z" />
      );
    case "menu-02":
      return (
        <path d="M3 13h12c.55 0 1-.45 1-1 0-.56-.45-1-1-1H3c-.56 0-1 .44-1 1 0 .55.44 1 1 1Zm0-6h18c.55 0 1-.45 1-1 0-.56-.45-1-1-1H3c-.56 0-1 .44-1 1 0 .55.44 1 1 1Zm0 12h18c.55 0 1-.45 1-1 0-.56-.45-1-1-1H3c-.56 0-1 .44-1 1 0 .55.44 1 1 1Z" />
      );
    case "x-close":
      return (
        <path d="M17.29 5.29l-12 12c-.4.39-.4 1.02 0 1.41 .39.39 1.02.39 1.41 0l12-12c.39-.4.39-1.03 0-1.42 -.4-.4-1.03-.4-1.42 0Zm-12 1.41l12 12c.39.39 1.02.39 1.41 0 .39-.4.39-1.03 0-1.42l-12-12c-.4-.4-1.03-.4-1.42 0 -.4.39-.4 1.02 0 1.41Z" />
      );
    case "chevron-down":
      return (
        <path d="M5.29 9.7l6 6c.39.39 1.02.39 1.41 0l6-6c.39-.4.39-1.03 0-1.42 -.4-.4-1.03-.4-1.42 0l-6 6h1.41l-6-6c-.4-.4-1.03-.4-1.42 0 -.4.39-.4 1.02 0 1.41Z" />
      );
    case "chevron-up":
      return (
        <path d="M18.7 14.29l-6-6c-.4-.4-1.03-.4-1.42 0l-6 6c-.4.39-.4 1.02 0 1.41 .39.39 1.02.39 1.41 0l6-6h-1.42l6 6c.39.39 1.02.39 1.41 0 .39-.4.39-1.03 0-1.42Z" />
      );
    case "share-03":
      return (
        <path d="M22 9V3c0-.56-.45-1-1-1 -.56 0-1 .44-1 1v6c0 .55.44 1 1 1 .55 0 1-.45 1-1Zm-1-7h-6c-.56 0-1 .44-1 1 0 .55.44 1 1 1h6c.55 0 1-.45 1-1 0-.56-.45-1-1-1Zm-.71.29l-9 8.99c-.4.39-.4 1.02-.01 1.41 .39.39 1.02.39 1.41 0l9-9c.39-.4.39-1.03 0-1.42 -.4-.4-1.03-.4-1.42-.01Zm-10.3-.3h-2.2c-2.31 0-2.85.04-3.62.43 -.76.38-1.37.99-1.75 1.74 -.4.76-.44 1.31-.44 3.61v8.4c0 2.3.04 2.84.43 3.61 .38.75.99 1.36 1.74 1.74 .76.39 1.31.43 3.61.43h8.4c2.3 0 2.84-.05 3.61-.44 .75-.39 1.36-1 1.74-1.75 .39-.77.43-1.32.43-3.62v-2.2c0-.56-.45-1-1-1 -.56 0-1 .44-1 1v2.2c0 1.89-.04 2.35-.22 2.7 -.2.37-.5.68-.88.87 -.36.18-.81.21-2.71.21h-8.4c-1.9 0-2.36-.04-2.71-.22 -.38-.2-.69-.5-.88-.88 -.19-.36-.22-.81-.22-2.71v-8.4c0-1.9.03-2.36.21-2.71 .19-.38.49-.69.87-.88 .35-.19.8-.22 2.7-.22h2.2c.55 0 1-.45 1-1 0-.56-.45-1-1-1Z" />
      );
    case "trash-01":
      return (
        <path d="M17 6v-.8c0-1.61-.04-1.99-.33-2.57 -.29-.57-.75-1.03-1.32-1.32 -.59-.3-.97-.33-2.57-.33h-1.6c-1.61 0-1.99.03-2.57.32 -.57.28-1.03.74-1.32 1.31 -.3.58-.33.96-.33 2.56v.8c0 .55.44 1 1 1 .55 0 1-.45 1-1v-.8c0-1.2.02-1.49.1-1.66 .09-.19.24-.35.43-.44 .16-.09.45-.11 1.65-.11h1.6c1.19 0 1.48.02 1.65.1 .18.09.34.24.43.43 .08.16.1.45.1 1.65v.8c0 .55.44 1 1 1 .55 0 1-.45 1-1Zm-8 5.5v5c0 .55.44 1 1 1 .55 0 1-.45 1-1v-5c0-.56-.45-1-1-1 -.56 0-1 .44-1 1Zm4 0v5c0 .55.44 1 1 1 .55 0 1-.45 1-1v-5c0-.56-.45-1-1-1 -.56 0-1 .44-1 1ZM3 7h18c.55 0 1-.45 1-1 0-.56-.45-1-1-1H3c-.56 0-1 .44-1 1 0 .55.44 1 1 1Zm15-1v11.2c0 1.89-.04 2.35-.22 2.7 -.2.37-.5.68-.88.87 -.36.18-.81.21-2.71.21h-4.4c-1.9 0-2.36-.04-2.71-.22 -.38-.2-.69-.5-.88-.88 -.19-.36-.22-.81-.22-2.71V5.97c0-.56-.45-1-1-1 -.56 0-1 .44-1 1v11.2c0 2.3.04 2.84.43 3.61 .38.75.99 1.36 1.74 1.74 .76.39 1.31.43 3.61.43h4.4c2.3 0 2.84-.05 3.61-.44 .75-.39 1.36-1 1.74-1.75 .39-.77.43-1.32.43-3.62V5.94c0-.56-.45-1-1-1 -.56 0-1 .44-1 1Z" />
      );
    case "delete":
      return (
        <path d="M16.29 8.29l-6 6c-.4.39-.4 1.02 0 1.41 .39.39 1.02.39 1.41 0l6-6c.39-.4.39-1.03 0-1.42 -.4-.4-1.03-.4-1.42 0Zm-6 1.41l6 6c.39.39 1.02.39 1.41 0 .39-.4.39-1.03 0-1.42l-6-6c-.4-.4-1.03-.4-1.42 0 -.4.39-.4 1.02 0 1.41Zm-8.38 3.85l4.32 5.76c.4.53.52.68.72.87 .07.06.14.13.22.19 .29.22.63.39.98.49 .36.1.58.11 1.42.11h7.6c2.3 0 2.84-.05 3.61-.44 .75-.39 1.36-1 1.74-1.75 .39-.77.43-1.32.43-3.62v-6.4c0-2.31-.05-2.85-.44-3.62 -.39-.76-1-1.37-1.75-1.75 -.77-.4-1.32-.44-3.62-.44h-7.6c-.85 0-1.07.01-1.43.11 -.36.1-.7.26-.99.49 -.08.05-.16.12-.23.19 -.21.19-.33.34-.73.87l-4.33 5.76c-.38.5-.47.63-.57.93 -.02.05-.02.05-.04.12 -.09.33-.09.68-.01 1.01 .01.06.01.06.03.12 .1.29.19.42.56.93Zm1.6-1.2c-.23-.3-.28-.38-.28-.38s0 0 0 .01c0 0 0 0 0-.01 -.01.01-.01.01-.01.01 0-.01.05-.09.27-.38L7.8 5.84c.32-.43.41-.55.5-.64 .01-.02.03-.04.04-.05 .09-.08.21-.14.32-.17 .1-.04.25-.04.87-.04h7.6c1.89 0 2.35.03 2.7.21 .37.19.68.49.87.87 .18.35.21.8.21 2.7v6.4c0 1.89-.04 2.35-.22 2.7 -.2.37-.5.68-.88.87 -.36.18-.81.21-2.71.21H9.5c-.63 0-.77-.01-.88-.04 -.12-.04-.24-.09-.33-.17 -.02-.02-.04-.03-.05-.05 -.09-.09-.19-.21-.51-.64l-4.32-5.76Z" />
      );
    case "dots-vertical":
      return (
        <g>
          <path d="M12 14c1.1 0 2-.9 2-2 0-1.11-.9-2-2-2 -1.11 0-2 .89-2 2 0 1.1.89 2 2 2Zm0-2c-.01 0 0 0 0 0 0-.01-.01 0 0 0 0 0 0-.01 0 0 0 0 0 0 0 0Z" />
          <path d="M12 7c1.1 0 2-.9 2-2 0-1.11-.9-2-2-2 -1.11 0-2 .89-2 2 0 1.1.89 2 2 2Zm0-2c-.01 0 0 0 0 0 0-.01-.01 0 0 0 0 0 0-.01 0 0 0 0 0 0 0 0Z" />
          <path d="M12 21c1.1 0 2-.9 2-2 0-1.11-.9-2-2-2 -1.11 0-2 .89-2 2 0 1.1.89 2 2 2Zm0-2c-.01 0 0 0 0 0 0-.01-.01 0 0 0 0 0 0-.01 0 0 0 0 0 0 0 0Z" />
        </g>
      );
    case "log-out-01":
      return (
        <path d="M16.7 17.7l5-5c.39-.4.39-1.03 0-1.42 -.4-.4-1.03-.4-1.42 0l-5 5c-.4.39-.4 1.02 0 1.41 .39.39 1.02.39 1.41 0Zm5-6.42l-5-5c-.4-.4-1.03-.4-1.42 0 -.4.39-.4 1.02 0 1.41l5 5c.39.39 1.02.39 1.41 0 .39-.4.39-1.03 0-1.42Zm-.71-.3h-12c-.56 0-1 .44-1 1 0 .55.44 1 1 1h12c.55 0 1-.45 1-1 0-.56-.45-1-1-1Zm-12-9h-1.2c-2.31 0-2.85.04-3.62.43 -.76.38-1.37.99-1.75 1.74 -.4.76-.44 1.31-.44 3.61v8.4c0 2.3.04 2.84.43 3.61 .38.75.99 1.36 1.74 1.74 .76.39 1.31.43 3.61.43h1.2c.55 0 1-.45 1-1 0-.56-.45-1-1-1h-1.2c-1.9 0-2.36-.04-2.71-.22 -.38-.2-.69-.5-.88-.88 -.19-.36-.22-.81-.22-2.71v-8.4c0-1.9.03-2.36.21-2.71 .19-.38.49-.69.87-.88 .35-.19.8-.22 2.7-.22h1.2c.55 0 1-.45 1-1 0-.56-.45-1-1-1Z" />
      );
    case "search-lg":
      return (
        <path d="M21.7 20.29l-3.5-3.5c-.4-.4-1.03-.4-1.42-.01 -.4.39-.4 1.02-.01 1.41l3.49 3.5c.39.39 1.02.39 1.41 0 .39-.4.39-1.03 0-1.42Zm-2.71-8.8c0 4.14-3.36 7.5-7.5 7.5 -4.15 0-7.5-3.36-7.5-7.5 0-4.15 3.35-7.5 7.5-7.5 4.14 0 7.5 3.35 7.5 7.5Zm2 0c0-5.25-4.26-9.5-9.5-9.5 -5.25 0-9.5 4.25-9.5 9.5 0 5.24 4.25 9.5 9.5 9.5 5.24 0 9.5-4.26 9.5-9.5Z" />
      );
    case "file-edit":
      return (
        <g transform="translate(4 2)">
          <g>
            <path d="M1 11.5V2c0-.27.1-.52.29-.71 .18-.19.44-.3.7-.3h8.5l-.71-.3 5.5 5.5 -.3-.71v12.5c0 .26-.11.51-.3.7 -.19.18-.45.29-.71.29h-5.5c-.56 0-1 .44-1 1 0 .55.44 1 1 1h5.5c.79 0 1.55-.32 2.12-.88 .56-.57.87-1.33.87-2.13V5.46c0-.27-.11-.52-.3-.71l-5.5-5.5c-.19-.19-.45-.3-.71-.3h-8.5c-.8 0-1.56.31-2.13.87 -.57.56-.88 1.32-.88 2.12v9.5c0 .55.44 1 1 1 .55 0 1-.45 1-1Z" />
            <path d="M9 0v6c0 .55.44 1 1 1h6c.55 0 1-.45 1-1 0-.56-.45-1-1-1h-6l1 1V0c0-.56-.45-1-1-1 -.56 0-1 .44-1 1Z" />
            <path d="M7.12 11.31c.1-.11.22-.19.35-.24 .13-.06.27-.09.42-.09 .14 0 .28.02.42.08 .13.05.25.13.35.23 .1.1.18.22.23.35 .05.13.08.27.08.42 0 .14-.03.28-.09.42 -.06.13-.14.25-.24.35L3.2 18.24l.46-.27 -3.95 1 1.21 1.21 .98-3.96 -.27.46 5.43-5.44ZM5.7 9.89L.26 15.32c-.13.12-.22.28-.27.46L-1 19.73c-.19.73.48 1.39 1.21 1.21l3.94-1c.17-.05.33-.14.46-.27l5.44-5.42c.28-.29.51-.64.67-1.01 .15-.38.23-.78.23-1.19 0-.41-.09-.82-.24-1.19 -.16-.38-.39-.72-.68-1.01 -.29-.29-.63-.52-1.01-.68 -.38-.16-.78-.24-1.19-.24 -.41 0-.82.08-1.19.23 -.38.15-.72.38-1.01.67Z" />
          </g>
        </g>
      );
    case "refresh-ccw-01":
      return (
        <path d="M2.8 10.59c.02-.05.08-.12.17-.24 .13-.19.29-.4.47-.62 .49-.64 1-1.28 1.5-1.88 .21-.26.42-.5.63-.73 .26-.3.52-.57.75-.81 1.49-1.5 3.5-2.35 5.65-2.35 4.41 0 8 3.58 8 8 0 4.41-3.59 8-8 8 -3.59 0-6.71-2.39-7.69-5.78 -.16-.54-.71-.84-1.24-.69 -.54.15-.84.7-.69 1.23 1.22 4.24 5.12 7.22 9.6 7.22 5.52 0 10-4.48 10-10 0-5.53-4.48-10-10-10C9.26 1.94 6.73 3 4.87 4.87c-.27.26-.54.55-.83.87 -.22.24-.45.49-.67.76 -.53.61-1.06 1.28-1.57 1.94 -.18.23-.35.44-.49.63 -.09.11-.15.2-.19.24 -.33.44-.24 1.07.21 1.39 .44.32 1.07.23 1.39-.22Zm.19-.6v-6c0-.56-.45-1-1-1 -.56 0-1 .44-1 1v6c0 .55.44 1 1 1 .55 0 1-.45 1-1Zm-1 1h6c.55 0 1-.45 1-1 0-.56-.45-1-1-1h-6c-.56 0-1 .44-1 1 0 .55.44 1 1 1Z" />
      );
    case "message-circle-01":
      return (
        <path d="M20 12c0 4.41-3.59 8-8 8 -1.05 0-2.07-.21-3.01-.59 -.33-.14-.39-.16-.54-.19 -.16-.04-.29-.05-.44-.05 -.16 0-.23.01-.52.05l-3.56.59c-.23.03-.3.04-.35.05 .03-.01.1 0 .21.05 .11.05.21.14.26.26 .04.1.05.17.05.21 0-.06.01-.13.05-.35l.59-3.56c.04-.3.05-.37.05-.52 -.01-.16-.02-.29-.05-.44 -.04-.16-.06-.22-.19-.54 -.39-.95-.59-1.97-.59-3.01 0-4.42 3.58-8 8-8 4.41 0 8 3.58 8 8Zm2 0c0-5.53-4.48-10-10-10C6.47 2 2 6.47 2 12c0 1.3.25 2.57.73 3.76 .07.17.09.23.09.22 0 0-.01-.01-.01-.01 -.01-.01-.01.02-.04.18l-.6 3.55c-.13.72-.14.87.03 1.25 .15.35.43.63.78.78 .38.16.52.15 1.25.03l3.55-.6c.15-.03.19-.04.18-.04 0 0-.01-.01 0 0 -.01-.01.04.01.22.09 1.18.48 2.45.73 3.76.73 5.52 0 10-4.48 10-10Z" />
      );
    case "send-03":
      return (
        <path d="M10.5 11H5c-.56 0-1 .44-1 1 0 .55.44 1 1 1h5.49c.55 0 1-.45 1-1 0-.56-.45-1-1-1Zm-6.54.97l-2.34 6.97c-.36 1.04-.39 1.18-.2 1.67 .17.43.54.77.99.89 .5.14.63.09 1.64-.36l16.71-7.53c.59-.27.74-.35.95-.52 .15-.13.28-.28.38-.47 .2-.42.2-.92-.01-1.33 -.23-.47-.36-.54-1.34-.98L4.02 2.78c-1.01-.46-1.14-.5-1.65-.36 -.46.12-.83.45-1 .89 -.2.48-.16.62.18 1.66l2.34 7.05c.01.04.01.05.01 0 -.01-.01-.01-.01-.01-.01 -.01-.05-.01-.09 0-.13 0-.01 0-.01 0-.01 0-.05 0-.05-.02 0Zm1.89.63c.06-.19.07-.24.09-.37 0-.01 0-.01 0-.02 .01-.13.01-.26 0-.39 -.01-.01-.01-.01-.01-.02 -.02-.13-.04-.19-.1-.37L3.48 4.37c-.12-.35-.15-.46-.18-.56 0 .01 0 .09-.06.24 -.06.14-.19.25-.34.29 -.16.04-.23.03-.25.02 .08.03.2.07.52.22l16.71 7.52c.31.14.42.19.5.23 -.02-.01-.08-.06-.15-.21 -.07-.14-.07-.31 0-.45 .04-.1.1-.17.16-.21 -.02.01-.15.07-.53.24L3.14 19.22c-.33.14-.45.19-.54.22 .01-.01.08-.02.24.02 .15.04.27.15.33.29 .05.15.05.22.05.24 .02-.1.05-.21.17-.56l2.33-6.98Z" />
      );
    case "loading-02":
      return (
        <path d="M11 2v4c0 .55.44 1 1 1 .55 0 1-.45 1-1V2c0-.56-.45-1-1-1 -.56 0-1 .44-1 1Zm0 16v4c0 .55.44 1 1 1 .55 0 1-.45 1-1v-4c0-.56-.45-1-1-1 -.56 0-1 .44-1 1Zm-5-7H2c-.56 0-1 .44-1 1 0 .55.44 1 1 1h4c.55 0 1-.45 1-1 0-.56-.45-1-1-1Zm16 0h-4c-.56 0-1 .44-1 1 0 .55.44 1 1 1h4c.55 0 1-.45 1-1 0-.56-.45-1-1-1Zm-2.22 7.37l-2.83-2.83c-.4-.4-1.03-.4-1.42 0 -.4.39-.4 1.02 0 1.41l2.82 2.82c.39.39 1.02.39 1.41 0 .39-.4.39-1.03 0-1.42ZM18.36 4.29l-2.83 2.82c-.4.39-.4 1.02 0 1.41 .39.39 1.02.39 1.41-.01l2.82-2.83c.39-.4.39-1.03-.01-1.42 -.4-.4-1.03-.4-1.42 0ZM5.61 19.78l2.82-2.83c.39-.4.39-1.03 0-1.42 -.4-.4-1.03-.4-1.42-.01l-2.83 2.82c-.4.39-.4 1.02-.01 1.41 .39.39 1.02.39 1.41 0ZM4.19 5.7l2.82 2.82c.39.39 1.02.39 1.41 0 .39-.4.39-1.03 0-1.42L5.59 4.27c-.4-.4-1.03-.4-1.42 0 -.4.39-.4 1.02 0 1.41Z" />
      );
    case "users-01":
      return (
        <path d="M23 21v-2c0-2.3-1.56-4.28-3.76-4.85 -.54-.14-1.09.18-1.22.71 -.14.53.18 1.08.71 1.21 1.31.33 2.24 1.52 2.24 2.9v2c0 .55.44 1 1 1 .55 0 1-.45 1-1ZM15.12 4.21c1.12.45 1.87 1.54 1.87 2.78 0 1.23-.76 2.32-1.88 2.78 -.52.2-.76.79-.56 1.3 .2.51.79.75 1.3.55 1.87-.76 3.12-2.59 3.12-4.64 0-2.06-1.26-3.88-3.13-4.64 -.52-.21-1.1.03-1.31.55 -.21.51.03 1.09.55 1.3Zm2.87 16.78c0-2.5-.05-3.1-.39-3.92 -.51-1.23-1.49-2.2-2.71-2.71 -.83-.35-1.42-.39-3.92-.39h-3c-2.5 0-3.1.04-3.92.38 -1.23.5-2.2 1.48-2.71 2.7 -.34.82-.39 1.41-.39 3.91 0 .55.44 1 1 1 .55 0 1-.45 1-1 0-2.17.03-2.69.22-3.15 .3-.74.88-1.32 1.62-1.63 .46-.2.98-.23 3.14-.23h3c2.16 0 2.68.03 3.14.22 .73.3 1.31.88 1.62 1.62 .19.46.22.98.22 3.14 0 .55.44 1 1 1 .55 0 1-.45 1-1Zm-5.5-14c0 1.65-1.35 3-3 3 -1.66 0-3-1.35-3-3 0-1.66 1.34-3 3-3 1.65 0 3 1.34 3 3Zm2 0c0-2.77-2.24-5-5-5 -2.77 0-5 2.23-5 5 0 2.76 2.23 5 5 5 2.76 0 5-2.24 5-5Z" />
      );
    case "check-circle":
      return (
        <path d="M6.79 12.7l3 3c.39.39 1.02.39 1.41 0l6-6c.39-.4.39-1.03 0-1.42 -.4-.4-1.03-.4-1.42 0l-6 6h1.41l-3-3c-.4-.4-1.03-.4-1.42 0 -.4.39-.4 1.02 0 1.41Zm14.2-.71c0 4.97-4.03 9-9 9 -4.98 0-9-4.03-9-9 0-4.98 4.02-9 9-9 4.97 0 9 4.02 9 9Zm2 0c0-6.08-4.93-11-11-11 -6.08 0-11 4.92-11 11 0 6.07 4.92 11 11 11 6.07 0 11-4.93 11-11Z" />
      );
    case "moon-eclipse":
      return (
        <path d="M19.2 6.6c2.39 3.18 2.39 7.61-.01 10.79 -.34.44-.25 1.06.19 1.4 .44.33 1.06.24 1.4-.2 2.93-3.91 2.93-9.31 0-13.21 -.34-.45-.96-.54-1.41-.2 -.45.33-.54.95-.2 1.4Zm-7.21 16.39c1.69 0 3.33-.39 4.81-1.11 .97-.48.6-1.95-.49-1.9 -.12 0-.23 0-.34 0 -4.42 0-8-3.59-8-8 0-4.42 3.58-8 8-8 .11 0 .22 0 .33 0 1.08.04 1.45-1.43.48-1.9 -1.49-.73-3.13-1.11-4.82-1.11 -6.08 0-11 4.92-11 11 0 6.07 4.92 11 11 11Zm0-2c-4.98 0-9-4.03-9-9 0-4.98 4.02-9 9-9 1.38 0 2.72.31 3.94.9l.43-.9 .04-1c-.15-.01-.29-.01-.43-.01 -5.53 0-10 4.47-10 10 0 5.52 4.47 10 10 10 .14 0 .28-.01.42-.01l-.05-1 -.44-.9c-1.22.59-2.56.9-3.95.9Z" />
      );
    case "sun":
      return (
        <path d="M11 2v2c0 .55.44 1 1 1 .55 0 1-.45 1-1V2c0-.56-.45-1-1-1 -.56 0-1 .44-1 1Zm0 18v2c0 .55.44 1 1 1 .55 0 1-.45 1-1v-2c0-.56-.45-1-1-1 -.56 0-1 .44-1 1Zm-7-9H2c-.56 0-1 .44-1 1 0 .55.44 1 1 1h2c.55 0 1-.45 1-1 0-.56-.45-1-1-1Zm3.02-5.4L5.6 4.18c-.4-.4-1.03-.4-1.42 0 -.4.39-.4 1.02 0 1.41L5.59 7c.39.39 1.02.39 1.41 0 .39-.4.39-1.03 0-1.42Zm11.37 1.41l1.41-1.42c.39-.4.39-1.03-.01-1.42 -.4-.4-1.03-.4-1.42 0l-1.42 1.41c-.4.39-.4 1.02 0 1.41 .39.39 1.02.39 1.41-.01ZM5.6 16.97l-1.42 1.41c-.4.39-.4 1.02-.01 1.41 .39.39 1.02.39 1.41 0l1.41-1.42c.39-.4.39-1.03 0-1.42 -.4-.4-1.03-.4-1.42-.01Zm11.37 1.41l1.41 1.41c.39.39 1.02.39 1.41 0 .39-.4.39-1.03 0-1.42l-1.42-1.42c-.4-.4-1.03-.4-1.42 0 -.4.39-.4 1.02 0 1.41Zm5.02-7.4h-2c-.56 0-1 .44-1 1 0 .55.44 1 1 1h2c.55 0 1-.45 1-1 0-.56-.45-1-1-1Zm-6 1c0 2.2-1.8 4-4 4 -2.21 0-4-1.8-4-4 0-2.21 1.79-4 4-4 2.2 0 4 1.79 4 4Zm2 0c0-3.32-2.69-6-6-6 -3.32 0-6 2.68-6 6 0 3.31 2.68 6 6 6 3.31 0 6-2.69 6-6Z" />
      );
    case "save-01":
      return (
        <path d="M6 3v3.4c0 .9.01 1.11.21 1.5 .19.37.49.68.87.87 .39.2.6.21 1.5.21h6.8c.9 0 1.11-.02 1.5-.22 .37-.2.68-.5.87-.88 .2-.4.21-.61.21-1.51v-2.4c0-.56-.45-1-1-1 -.56 0-1 .44-1 1v2.4c0 .49-.01.61 0 .59 -.01 0-.01 0 0 0 .01-.01-.11 0-.61 0h-6.8c-.5 0-.62-.01-.61-.01 0 0 0-.01-.01-.01 0 .01 0-.11 0-.6v-3.4c0-.56-.45-1-1-1 -.56 0-1 .44-1 1Zm12 18v-6.4c0-.91-.02-1.12-.22-1.51 -.2-.38-.5-.69-.88-.88 -.4-.21-.61-.22-1.51-.22h-6.8c-.91 0-1.12.01-1.51.21 -.38.19-.69.49-.88.87 -.21.39-.22.6-.22 1.5v6.4c0 .55.44 1 1 1 .55 0 1-.45 1-1v-6.4c0-.5 0-.62-.01-.61 -.01 0-.01 0 0-.01 -.02 0 .1 0 .59 0h6.8c.49 0 .61 0 .59-.01 0 0 0-.01 0 0 -.01-.02-.01.1-.01.59v6.4c0 .55.44 1 1 1 .55 0 1-.45 1-1Zm2-11.68v6.87c0 1.89-.04 2.35-.22 2.7 -.2.37-.5.68-.88.87 -.36.18-.81.21-2.71.21h-8.4c-1.9 0-2.36-.04-2.71-.22 -.38-.2-.69-.5-.88-.88 -.19-.36-.22-.81-.22-2.71v-8.4c0-1.9.03-2.36.21-2.71 .19-.38.49-.69.87-.88 .35-.19.8-.22 2.7-.22h6.87c.51 0 .63 0 .73.02 .1.02.19.06.28.11 .08.04.16.13.53.49l3.12 3.12c.33.33.42.42.47.5 0 .01.01.01.01.02 .05.08.09.18.11.28 .02.09.02.21.02.73Zm2 0c0-.71-.01-.89-.09-1.2 -.08-.31-.2-.6-.36-.87 -.03-.05-.07-.1-.1-.15 -.16-.22-.27-.34-.7-.77L17.62 3.2c-.5-.5-.64-.63-.91-.79 -.27-.17-.57-.29-.87-.36 -.32-.08-.5-.09-1.2-.09H7.76c-2.31 0-2.85.04-3.62.43 -.76.38-1.37.99-1.75 1.74 -.4.76-.44 1.31-.44 3.61v8.4c0 2.3.04 2.84.43 3.61 .38.75.99 1.36 1.74 1.74 .76.39 1.31.43 3.61.43h8.4c2.3 0 2.84-.05 3.61-.44 .75-.39 1.36-1 1.74-1.75 .39-.77.43-1.32.43-3.62V9.23Z" />
      );
    case "box":
      return (
        <path d="M19.5 8v8.2c0 1.89-.04 2.35-.22 2.7 -.2.37-.5.68-.88.87 -.36.18-.81.21-2.71.21h-7.4c-1.9 0-2.36-.04-2.71-.22 -.38-.2-.69-.5-.88-.88 -.19-.36-.22-.81-.22-2.71v-8.2c0-.56-.45-1-1-1 -.56 0-1 .44-1 1v8.2c0 2.3.04 2.84.43 3.61 .38.75.99 1.36 1.74 1.74 .76.39 1.31.43 3.61.43h7.4c2.3 0 2.84-.05 3.61-.44 .75-.39 1.36-1 1.74-1.75 .39-.77.43-1.32.43-3.62v-8.2c0-.56-.45-1-1-1 -.56 0-1 .44-1 1ZM3.6 4h16.8c.49 0 .61 0 .6-.01 -.01-.01-.01-.01 0 0 -.01-.02-.01.1-.01.59v1.8c0 .49-.01.61 0 .59 -.01 0-.01 0 0 0 .01-.01-.11 0-.61 0H3.58c-.5 0-.62-.01-.61-.01 0 0 0-.01-.01-.01 0 .01 0-.11 0-.6v-1.8c0-.5 0-.62 0-.61 -.01 0 0 0 0-.01 -.02 0 .1 0 .59 0Zm0-2c-.91 0-1.12.01-1.51.21 -.38.19-.69.49-.88.87 -.21.39-.22.6-.22 1.5v1.8c0 .9.01 1.11.21 1.5 .19.37.49.68.87.87 .39.2.6.21 1.5.21h16.8c.9 0 1.11-.02 1.5-.22 .37-.2.68-.5.87-.88 .2-.4.21-.61.21-1.51v-1.8c0-.91-.02-1.12-.22-1.51 -.2-.38-.5-.69-.88-.88 -.4-.21-.61-.22-1.51-.22H3.54Zm6 10.5h4.8c.49 0 .61 0 .59-.01 0 0 0-.01 0 0 -.01-.02-.01.1-.01.59v.8c0 .49-.01.61 0 .59 -.01 0 0 0-.01 0 .01-.01-.11-.01-.6-.01h-4.8c-.5 0-.62-.01-.6 0 -.01-.01-.01-.01-.01 0s-.01-.11-.01-.61v-.8c0-.5 0-.62-.01-.61 -.01 0-.01 0 0-.01 -.02 0 .1 0 .59 0Zm0-2c-.91 0-1.12.01-1.51.21 -.38.19-.69.49-.88.87 -.21.39-.22.6-.22 1.5v.8c0 .9.01 1.11.21 1.5 .19.37.49.68.87.87 .39.2.6.21 1.5.21h4.8c.9 0 1.11-.02 1.5-.22 .37-.2.68-.5.87-.88 .2-.4.21-.61.21-1.51v-.8c0-.91-.02-1.12-.22-1.51 -.2-.38-.5-.69-.88-.88 -.4-.21-.61-.22-1.51-.22h-4.8Z" />
      );
    default:
      return;
  }
};

interface IconProps extends React.SVGAttributes<SVGElement> {
  variant?: string;
}

const Icon = React.forwardRef<HTMLButtonElement, IconProps>(
  ({ className, variant, children, ...props }, ref) => {
    return (
      <svg
        className={cn("w-6 h-6 flex-shrink-0 fill-current", className)}
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        {getVariant(variant) || children}
      </svg>
    );
  }
);
Icon.displayName = "Icon";

export { Icon, type IconProps };
