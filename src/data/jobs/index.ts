import type { Job } from '../../types';
import { itTechJobs } from './it-tech';
import { creativeJobs } from './creative';
import { businessSalesJobs } from './business-sales';
import { marketingAdJobs } from './marketing-ad';
import { consultingFinanceJobs } from './consulting-finance';
import { adminBackofficeJobs } from './admin-backoffice';
import { manufacturingJobs } from './manufacturing';
import { medicalWelfareJobs } from './medical-welfare';
import { educationLegalJobs } from './education-legal';
import { serviceLifestyleJobs } from './service-lifestyle';
import { infrastructureOtherJobs } from './infrastructure-other';

/** 全職種データ（統合） */
export const jobs: Job[] = [
  ...itTechJobs,
  ...creativeJobs,
  ...businessSalesJobs,
  ...marketingAdJobs,
  ...consultingFinanceJobs,
  ...adminBackofficeJobs,
  ...manufacturingJobs,
  ...medicalWelfareJobs,
  ...educationLegalJobs,
  ...serviceLifestyleJobs,
  ...infrastructureOtherJobs,
];

/** IDから職種データを取得 */
export function getJobById(id: string): Job | undefined {
  return jobs.find((j) => j.id === id);
}

/** 業界一覧を取得 */
export function getIndustries(): string[] {
  return [...new Set(jobs.map((j) => j.industry))];
}

/** タグで職種を検索 */
export function getJobsByTag(tag: string): Job[] {
  return jobs.filter((j) => j.tags.includes(tag));
}
