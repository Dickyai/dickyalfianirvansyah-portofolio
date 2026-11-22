import type { ProjectStatus } from '../../types/project';
import type { Translation } from '../../i18n/types';

/**
 * Industrial Professional Status Badge Styles:
 * - Active: Blue 600 tint
 * - In-development: Amber
 * - Completed: Slate neutral
 */
export const STATUS_BADGE_STYLES: Record<ProjectStatus, string> = {
  active:
    'bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-800',
  'in-development':
    'bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-800',
  completed:
    'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700',
};

export function getStatusLabel(status: ProjectStatus, labels: Translation['detail']['statusLabels']): string {
  if (status === 'active') return labels.active;
  if (status === 'in-development') return labels.inDevelopment;
  return labels.completed;
}
