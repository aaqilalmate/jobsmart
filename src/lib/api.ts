import { Job, JobCategory, Location, AdminUser, AdRequest, ActivityLog, ContactMessage, AdRequestFile, PosterVersion } from '../types';
import { SRI_LANKA_DISTRICTS, INITIAL_CATEGORIES } from '../data/sriLankanData';
import { supabaseFetch } from './supabase';

export const STORAGE_KEYS = {
  JOBS: 'jobsmart_jobs',
  CATEGORIES: 'jobsmart_categories',
  LOCATIONS: 'jobsmart_locations',
  REQUESTS: 'jobsmart_requests',
  SETTINGS: 'jobsmart_settings',
  ADMIN_USER: 'jobsmart_admin_user',
  AUTH_TOKEN: 'jobsmart_auth_token',
  MESSAGES: 'jobsmart_messages',
  ADMIN_USERS: 'jobsmart_admin_users',
  ACTIVITY_LOGS: 'jobsmart_activity_logs',
};

// Initialize localStorage fallback cache
function initializeLocalStore() {
  if (typeof window === 'undefined') return;

  if (!localStorage.getItem(STORAGE_KEYS.LOCATIONS)) {
    localStorage.setItem(STORAGE_KEYS.LOCATIONS, JSON.stringify(SRI_LANKA_DISTRICTS));
  }
  if (!localStorage.getItem(STORAGE_KEYS.CATEGORIES)) {
    localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(INITIAL_CATEGORIES));
  }
  if (!localStorage.getItem(STORAGE_KEYS.SETTINGS)) {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify({
      employer_popup_enabled: true,
      site_name: 'Jobsmart.lk',
      headline: 'Find Your Next Opportunity with Jobsmart.lk'
    }));
  }
  if (!localStorage.getItem(STORAGE_KEYS.REQUESTS)) {
    localStorage.setItem(STORAGE_KEYS.REQUESTS, JSON.stringify([
      {
        id: 'req_001',
        reference_no: 'JS-2026-000101',
        has_poster: 0,
        employer_name: 'Kandy Agro Tech (Pvt) Ltd',
        contact_person: 'Mr. Rohan Perera',
        email: 'careers@kandyagrotech.lk',
        phone: '0812233445',
        job_title: 'Agricultural Machinery Field Engineer',
        category_id: 'cat_engineering',
        category_name: 'Engineering & Construction',
        location: 'Kandy',
        employment_type: 'Full-Time',
        salary_info: 'Rs. 130,000 - 180,000',
        job_description: 'Looking for a qualified field engineer to oversee agricultural equipment servicing.',
        responsibilities: 'Maintenance, site visits, technical customer assistance.',
        requirements: 'B.Sc or NDT in Mechanical/Agricultural Engineering.',
        experience_required: '2+ years experience in heavy machinery.',
        application_deadline: '2026-11-25',
        preferred_publish_date: '2026-10-28',
        application_url: null,
        poster_whatsapp: '0771234567',
        poster_email: 'careers@kandyagrotech.lk',
        brand_colors: '#0284c7, #0f172a',
        design_instructions: 'Please highlight competitive salary and field travel allowance.',
        additional_instructions: null,
        terms_accepted: 1,
        status: 'pending_review',
        payment_status: 'pending_verification',
        payment_reference: 'BOC-TXN-884920',
        payment_notes: 'Paid via Bank of Ceylon online transfer.',
        assigned_to_user_id: null,
        internal_notes: 'Priority listing requested.',
        created_at: new Date(Date.now() - 1 * 24 * 3600 * 1000).toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        id: 'req_002',
        reference_no: 'JS-2026-000102',
        has_poster: 1,
        employer_name: 'Ocean Vista Resort Weligama',
        contact_person: 'Ms. Dilani Silva',
        email: 'hr@oceanvistaresort.lk',
        phone: '0412255667',
        job_title: 'Executive Pastry Chef',
        category_id: 'cat_tourism',
        category_name: 'Hospitality & Tourism',
        location: 'Matara',
        employment_type: 'Full-Time',
        salary_info: 'Negotiable based on portfolio',
        job_description: 'Leading five-star resort seeking creative Executive Pastry Chef.',
        responsibilities: 'Menu design, pastry section management, kitchen staff training.',
        requirements: 'International resort experience preferred.',
        experience_required: '5+ years in luxury hotel pastry.',
        application_deadline: '2026-11-30',
        preferred_publish_date: '2026-10-29',
        application_url: 'https://oceanvistaresort.lk/careers',
        poster_whatsapp: '0719876543',
        poster_email: 'hr@oceanvistaresort.lk',
        brand_colors: '#0ea5e9',
        design_instructions: 'We uploaded our approved flyer.',
        additional_instructions: null,
        terms_accepted: 1,
        status: 'approved',
        payment_status: 'paid',
        payment_reference: 'HNB-TR-99412',
        payment_notes: 'Verified by Gareeb.',
        assigned_to_user_id: 'usr_gareeb_02',
        internal_notes: 'Poster verified and ready to schedule.',
        created_at: new Date(Date.now() - 2 * 24 * 3600 * 1000).toISOString(),
        updated_at: new Date().toISOString(),
      }
    ]));
  }
  if (!localStorage.getItem(STORAGE_KEYS.ADMIN_USERS)) {
    localStorage.setItem(STORAGE_KEYS.ADMIN_USERS, JSON.stringify([
      {
        id: 'usr_aaqil_01',
        username: 'aaqil',
        email: 'aaqil@jobsmart.lk',
        full_name: 'Aaqil (Super Admin)',
        role: 'super_admin',
        must_change_password: false,
        is_active: true,
        created_at: new Date(Date.now() - 30 * 24 * 3600 * 1000).toISOString(),
      },
      {
        id: 'usr_gareeb_02',
        username: 'gareeb',
        email: 'gareeb@jobsmart.lk',
        full_name: 'Gareeb (Admin)',
        role: 'admin',
        must_change_password: false,
        is_active: true,
        created_at: new Date(Date.now() - 20 * 24 * 3600 * 1000).toISOString(),
      }
    ]));
  }
  if (!localStorage.getItem(STORAGE_KEYS.ACTIVITY_LOGS)) {
    localStorage.setItem(STORAGE_KEYS.ACTIVITY_LOGS, JSON.stringify([
      {
        id: 'act_01',
        user_id: 'usr_aaqil_01',
        username: 'aaqil',
        action: 'Admin Signed In',
        entity_type: 'auth',
        entity_id: 'usr_aaqil_01',
        details: 'Role: super_admin',
        ip_address: '127.0.0.1',
        created_at: new Date().toISOString(),
      },
      {
        id: 'act_02',
        user_id: 'usr_aaqil_01',
        username: 'aaqil',
        action: 'System Database Synchronized',
        entity_type: 'system',
        entity_id: null,
        details: 'All 25 Sri Lankan Districts & Categories verified',
        ip_address: '127.0.0.1',
        created_at: new Date(Date.now() - 3600000).toISOString(),
      }
    ]));
  }
}

initializeLocalStore();

function getStoredToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
}

function getStoredJobs(): Job[] { return []; }
function saveStoredJobs(_jobs: Job[]) {}

function addActivityLog(username: string, action: string, entityType: string, details?: string) {
  try {
    const logs = JSON.parse(localStorage.getItem(STORAGE_KEYS.ACTIVITY_LOGS) || '[]');
    logs.unshift({
      id: 'act_' + Date.now(),
      user_id: null,
      username,
      action,
      entity_type: entityType,
      entity_id: null,
      details: details || null,
      ip_address: '127.0.0.1',
      created_at: new Date().toISOString(),
    });
    localStorage.setItem(STORAGE_KEYS.ACTIVITY_LOGS, JSON.stringify(logs.slice(0, 100)));
  } catch {}
}

export async function safeFetchJson<T>(
  url: string,
  options?: RequestInit
): Promise<{ ok: boolean; data?: T; status: number }> {
  try {
    const token = getStoredToken();
    const headers = new Headers(options?.headers || {});
    if (token && !headers.has('Authorization')) {
      headers.set('Authorization', `Bearer ${token}`);
    }

    const res = await fetch(url, {
      ...options,
      headers,
      credentials: 'include',
    });

    const contentType = res.headers.get('content-type') || '';
    if (!contentType.includes('application/json')) {
      return { ok: false, status: res.status };
    }

    const text = await res.text();
    if (!text || text.trim().length === 0) {
      return { ok: false, status: res.status };
    }

    const data = JSON.parse(text);
    return { ok: res.ok, data, status: res.status };
  } catch (err) {
    return { ok: false, status: 0 };
  }
}

export const apiClient = {
  // ----------------------------------------------------
  // PUBLIC CATEGORIES
  // ----------------------------------------------------
  async getCategories(): Promise<JobCategory[]> {
    const res = await safeFetchJson<{ categories: JobCategory[] }>('/api/categories');
    if (res.ok && res.data?.categories && res.data.categories.length > 0) {
      localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(res.data.categories));
      return res.data.categories;
    }
    const stored = localStorage.getItem(STORAGE_KEYS.CATEGORIES);
    return stored ? JSON.parse(stored) : INITIAL_CATEGORIES;
  },

  // ----------------------------------------------------
  // PUBLIC LOCATIONS (All 25 Sri Lankan Districts)
  // ----------------------------------------------------
  async getLocations(): Promise<Location[]> {
    const res = await safeFetchJson<{ locations: Location[] }>('/api/locations');
    if (res.ok && res.data?.locations && res.data.locations.length >= 25) {
      localStorage.setItem(STORAGE_KEYS.LOCATIONS, JSON.stringify(res.data.locations));
      return res.data.locations;
    }
    const stored = localStorage.getItem(STORAGE_KEYS.LOCATIONS);
    return stored ? JSON.parse(stored) : SRI_LANKA_DISTRICTS;
  },

  // ----------------------------------------------------
  // PUBLIC JOBS
  // ----------------------------------------------------
  async getJobs(params: {
    q?: string;
    category?: string;
    location?: string;
    employment_type?: string;
    workplace_type?: string;
    featured?: string;
    min_salary?: number;
    include_negotiable?: boolean;
    page?: number;
    limit?: number;
  }): Promise<{ jobs: Job[]; pagination: { total: number; page: number; limit: number; totalPages: number } }> {
    const allJobs = await supabaseFetch<Job[]>(`/rest/v1/jobs?select=*,category:job_categories(name,slug),location:locations(name,slug,province)&status=eq.published&order=created_at.desc`);
    let filtered = allJobs.map((j: any) => ({ ...j, category_name: j.category?.name, category_slug: j.category?.slug, location_name: j.location?.name, location_slug: j.location?.slug, location_province: j.location?.province }));

    if (params.q && params.q.trim()) {
      const term = params.q.toLowerCase().trim();
      filtered = filtered.filter(
        (j) =>
          j.title.toLowerCase().includes(term) ||
          j.company_name.toLowerCase().includes(term) ||
          (j.description && j.description.toLowerCase().includes(term))
      );
    }

    if (params.category && params.category !== 'all') {
      filtered = filtered.filter((j) => j.category_slug === params.category || j.category_id === params.category);
    }

    if (params.location && params.location !== 'all') {
      filtered = filtered.filter((j) => j.location_slug === params.location || j.location_id === params.location);
    }

    if (params.employment_type && params.employment_type !== 'all') {
      filtered = filtered.filter((j) => j.employment_type === params.employment_type);
    }

    if (params.workplace_type && params.workplace_type !== 'all') {
      filtered = filtered.filter((j) => j.workplace_type === params.workplace_type);
    }

    if (params.featured === '1') {
      filtered = filtered.filter((j) => Boolean(j.featured));
    }

    if (params.min_salary && params.min_salary > 0) {
      const minSalary = params.min_salary;
      filtered = filtered.filter((j) => {
        const isNegotiable = !j.salary_visible || !j.salary_min || j.salary_min === 0;
        if (params.include_negotiable && isNegotiable) return true;
        const max = j.salary_max || j.salary_min || 0;
        return max >= minSalary;
      });
    }

    const page = params.page || 1;
    const limit = params.limit || 12;
    const total = filtered.length;
    const totalPages = Math.ceil(total / limit) || 1;
    const start = (page - 1) * limit;
    const paginated = filtered.slice(start, start + limit);

    return {
      jobs: paginated,
      pagination: { total, page, limit, totalPages },
    };
  },

  // ----------------------------------------------------
  // PUBLIC JOB BY SLUG
  // ----------------------------------------------------
  async getJobBySlug(slug: string): Promise<{ job: Job; relatedJobs: Job[] } | null> {
    const rows: any[] = await supabaseFetch(`/rest/v1/jobs?select=*,category:job_categories(name,slug),location:locations(name,slug,province)&slug=eq.${encodeURIComponent(slug)}&status=eq.published&limit=1`);
    const row = rows[0];
    const job = row ? { ...row, category_name: row.category?.name, category_slug: row.category?.slug, location_name: row.location?.name, location_slug: row.location?.slug, location_province: row.location?.province } as Job : null;
    if (!job) return null;
    const relatedRows: any[] = await supabaseFetch(`/rest/v1/jobs?select=*,category:job_categories(name,slug),location:locations(name,slug,province)&status=eq.published&id=neq.${job.id}&category_id=eq.${job.category_id}&limit=3`);
    const related = relatedRows.map((j) => ({ ...j, category_name: j.category?.name, category_slug: j.category?.slug, location_name: j.location?.name, location_slug: j.location?.slug, location_province: j.location?.province }));

    return { job, relatedJobs: related };
  },

  // ----------------------------------------------------
  // SETTINGS
  // ----------------------------------------------------
  async getSettings(): Promise<{ employer_popup_enabled: boolean }> {
    const res = await safeFetchJson<{ settings: { employer_popup_enabled: boolean } }>('/api/settings/public');
    if (res.ok && res.data?.settings) {
      return res.data.settings;
    }
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      if (stored) return JSON.parse(stored);
    } catch {}
    return { employer_popup_enabled: true };
  },

  async updateSettings(settings: { employer_popup_enabled: boolean }): Promise<boolean> {
    try {
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
      await safeFetchJson('/api/admin/settings', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });
      return true;
    } catch {
      return true;
    }
  },

  // ----------------------------------------------------
  // ADMIN AUTHENTICATION
  // ----------------------------------------------------
  async adminLogin(username: string, password: string): Promise<{ success: boolean; user?: AdminUser; error?: string }> {
    try {
      const session: any = await supabaseFetch('/auth/v1/token?grant_type=password', { method: 'POST', body: JSON.stringify({ email: username.trim(), password }) });
      const role = session.user?.app_metadata?.admin_role;
      if (!['admin', 'super_admin'].includes(role)) throw new Error('This Supabase account is not authorized as an administrator.');
      const user: AdminUser = { id: session.user.id, username: session.user.email, email: session.user.email, full_name: session.user.user_metadata?.full_name || session.user.email, role, must_change_password: false, is_active: true };
      localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, session.access_token);
      localStorage.setItem(STORAGE_KEYS.ADMIN_USER, JSON.stringify(user));
      return { success: true, user };
    } catch (error: any) { return { success: false, error: error.message || 'Invalid email or password.' }; }
  },

  async getAdminMe(): Promise<AdminUser | null> {
    try {
      const token = getStoredToken(); if (!token) return null;
      const session: any = await supabaseFetch('/auth/v1/user', {}, token);
      const role = session.app_metadata?.admin_role;
      if (!['admin', 'super_admin'].includes(role)) return null;
      const user: AdminUser = { id: session.id, username: session.email, email: session.email, full_name: session.user_metadata?.full_name || session.email, role, must_change_password: false, is_active: true };
      localStorage.setItem(STORAGE_KEYS.ADMIN_USER, JSON.stringify(user)); return user;
    } catch {
      return null;
    }
  },

  async adminLogout(): Promise<void> {
    const token = getStoredToken();
    const currentUser = localStorage.getItem(STORAGE_KEYS.ADMIN_USER);
    if (currentUser) {
      try {
        const u = JSON.parse(currentUser);
        addActivityLog(u.username, 'Admin Logged Out', 'auth');
      } catch {}
    }
    localStorage.removeItem(STORAGE_KEYS.ADMIN_USER);
    localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
    if (token) await supabaseFetch('/auth/v1/logout', { method: 'POST' }, token).catch(() => undefined);
  },

  async changePassword(currentPassword: string, newPassword: string): Promise<{ success: boolean; error?: string }> {
    try {
      const currentUser = JSON.parse(localStorage.getItem(STORAGE_KEYS.ADMIN_USER) || 'null');
      if (!currentUser?.email) throw new Error('Sign in again to change your password.');
      const session: any = await supabaseFetch('/auth/v1/token?grant_type=password', { method: 'POST', body: JSON.stringify({ email: currentUser.email, password: currentPassword }) });
      await supabaseFetch('/auth/v1/user', { method: 'PUT', body: JSON.stringify({ password: newPassword }) }, session.access_token);
      localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, session.access_token);
      return { success: true };
    } catch (error: any) { return { success: false, error: error.message || 'Failed to change password.' }; }
  },

  // ----------------------------------------------------
  // ADMIN VACANCY CRUD
  // ----------------------------------------------------
  async getAdminJobs(params: {
    q?: string;
    status?: string;
    page?: number;
    limit?: number;
  }): Promise<{ jobs: Job[]; pagination: { total: number; page: number; limit: number; totalPages: number } }> {
    const rows: any[] = await supabaseFetch(`/rest/v1/jobs?select=*,category:job_categories(name,slug),location:locations(name,slug,province)&order=created_at.desc`, {}, getStoredToken() || undefined);
    let filtered: Job[] = rows.map((j) => ({ ...j, category_name: j.category?.name, category_slug: j.category?.slug, location_name: j.location?.name, location_slug: j.location?.slug, location_province: j.location?.province }));

    if (params.q && params.q.trim()) {
      const term = params.q.toLowerCase().trim();
      filtered = filtered.filter(
        (j) =>
          j.title.toLowerCase().includes(term) ||
          j.company_name.toLowerCase().includes(term) ||
          (j.description && j.description.toLowerCase().includes(term))
      );
    }

    if (params.status && params.status !== 'all') {
      filtered = filtered.filter((j) => j.status === params.status);
    }

    const page = params.page || 1;
    const limit = params.limit || 25;
    const total = filtered.length;
    const totalPages = Math.ceil(total / limit) || 1;
    const start = (page - 1) * limit;
    const paginated = filtered.slice(start, start + limit);

    return {
      jobs: paginated,
      pagination: { total, page, limit, totalPages },
    };
  },

  async getAdminJobById(id: string): Promise<Job | null> {
    const rows: any[] = await supabaseFetch(`/rest/v1/jobs?select=*,category:job_categories(name,slug),location:locations(name,slug,province)&id=eq.${encodeURIComponent(id)}&limit=1`, {}, getStoredToken() || undefined);
    return rows[0] || null;
  },

  async saveAdminJob(id: string | null, jobData: any): Promise<{ success: boolean; job?: Job; error?: string }> {
    try {
      const timestamp = new Date().toISOString();
      const payload = {
        ...jobData,
        salary_visible: Boolean(jobData.salary_visible),
        featured: Boolean(jobData.featured),
        deadline: jobData.deadline || null,
        updated_at: timestamp,
        ...(id
          ? {}
          : {
              id: crypto.randomUUID(),
              slug: `${String(jobData.title || 'job')
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/(^-|-$)/g, '')}-${Date.now()}`,
              created_at: timestamp,
              views_count: 0,
              published_at: jobData.status === 'published' ? timestamp : null,
            }),
      };
      const saved: Job[] = await supabaseFetch(
        `/rest/v1/jobs${id ? `?id=eq.${encodeURIComponent(id)}` : ''}`,
        {
          method: id ? 'PATCH' : 'POST',
          headers: { Prefer: 'return=representation' },
          body: JSON.stringify(payload),
        },
        getStoredToken() || undefined
      );
      return { success: true, job: saved[0] };
    } catch (error: any) {
      return { success: false, error: error.message || 'Unable to save job.' };
    }
  },

  async deleteAdminJob(id: string): Promise<boolean> {
    try {
      await supabaseFetch(`/rest/v1/jobs?id=eq.${encodeURIComponent(id)}`, { method: 'DELETE' }, getStoredToken() || undefined);
      return true;
    } catch {
      return false;
    }
  },

  async toggleAdminJobFeatured(id: string, current: boolean): Promise<boolean> {
    try {
      await supabaseFetch(`/rest/v1/jobs?id=eq.${encodeURIComponent(id)}`, {
        method: 'PATCH',
        body: JSON.stringify({ featured: !current, updated_at: new Date().toISOString() }),
      }, getStoredToken() || undefined);
      return true;
    } catch {
      return false;
    }
  },

  async updateAdminJobStatus(id: string, newStatus: string): Promise<boolean> {
    try {
      await supabaseFetch(`/rest/v1/jobs?id=eq.${encodeURIComponent(id)}`, {
        method: 'PATCH',
        body: JSON.stringify({ status: newStatus, updated_at: new Date().toISOString() }),
      }, getStoredToken() || undefined);
      return true;
    } catch {
      return false;
    }
  },

  async duplicateAdminJob(id: string): Promise<Job | null> {
    try {
      const source = await this.getAdminJobById(id);
      if (!source) return null;
      const { id: _id, category_name: _catName, category_slug: _catSlug, location_name: _locName, location_slug: _locSlug, location_province: _locProv, ...data } = source as any;
      const result = await this.saveAdminJob(null, {
        ...data,
        title: `${source.title} (Copy)`,
        status: 'draft',
        featured: false,
        published_at: null,
        views_count: 0,
      });
      return result.job || null;
    } catch {
      return null;
    }
  },

  // ----------------------------------------------------
  // ADMIN DASHBOARD & METRICS
  // ----------------------------------------------------
  async getAdminMetrics(): Promise<any> {
    const res = await safeFetchJson<any>('/api/admin/metrics');
    if (res.ok && res.data?.metrics) {
      return res.data;
    }

    const allJobs = await this.getAdminJobs({ limit: 100 }).then(r => r.jobs).catch(() => []);
    const requests: AdRequest[] = JSON.parse(localStorage.getItem(STORAGE_KEYS.REQUESTS) || '[]');
    const activityLogs: ActivityLog[] = JSON.parse(localStorage.getItem(STORAGE_KEYS.ACTIVITY_LOGS) || '[]');

    const totalJobs = allJobs.length;
    const publishedJobs = allJobs.filter((j) => j.status === 'published').length;
    const draftJobs = allJobs.filter((j) => j.status === 'draft').length;
    const expiredJobs = allJobs.filter((j) => j.status === 'expired').length;

    const totalRequests = requests.length;
    const pendingRequests = requests.filter((r) => r.status === 'pending_review').length;
    const posterDesignRequests = requests.filter((r) => !r.has_poster && r.status !== 'completed' && r.status !== 'rejected').length;
    const inProgressRequests = requests.filter((r) => r.status === 'in_progress').length;
    const completedRequests = requests.filter((r) => r.status === 'completed').length;
    const unpaidRequests = requests.filter((r) => r.payment_status === 'unpaid').length;

    return {
      metrics: {
        totalJobs,
        publishedJobs,
        draftJobs,
        expiredJobs,
        totalRequests,
        pendingRequests,
        posterDesignRequests,
        inProgressRequests,
        completedRequests,
        unpaidRequests,
      },
      recentJobs: allJobs.slice(0, 5),
      recentRequests: requests.slice(0, 5),
      recentActivity: activityLogs.slice(0, 8),
    };
  },

  // ----------------------------------------------------
  // ADMIN REQUESTS
  // ----------------------------------------------------
  async getAdminRequests(params: {
    q?: string;
    status?: string;
    payment_status?: string;
    has_poster?: string;
    page?: number;
    limit?: number;
  }): Promise<{ requests: AdRequest[]; pagination: { total: number; page: number; limit: number; totalPages: number } }> {
    const all: AdRequest[] = JSON.parse(localStorage.getItem(STORAGE_KEYS.REQUESTS) || '[]');
    let filtered = [...all];

    if (params.q && params.q.trim()) {
      const term = params.q.toLowerCase().trim();
      filtered = filtered.filter(
        (r) =>
          r.reference_no.toLowerCase().includes(term) ||
          r.employer_name.toLowerCase().includes(term) ||
          r.job_title.toLowerCase().includes(term) ||
          r.phone.includes(term)
      );
    }

    if (params.status && params.status !== 'all') {
      filtered = filtered.filter((r) => r.status === params.status);
    }

    if (params.payment_status && params.payment_status !== 'all') {
      filtered = filtered.filter((r) => r.payment_status === params.payment_status);
    }

    if (params.has_poster && params.has_poster !== 'all') {
      const val = parseInt(params.has_poster, 10);
      filtered = filtered.filter((r) => (r.has_poster ? 1 : 0) === val);
    }

    const page = params.page || 1;
    const limit = params.limit || 25;
    const total = filtered.length;
    const totalPages = Math.ceil(total / limit) || 1;
    const start = (page - 1) * limit;
    const paginated = filtered.slice(start, start + limit);

    return {
      requests: paginated,
      pagination: { total, page, limit, totalPages },
    };
  },

  async getAdminRequestById(id: string): Promise<{ request: AdRequest; files: AdRequestFile[]; posterVersions: PosterVersion[] } | null> {
    const all: AdRequest[] = JSON.parse(localStorage.getItem(STORAGE_KEYS.REQUESTS) || '[]');
    const req = all.find((r) => r.id === id);
    if (!req) return null;
    return {
      request: req,
      files: req.files || [],
      posterVersions: req.poster_versions || [],
    };
  },

  async updateAdminRequest(id: string, data: Partial<AdRequest>): Promise<boolean> {
    const all: AdRequest[] = JSON.parse(localStorage.getItem(STORAGE_KEYS.REQUESTS) || '[]');
    const index = all.findIndex((r) => r.id === id);
    if (index >= 0) {
      all[index] = { ...all[index], ...data, updated_at: new Date().toISOString() };
      localStorage.setItem(STORAGE_KEYS.REQUESTS, JSON.stringify(all));
      addActivityLog('admin', 'Updated Ad Request', 'request', all[index].reference_no);
    }
    return true;
  },

  // ----------------------------------------------------
  // ADMIN CONTACT INQUIRIES
  // ----------------------------------------------------
  async getAdminContactMessages(): Promise<ContactMessage[]> {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.MESSAGES) || '[]');
  },

  async updateAdminContactMessage(id: string, status: string): Promise<boolean> {
    const messages: ContactMessage[] = JSON.parse(localStorage.getItem(STORAGE_KEYS.MESSAGES) || '[]');
    const item = messages.find((m) => m.id === id);
    if (item) {
      item.status = status as any;
      localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(messages));
    }
    return true;
  },

  // ----------------------------------------------------
  // ADMIN USERS
  // ----------------------------------------------------
  async getAdminUsers(): Promise<AdminUser[]> {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.ADMIN_USERS) || '[]');
  },

  async createAdminUser(userData: any): Promise<{ success: boolean; user?: AdminUser; error?: string }> {
    const users: AdminUser[] = JSON.parse(localStorage.getItem(STORAGE_KEYS.ADMIN_USERS) || '[]');
    const newUser: AdminUser = {
      id: 'usr_' + Date.now(),
      username: userData.username.trim().toLowerCase(),
      email: userData.email.trim(),
      full_name: userData.full_name.trim(),
      role: userData.role || 'admin',
      must_change_password: false,
      is_active: true,
      created_at: new Date().toISOString(),
    };
    users.push(newUser);
    localStorage.setItem(STORAGE_KEYS.ADMIN_USERS, JSON.stringify(users));
    addActivityLog('admin', 'Created Admin User', 'user', newUser.username);
    return { success: true, user: newUser };
  },

  // ----------------------------------------------------
  // ADMIN ACTIVITY LOGS
  // ----------------------------------------------------
  async getAdminActivityLogs(page = 1, limit = 25): Promise<{ logs: ActivityLog[]; total: number; totalPages: number }> {
    const all: ActivityLog[] = JSON.parse(localStorage.getItem(STORAGE_KEYS.ACTIVITY_LOGS) || '[]');
    const total = all.length;
    const totalPages = Math.ceil(total / limit) || 1;
    const start = (page - 1) * limit;
    return {
      logs: all.slice(start, start + limit),
      total,
      totalPages,
    };
  },

  // ----------------------------------------------------
  // PUBLIC CONTACT & AD REQUEST SUBMISSION
  // ----------------------------------------------------
  async submitContact(data: { full_name: string; email: string; phone?: string; subject: string; message: string }): Promise<{ success: boolean; message: string }> {
    const existing = JSON.parse(localStorage.getItem(STORAGE_KEYS.MESSAGES) || '[]');
    existing.unshift({
      id: 'msg_' + Date.now(),
      ...data,
      phone: data.phone || null,
      status: 'unread',
      created_at: new Date().toISOString(),
    });
    localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(existing));
    return { success: true, message: 'Thank you for reaching out. We will get back to you shortly.' };
  },

  async submitAdRequest(formData: FormData): Promise<{ success: boolean; reference_no?: string; error?: string }> {
    const randomSuffix = Math.floor(100000 + Math.random() * 900000);
    const ref = `JS-2026-${randomSuffix}`;
    const stored: AdRequest[] = JSON.parse(localStorage.getItem(STORAGE_KEYS.REQUESTS) || '[]');
    stored.unshift({
      id: 'req_' + Date.now(),
      reference_no: ref,
      employer_name: (formData.get('employer_name') as string) || 'Employer',
      contact_person: (formData.get('contact_person') as string) || '',
      email: (formData.get('email') as string) || '',
      phone: (formData.get('phone') as string) || '',
      job_title: (formData.get('job_title') as string) || 'Vacancy',
      category_id: (formData.get('category_id') as string) || null,
      location: (formData.get('location') as string) || 'Colombo',
      employment_type: (formData.get('employment_type') as string) || 'Full-Time',
      salary_info: (formData.get('salary_info') as string) || null,
      job_description: (formData.get('job_description') as string) || '',
      responsibilities: (formData.get('responsibilities') as string) || null,
      requirements: (formData.get('requirements') as string) || null,
      experience_required: (formData.get('experience_required') as string) || null,
      application_deadline: (formData.get('application_deadline') as string) || null,
      preferred_publish_date: (formData.get('preferred_publish_date') as string) || null,
      application_url: (formData.get('application_url') as string) || null,
      poster_whatsapp: (formData.get('poster_whatsapp') as string) || null,
      poster_email: (formData.get('poster_email') as string) || null,
      brand_colors: (formData.get('brand_colors') as string) || null,
      design_instructions: (formData.get('design_instructions') as string) || null,
      additional_instructions: (formData.get('additional_instructions') as string) || null,
      terms_accepted: 1,
      status: 'pending_review',
      payment_status: 'unpaid',
      payment_reference: null,
      payment_notes: null,
      assigned_to_user_id: null,
      internal_notes: null,
      has_poster: formData.get('has_poster') === 'true' ? 1 : 0,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    });
    localStorage.setItem(STORAGE_KEYS.REQUESTS, JSON.stringify(stored));
    return { success: true, reference_no: ref };
  },

  async trackRequest(ref: string): Promise<any | null> {
    const stored: any[] = JSON.parse(localStorage.getItem(STORAGE_KEYS.REQUESTS) || '[]');
    const match = stored.find((r) => r.reference_no?.toUpperCase() === ref.trim().toUpperCase());
    return match || null;
  },
};
