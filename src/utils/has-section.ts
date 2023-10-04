import {
    Active
} from '@dnd-kit/core';

export const hasSection = (active: Active) => {
   return active?.data?.current?.section
}